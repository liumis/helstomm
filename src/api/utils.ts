import type { FilterOption } from '../types';

export function mapFilters(rows?: { slug?: string; label?: string }[] | null): FilterOption[] {
  return (rows || [])
    .filter((item): item is { slug: string; label: string } => Boolean(item.slug && item.label))
    .map((item) => ({ slug: item.slug, label: item.label }));
}

export function pick(value: string | null | undefined, fallback: string) {
  return value || fallback;
}
