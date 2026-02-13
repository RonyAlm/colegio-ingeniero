import { get } from "node:http";
import type { THeader, TFooter, TImagen } from "../types";

export const STRAPI_BASE_URL =
  import.meta.env.STRAPI_BASE_URL || "http://localhost:1337";

interface StrapiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: {
    status: number;
    name: string;
    message: string;
    details: Record<string, string[]>;
  };
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface GlobalData {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  createdAt: string;
  publishedAt: string;
  favicon: TImagen;
  header: THeader;
  footer: TFooter;
  defaultSeo: {
    title: string;
    description: string;
  };
}

export const getGlobal = async (): Promise<StrapiResponse<GlobalData>> => {
  const data = await getStrapiData(`api/global`);
  return data;
};

export const getHomePage = async () => {
  const res = await getStrapiData(`api/home-page`);
  return res?.data;
};

export const getStrapiData = async (url: string) => {
  const res = await fetch(`${STRAPI_BASE_URL}/${url}`);
  if (!res.ok) throw new Error("Error al obtener los datos");
  return res.json();
};

// Obtiene una página de artículos (para carga inicial en /novedades)
export const getPostsPage = async (page: number = 1, pageSize: number = 12) => {
  const res = await fetch(
    `${STRAPI_BASE_URL}/api/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
  if (!res.ok) throw new Error("Error al obtener los datos");
  const result = await res.json();
  return { data: result.data, pagination: result.meta.pagination };
};

// Obtiene todos los artículos paginando automáticamente (Strapi devuelve max 25 por defecto)
export const getAllPosts = async () => {
  let allData: any[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/articles?pagination[page]=${page}&pagination[pageSize]=100`
    );
    if (!res.ok) throw new Error("Error al obtener los datos");
    const result = await res.json();
    allData = allData.concat(result.data);
    pageCount = result.meta.pagination.pageCount;
    page++;
  } while (page <= pageCount);

  return allData;
}

// Obtiene todos los slugs de artículos paginando (para getStaticPaths)
export const getAllPostsSlugs = async () => {
  let allSlugs: string[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/articles?fields[0]=slug&pagination[page]=${page}&pagination[pageSize]=100`
    );
    if (!res.ok) throw new Error("Error al obtener los datos");
    const result = await res.json();
    allSlugs = allSlugs.concat(result.data.map((post: any) => post.slug));
    pageCount = result.meta.pagination.pageCount;
    page++;
  } while (page <= pageCount);

  return allSlugs;
}

// Obtiene un artículo filtrando por slug directamente en la API de Strapi
export const getPostInfo = async (slug: string) => {
  const res = await fetch(
    `${STRAPI_BASE_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  if (!res.ok) throw new Error("Error al obtener los datos");
  const result = await res.json();
  if (!result.data || result.data.length === 0) return null;
  return result.data[0];
};

// Obtiene todos los slugs de resoluciones paginando (para getStaticPaths)
export const getAllResolutionsSlugs = async () => {
  let allSlugs: string[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/resolutions?fields[0]=slug&pagination[page]=${page}&pagination[pageSize]=100`
    );
    if (!res.ok) throw new Error("Error al obtener los datos");
    const result = await res.json();
    allSlugs = allSlugs.concat(result.data.map((resolution: any) => resolution.slug));
    pageCount = result.meta.pagination.pageCount;
    page++;
  } while (page <= pageCount);

  return allSlugs;
}

// Obtiene una resolución filtrando por slug directamente en la API de Strapi
export const getResolutionInfo = async (slug: string) => {
  const res = await fetch(
    `${STRAPI_BASE_URL}/api/resolutions?filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  if (!res.ok) throw new Error("Error al obtener los datos");
  const result = await res.json();
  if (!result.data || result.data.length === 0) return null;
  return result.data[0];
};
