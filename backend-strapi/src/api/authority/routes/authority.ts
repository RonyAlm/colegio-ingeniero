/**
 * authority router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::authority.authority',
  {
    config: {
      find: {
        middlewares: ['api::authority.authority-populate'],
      },
      findOne: {
        middlewares: ['api::authority.authority-populate'],
      },
    },
  });
