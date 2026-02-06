/**
 * resolution router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::resolution.resolution', {
  config: {
    find: {
      middlewares: ['api::resolution.resolution'],
    },
  },
});
