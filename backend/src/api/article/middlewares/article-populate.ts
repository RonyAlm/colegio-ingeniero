/**
 * `article-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  sort: ["createdAt:desc"],
  populate: {
    category: true,
    author: true,
    cover: {
      fields: ["alternativeText", "url"],
    },
    featured: {
      populate: {
        articles: {
          populate: {
            cover: {
              fields: ["alternativeText", "url"],
            }
          }
        },
      }
    },
    blocks: {
      on: {
        "shared.rich-text": true,
        "shared.media": {
          populate: {
            file: {
              fields: ["alternativeText", "url", "ext"],
            }
          }
        },
        "shared.gallery": {
          populate: {
            image: {
              fields: ["alternativeText", "url"],

            }
          }
        },
        "shared.slider": true,
      }
    }
  },
  status: 'published',
}



export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In article-populate middleware.");
    ctx.query = populate;
    // console.dir(ctx.query, { depth: null });
    await next();
  };
};
