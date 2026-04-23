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
        logoImage: {
          fields: ['url', 'alternativeText']
        },
        navItems: {
          populate: {
            submenu: true
          }
        },
        cta: true
      },
    },
    footer: {
      populate: {
        logoImage: {
          fields: ['url', 'alternativeText']
        },
        socialLinks: true,
        infoLinks: true,
        contactLinks: true
      }
    }
  }
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In global-populate middleware.');
    ctx.query = populate;
    await next();
  };
};
