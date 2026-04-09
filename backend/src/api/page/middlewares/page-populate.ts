/**
 * `page-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  sort: ["createdAt:desc"],
  cover: {
    fields: ["alternativeText", "url", "ext"],
  },
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
              author: true,
              category: true,
            }
          }
        }
      },
      "blocks.resoluciones": {
        populate: {
          docs: true
        }
      },
      "blocks.autoridades": {
        populate: {
          autoridadesComponent: {
            populate: {
              image: {
                fields: ["alternativeText", "url", "name", "caption"],
              },
            },
          },
        }
      },
      "blocks.section-heading": {
        populate: {
          link: true,
        }
      },
      "blocks.hero": true,
      "blocks.persona-card": true,
      "blocks.newsletter": true,
      "blocks.markdown": true,
      "blocks.faqs": true,
      "blocks.contenido-con-imagen": true,
      "blocks.card-grid": true,
      "shared.rich-text": true,
      "shared.youtube": true,
      "shared.docs": {
        populate: {
          document: {
            populate: {
              file: {
                fields: ["alternativeText", "url", "name", "caption"],
              }
            }
          }
        }
      } ,
      "shared.seo": true,
    },
  },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info('In page-populate middleware.');
    ctx.query.populate = populate;
    await next();
  };
};
