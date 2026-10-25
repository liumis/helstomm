import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import type { Core } from '@strapi/strapi';

export type FormKind = 'contact' | 'analysis' | 'training' | 'calculator';
export type DeviceType = 'desktop' | 'mobile';

export type ClientMeta = {
  ipAddress: string;
  userAgent: string;
  deviceType: DeviceType;
  submittedAt: Date;
};

export type EmailField = {
  label: string;
  value: string;
};

const MAX_FILE_BYTES: Record<FormKind, number> = {
  contact: 25 * 1024 * 1024,
  analysis: 50 * 1024 * 1024,
  training: 0,
  calculator: 0,
};

const FORM_TITLES: Record<FormKind, string> = {
  contact: 'Kontaktų užklausa',
  analysis: 'Projekto analizės užklausa',
  training: 'Mokymų registracija',
  calculator: 'Skaičiuoklės pateikimas',
};

function firstHeader(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

export function detectDevice(userAgent: string): DeviceType {
  return /Mobi|Android|iPhone|iPod|iPad|Tablet|webOS|BlackBerry|IEMobile/i.test(userAgent)
    ? 'mobile'
    : 'desktop';
}

export function getClientMeta(ctx: { request: any }): ClientMeta {
  const forwarded = firstHeader(ctx.request.headers['x-forwarded-for']);
  const realIp = firstHeader(ctx.request.headers['x-real-ip']);
  const ip = (forwarded.split(',')[0] || realIp || ctx.request.ip || '').trim();
  const userAgent = firstHeader(ctx.request.headers['user-agent']).slice(0, 1000);

  return {
    ipAddress: ip.slice(0, 128) || 'unknown',
    userAgent,
    deviceType: detectDevice(userAgent),
    submittedAt: new Date(),
  };
}

export function parseEmails(value?: string | null) {
  return String(value || '')
    .split(/[,;\s]+/)
    .map((item) => item.trim().toLowerCase())
    .filter((item) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item));
}

export function escapeHtml(value: string) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function formatVilniusDate(date: Date) {
  return date.toLocaleString('lt-LT', {
    timeZone: 'Europe/Vilnius',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

type IncomingFile = {
  filepath?: string;
  path?: string;
  originalFilename?: string;
  name?: string;
  mimetype?: string;
  type?: string;
  size?: number;
};

export function firstFile(files: unknown) {
  const list = allFiles(files);
  return list[0] || null;
}

export function allFiles(files: unknown): IncomingFile[] {
  if (!files) return [];
  return (Array.isArray(files) ? files : [files]).filter(Boolean) as IncomingFile[];
}

async function uploadOne(
  strapi: Core.Strapi,
  incoming: IncomingFile,
  caption: string
) {
  const uploaded = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        name: incoming.originalFilename || incoming.name || 'priedas',
        caption,
      },
    },
    files: incoming,
  });
  return Array.isArray(uploaded) ? uploaded[0] : uploaded;
}

export async function uploadFormFile(
  strapi: Core.Strapi,
  ctx: { request: any; badRequest: (msg: string) => unknown },
  kind: FormKind,
  caption: string
) {
  const many = await uploadFormFiles(strapi, ctx, kind, caption);
  if ('aborted' in many && many.aborted) {
    return { aborted: true as const, attachmentId: undefined, attachmentName: '', uploaded: null };
  }
  return {
    attachmentId: many.attachmentIds[0],
    attachmentName: many.attachmentNames[0] || '',
    uploaded: many.uploaded[0] || null,
  };
}

