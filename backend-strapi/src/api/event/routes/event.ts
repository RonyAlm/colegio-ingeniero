/**
 * event router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::event.event', {
  config: {
    find: {
      middlewares: ['api::event.event-populate'],
    },
    findOne: {
      middlewares: ['api::event.event-populate'],
    },
  },
});
