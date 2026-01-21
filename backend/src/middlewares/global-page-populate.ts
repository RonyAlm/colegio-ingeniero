/**
 * `global-page-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  blocks: {
    on: {
      "blocks.hero": {
        populate: {
          links: true,
          image: {
            fields: ["alternativeText", "url"],
          },
        },
      },
    },
  },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In global-page-populate middleware.");
    ctx.query.populate = populate;

    await next();
  };
};