export async function uploadFormFiles(
  strapi: Core.Strapi,
  ctx: { request: any; badRequest: (msg: string) => unknown },
  kind: FormKind,
  caption: string
) {
  const incoming = [
    ...allFiles(ctx.request.files?.attachment),
    ...allFiles(ctx.request.files?.file),
    ...allFiles(ctx.request.files?.files),
  ];

  if (incoming.length === 0) {
    return { attachmentIds: [] as Array<string | number>, attachmentNames: [] as string[], uploaded: [] as any[] };
  }

  const max = MAX_FILE_BYTES[kind];
  for (const file of incoming) {
    const size = Number(file.size || 0);
    if (max && size > max) {
      ctx.badRequest(`Failas per didelis (maks. ${Math.round(max / (1024 * 1024))} MB).`);
      return { aborted: true as const, attachmentIds: [], attachmentNames: [], uploaded: [] };
    }
  }

  const uploaded: any[] = [];
  for (const file of incoming) {
    uploaded.push(await uploadOne(strapi, file, caption));
  }

  return {
    attachmentIds: uploaded.map((file) => file?.id).filter(Boolean),
    attachmentNames: uploaded.map((file, index) => file?.name || incoming[index]?.originalFilename || incoming[index]?.name || 'priedas'),
    uploaded,
  };
}

export async function getMailSettings(strapi: Core.Strapi) {
  const settings = await strapi.documents('api::form-mail-setting.form-mail-setting').findFirst({});
  const contactFallback = await strapi.documents('api::contact-setting.contact-setting').findFirst({
    status: 'published',
  });

  return {
    fromName: settings?.fromName || 'Helstomm Group',
    fromEmail: settings?.fromEmail || process.env.SMTP_FROM || 'noreply@helstomm.lt',
    contactNotifyEmails:
      settings?.contactNotifyEmails || contactFallback?.targetEmail || 'info@helstomm.lt',
    analysisNotifyEmails: settings?.analysisNotifyEmails || 'info@helstomm.lt',
    trainingNotifyEmails: settings?.trainingNotifyEmails || 'info@helstomm.lt',
    calculatorNotifyEmails:
      (settings as { calculatorNotifyEmails?: string } | null)?.calculatorNotifyEmails ||
      settings?.analysisNotifyEmails ||
      'info@helstomm.lt',
  };
}

export function notifyEmailsFor(kind: FormKind, settings: Awaited<ReturnType<typeof getMailSettings>>) {
  const raw =
    kind === 'contact'
      ? settings.contactNotifyEmails
      : kind === 'analysis'
        ? settings.analysisNotifyEmails
        : kind === 'calculator'
          ? settings.calculatorNotifyEmails
          : settings.trainingNotifyEmails;
  const emails = parseEmails(raw);
  return emails.length > 0 ? emails : ['info@helstomm.lt'];
}

