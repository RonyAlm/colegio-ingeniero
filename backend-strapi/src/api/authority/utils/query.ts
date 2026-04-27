type Filters = {
  area?: {
    slug?: {
      $eq?: string;
      $in?: string[];
    };
  };
};

type Populate = {
  image: {
    fields: ('alternativeText' | 'url' | 'ext')[];
  };
  area: true;
};

export interface AuthorityQuery {
  sort: string[];
  populate: Populate;
  status: 'published';
  filters?: Filters;
}

export const getAuthorityQuery = (slug?: string): AuthorityQuery => {
  const query: AuthorityQuery = {
    sort: ['createdAt:desc'] as const,
    populate: {
      image: {
        fields: ['alternativeText', 'url', 'ext'] as const,
      },
      area: true,
    },
    status: 'published' as const,
  };

  if (slug) {
    query.filters = {
      area: {
        slug: {
          $eq: slug,
        },
      },
    };
  }

  return query;
};