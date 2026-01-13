import qs from 'qs';
export const STRAPI_BASE_URL = import.meta.env.STRAPI_BASE_URL || 'http://localhost:1337';

// http://localhost:1337/api/home-page?populate[hero][on][layout.hero-section][populate][image][fields][0]=url
//&populate[hero][on][layout.hero-section][populate][link][populate]

const QUERY_HOME_PAGE = {
    populate: {
        sections: {
            on: {
                'layout.hero-section': {
                    populate: {
                        image: {
                            fields: ['url', 'alternativeText'],
                        },
                        link: {
                            populate: true
                        },
                    },
                },
            }
        },
    },
}

// const QUERY_GLOBAL = {
//     populate: {
//         favicon: {
//             fields: ['url', 'alternativeText']
//         },
//         defaultSeo: {
//             populate: true
//         },
//         header: {
//             on: {
//                 'layout.header': {
//                     populate: {
//                         logo: {
//                             populate: true
//                         },
//                         navItems: {
//                             populate: true
//                         },
//                         cta: {
//                             populate: true
//                         },
//                     },
//                 }
//             }
//         }
//     },
// }

const QUERY_GLOBAL = {
    populate: {
        favicon: {
            fields: ['url', 'alternativeText']
        },
        defaultSeo: {
            populate: true
        },
        header: {
            populate: {
                logo: {
                    populate: {
                        image: {
                            fields: ['url', 'alternativeText']
                        },
                    }
                },
                navItems: true,
                cta: true
            },
        },
        footer: {
            populate: {
                logo: {
                    populate: {
                        image: {
                            fields: ['url', 'alternativeText']
                        },
                    }
                },
                navItems: true,
                socialLinks: {
                    populate: {
                        image: {
                            fields: ['url', 'alternativeText']
                        },
                    }
                },
                infoLinks: {
                    populate: {
                        image: {
                            fields: ['url', 'alternativeText']
                        },
                    }
                }
            }
        }
    },
}

export const getGlobal = async () => {
    const query = qs.stringify(QUERY_GLOBAL);
    const res = await getStrapiData(`api/global?${query}`);
    return res?.data;
};

export const getHomePage = async () => {
    const query = qs.stringify(QUERY_HOME_PAGE);
    const res = await getStrapiData(`api/home-page?${query}`);
    return res?.data;
};

export const getStrapiData = async (url: string) => {
    const res = await fetch(`${STRAPI_BASE_URL}/${url}`);
    return res.json();
};