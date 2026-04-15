/**
 * course router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::course.course', {
  config: {
    find: {
      middlewares: ['api::course.course-populate'],
    },
    findOne: {
      middlewares: ['api::course.course-populate'],
    },
  },
});
