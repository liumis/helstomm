import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';

export type FormKind = 'contact' | 'analysis' | 'training' | 'calculator' | 'document';

export type FormSource = {
  kind: FormKind;
  uid: string;
  label: string;
  href: string;
};

export type FormRow = {
  id: string;
  kind: FormKind;
  label: string;
  href: string;
  name: string;
  email: string;
  detail: string;
  submittedAt: string;
};

export type FormBucket = FormSource & {
  total: number;
  rows: FormRow[];
};

export type FormInbox = {
  buckets: FormBucket[];
  recent: FormRow[];
  total: number;
};

export const FORM_SOURCES: FormSource[] = [
  {
    kind: 'contact',
    uid: 'api::contact-submission.contact-submission',
    label: 'Kontaktų užklausos',
    href: '/content-manager/collection-types/api::contact-submission.contact-submission',
  },
  {
    kind: 'analysis',
    uid: 'api::analysis-submission.analysis-submission',
    label: 'Analizės užklausos',
    href: '/content-manager/collection-types/api::analysis-submission.analysis-submission',
  },
  {
    kind: 'training',
    uid: 'api::training-submission.training-submission',
    label: 'Mokymų registracijos',
    href: '/content-manager/collection-types/api::training-submission.training-submission',
  },
  {
    kind: 'calculator',
    uid: 'api::calculator-submission.calculator-submission',
    label: 'Skaičiuoklių pateikimai',
    href: '/content-manager/collection-types/api::calculator-submission.calculator-submission',
  },
  {
    kind: 'document',
    uid: 'api::document-activity.document-activity',
    label: 'Dokumentų veiksmai',
    href: '/content-manager/collection-types/api::document-activity.document-activity',
  },
];

type CollectionResponse = {
  results?: Array<Record<string, unknown>>;
  pagination?: { total?: number };
};

function asString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function calculatorDetail(row: Record<string, unknown>) {
  const kindLabel =
    row.kind === 'ask'
      ? 'Klausimas'
      : row.kind === 'notify'
        ? 'Pranešimas'
        : row.kind === 'download'
          ? 'PDF'
          : 'Skaičiavimas';
  const code = asString(row.code);
  const title = asString(row.title) || asString(row.projectName);
  return [kindLabel, code, title].filter(Boolean).join(' · ');
}

function mapRow(source: FormSource, row: Record<string, unknown>): FormRow {
  const documentId = asString(row.documentId) || String(row.id ?? '');
  const detail =
    source.kind === 'calculator'
      ? calculatorDetail(row)
      : source.kind === 'document'
        ? [asString(row.action), asString(row.code) || asString(row.title), asString(row.company)]
            .filter(Boolean)
            .join(' · ')
        : asString(row.topic) || asString(row.company) || asString(row.details);

  return {
    id: `${source.kind}-${documentId}`,
    kind: source.kind,
    label: source.label,
    href: documentId ? `${source.href}/${documentId}` : source.href,
    name: asString(row.name) || '—',
    email: asString(row.email),
    detail,
    submittedAt: asString(row.submittedAt) || asString(row.createdAt),
  };
}

export function useFormInbox(pageSize = 8) {
  const { get } = useFetchClient();
  const [inbox, setInbox] = useState<FormInbox | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const responses = await Promise.all(
          FORM_SOURCES.map(async (source) => {
            const { data } = await get<CollectionResponse>(
              `/content-manager/collection-types/${source.uid}`,
              {
                params: {
                  page: 1,
                  pageSize,
                  sort: 'submittedAt:DESC',
                },
              }
            );

            const rows = (data.results || []).map((row) => mapRow(source, row));
            const bucket: FormBucket = {
              ...source,
              total: data.pagination?.total ?? rows.length,
              rows,
            };
            return bucket;
          })
        );

        if (cancelled) return;

        const recent = responses
          .flatMap((bucket) => bucket.rows)
          .sort((a, b) => Date.parse(b.submittedAt || '') - Date.parse(a.submittedAt || ''))
          .slice(0, pageSize);

        setInbox({
          buckets: responses,
          recent,
          total: responses.reduce((sum, bucket) => sum + bucket.total, 0),
        });
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [pageSize]);

  return { inbox, loading, error };
}

export function formatSubmittedAt(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('lt-LT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
