/**
 * `resolution` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  sort: ["createdAt:desc"],
  populate: {
    category: true,
    document: {
      fields: ["alternativeText", "url", "ext"],
    }
  },
  status: 'published',
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In resolution middleware.');
    ctx.query = populate;
    await next();
  };
};
