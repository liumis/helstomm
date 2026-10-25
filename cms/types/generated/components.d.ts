import type { Schema, Struct } from '@strapi/strapi';

export interface CarouselDownloadLink extends Struct.ComponentSchema {
  collectionName: 'components_carousel_download_links';
  info: {
    description: 'Skaidr\u0117s atsisiuntimo mygtukas';
    displayName: 'Atsisiuntimo nuoroda';
    icon: 'download';
  };
  attributes: {
    file: Schema.Attribute.Media<'files' | 'images'>;
    icon: Schema.Attribute.Enumeration<['download', 'code', 'check']> &
      Schema.Attribute.DefaultTo<'download'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text;
  };
}

export interface DesignHotspot extends Struct.ComponentSchema {
  collectionName: 'components_design_hotspots';
  info: {
    description: 'Interaktyvaus modelio mazgas';
    displayName: 'Konstrukcijos ta\u0161kas';
    icon: 'pin';
  };
  attributes: {
    description: Schema.Attribute.Text;
    file: Schema.Attribute.Media<'files' | 'images'>;
    techDetail: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    xPct: Schema.Attribute.Decimal & Schema.Attribute.Required;
    yPct: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface MokymaiCalendarEvent extends Struct.ComponentSchema {
  collectionName: 'components_mokymai_calendar_events';
  info: {
    description: 'Filigran akademijos kalendoriaus eilut\u0117';
    displayName: 'Mokym\u0173 data';
    icon: 'calendar';
  };
  attributes: {
    audience: Schema.Attribute.String;
    audienceTone: Schema.Attribute.Enumeration<['lime', 'blue']> &
      Schema.Attribute.DefaultTo<'lime'>;
    dateLabel: Schema.Attribute.String & Schema.Attribute.Required;
    dateNote: Schema.Attribute.String;
    place: Schema.Attribute.String;
    program: Schema.Attribute.String & Schema.Attribute.Required;
    seatsLeft: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    seatsTotal: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface MokymaiFormTopic extends Struct.ComponentSchema {
  collectionName: 'components_mokymai_form_topics';
  info: {
    description: 'Mokym\u0173 tema registracijos formoje';
    displayName: 'Registracijos tema';
    icon: 'bulletList';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MokymaiManual extends Struct.ComponentSchema {
  collectionName: 'components_mokymai_manuals';
  info: {
    description: 'Atsisiun\u010Diama instrukcija';
    displayName: 'Mokym\u0173 instrukcija';
    icon: 'file';
  };
  attributes: {
    file: Schema.Attribute.Media<'files' | 'images'>;
    fileSize: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text;
  };
}

export interface MokymaiTopic extends Struct.ComponentSchema {
  collectionName: 'components_mokymai_topics';
  info: {
    description: 'Mokym\u0173 temos punktas';
    displayName: 'Mokym\u0173 tema';
    icon: 'book';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductAdvantage extends Struct.ComponentSchema {
  collectionName: 'components_product_advantages';
  info: {
    description: 'Produkto privalumas (ikona, pavadinimas, apra\u0161ymas)';
    displayName: 'Privalumas';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    iconUrl: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductJoint extends Struct.ComponentSchema {
  collectionName: 'components_product_joints';
  info: {
    description: 'CAD mazgas su akronimu ir per\u017Ei\u016Bra';
    displayName: 'Mazgas / jungtis';
    icon: 'link';
  };
  attributes: {
    acronym: Schema.Attribute.String;
    file: Schema.Attribute.Media<'files' | 'images'>;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductParagraph extends Struct.ComponentSchema {
  collectionName: 'components_product_paragraphs';
  info: {
    description: 'Konstrukcin\u0117s schemos teksto pastraipa';
    displayName: 'Schemos pastraipa';
    icon: 'write';
  };
  attributes: {
    highlight: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProductSpec extends Struct.ComponentSchema {
  collectionName: 'components_product_specs';
  info: {
    description: 'Produkto specifikacijos eilut\u0117';
    displayName: 'Technin\u0117 charakteristika';
    icon: 'layer';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductTile extends Struct.ComponentSchema {
  collectionName: 'components_product_tiles';
  info: {
    description: 'Konstrukcinio sprendimo arba apdailos plytel\u0117';
    displayName: 'Sprendimas / apdaila';
    icon: 'grid';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.Text;
    tileKey: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFilter extends Struct.ComponentSchema {
  collectionName: 'components_shared_filters';
  info: {
    description: 'Kategorijos filtras (slug ir etiket\u0117)';
    displayName: 'Filtras';
    icon: 'filter';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'carousel.download-link': CarouselDownloadLink;
      'design.hotspot': DesignHotspot;
      'mokymai.calendar-event': MokymaiCalendarEvent;
      'mokymai.form-topic': MokymaiFormTopic;
      'mokymai.manual': MokymaiManual;
      'mokymai.topic': MokymaiTopic;
      'product.advantage': ProductAdvantage;
      'product.joint': ProductJoint;
      'product.paragraph': ProductParagraph;
      'product.spec': ProductSpec;
      'product.tile': ProductTile;
      'shared.filter': SharedFilter;
    }
  }
}
