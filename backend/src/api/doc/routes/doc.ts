/**
 * doc router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::doc.doc', {
  config: {
    find: {
      middlewares: ['api::doc.docs-populate'],
    },
    findOne: {
      middlewares: ['api::doc.docs-populate'],
    },
  },
});
