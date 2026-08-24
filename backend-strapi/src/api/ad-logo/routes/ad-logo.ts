/**
 * ad-logo router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::ad-logo.ad-logo', {
  config: {
    find: {
      auth: false,
      middlewares: ['api::ad-logo.ad-logo-populate'],
    },
  },
});
