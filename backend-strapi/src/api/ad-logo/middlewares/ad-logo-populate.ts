/**
 * Populate the public ally-logo listing and keep drafts private.
 */

import type { Core } from '@strapi/strapi';

const populate = {
  logo: {
    fields: ['alternativeText', 'url', 'width', 'height'],
  },
};

export default (_config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info('In ad-logo-populate middleware.');
    ctx.query = {
      ...ctx.query,
      populate,
      status: 'published',
    };
    await next();
  };
};
