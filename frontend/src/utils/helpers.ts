import { STRAPI_BASE_URL } from "../lib/strapi";

export const transformImgUrl = (url: string) => {
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
};
export const findBlock = (pageBlocks: any, block: string) => {
  return pageBlocks.find(
    (blck: any) => blck.__component === `blocks.${block}`,
  ) || null;
}
