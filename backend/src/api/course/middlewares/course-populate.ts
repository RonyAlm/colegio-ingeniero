/**
 * `course-populate` middleware
 */

import type { Core } from '@strapi/strapi';
import { link } from 'fs';

const populate = {
  sort: ['title:desc'],
  populate: {
    cover: {
      fields: ['alternativeText', 'url', 'ext'],
    },
    links: true,
    blocks: {
      on: {
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
