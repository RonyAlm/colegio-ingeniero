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
      "blocks.slider": {
        populate: {
          Slide: {
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
              category_articles: true,
            }
          }
        }
      },
      "blocks.featured-courses": {
        populate: {
          courses: {
            populate: {
              cover: {
                fields: ["alternativeText", "url"],
              },
            }
          },
          cta: true,
        }
      },
      "blocks.section-heading": true,
      "blocks.ad-overlay": {
        populate: {
          images: {
            fields: ["alternativeText", "url"],
          },
          cta: true
        }
      },
      "blocks.featured-authorities": {
        populate: {
          authorities: {
            populate: {
              image: {
                fields: ["alternativeText", "url"],
              },
              contactLinks: true,
              area: true,
            },
          },
          cta: true,
          
        }
      },
      "blocks.legal-documents": {
        populate: {
          docs: {
            populate: {
              category_docs: true,
            }
          },
          cta: true
        }
      },
      "blocks.featured-documents": {
        populate: {
          docs: {
            populate: {
              category_docs: true,
            }
          },
          cta: true
        }
      },
      "blocks.instructional-videos": {
        populate: {
          videos: true,
          cta: true
        }
      },
      "shared.youtube": true,
      "shared.gallery": {
        populate: {
          images: {
            fields: ["alternativeText", "url", "ext", "width", "height"],
          }
        }
      },
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
