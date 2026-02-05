/**
 * `page-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  blocks: {
    on: {
      // === BLOCKS ===
      "blocks.hero": {
        populate: {
          cta: true,
          image: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
        },
      },
      "blocks.hero-slider": {
        populate: {
          HeroSlider: {
            populate: {
              cta: true,
              image: {
                fields: ["alternativeText", "url", "name", "caption"],
              },
            },
          },
        },
      },
      "blocks.section-heading": true,
      "blocks.card-grid": {
        populate: {
          cards: true,
        },
      },
      "blocks.contenido-con-imagen": {
        populate: {
          link: true,
          image: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
        },
      },
      "blocks.markdown": true,
      "blocks.newsletter": true,
      "blocks.persona-card": {
        populate: {
          image: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
        },
      },
      "blocks.faqs": {
        populate: {
          faq: true,
        },
      },
      "blocks.featured-articles": {
        populate: {
          articles: {
            populate: {
              cover: {
                fields: ["alternativeText", "url", "name", "caption"],
              },
              author: true,
              category: true,
            },
          },
        },
      },
      "blocks.resoluciones": {
        populate: {
          resolucionComponent: {
            populate: {
              document: {
                populate: {
                  file: {
                    fields: ["alternativeText", "url", "name", "caption", "ext", "mime"],
                  },
                },
              },
              download: true,
            },
          },
        },
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
        },
      },

      // === SHARED ===
      "shared.youtube": true,
      "shared.slider": {
        populate: {
          files: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
        },
      },
      "shared.seo": {
        populate: {
          shareImage: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
        },
      },
      "shared.rich-text": true,
      "shared.resolucion": {
        populate: {
          document: {
            populate: {
              file: {
                fields: ["alternativeText", "url", "name", "caption", "ext", "mime"],
              },
            },
          },
          download: true,
        },
      },
      "shared.quote": true,
      "shared.media": {
        populate: {
          file: {
            fields: ["alternativeText", "url", "name", "caption", "ext", "mime"],
          },
        },
      },
      "shared.gallery": {
        populate: {
          image: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
        },
      },
      "shared.card": true,

      // === LAYOUT ===
      "layout.hero-section": {
        populate: {
          image: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
          link: true,
        },
      },
      "layout.header": {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["alternativeText", "url", "name", "caption"],
              },
            },
          },
          navItems: true,
          cta: true,
        },
      },
      "layout.footer": {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["alternativeText", "url", "name", "caption"],
              },
            },
          },
          navItems: true,
          infoLinks: {
            populate: {
              image: {
                fields: ["alternativeText", "url", "name", "caption"],
              },
            },
          },
          contactLinks: {
            populate: {
              image: {
                fields: ["alternativeText", "url", "name", "caption"],
              },
            },
          },
          socialLinks: {
            populate: {
              image: {
                fields: ["alternativeText", "url", "name", "caption"],
              },
            },
          },
        },
      },

      // === COMPONENT ===
      "component.menu": {
        populate: {
          logo: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
          navLink: true,
          button: true,
        },
      },
      "component.logo-link": {
        populate: {
          image: {
            fields: ["alternativeText", "url", "name", "caption"],
          },
        },
      },
      "component.link": true,
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
