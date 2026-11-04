import { factories } from '@strapi/strapi';
import {
  attributionFromBody,
  getClientMeta,
  getMailSettings,
  notifyEmailsFor,
  sendFormNotification,
} from '../../../utils/form-intake';
import { rejectIfGuarded } from '../../../utils/form-guard';
import { syncWebsiteEventOrQueue } from '../../../utils/notion-queue';
import { listAcademyGroups, programCodeFromTopic } from '../../../utils/notion-crm';

function asText(value: unknown) {
  return String(value || '').trim();
}

function asBool(value: unknown) {
  return value === true || value === 'true' || value === '1' || value === 'on';
}

export default factories.createCoreController(
  'api::training-submission.training-submission',
  ({ strapi }) => ({
    async groups(ctx) {
      const program = programCodeFromTopic(asText(ctx.query.programa || ctx.query.program));
      try {
        ctx.body = { data: await listAcademyGroups(program) };
      } catch {
        ctx.body = { data: [] };
      }
    },

    async submit(ctx) {
      if (await rejectIfGuarded(ctx)) return;

      const raw = (ctx.request.body || {}) as Record<string, unknown>;
      const body = (raw.data && typeof raw.data === 'object' ? raw.data : raw) as Record<string, unknown>;
      const firstName = asText(body.firstName);
      const lastName = asText(body.lastName);
      const name = asText(body.name) || [firstName, lastName].filter(Boolean).join(' ').trim();
      const email = asText(body.email);
      const phone = asText(body.phone);
      const company = asText(body.company);
      const participantsCount = asText(body.participantsCount);
      const topic = asText(body.topic);
      const program = programCodeFromTopic(asText(body.program) || topic);
      const position = asText(body.position);
      const groupDate = asText(body.groupDate);
      const preferredDate = asText(body.preferredDate);
      const location = asText(body.location);
      const objectAddress = asText(body.objectAddress);
      const daysCount = asText(body.daysCount);
      const question = asText(body.question).slice(0, 4000);
      const newsConsent = asBool(body.newsConsent ?? body.consent ?? body.naujienos);

      if (!name || !email || !phone) {
        return ctx.badRequest('Vardas, el. paštas ir telefonas yra privalomi.');
      }

      const meta = getClientMeta(ctx);
      const attribution = attributionFromBody(body);
      const pageUrl = asText(body.pageUrl).slice(0, 500);
      const mail = await getMailSettings(strapi);
      const recipients = notifyEmailsFor('training', mail);

      const entry = await strapi.documents('api::training-submission.training-submission').create({
        data: {
          name,
          firstName,
          lastName,
          email,
          phone,
          company,
          participantsCount,
          topic,
          program,
          position,
          groupDate,
          preferredDate,
          location,
          objectAddress,
          daysCount,
          question,
          newsConsent,
          pageUrl,
          notifyEmails: recipients.join(', '),
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
          deviceType: meta.deviceType,
          submittedAt: meta.submittedAt,
          ...attribution,
        } as any,
      });

      const notion = await syncWebsiteEventOrQueue(strapi, {
        action: 'training',
        code: program || 'MOKYMAI',
        title: topic || program || 'Mokymų registracija',
        name,
        firstName,
        lastName,
        email,
        company,
        phone,
        role: position,
        position,
        program,
        groupDate,
        preferredDate,
        location,
        participantsCount,
        objectAddress,
        daysCount,
        question,
        projectName: topic || program,
        pageUrl,
        consent: newsConsent,
        personId: asText(body.kontaktoId || body.personId),
        summary: [
          program && `Programa: ${program}`,
          groupDate && `Grupė: ${groupDate}`,
          preferredDate && `Pageidaujama data: ${preferredDate}`,
          location && `Vieta: ${location}`,
          participantsCount && `Dalyvių skaičius: ${participantsCount}`,
          objectAddress && `Objektas: ${objectAddress}`,
          daysCount && `Dienų sk.: ${daysCount}`,
          question,
        ]
          .filter(Boolean)
          .join('. '),
        ...attribution,
      });

      try {
        await sendFormNotification(strapi, {
          kind: 'training',
          replyTo: email,
          recipients,
          fromName: mail.fromName,
          fromEmail: mail.fromEmail,
          meta,
          fields: [
            { label: 'Vardas', value: name },
            { label: 'El. paštas', value: email },
            { label: 'Telefonas', value: phone },
            { label: 'Įmonė', value: company },
            { label: 'Pareigos', value: position },
            { label: 'Programa', value: program || topic },
            { label: 'Grupė / data', value: groupDate || preferredDate },
            { label: 'Vieta', value: location },
            { label: 'Dalyvių skaičius', value: participantsCount },
            { label: 'Objektas', value: objectAddress },
            { label: 'Dienų sk.', value: daysCount },
            { label: 'Klausimas', value: question },
          ],
        });
      } catch (error) {
        strapi.log.error(`Training form email failed: ${error}`);
      }

      if (process.env.SMTP_HOST) {
        try {
          await sendFormNotification(strapi, {
            kind: 'training',
            recipients: [email],
            fromName: mail.fromName,
            fromEmail: mail.fromEmail,
            meta,
            fields: [
              { label: 'Registracija', value: topic || program || 'Filigran akademija' },
              { label: 'Vardas', value: name },
              {
                label: 'Patvirtinimas',
                value: 'Registracija gauta. Helstomm patvirtins datą ir atsiųs programą.',
              },
            ],
          });
        } catch {
          /* participant copy is optional */
        }
      }

      const kontaktoId = (notion && 'personId' in notion && notion.personId) || '';
      ctx.body = {
        ok: true,
        kontaktoId,
        data: {
          id: entry.documentId || entry.id,
          kontaktoId,
        },
      };
    },
  })
);