function renderEmailHtml(input: {
  kind: FormKind;
  fields: EmailField[];
  meta: ClientMeta;
  attachmentName?: string;
}) {
  const rows = input.fields
    .map(
      (field) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #E4E7EC;width:34%;color:#6B7280;font-size:13px;font-weight:600;vertical-align:top;">${escapeHtml(field.label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #E4E7EC;color:#262B33;font-size:14px;">${escapeHtml(field.value || '—')}</td>
        </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="lt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(FORM_TITLES[input.kind])}</title>
</head>
<body style="margin:0;padding:0;background:#F6F7F9;font-family:Poppins,Arial,sans-serif;color:#262B33;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F6F7F9;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #E4E7EC;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:#0F1A2E;padding:22px 28px;">
              <div style="font-size:12px;letter-spacing:.14em;font-weight:700;color:#B7CC34;text-transform:uppercase;">Helstomm Group</div>
              <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#ffffff;">${escapeHtml(FORM_TITLES[input.kind])}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 28px 8px;color:#6B7280;font-size:14px;">
              Svetainėje gauta nauja forma. Žemiau – pateikti duomenys ir techninė informacija.
            </td>
          </tr>
          <tr>
            <td style="padding:8px 20px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #E4E7EC;border-radius:12px;overflow:hidden;">
                ${rows}
                ${
                  input.attachmentName
                    ? `<tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #E4E7EC;width:34%;color:#6B7280;font-size:13px;font-weight:600;">Priedas</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #E4E7EC;color:#262B33;font-size:14px;">${escapeHtml(input.attachmentName)}</td>
                </tr>`
                    : ''
                }
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 20px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F6FAE6;border:1px solid #E3EDB8;border-radius:12px;">
                <tr>
                  <td style="padding:12px 14px;font-size:12px;color:#5F6F0E;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Techniniai duomenys</td>
                </tr>
                <tr>
                  <td style="padding:0 14px 12px;color:#3B475C;font-size:13px;line-height:1.6;">
                    <div><strong>Data / laikas:</strong> ${escapeHtml(formatVilniusDate(input.meta.submittedAt))} (Vilnius)</div>
                    <div><strong>Įrenginys:</strong> ${input.meta.deviceType === 'mobile' ? 'Mobilus' : 'Desktop'}</div>
                    <div><strong>IP:</strong> ${escapeHtml(input.meta.ipAddress)}</div>
                    <div><strong>User-Agent:</strong> ${escapeHtml(input.meta.userAgent || '—')}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderEmailText(input: {
  kind: FormKind;
  fields: EmailField[];
  meta: ClientMeta;
  attachmentName?: string;
}) {
  const lines = [
    FORM_TITLES[input.kind],
    '',
    ...input.fields.map((field) => `${field.label}: ${field.value || '—'}`),
    input.attachmentName ? `Priedai: ${input.attachmentName}` : '',
    '',
    `Data / laikas: ${formatVilniusDate(input.meta.submittedAt)} (Vilnius)`,
    `Įrenginys: ${input.meta.deviceType === 'mobile' ? 'Mobilus' : 'Desktop'}`,
    `IP: ${input.meta.ipAddress}`,
    `User-Agent: ${input.meta.userAgent || '—'}`,
  ];
  return lines.filter(Boolean).join('\n');
}

function resolveUploadedPath(strapi: Core.Strapi, uploaded: any) {
  const url = String(uploaded?.url || '');
  if (!url || url.startsWith('http://') || url.startsWith('https://')) return '';
  const publicDir = (strapi.dirs as any)?.static?.public || path.join(process.cwd(), 'public');
  const filePath = path.join(publicDir, url.replace(/^\//, ''));
  return fs.existsSync(filePath) ? filePath : '';
}

export async function sendFormNotification(
  strapi: Core.Strapi,
  input: {
    kind: FormKind;
    replyTo?: string;
    fields: EmailField[];
    meta: ClientMeta;
    recipients: string[];
    fromName: string;
    fromEmail: string;
    uploaded?: any;
    attachmentName?: string;
  }
) {
  const uploadedFiles = (Array.isArray(input.uploaded) ? input.uploaded : input.uploaded ? [input.uploaded] : []).filter(Boolean);
  const attachmentNames = String(input.attachmentName || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const host = process.env.SMTP_HOST;
  if (!host) {
    strapi.log.warn(
      `Form email skipped (${input.kind}): SMTP_HOST is not set. Submission was saved.`
    );
    return { sent: false, reason: 'smtp-missing' as const };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });

  const html = renderEmailHtml(input);
  const text = renderEmailText(input);
  const attachments = uploadedFiles
    .map((file, index) => {
      const filePath = resolveUploadedPath(strapi, file);
      if (!filePath) return null;
      return {
        filename: attachmentNames[index] || file?.name || path.basename(filePath),
        path: filePath,
      };
    })
    .filter(Boolean) as { filename: string; path: string }[];

  await transporter.sendMail({
    from: `${input.fromName} <${input.fromEmail}>`,
    to: input.recipients.join(', '),
    replyTo: input.replyTo || undefined,
    subject: `[Helstomm] ${FORM_TITLES[input.kind]}: ${input.fields[0]?.value || ''}`.trim(),
    text,
    html,
    attachments,
  });

  strapi.log.info(`Form email sent (${input.kind}) to ${input.recipients.join(', ')}`);
  return { sent: true as const };
}
