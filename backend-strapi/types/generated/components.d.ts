import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAdOverlay extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ad_overlays';
  info: {
    displayName: 'Ad Overlay';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFeaturedArticles extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_articles';
  info: {
    displayName: 'Featured Articles';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeaturedAuthorities extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_authorities';
  info: {
    displayName: 'Featured Authorities';
  };
  attributes: {
    authorities: Schema.Attribute.Relation<
      'oneToMany',
      'api::authority.authority'
    >;
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeaturedContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_contents';
  info: {
    displayName: 'Featured Content';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.item-content', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeaturedCourses extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_courses';
  info: {
    displayName: 'Featured Courses';
  };
  attributes: {
    courses: Schema.Attribute.Relation<'oneToMany', 'api::course.course'>;
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeaturedDocuments extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_documents';
  info: {
    displayName: 'Featured Documents';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.Text;
    docs: Schema.Attribute.Relation<'oneToMany', 'api::doc.doc'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFooter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    contactLinks: Schema.Attribute.Component<'shared.link', true>;
    infoLinks: Schema.Attribute.Component<'shared.link', true>;
    logoImage: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
    socialLinks: Schema.Attribute.Component<'shared.link', true>;
    text: Schema.Attribute.Text;
  };
}

export interface BlocksHeader extends Struct.ComponentSchema {
  collectionName: 'components_blocks_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    logoImage: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
    navItems: Schema.Attribute.Component<'shared.item', true>;
  };
}

export interface BlocksInstructionalVideos extends Struct.ComponentSchema {
  collectionName: 'components_blocks_instructional_videos';
  info: {
    displayName: ' Instructional Videos';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videos: Schema.Attribute.Component<'shared.youtube', true>;
  };
}

export interface BlocksLegalDocuments extends Struct.ComponentSchema {
  collectionName: 'components_blocks_legal_documents';
  info: {
    displayName: 'Legal Documents';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.Text;
    docs: Schema.Attribute.Relation<'oneToMany', 'api::doc.doc'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_blocks_section_headings';
  info: {
    displayName: 'Section Heading';
  };
  attributes: {
    description: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'shared.link', false>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sliders';
  info: {
    displayName: 'Slider';
  };
  attributes: {
    Slide: Schema.Attribute.Component<'shared.hero', true>;
  };
}

export interface SharedContent extends Struct.ComponentSchema {
  collectionName: 'components_shared_contents';
  info: {
    displayName: 'Content';
  };
  attributes: {
    markdown: Schema.Attribute.RichText;
  };
}

export interface SharedGallery extends Struct.ComponentSchema {
  collectionName: 'components_shared_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 1;
        },
        number
      >;
    images: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    overlay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.RichText;
  };
}

export interface SharedItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_items';
  info: {
    displayName: 'Item';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    isSubmenu: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    submenu: Schema.Attribute.Component<'shared.sub-item', true>;
  };
}

export interface SharedItemContent extends Struct.ComponentSchema {
  collectionName: 'components_shared_item_contents';
  info: {
    displayName: 'ItemContent';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images' | 'videos', true>;
    cta: Schema.Attribute.Component<'shared.link', true>;
    heading: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    type: Schema.Attribute.Enumeration<
      [
        'blog',
        'curso',
        'documento',
        'expo',
        'evento',
        'actividad',
        'efem\u00E9ride',
      ]
    >;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Enumeration<
      [
        'map',
        'hours',
        'phone',
        'email',
        'instagram',
        'facebook',
        'youtube',
        'whatsapp',
      ]
    >;
    isButton: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'accent', 'ghost', 'link', 'danger']
    >;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSubItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_sub_items';
  info: {
    displayName: 'SubItem';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface SharedYoutube extends Struct.ComponentSchema {
  collectionName: 'components_shared_youtubes';
  info: {
    displayName: 'Youtube';
  };
  attributes: {
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
    videoId: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.ad-overlay': BlocksAdOverlay;
      'blocks.featured-articles': BlocksFeaturedArticles;
      'blocks.featured-authorities': BlocksFeaturedAuthorities;
      'blocks.featured-content': BlocksFeaturedContent;
      'blocks.featured-courses': BlocksFeaturedCourses;
      'blocks.featured-documents': BlocksFeaturedDocuments;
      'blocks.footer': BlocksFooter;
      'blocks.header': BlocksHeader;
      'blocks.instructional-videos': BlocksInstructionalVideos;
      'blocks.legal-documents': BlocksLegalDocuments;
      'blocks.section-heading': BlocksSectionHeading;
      'blocks.slider': BlocksSlider;
      'shared.content': SharedContent;
      'shared.gallery': SharedGallery;
      'shared.hero': SharedHero;
      'shared.item': SharedItem;
      'shared.item-content': SharedItemContent;
      'shared.link': SharedLink;
      'shared.seo': SharedSeo;
      'shared.sub-item': SharedSubItem;
      'shared.youtube': SharedYoutube;
    }
  }
}
