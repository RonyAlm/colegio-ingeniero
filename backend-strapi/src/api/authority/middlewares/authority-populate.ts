import type { Core } from '@strapi/strapi';
import { getAuthorityQuery, AuthorityQuery } from '../utils/query';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    const { slug, ...restQuery } = ctx.query as {
      slug?: string;
      [key: string]: unknown;
    };

    const baseQuery: AuthorityQuery = getAuthorityQuery(slug);

    ctx.query = {
      ...baseQuery,
      ...restQuery,
    };

    await next();
  };
};