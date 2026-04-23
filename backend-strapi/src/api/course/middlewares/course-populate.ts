/**
 * `course-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  sort: ['startDate:desc'],
  populate: {
    cover: {
      fields: ['alternativeText', 'url', 'ext'],
    },
    links: true,
    blocks: {
      on: {
        "shared.gallery": {
          populate: {
            images: {
              fields: ["alternativeText", "url", "ext", "width", "height"],
            }
          }
        },
        "blocks.featured-courses": {
          populate: {
            courses: {
              populate: {
                cover: {
                  fields: ["alternativeText", "url", "ext"],
                }
              }
            }
          }
        },
        "shared.youtube": true
      }
    }
  },
  status: 'published',
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In course-populate middleware.');
    ctx.query = populate;
    await next();
  };
};
