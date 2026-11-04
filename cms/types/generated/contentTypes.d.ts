import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    adminPermissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::permission'
    >;
    adminUserOwner: Schema.Attribute.Relation<'manyToOne', 'admin::user'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    kind: Schema.Attribute.Enumeration<['content-api', 'admin']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'content-api'>;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    apiToken: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    apiTokens: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordTokenExpiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAnalysisSubmissionAnalysisSubmission
  extends Struct.CollectionTypeSchema {
  collectionName: 'analysis_submissions';
  info: {
    description: 'Projekt\u0173 analiz\u0117s formos pateikimai';
    displayName: 'Analiz\u0117s u\u017Eklausos';
    pluralName: 'analysis-submissions';
    singularName: 'analysis-submission';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachment: Schema.Attribute.Media<'images' | 'files', true>;
    company: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    details: Schema.Attribute.Text;
    deviceType: Schema.Attribute.Enumeration<['desktop', 'mobile']>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    ipAddress: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::analysis-submission.analysis-submission'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    notifyEmails: Schema.Attribute.Text;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    submittedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userAgent: Schema.Attribute.Text;
  };
}

export interface ApiArticleArticle extends Struct.CollectionTypeSchema {
  collectionName: 'articles';
  info: {
    description: 'HELSTOMM GROUP tinklara\u0161\u010Dio straipsniai';
    displayName: 'Tinklara\u0161tis';
    pluralName: 'articles';
    singularName: 'article';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    authorRole: Schema.Attribute.String;
    category: Schema.Attribute.String & Schema.Attribute.Required;
    categorySlug: Schema.Attribute.Enumeration<
      ['apdovanojimai', 'projektai', 'gamyba', 'bim', 'tvarumas']
    > &
      Schema.Attribute.Required;
    cover: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dateLabel: Schema.Attribute.String & Schema.Attribute.Required;
    excerpt: Schema.Attribute.Text & Schema.Attribute.Required;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    imageUrl: Schema.Attribute.Text;
    intro: Schema.Attribute.Text & Schema.Attribute.Required;
    keyPoints: Schema.Attribute.JSON;
    linkedinUrl: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article.article'
    > &
      Schema.Attribute.Private;
    paragraphs: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    publishedOn: Schema.Attribute.Date & Schema.Attribute.Required;
    quoteAuthor: Schema.Attribute.String;
    quoteText: Schema.Attribute.Text;
    readTime: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCalculatorSubmissionCalculatorSubmission
  extends Struct.CollectionTypeSchema {
  collectionName: 'calculator_submissions';
  info: {
    description: 'P1\u2013P14, V1\u2013V3 ir S4 skai\u010Diavimai ir konstruktoriaus klausimai';
    displayName: 'Skai\u010Diuokli\u0173 pateikimai';
    pluralName: 'calculator-submissions';
    singularName: 'calculator-submission';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.Enumeration<
      [
        'P1',
        'P2',
        'P3',
        'P4',
        'P5',
        'P6',
        'P7',
        'P8',
        'P9',
        'P10',
        'P11',
        'P12',
        'P13',
        'P14',
        'V1',
        'V2',
        'V3',
        'V4',
        'S2',
        'S3',
        'S4',
      ]
    > &
      Schema.Attribute.Required;
    company: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceType: Schema.Attribute.Enumeration<['desktop', 'mobile']>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    firstName: Schema.Attribute.String;
    inputs: Schema.Attribute.JSON;
    ipAddress: Schema.Attribute.String;
    kind: Schema.Attribute.Enumeration<['calculation', 'ask', 'notify', 'download']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'calculation'>;
    lastName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::calculator-submission.calculator-submission'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    newsConsent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    notifyEmails: Schema.Attribute.Text;
    pageUrl: Schema.Attribute.String;
    projectName: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    question: Schema.Attribute.Text;
    results: Schema.Attribute.JSON;
    submittedAt: Schema.Attribute.DateTime;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userAgent: Schema.Attribute.Text;
  };
}

export interface ApiCompanyContactCompanyContact
  extends Struct.CollectionTypeSchema {
  collectionName: 'company_contacts';
  info: {
    description: '\u012Emon\u0117s \u017Emoni\u0173 kontaktai pora\u0161t\u0117je (r\u016B\u0161iuojama)';
    displayName: 'Komandos kontaktai';
    pluralName: 'company-contacts';
    singularName: 'company-contact';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::company-contact.company-contact'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'>;
    photoUrl: Schema.Attribute.Text;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactPersonContactPerson
  extends Struct.CollectionTypeSchema {
  collectionName: 'contact_persons';
  info: {
    description: 'Kontaktiniai asmenys (nuotrauka, vardas, pareigos, tel., el. pa\u0161tas)';
    displayName: '\u012Emon\u0117s kontaktai';
    pluralName: 'contact-persons';
    singularName: 'contact-person';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-person.contact-person'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    photoUrl: Schema.Attribute.String;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactSettingContactSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'contact_settings';
  info: {
    description: 'Kontakt\u0173 blokas, formos el. pa\u0161tas ir \u012Fmon\u0117s rekvizitai';
    displayName: 'Kontakt\u0173 nustatymai';
    pluralName: 'contact-settings';
    singularName: 'contact-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.String;
    addressLabel: Schema.Attribute.String;
    companyName: Schema.Attribute.String & Schema.Attribute.Required;
    copyrightText: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emailLabel: Schema.Attribute.String;
    emailPlaceholder: Schema.Attribute.String;
    errorText: Schema.Attribute.Text;
    fileAttachedPrefix: Schema.Attribute.String;
    filePlaceholder: Schema.Attribute.String;
    footerLine: Schema.Attribute.Text;
    formLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Susisiekite su mumis'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-setting.contact-setting'
    > &
      Schema.Attribute.Private;
    namePlaceholder: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    publicEmail: Schema.Attribute.Email;
    publishedAt: Schema.Attribute.DateTime;
    sendAnotherLabel: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String;
    submittingLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    successText: Schema.Attribute.Text;
    successTitle: Schema.Attribute.String;
    targetEmail: Schema.Attribute.Email & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactSubmissionContactSubmission
  extends Struct.CollectionTypeSchema {
  collectionName: 'contact_submissions';
  info: {
    description: 'Footer kontakt\u0173 formos pateikimai';
    displayName: 'Kontakt\u0173 u\u017Eklausos';
    pluralName: 'contact-submissions';
    singularName: 'contact-submission';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachment: Schema.Attribute.Media<'images' | 'files'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceType: Schema.Attribute.Enumeration<['desktop', 'mobile']>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    ipAddress: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-submission.contact-submission'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    notifyEmails: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    submittedAt: Schema.Attribute.DateTime;
    targetEmail: Schema.Attribute.Email;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userAgent: Schema.Attribute.Text;
  };
}

export interface ApiNotionSyncJobNotionSyncJob
  extends Struct.CollectionTypeSchema {
  collectionName: 'notion_sync_jobs';
  info: {
    description: 'Nepavyk\u0119 Notion CRM \u012Fra\u0161ai pakartojimui';
    displayName: 'Notion eil\u0117';
    pluralName: 'notion-sync-jobs';
    singularName: 'notion-sync-job';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    action: Schema.Attribute.String;
    alertedAt: Schema.Attribute.DateTime;
    attempts: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lastError: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notion-sync-job.notion-sync-job'
    > &
      Schema.Attribute.Private;
    nextAttemptAt: Schema.Attribute.DateTime;
    payload: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<['pending', 'done', 'failed']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'pending'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDocumentActivityDocumentActivity
  extends Struct.CollectionTypeSchema {
  collectionName: 'document_activities';
  info: {
    description: 'Dokument\u0173 registracijos, per\u017ei\u016bros ir PDF atsisiuntimai';
    displayName: 'Dokument\u0173 veiksmai';
    pluralName: 'document-activities';
    singularName: 'document-activity';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    action: Schema.Attribute.Enumeration<['register', 'view', 'download']> &
      Schema.Attribute.Required;
    code: Schema.Attribute.String;
    company: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceType: Schema.Attribute.Enumeration<['desktop', 'mobile']>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    firstName: Schema.Attribute.String;
    ipAddress: Schema.Attribute.String;
    landingPath: Schema.Attribute.String;
    lastName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::document-activity.document-activity'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    pageUrl: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    referrer: Schema.Attribute.String;
    role: Schema.Attribute.String;
    slug: Schema.Attribute.String;
    submittedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userAgent: Schema.Attribute.Text;
    utmCampaign: Schema.Attribute.String;
    utmContent: Schema.Attribute.String;
    utmMedium: Schema.Attribute.String;
    utmSource: Schema.Attribute.String;
    utmTerm: Schema.Attribute.String;
  };
}

export interface ApiDokumentaiSettingDokumentaiSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'dokumentai_settings';
  info: {
    description: 'Dokument\u0173 puslapio antra\u0161t\u0117s ir mygtukai';
    displayName: 'Dokumentai (puslapis)';
    pluralName: 'dokumentai-settings';
    singularName: 'dokumentai-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    analysisCta: Schema.Attribute.String;
    badge: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    downloadLabel: Schema.Attribute.String;
    emptyCta: Schema.Attribute.String;
    emptyIntro: Schema.Attribute.Text;
    emptyTitle: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::dokumentai-setting.dokumentai-setting'
    > &
      Schema.Attribute.Private;
    manualsHeading: Schema.Attribute.String;
    mazgaiHeading: Schema.Attribute.String;
    missingFileLabel: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    roiCta: Schema.Attribute.String;
    searchPlaceholder: Schema.Attribute.String;
    sizeLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDokumentasDokumentas extends Struct.CollectionTypeSchema {
  collectionName: 'dokumentai';
  info: {
    description: 'Montavimo vadovai ir CAD / BIM mazgai';
    displayName: 'Dokumentai';
    pluralName: 'dokumentai';
    singularName: 'dokumentas';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acronym: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<['manual', 'mazgas']> &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dwg: Schema.Attribute.Media<'files'>;
    fileSize: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::dokumentas.dokumentas'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    pdf: Schema.Attribute.Media<'files'>;
    pdfUrl: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subcategory: Schema.Attribute.String;
    svg: Schema.Attribute.Media<'files' | 'images'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFormMailSettingFormMailSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'form_mail_settings';
  info: {
    description: 'Kam siun\u010Diami prane\u0161imai apie pateiktas formas';
    displayName: 'Form\u0173 el. pa\u0161tas';
    pluralName: 'form-mail-settings';
    singularName: 'form-mail-setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    analysisNotifyEmails: Schema.Attribute.Text;
    calculatorNotifyEmails: Schema.Attribute.Text;
    contactNotifyEmails: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    fromEmail: Schema.Attribute.Email;
    fromName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Helstomm Group'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::form-mail-setting.form-mail-setting'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    trainingNotifyEmails: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFormSubmissionFormSubmission
  extends Struct.CollectionTypeSchema {
  collectionName: 'form_submissions';
  info: {
    description: 'Pateiktos kontakt\u0173 formos. Matoma tik administracijoje.';
    displayName: 'Formos u\u017Eklausos';
    pluralName: 'form-submissions';
    singularName: 'form-submission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    attachment: Schema.Attribute.Media<'images' | 'files'>;
    attachmentName: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::form-submission.form-submission'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    targetEmail: Schema.Attribute.Email;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGamybosProcesasGamybosProcesas
  extends Struct.SingleTypeSchema {
  collectionName: 'gamybos_procesai';
  info: {
    description: 'Gamybos proceso blokas: \u012Fjungimas, tekstai ir vaizdo \u012Fra\u0161as';
    displayName: 'Gamybos procesas';
    pluralName: 'gamybos-procesai';
    singularName: 'gamybos-procesas';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    badge: Schema.Attribute.String;
    certificates: Schema.Attribute.Text;
    certificatesCtaLabel: Schema.Attribute.String;
    certificatesFile: Schema.Attribute.Media<'files'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    intro: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::gamybos-procesas.gamybos-procesas'
    > &
      Schema.Attribute.Private;
    poster: Schema.Attribute.Media<'images'>;
    posterUrl: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoCaption: Schema.Attribute.Text;
    videoUrl: Schema.Attribute.String;
  };
}

export interface ApiHeaderSettingHeaderSetting extends Struct.SingleTypeSchema {
  collectionName: 'header_settings';
  info: {
    description: 'Vir\u0161utin\u0117s juostos ir meniu tekstai';
    displayName: 'Antra\u0161t\u0117';
    pluralName: 'header-settings';
    singularName: 'header-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    brandHighlight: Schema.Attribute.String;
    brandName: Schema.Attribute.String;
    brandTagline: Schema.Attribute.String;
    companyLine: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    designDropdownFooter: Schema.Attribute.String;
    designDropdownLabel: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::header-setting.header-setting'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'>;
    logoUrl: Schema.Attribute.Text;
    menuDokumentai: Schema.Attribute.String;
    menuGamyba: Schema.Attribute.String;
    menuProduktai: Schema.Attribute.String;
    menuProjektai: Schema.Attribute.String;
    menuProjektavimas: Schema.Attribute.String;
    menuTinklarastis: Schema.Attribute.String;
    mobileAnalysisCta: Schema.Attribute.String;
    mobileDokumentai: Schema.Attribute.String;
    mobileHome: Schema.Attribute.String;
    mobileMokymaiCta: Schema.Attribute.String;
    mobileNavLabel: Schema.Attribute.String;
    mobilePastatai: Schema.Attribute.String;
    mobileTinklarastis: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    pillAnalysis: Schema.Attribute.String;
    pillEko: Schema.Attribute.String;
    pillMokymai: Schema.Attribute.String;
    productsDropdownFooter: Schema.Attribute.String;
    productsDropdownLabel: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    roiCtaLabel: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeroCardHeroCard extends Struct.CollectionTypeSchema {
  collectionName: 'hero_cards';
  info: {
    description: 'Hero bloko \u017Ealios kortel\u0117s. Galima i\u0161jungti arba prid\u0117ti nauj\u0173.';
    displayName: 'Hero kortel\u0117s';
    pluralName: 'hero-cards';
    singularName: 'hero-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    action: Schema.Attribute.Enumeration<['analysis', 'roi', 'view']> &
      Schema.Attribute.DefaultTo<'view'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    icon: Schema.Attribute.Media<'images'>;
    iconKey: Schema.Attribute.Enumeration<
      ['konsultacija', 'projektavimas', 'gamyba', 'montavimas', 'custom']
    >;
    iconUrl: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::hero-card.hero-card'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    targetSlug: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeroSettingHeroSetting extends Struct.SingleTypeSchema {
  collectionName: 'hero_settings';
  info: {
    description: 'Pagrindinio puslapio vir\u0161utinis blokas: \u012Fjungimas ir tekstai';
    displayName: 'Hero blokas';
    pluralName: 'hero-settings';
    singularName: 'hero-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    backgroundUrl: Schema.Attribute.Text;
    badge: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    highlight: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::hero-setting.hero-setting'
    > &
      Schema.Attribute.Private;
    primaryCtaLabel: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    secondaryCtaLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHomepageSettingHomepageSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'homepage_settings';
  info: {
    description: 'Proceso ir karusel\u0117s blok\u0173 antra\u0161t\u0117s';
    displayName: 'Pagrindinis (antra\u0161t\u0117s)';
    pluralName: 'homepage-settings';
    singularName: 'homepage-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    carouselIntro: Schema.Attribute.Text;
    carouselTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::homepage-setting.homepage-setting'
    > &
      Schema.Attribute.Private;
    processBadge: Schema.Attribute.String;
    processHighlight: Schema.Attribute.String;
    processIntro: Schema.Attribute.Text;
    processTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInzinerinePagalbaInzinerinePagalba
  extends Struct.SingleTypeSchema {
  collectionName: 'inzinerine_pagalbos';
  info: {
    description: 'Karusel\u0117s apa\u010Dios juosta: \u012Fjungimas ir tekstai';
    displayName: 'In\u017Einerin\u0117 pagalba';
    pluralName: 'inzinerine-pagalbos';
    singularName: 'inzinerine-pagalba';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaLabel: Schema.Attribute.String;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::inzinerine-pagalba.inzinerine-pagalba'
    > &
      Schema.Attribute.Private;
    phone: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMokymaiSettingMokymaiSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'mokymai_settings';
  info: {
    description: 'Mokym\u0173 puslapio tekstai, registracijos temos ir instrukcijos';
    displayName: 'Mokymai';
    pluralName: 'mokymai-settings';
    singularName: 'mokymai-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    badge: Schema.Attribute.String;
    calendarEvents: Schema.Attribute.Component<'mokymai.calendar-event', true>;
    calendarNote: Schema.Attribute.Text;
    certificateNote: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    downloadLabel: Schema.Attribute.String;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    formTopics: Schema.Attribute.Component<'mokymai.form-topic', true>;
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::mokymai-setting.mokymai-setting'
    > &
      Schema.Attribute.Private;
    manuals: Schema.Attribute.Component<'mokymai.manual', true>;
    manualsHeading: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registerCta: Schema.Attribute.String;
    title: Schema.Attribute.String;
    topics: Schema.Attribute.Component<'mokymai.topic', true>;
    topicsIntro: Schema.Attribute.Text;
    trainerLabel: Schema.Attribute.String;
    trainerName: Schema.Attribute.String;
    trainerPhoto: Schema.Attribute.Media<'images'>;
    trainerPhotoUrl: Schema.Attribute.Text;
    trainerRole: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoBrand: Schema.Attribute.String;
    videoBrandHighlight: Schema.Attribute.String;
    videoCaption: Schema.Attribute.Text;
    videoPosterUrl: Schema.Attribute.Text;
    videoTagline: Schema.Attribute.String;
    videoTitle: Schema.Attribute.String;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    description: 'Gel\u017Ebetonio produktai: meniu, karusel\u0117, privalumai, mazgai, specifikacijos';
    displayName: 'Produktai';
    pluralName: 'products';
    singularName: 'product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    advantages: Schema.Attribute.Component<'product.advantage', true>;
    badge: Schema.Attribute.String;
    bimModelUrl: Schema.Attribute.Text;
    catalogFile: Schema.Attribute.Media<'files'>;
    catalogLabel: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    detailsCadUrl: Schema.Attribute.Text;
    guidePdfUrl: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.Text;
    joints: Schema.Attribute.Component<'product.joint', true>;
    jointsCtaLabel: Schema.Attribute.String;
    jointsTitle: Schema.Attribute.String;
    layout: Schema.Attribute.Enumeration<['standard', 'engineering']> &
      Schema.Attribute.DefaultTo<'standard'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    > &
      Schema.Attribute.Private;
    menuIcon: Schema.Attribute.Media<'images'>;
    menuIconUrl: Schema.Attribute.Text;
    menuTitle: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    pageIntro: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    schemaImage: Schema.Attribute.Media<'images'>;
    schemaImageUrl: Schema.Attribute.Text;
    schemaParagraphs: Schema.Attribute.Component<'product.paragraph', true>;
    schemaTitle: Schema.Attribute.String;
    showInCarousel: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    showInMenu: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    specs: Schema.Attribute.Component<'product.spec', true>;
    subtitle: Schema.Attribute.String;
    tiles: Schema.Attribute.Component<'product.tile', true>;
    tilesColumns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 2;
        },
        number
      > &
      Schema.Attribute.DefaultTo<6>;
    tilesSectionTitle: Schema.Attribute.String;
    tilesSelectable: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProjectProject extends Struct.CollectionTypeSchema {
  collectionName: 'projects';
  info: {
    description: '\u012Egyvendinti projektai su kategorij\u0173 filtru';
    displayName: 'Projects';
    pluralName: 'projects';
    singularName: 'project';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    area: Schema.Attribute.String & Schema.Attribute.Required;
    category: Schema.Attribute.Enumeration<
      [
        'gyvenamieji',
        'industriniai',
        'komerciniai',
        'viesieji',
        'individualus',
        'inzineriniai',
      ]
    > &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::project.project'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    timeWeeks: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProjektaiSettingProjektaiSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'projektai_settings';
  info: {
    description: '\u012Egyvendint\u0173 projekt\u0173 bloko antra\u0161t\u0117s ir filtrai';
    displayName: 'Projektai (blokas)';
    pluralName: 'projektai-settings';
    singularName: 'projektai-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    analysisCta: Schema.Attribute.String;
    badge: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emptyCta: Schema.Attribute.String;
    emptyTitle: Schema.Attribute.String;
    filters: Schema.Attribute.Component<'shared.filter', true>;
    highlight: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::projektai-setting.projektai-setting'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProjektavimasProjektavimas
  extends Struct.CollectionTypeSchema {
  collectionName: 'projektavimai';
  info: {
    description: 'Pastat\u0173 ir statini\u0173 kategorijos: meniu, puslapiai, interaktyv\u016Bs mazgai';
    displayName: 'Projektavimas';
    pluralName: 'projektavimai';
    singularName: 'projektavimas';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    assemblyBackgroundUrl: Schema.Attribute.Text;
    assemblyCaption: Schema.Attribute.Text;
    assemblyTitle: Schema.Attribute.String;
    badge: Schema.Attribute.String;
    cardBadge: Schema.Attribute.String;
    cardBadgeIcon: Schema.Attribute.Enumeration<
      ['Building', 'Shield', 'Leaf']
    > &
      Schema.Attribute.DefaultTo<'Building'>;
    cardCtaLabel: Schema.Attribute.String;
    cardDescription: Schema.Attribute.Text;
    cardIconKey: Schema.Attribute.Enumeration<
      ['pastatai', 'inzineriniai', 'tvarus']
    > &
      Schema.Attribute.DefaultTo<'pastatai'>;
    cardImage: Schema.Attribute.Media<'images'>;
    cardImageUrl: Schema.Attribute.Text;
    cardTargetSlug: Schema.Attribute.String;
    cardTheme: Schema.Attribute.Enumeration<['standard', 'eco']> &
      Schema.Attribute.DefaultTo<'standard'>;
    cardTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaLabel: Schema.Attribute.String;
    diagramImage: Schema.Attribute.Media<'images'>;
    diagramImageUrl: Schema.Attribute.Text;
    diagramSubtitle: Schema.Attribute.String;
    diagramTitle: Schema.Attribute.String;
    hotspots: Schema.Attribute.Component<'design.hotspot', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::projektavimas.projektavimas'
    > &
      Schema.Attribute.Private;
    menuIconName: Schema.Attribute.String;
    menuTitle: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    pageIntro: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    showInMenu: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    showOnHome: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSeoPageSeoPage extends Struct.CollectionTypeSchema {
  collectionName: 'seo_pages';
  info: {
    description: 'Kiekvieno svetain\u0117s puslapio URL, title, description ir Open Graph laukai.';
    displayName: 'SEO puslapiai';
    pluralName: 'seo-pages';
    singularName: 'seo-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    indexable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::seo-page.seo-page'
    > &
      Schema.Attribute.Private;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogImageUrl: Schema.Attribute.Text;
    ogTitle: Schema.Attribute.String;
    path: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSlideSlide extends Struct.CollectionTypeSchema {
  collectionName: 'slides';
  info: {
    description: 'Pagrindinio puslapio karusel\u0117s skaidr\u0117s';
    displayName: 'Carousel';
    pluralName: 'slides';
    singularName: 'slide';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    analysisCtaLabel: Schema.Attribute.String;
    badge: Schema.Attribute.String;
    calculatorLabel: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaAction: Schema.Attribute.Enumeration<['view', 'analysis']> &
      Schema.Attribute.DefaultTo<'view'>;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    downloads: Schema.Attribute.Component<'carousel.download-link', true>;
    downloadsTitle: Schema.Attribute.String;
    highlights: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::slide.slide'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    publishedInCarousel: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.String;
    tabSubtitle: Schema.Attribute.String;
    targetSlug: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSocialLinkSocialLink extends Struct.CollectionTypeSchema {
  collectionName: 'social_links';
  info: {
    description: 'Facebook, Instagram, LinkedIn ir kiti socialiniai adresai';
    displayName: 'Socialiniai tinklai';
    pluralName: 'social-links';
    singularName: 'social-link';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-link.social-link'
    > &
      Schema.Attribute.Private;
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'linkedin', 'youtube', 'other']
    > &
      Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ApiTinklarastisSettingTinklarastisSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'tinklarastis_settings';
  info: {
    description: 'Tinklara\u0161\u010Dio antra\u0161t\u0117, filtrai ir socialiniai mygtukai';
    displayName: 'Tinklara\u0161tis (puslapis)';
    pluralName: 'tinklarastis-settings';
    singularName: 'tinklarastis-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    analysisCta: Schema.Attribute.String;
    backgroundUrl: Schema.Attribute.Text;
    badge: Schema.Attribute.String;
    categories: Schema.Attribute.Component<'shared.filter', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emptyCta: Schema.Attribute.String;
    emptyIntro: Schema.Attribute.Text;
    emptyTitle: Schema.Attribute.String;
    featuredBadge: Schema.Attribute.String;
    followCta: Schema.Attribute.String;
    followIntro: Schema.Attribute.Text;
    followTitle: Schema.Attribute.String;
    instagramLabel: Schema.Attribute.String;
    instagramUrl: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    linkedinLabel: Schema.Attribute.String;
    linkedinUrl: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tinklarastis-setting.tinklarastis-setting'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    readArticleCta: Schema.Attribute.String;
    readCta: Schema.Attribute.String;
    searchPlaceholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTrainingSubmissionTrainingSubmission
  extends Struct.CollectionTypeSchema {
  collectionName: 'training_submissions';
  info: {
    description: 'Mokym\u0173 formos pateikimai';
    displayName: 'Mokym\u0173 registracijos';
    pluralName: 'training-submissions';
    singularName: 'training-submission';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    company: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceType: Schema.Attribute.Enumeration<['desktop', 'mobile']>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    ipAddress: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::training-submission.training-submission'
    > &
      Schema.Attribute.Private;
    daysCount: Schema.Attribute.String;
    firstName: Schema.Attribute.String;
    groupDate: Schema.Attribute.String;
    landingPath: Schema.Attribute.String;
    lastName: Schema.Attribute.String;
    location: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    newsConsent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    notifyEmails: Schema.Attribute.Text;
    objectAddress: Schema.Attribute.String;
    pageUrl: Schema.Attribute.String;
    participantsCount: Schema.Attribute.String;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.String;
    preferredDate: Schema.Attribute.String;
    program: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    question: Schema.Attribute.Text;
    referrer: Schema.Attribute.String;
    submittedAt: Schema.Attribute.DateTime;
    topic: Schema.Attribute.String;
    utmCampaign: Schema.Attribute.String;
    utmContent: Schema.Attribute.String;
    utmMedium: Schema.Attribute.String;
    utmSource: Schema.Attribute.String;
    utmTerm: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userAgent: Schema.Attribute.Text;
  };
}

export interface ApiVystytojaiSettingVystytojaiSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'vystytojai_settings';
  info: {
    description: 'Vystytojams sekcijos antra\u0161t\u0117 ir mygtukai';
    displayName: 'Vystytojams blokas';
    pluralName: 'vystytojai-settings';
    singularName: 'vystytojai-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    analysisCtaLabel: Schema.Attribute.String;
    badge: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    intro: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::vystytojai-setting.vystytojai-setting'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    roiCtaLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVystytojasVystytojas extends Struct.CollectionTypeSchema {
  collectionName: 'vystytojai';
  info: {
    description: 'Pagrindinio puslapio Vystytojams naudos kortel\u0117s';
    displayName: 'Vystytojams';
    pluralName: 'vystytojai';
    singularName: 'vystytojas';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    iconUrl: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::vystytojas.vystytojas'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    stat: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    focalPoint: Schema.Attribute.JSON;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::analysis-submission.analysis-submission': ApiAnalysisSubmissionAnalysisSubmission;
      'api::article.article': ApiArticleArticle;
      'api::calculator-submission.calculator-submission': ApiCalculatorSubmissionCalculatorSubmission;
      'api::company-contact.company-contact': ApiCompanyContactCompanyContact;
      'api::contact-person.contact-person': ApiContactPersonContactPerson;
      'api::contact-setting.contact-setting': ApiContactSettingContactSetting;
      'api::contact-submission.contact-submission': ApiContactSubmissionContactSubmission;
      'api::document-activity.document-activity': ApiDocumentActivityDocumentActivity;
      'api::dokumentai-setting.dokumentai-setting': ApiDokumentaiSettingDokumentaiSetting;
      'api::dokumentas.dokumentas': ApiDokumentasDokumentas;
      'api::form-mail-setting.form-mail-setting': ApiFormMailSettingFormMailSetting;
      'api::form-submission.form-submission': ApiFormSubmissionFormSubmission;
      'api::gamybos-procesas.gamybos-procesas': ApiGamybosProcesasGamybosProcesas;
      'api::header-setting.header-setting': ApiHeaderSettingHeaderSetting;
      'api::hero-card.hero-card': ApiHeroCardHeroCard;
      'api::hero-setting.hero-setting': ApiHeroSettingHeroSetting;
      'api::homepage-setting.homepage-setting': ApiHomepageSettingHomepageSetting;
      'api::inzinerine-pagalba.inzinerine-pagalba': ApiInzinerinePagalbaInzinerinePagalba;
      'api::mokymai-setting.mokymai-setting': ApiMokymaiSettingMokymaiSetting;
      'api::notion-sync-job.notion-sync-job': ApiNotionSyncJobNotionSyncJob;
      'api::product.product': ApiProductProduct;
      'api::project.project': ApiProjectProject;
      'api::projektai-setting.projektai-setting': ApiProjektaiSettingProjektaiSetting;
      'api::projektavimas.projektavimas': ApiProjektavimasProjektavimas;
      'api::seo-page.seo-page': ApiSeoPageSeoPage;
      'api::slide.slide': ApiSlideSlide;
      'api::social-link.social-link': ApiSocialLinkSocialLink;
      'api::tinklarastis-setting.tinklarastis-setting': ApiTinklarastisSettingTinklarastisSetting;
      'api::training-submission.training-submission': ApiTrainingSubmissionTrainingSubmission;
      'api::vystytojai-setting.vystytojai-setting': ApiVystytojaiSettingVystytojaiSetting;
      'api::vystytojas.vystytojas': ApiVystytojasVystytojas;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
