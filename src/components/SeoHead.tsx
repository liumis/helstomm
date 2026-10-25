import { useEffect } from 'react';
import { findSeoPage } from '../api/seo';
import type { SeoPage } from '../types';

type Props = {
  path: string;
  pages: SeoPage[];
  fallback?: Partial<SeoPage>;
};

function upsertMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function absoluteUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`;
}

export function SeoHead({ path, pages, fallback }: Props) {
  useEffect(() => {
    const seo = findSeoPage(pages, path, fallback);
    const canonical = `${window.location.origin}${seo.path === '/' ? '/' : seo.path}`;
    const image = absoluteUrl(seo.ogImageUrl);

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', seo.indexable ? 'index, follow' : 'noindex, nofollow');
    upsertMeta('property', 'og:title', seo.ogTitle || seo.title);
    upsertMeta('property', 'og:description', seo.ogDescription || seo.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'lt_LT');
    upsertMeta('property', 'og:site_name', 'Helstomm Group');
    if (image) upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', seo.ogTitle || seo.title);
    upsertMeta('name', 'twitter:description', seo.ogDescription || seo.description);
    upsertLink('canonical', canonical);
  }, [path, pages, fallback]);

  return null;
}
