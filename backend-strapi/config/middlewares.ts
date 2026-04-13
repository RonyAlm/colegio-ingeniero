import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://res.cloudinary.com',
            'https://market-assets.strapi.io/',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://res.cloudinary.com',
            'https://market-assets.strapi.io/',
          ],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
