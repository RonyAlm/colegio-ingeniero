/**
 * `global-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  populate: {
    favicon: {
      fields: ['url', 'alternativeText']
    },
    defaultSeo: {
      populate: true
    },
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ['url', 'alternativeText']
            },
          }
        },
        navItems: true,
        cta: true
      },
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ['url', 'alternativeText']
            },
          }
        },
        navItems: true,
        socialLinks: {
          populate: {
            image: {
              fields: ['url', 'alternativeText']
            },
          }
        },
        infoLinks: {
          populate: {
            image: {
              fields: ['url', 'alternativeText']
            },
          }
        },
        contactLinks: {
          populate: {
            image: {
              fields: ['url', 'alternativeText']
            },
          }
        },
      }
    }
  }
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.dir(ctx.query, { depth: null });
    // ctx.query = { ...ctx.query, populate };
    ctx.query = populate;
    strapi.log.info('In global-populate middleware.');

    await next();
  };
};
