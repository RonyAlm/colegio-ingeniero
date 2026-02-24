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
              fields: ["alternativeText", "url", "ext", "width", "height"],

            }
          }
        },
        "shared.slider": true,
        "shared.youtube": true
      }
    }
  },
  status: 'published',
}



export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In article-populate middleware.");
    // Preservar parámetros de paginación y filtros del request original
    ctx.query = {
      ...populate,
      ...(ctx.query.pagination && { pagination: ctx.query.pagination }),
      ...(ctx.query.filters && { filters: ctx.query.filters }),
      ...(ctx.query.fields && { fields: ctx.query.fields }),
    };
    await next();
  };
};
