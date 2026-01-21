import { STRAPI_BASE_URL } from "../lib/strapi";

export const transformImgUrl = (url: string) => {
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
};

// favicon.url.startsWith("http") ? favicon.url : `${STRAPI_BASE_URL}${favicon.url}`
