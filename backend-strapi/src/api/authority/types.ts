export interface Image {
  url: string;
  alternativeText?: string | null;
  ext?: string;
}

export interface Area {
  id: number;
  name: string;
  description?: string | null;
  slug: string;
  icon?: string;
}

export interface Authority {
  id: number;
  name: string;
  profession?: string;
  role?: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  image?: Image;
  area?: Area;
}

export interface GroupedAuthority {
  areaId: number;
  areaName: string;
  areaSlug: string;
  areaDescription?: string;
  areaIcon?: string;
  authorities: Authority[];
}