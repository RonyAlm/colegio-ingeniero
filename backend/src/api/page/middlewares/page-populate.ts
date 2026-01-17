/**
 * `page-populate` middleware
 */

import type { Core } from '@strapi/strapi';
//aca ingresar los parametros de consulta de la url
const populate={

}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {

    ctx.query.populate= populate;//hace que sea seguro no ingresar desde la ruta de la url
    strapi.log.info('In page-populate middleware.');

    await next();
  };
};
