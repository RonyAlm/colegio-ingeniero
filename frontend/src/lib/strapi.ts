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

export const getAllPosts = async () => {
  const res = await fetch(`${STRAPI_BASE_URL}/api/articles`);
  if (!res.ok) throw new Error("Error al obtener los datos");
  const result = await res.json();
  return result.data;
}

export const getAllPostsSlugs = async () => {
  const res = await fetch(`${STRAPI_BASE_URL}/api/articles`);
  if (!res.ok) throw new Error("Error al obtener los datos");

  const result = await res.json();
  return result.data.map((post: any) => post.slug);
}

// http://localhost:1337/api/articles?filters[id][$eq]=7
export const getPostInfo = async (slug: string) => {
  const res = await fetch(`${STRAPI_BASE_URL}/api/articles`);
  if (!res.ok) throw new Error("Error al obtener los datos");
  const result = await res.json();
  const post = result.data.find((post: any) => post.slug === slug);
  if(!post) return null
  // console.log("post. ",post);
  return post;
};
