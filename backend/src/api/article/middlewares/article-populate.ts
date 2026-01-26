/**
 * `article-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  sort: ["publishedAt:desc"],
  populate: {
    category: true,
    author: true,
    cover: {
      fields: ["alternativeText", "url"],
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
        }
      }
    }
  }
}

// const populate = {
//   filters: {
//     id: {
//       $eq: '7',
//     },
//   },
//   populate: {
//     author: true,
//     category: true,
//     blocks: {
//       on: {
//         "shared.rich-text": true,
//         "shared.media": {
//           populate: {
//             file: {
//               fields: ["alternativeText", "url", "ext"],
//             }
//           }
//         },
//         "shared.slider": true,
//       }
//     }
//   },
//   status: 'published',
// }


export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In article-populate middleware.");
    ctx.query = populate;
    await next();
  };
};
