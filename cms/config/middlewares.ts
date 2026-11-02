import type { Core } from '@strapi/strapi';

const LOCAL_ORIGINS = [
  'http://localhost:8004',
  'http://127.0.0.1:8004',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function extraOrigins(value?: string) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [...LOCAL_ORIGINS, ...extraOrigins(env('FRONTEND_URLS'))],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
