/**
 * `authority-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
    sort: ['createdAt:desc'],
    populate: {
      image: {
        fields: ['alternativeText', 'url', 'ext'],
      },
      area: true
    }
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In authority-populate middleware.');
    ctx.query = populate;
    await next();
  };
};
