/**
 * `event-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  sort: ["createdAt:desc" ],
  populate: {
    category_events: true,
    cover: {
      fields: ["alternativeText", "url", "ext"],
    },
    blocks: {
      on: {
        "shared.gallery": {
          populate: {
            images: {
              fields: ["alternativeText", "url", "ext", "width", "height"],
            }
          }
        },
        "shared.youtube": true,
        "shared.content": true,
        "shared.link": true
      }
    }
  },
  status: 'published',
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In event-populate middleware.');
    ctx.query = populate;
    await next();
  };
};
