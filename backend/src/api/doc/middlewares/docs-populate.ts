/**
 * `docs-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  sort: ["title:desc" ],
  populate: {
    categories: true,
  },
  status: 'published',
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In docs-populate middleware.');
    ctx.query = populate;
    console.dir(ctx.query, { depth: null });
    await next();
  };
};
