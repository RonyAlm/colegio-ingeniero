/**
 * ad-logo controller
 */

import { factories } from '@strapi/strapi';

const categoryOrder = new Map([
  ['platinum', 0],
  ['oro', 1],
  ['plata', 2],
  ['bronce', 3],
]);

export default factories.createCoreController('api::ad-logo.ad-logo', () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    const sortedAllies = Array.isArray(data)
      ? [...data].sort((a: any, b: any) => {
          const categoryDifference =
            (categoryOrder.get(a.categoria) ?? categoryOrder.size) -
            (categoryOrder.get(b.categoria) ?? categoryOrder.size);

          return categoryDifference || (a.nombre ?? '').localeCompare(b.nombre ?? '', 'es');
        })
      : data;

    const publicAllies = Array.isArray(sortedAllies)
      ? sortedAllies.map(({ categoria: _categoria, ...ally }: any) => ally)
      : sortedAllies;

    return { data: publicAllies, meta };
  },
}));
