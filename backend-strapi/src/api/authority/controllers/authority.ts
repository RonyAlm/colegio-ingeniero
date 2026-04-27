/**
 * authority controller
 */

import { factories } from '@strapi/strapi';
import { getAuthorityQuery } from '../utils/query';
import { Authority, GroupedAuthority } from '../types';

export default factories.createCoreController('api::authority.authority',
  ({ strapi }) => ({
    async grouped(ctx) {
      const { slug } = ctx.query;

      const entities = await strapi.entityService.findMany(
        'api::authority.authority',
        getAuthorityQuery(slug as string) as any
      ) as any;

      const groupedMap: Record<string, GroupedAuthority> = {};

      for (const item of entities) {
        const area = item.area;
        if (!area) continue;

        const key = area.slug;

        if (!groupedMap[key]) {
          groupedMap[key] = {
            areaId: area.id,
            areaName: area.name,
            areaSlug: area.slug,
            areaDescription: area.description,
            areaIcon: area.icon,
            authorities: [],
          };
        }

        groupedMap[key].authorities.push(item);
      }

      return {
        data: Object.values(groupedMap),
      };
    },
  })
);
