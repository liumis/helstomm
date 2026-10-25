import { factories } from '@strapi/strapi';
import {
  getClientMeta,
  getMailSettings,
  notifyEmailsFor,
  sendFormNotification,
} from '../../../utils/form-intake';

const ALLOWED_CODES = new Set([
  'P1',
  'P2',
  'P3',
  'P4',
  'P5',
  'P6',
  'P7',
  'P8',
  'P9',
  'P10',
  'P11',
  'P12',
  'P13',
  'P14',
  'V1',
  'V2',
  'V3',
  'V4',
  'S2',
  'S3',
  'S4',
]);

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return {};
    }
  }
  return {};
}

function asText(value: unknown) {
  return String(value || '').trim();
}

function parseJsonField(value: unknown) {
  if (value == null || value === '') return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return { raw: value };
    }
  }
  return value;
}

export default factories.createCoreController(
  'api::calculator-submission.calculator-submission',
  ({ strapi }) => ({
    async submit(ctx) {
      const raw = (ctx.request.body || {}) as Record<string, unknown>;
      const body = asRecord(raw.data ?? raw);
      const code = asText(body.code).toUpperCase();
      const firstName = asText(body.firstName);
      const lastName = asText(body.lastName);
      const email = asText(body.email);
      const company = asText(body.company);
      const projectName = asText(body.projectName);
      const title = asText(body.title);
      const rawKind = asText(body.kind);
      const kind = rawKind === 'ask' ? 'ask' : rawKind === 'notify' ? 'notify' : 'calculation';
      const question = asText(body.question).slice(0, 4000);
      const pageUrl = asText(body.pageUrl).slice(0, 500);
      const name =
        asText(body.name) ||
        [firstName, lastName].filter(Boolean).join(' ').trim() ||
        (kind === 'notify' ? 'Praneškite man' : '');
      const summary = asText(body.summary).slice(0, 2000);
      const inputs = parseJsonField(body.inputs);
      const results = parseJsonField(body.results);

      if (!ALLOWED_CODES.has(code)) {
        return ctx.badRequest('Neteisingas skaičiuoklės kodas.');
      }
      if (kind === 'notify') {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          return ctx.badRequest('El. paštas yra privalomas.');
        }
      } else if (!name || !email) {
        return ctx.badRequest('Vardas ir el. paštas yra privalomi.');
      }
      if (kind === 'ask' && !question) {
        return ctx.badRequest('Klausimas yra privalomas.');
      }

      const meta = getClientMeta(ctx);
      const mail = await getMailSettings(strapi);
      const recipients = notifyEmailsFor('calculator', mail);

      const entry = await strapi.documents('api::calculator-submission.calculator-submission').create({
        data: {
          kind,
          code,
          title: title || code,
          name,
          firstName,
          lastName,
          email,
          company,
          projectName,
          question,
          pageUrl,
          summary,
          inputs,
          results,
          notifyEmails: recipients.join(', '),
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
          deviceType: meta.deviceType,
          submittedAt: meta.submittedAt,
        } as any,
      });

      try {
        await sendFormNotification(strapi, {
          kind: 'calculator',
          replyTo: email,
          recipients,
          fromName: mail.fromName,
          fromEmail: mail.fromEmail,
          meta,
          fields: [
            {
              label:
                kind === 'ask'
                  ? 'Klausti konstruktoriaus'
                  : kind === 'notify'
                    ? 'Praneškite man'
                    : 'Skaičiuoklė',
              value: `${code}${title ? ` · ${title}` : ''}`,
            },
            { label: 'Vardas', value: name },
            { label: 'El. paštas', value: email },
            { label: 'Įmonė', value: company },
            { label: 'Projektas', value: projectName },
            { label: 'Klausimas', value: question },
            { label: 'Nuoroda', value: pageUrl },
            { label: 'Santrauka', value: summary || 'Įvestys ir rezultatai – CMS sąraše „Skaičiuoklių pateikimai“.' },
          ],
        });
      } catch (error) {
        strapi.log.error(`Calculator form email failed: ${error}`);
      }

      ctx.body = {
        data: {
          id: entry.documentId || entry.id,
        },
      };
    },
  })
);
