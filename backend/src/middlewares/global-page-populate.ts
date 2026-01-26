/**
 * `global-page-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  blocks: {
    on: {
      "blocks.hero-slider": {
        populate: {
          HeroSlider: {
            populate: {
              cta: true,
              image: {
                fields: ["alternativeText", "url"],
              },
            }
          }
        }
      },
      "blocks.featured-articles": {
        populate: {
          articles: {
            populate: {
              cover: {
                fields: ["alternativeText", "url"],
              },
            }
          }
        }
      },
      "blocks.section-heading": true,
      "blocks.hero": true,
      "blocks.persona-card": true,
      "blocks.newsletter": true,
      "blocks.markdown": true,
      "blocks.faqs": true,
      "blocks.contenido-con-imagen": true,
      "blocks.card-grid": true
    },
  }
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.dir(ctx.query, { depth: null });
    strapi.log.info("In global-page-populate middleware.");
    ctx.query.populate = populate;

    await next();
  };
};
