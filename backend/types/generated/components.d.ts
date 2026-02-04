import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAutoridades extends Struct.ComponentSchema {
  collectionName: 'components_blocks_autoridades';
  info: {
    displayName: 'Autoridades';
  };
  attributes: {
    autoridadesComponent: Schema.Attribute.Component<'shared.autoridad', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_card_grids';
  info: {
    displayName: 'Card Grid';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.card', true>;
  };
}

export interface BlocksContenidoConImagen extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contenido_con_imagens';
  info: {
    displayName: 'Contenido Con Imagen';
  };
  attributes: {
    contenido: Schema.Attribute.RichText;
    encabezado: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'component.link', false>;
    reverso: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface BlocksFaqs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'Faqs';
  };
  attributes: {
    faq: Schema.Attribute.Component<'shared.card', true>;
  };
}

export interface BlocksFeaturedArticles extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_articles';
  info: {
    displayName: 'Featured Articles';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    cta: Schema.Attribute.Component<'component.link', false>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.RichText;
  };
}

export interface BlocksHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sliders';
  info: {
    displayName: 'HeroSlider';
  };
  attributes: {
    HeroSlider: Schema.Attribute.Component<'blocks.hero', true>;
  };
}

export interface BlocksMarkdown extends Struct.ComponentSchema {
  collectionName: 'components_blocks_markdowns';
  info: {
    displayName: 'Markdown';
  };
  attributes: {
    contenido: Schema.Attribute.RichText;
  };
}

export interface BlocksNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_newsletters';
  info: {
    displayName: 'Newsletter';
  };
  attributes: {
    encabezado: Schema.Attribute.String;
    formId: Schema.Attribute.String;
    label: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface BlocksPersonaCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_persona_cards';
  info: {
    displayName: 'Persona Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    personaJob: Schema.Attribute.String;
    personaName: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface BlocksResoluciones extends Struct.ComponentSchema {
  collectionName: 'components_blocks_resoluciones';
  info: {
    displayName: 'Resoluciones';
  };
  attributes: {
    description: Schema.Attribute.Text;
    resolucionComponent: Schema.Attribute.Component<'shared.resolucion', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_blocks_section_headings';
  info: {
    displayName: 'Section Heading';
  };
  attributes: {
    encabezado: Schema.Attribute.String;
    enlaceLink: Schema.Attribute.String;
    subtitulo: Schema.Attribute.String;
  };
}

export interface ComponentLink extends Struct.ComponentSchema {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    isButtonLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
  };
}

export interface ComponentLogoLink extends Struct.ComponentSchema {
  collectionName: 'components_component_logo_links';
  info: {
    displayName: 'Logo Link';
    icon: 'alien';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface ComponentMenu extends Struct.ComponentSchema {
  collectionName: 'components_component_menus';
  info: {
    displayName: 'Menu';
    icon: 'bulletList';
  };
  attributes: {
    button: Schema.Attribute.Component<'component.link', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
          min: 1;
        },
        number
      >;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    navLink: Schema.Attribute.Component<'component.link', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 3;
        },
        number
      >;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    icon: 'chartBubble';
  };
  attributes: {
    contactLinks: Schema.Attribute.Component<'component.logo-link', true>;
    infoLinks: Schema.Attribute.Component<'component.logo-link', true>;
    logo: Schema.Attribute.Component<'component.logo-link', false>;
    navItems: Schema.Attribute.Component<'component.link', true>;
    socialLinks: Schema.Attribute.Component<'component.logo-link', true>;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
    icon: 'bulletList';
  };
  attributes: {
    cta: Schema.Attribute.Component<'component.link', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    logo: Schema.Attribute.Component<'component.logo-link', false>;
    navItems: Schema.Attribute.Component<'component.link', true> &
      Schema.Attribute.SetMinMax<
        {
          min: 2;
        },
        number
      >;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
    icon: 'chartBubble';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'component.link', false>;
    subHeading: Schema.Attribute.Text;
  };
}

export interface SharedAutoridad extends Struct.ComponentSchema {
  collectionName: 'components_shared_autoridads';
  info: {
    displayName: 'Autoridad';
  };
  attributes: {
    cargo: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    profesion: Schema.Attribute.Text;
  };
}

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    heading: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface SharedGallery extends Struct.ComponentSchema {
  collectionName: 'components_shared_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'apps';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    image: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedResolucion extends Struct.ComponentSchema {
  collectionName: 'components_shared_resolucions';
  info: {
    displayName: 'resolucion';
  };
  attributes: {
    document: Schema.Attribute.Component<'shared.media', false>;
    download: Schema.Attribute.Component<'component.link', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedYoutube extends Struct.ComponentSchema {
  collectionName: 'components_shared_youtubes';
  info: {
    displayName: 'Youtube';
  };
  attributes: {
    link: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    videoId: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.autoridades': BlocksAutoridades;
      'blocks.card-grid': BlocksCardGrid;
      'blocks.contenido-con-imagen': BlocksContenidoConImagen;
      'blocks.faqs': BlocksFaqs;
      'blocks.featured-articles': BlocksFeaturedArticles;
      'blocks.hero': BlocksHero;
      'blocks.hero-slider': BlocksHeroSlider;
      'blocks.markdown': BlocksMarkdown;
      'blocks.newsletter': BlocksNewsletter;
      'blocks.persona-card': BlocksPersonaCard;
      'blocks.resoluciones': BlocksResoluciones;
      'blocks.section-heading': BlocksSectionHeading;
      'component.link': ComponentLink;
      'component.logo-link': ComponentLogoLink;
      'component.menu': ComponentMenu;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.hero-section': LayoutHeroSection;
      'shared.autoridad': SharedAutoridad;
      'shared.card': SharedCard;
      'shared.gallery': SharedGallery;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.resolucion': SharedResolucion;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.youtube': SharedYoutube;
    }
  }
}
