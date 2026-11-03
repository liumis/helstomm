import type { Core } from '@strapi/strapi';
import { ARTICLE_SEEDS } from '../seeds/articles';
import { DOCUMENT_SEEDS } from '../seeds/documents';
import { PROJECT_SEEDS } from '../seeds/projects';
import {
  CONTACT_PERSON_SEEDS,
  CONTACT_SETTING_SEED,
  FORM_MAIL_SETTING_SEED,
  SOCIAL_LINK_SEEDS,
} from '../seeds/contact';
import { PRODUCT_SEEDS } from '../seeds/products';
import { DESIGN_CATEGORY_SEEDS } from '../seeds/projektavimas';
import { SLIDE_SEEDS } from '../seeds/slides';
import { VYSTYTOJAI_BENEFIT_SEEDS, VYSTYTOJAI_SETTING_SEED } from '../seeds/vystytojai';
import { INZINERINE_PAGALBA_SEED } from '../seeds/inzinerine-pagalba';
import { GAMYBOS_PROCESAS_SEED } from '../seeds/gamybos-procesas';
import { HERO_CARD_SEEDS, HERO_SETTING_SEED } from '../seeds/hero';
import { HEADER_SETTING_SEED } from '../seeds/header';
import { MOKYMAI_SETTING_SEED } from '../seeds/mokymai';
import {
  DOKUMENTAI_SETTING_SEED,
  HOMEPAGE_SETTING_SEED,
  PROJEKTAI_SETTING_SEED,
  TINKLARASTIS_SETTING_SEED,
} from '../seeds/page-chrome';
import { SEO_PAGE_SEEDS } from '../seeds/seo';

const PUBLIC_CONTENT_ACTIONS = [
  'api::article.article.find',
  'api::article.article.findOne',
  'api::dokumentas.dokumentas.find',
  'api::dokumentas.dokumentas.findOne',
  'api::project.project.find',
  'api::project.project.findOne',
  'api::product.product.find',
  'api::product.product.findOne',
  'api::projektavimas.projektavimas.find',
  'api::projektavimas.projektavimas.findOne',
  'api::slide.slide.find',
  'api::slide.slide.findOne',
  'api::vystytojas.vystytojas.find',
  'api::vystytojas.vystytojas.findOne',
  'api::vystytojai-setting.vystytojai-setting.find',
  'api::inzinerine-pagalba.inzinerine-pagalba.find',
  'api::gamybos-procesas.gamybos-procesas.find',
  'api::hero-setting.hero-setting.find',
  'api::hero-card.hero-card.find',
  'api::hero-card.hero-card.findOne',
  'api::header-setting.header-setting.find',
  'api::mokymai-setting.mokymai-setting.find',
  'api::homepage-setting.homepage-setting.find',
  'api::projektai-setting.projektai-setting.find',
  'api::tinklarastis-setting.tinklarastis-setting.find',
  'api::dokumentai-setting.dokumentai-setting.find',
  'api::contact-setting.contact-setting.find',
  'api::contact-person.contact-person.find',
  'api::contact-person.contact-person.findOne',
  'api::social-link.social-link.find',
  'api::social-link.social-link.findOne',
  'api::contact-submission.contact-submission.submit',
  'api::analysis-submission.analysis-submission.submit',
  'api::training-submission.training-submission.submit',
  'api::calculator-submission.calculator-submission.submit',
  'api::document-activity.document-activity.submit',
  'api::seo-page.seo-page.find',
  'api::seo-page.seo-page.findOne',
];

async function forceUpdateSingleType(
  strapi: Core.Strapi,
  uid: any,
  seed: any,
  logLabel: string
) {
  const existing = await strapi.db.query(uid).findOne({});
  const data: any = {};
  for (const [key, value] of Object.entries(seed)) {
    if (Array.isArray(value)) continue;
    data[key] = value;
  }

  if (!existing?.documentId) {
    await strapi.documents(uid).create({
      data: seed as any,
      status: 'published',
    });
    strapi.log.info(`Seeded ${logLabel}.`);
    return;
  }

  await strapi.documents(uid).update({
    documentId: existing.documentId,
    data: data as any,
    status: 'published',
  });
  strapi.log.info(`Updated copy on ${logLabel}.`);
}

async function forceUpdateBySlug(
  strapi: Core.Strapi,
  uid: any,
  slug: string,
  data: any,
  logLabel: string
) {
  const existing = await strapi.db.query(uid).findOne({ where: { slug } });
  if (!existing?.documentId) {
    await strapi.documents(uid).create({
      data: { ...data, slug } as any,
      status: 'published',
    });
    strapi.log.info(`Seeded ${logLabel}: ${slug}`);
    return;
  }

  await strapi.documents(uid).update({
    documentId: existing.documentId,
    data: data as any,
    status: 'published',
  });
  strapi.log.info(`Updated copy on ${logLabel}: ${slug}`);
}

async function upsertSingleType(
  strapi: Core.Strapi,
  uid: any,
  seed: any,
  logLabel: string
) {
  const existing = await strapi.db.query(uid).findOne({});
  if (!existing) {
    await strapi.documents(uid).create({
      data: seed as any,
      status: 'published',
    });
    strapi.log.info(`Seeded ${logLabel}.`);
    return;
  }

  if (!existing.documentId) return;

  const data: any = {};
  for (const [key, value] of Object.entries(seed)) {
    if (Array.isArray(value)) continue;
    if (existing[key] == null || existing[key] === '') {
      data[key] = value;
    }
  }
  if (Object.keys(data).length === 0) return;

  await strapi.documents(uid).update({
    documentId: existing.documentId,
    data: data as any,
    status: 'published',
  });
  strapi.log.info(`Updated missing fields on ${logLabel}.`);
}

export async function ensureAdminUser(strapi: Core.Strapi) {
  const email = process.env.CMS_ADMIN_EMAIL || 'admin@helstomm.lt';
  const password = process.env.CMS_ADMIN_PASSWORD || 'HelstommAdmin123!';

  const existing = await strapi.db.query('admin::user').findOne({
    where: { email },
  });

  if (existing) {
    strapi.log.info(`CMS admin already exists: ${email}`);
    return;
  }

  const superAdminRole = await strapi.db.query('admin::role').findOne({
    where: { code: 'strapi-super-admin' },
  });

  if (!superAdminRole) {
    strapi.log.warn('Super admin role is missing; skipped admin user creation.');
    return;
  }

  await strapi.admin.services.user.create({
    email,
    firstname: 'Helstomm',
    lastname: 'Admin',
    password,
    isActive: true,
    roles: [superAdminRole.id],
  });

  strapi.log.info(`Created CMS admin user: ${email}`);
}

export async function enablePublicContentPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    strapi.log.warn('Public role is missing; skipped public API permissions.');
    return;
  }

  for (const action of PUBLIC_CONTENT_ACTIONS) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: {
        action,
        role: { id: publicRole.id },
      },
    });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      });
    }
  }

  strapi.log.info('Public CMS API permissions enabled.');
}

export async function seedArticles(strapi: Core.Strapi) {
  for (const article of ARTICLE_SEEDS) {
    const existing = await strapi.db.query('api::article.article').findOne({
      where: { slug: article.slug },
    });

    if (existing) {
      const current = String(existing.imageUrl || '');
      const stale =
        !current || current.includes('unsplash.com') || current.startsWith('/src/');
      const documentId = existing.documentId || existing.document_id;
      if (stale && documentId && current !== article.imageUrl) {
        await strapi.documents('api::article.article').update({
          documentId,
          data: { imageUrl: article.imageUrl },
          status: 'published',
        });
        strapi.log.info(`Updated article image: ${article.slug}`);
      }
      continue;
    }

    await strapi.documents('api::article.article').create({
      data: {
        title: article.title,
        slug: article.slug,
        category: article.category,
        categorySlug: article.categorySlug,
        dateLabel: article.dateLabel,
        publishedOn: article.publishedOn,
        readTime: article.readTime,
        author: article.author,
        authorRole: article.authorRole,
        excerpt: article.excerpt,
        featured: Boolean(article.featured),
        linkedinUrl: article.linkedinUrl,
        imageUrl: article.imageUrl,
        intro: article.intro,
        keyPoints: article.keyPoints,
        paragraphs: article.paragraphs,
        quoteText: article.quoteText,
        quoteAuthor: article.quoteAuthor,
      },
      status: 'published',
    });

    strapi.log.info(`Seeded article: ${article.slug}`);
  }
}

export async function seedDocuments(strapi: Core.Strapi) {
  const keep = new Set(DOCUMENT_SEEDS.map((document) => document.slug));
  const existingRows = await strapi.db.query('api::dokumentas.dokumentas').findMany({});

  for (const row of existingRows) {
    if (keep.has(row.slug) || !row.documentId) continue;
    await strapi.documents('api::dokumentas.dokumentas').delete({
      documentId: row.documentId,
    });
    strapi.log.info(`Removed old document: ${row.slug}`);
  }

  for (const document of DOCUMENT_SEEDS) {
    await forceUpdateBySlug(
      strapi,
      'api::dokumentas.dokumentas',
      document.slug,
      {
        name: document.name,
        category: document.category,
        section: document.section,
        subcategory: document.subcategory,
        acronym: document.acronym,
        description: document.description,
        version: document.version,
        publishedOn: document.publishedOn,
        pages: document.pages,
        imageUrl: document.imageUrl,
        fileSize: document.fileSize,
        pdfUrl: document.pdfUrl,
        tags: document.tags,
        relatedCodes: document.relatedCodes,
        featured: Boolean(document.featured),
        sortOrder: document.sortOrder,
      },
      'document'
    );
  }
}

export async function seedProjects(strapi: Core.Strapi) {
  for (const project of PROJECT_SEEDS) {
    const existing = await strapi.db.query('api::project.project').findOne({
      where: { slug: project.slug },
    });

    if (existing) {
      continue;
    }

    await strapi.documents('api::project.project').create({
      data: {
        name: project.name,
        slug: project.slug,
        category: project.category,
        timeWeeks: project.timeWeeks,
        location: project.location,
        area: project.area,
        imageUrl: project.imageUrl,
        sortOrder: project.sortOrder,
      },
      status: 'published',
    });

    strapi.log.info(`Seeded project: ${project.slug}`);
  }
}

export async function seedContact(strapi: Core.Strapi) {
  await upsertSingleType(
    strapi,
    'api::contact-setting.contact-setting',
    CONTACT_SETTING_SEED,
    'contact settings'
  );

  await upsertSingleType(
    strapi,
    'api::form-mail-setting.form-mail-setting',
    FORM_MAIL_SETTING_SEED,
    'form mail settings'
  );

  for (const person of CONTACT_PERSON_SEEDS) {
    const existing = await strapi.db.query('api::contact-person.contact-person').findOne({
      where: { email: person.email },
    });
    if (existing) continue;

    await strapi.documents('api::contact-person.contact-person').create({
      data: person,
      status: 'published',
    });
    strapi.log.info(`Seeded contact person: ${person.name}`);
  }

  for (const link of SOCIAL_LINK_SEEDS) {
    const existing = await strapi.db.query('api::social-link.social-link').findOne({
      where: { platform: link.platform },
    });
    if (existing) continue;

    await strapi.documents('api::social-link.social-link').create({
      data: link,
      status: 'published',
    });
    strapi.log.info(`Seeded social link: ${link.platform}`);
  }
}

export async function seedProducts(strapi: Core.Strapi) {
  for (const product of PRODUCT_SEEDS) {
    const existing = await strapi.db.query('api::product.product').findOne({
      where: { slug: product.slug },
    });

    const productCopy = {
      name: product.name,
      menuTitle: product.menuTitle,
      subtitle: product.subtitle,
      description: product.description,
      schemaParagraphs: product.schemaParagraphs,
      specs: product.specs,
    };

    if (existing?.documentId) {
      await strapi.documents('api::product.product').update({
        documentId: existing.documentId,
        data: productCopy as any,
        status: 'published',
      });
      strapi.log.info(`Updated product copy: ${product.slug}`);
      continue;
    }

    await strapi.documents('api::product.product').create({
      data: {
        name: product.name,
        menuTitle: product.menuTitle,
        slug: product.slug,
        subtitle: product.subtitle,
        description: product.description,
        imageUrl: product.imageUrl,
        menuIconUrl: product.menuIconUrl,
        badge: product.badge,
        pageTitle: product.pageTitle,
        pageIntro: product.pageIntro,
        tilesSectionTitle: product.tilesSectionTitle || undefined,
        tilesSelectable: product.tilesSelectable,
        tilesColumns: product.tilesColumns,
        schemaTitle: product.schemaTitle || undefined,
        schemaImageUrl: product.schemaImageUrl,
        catalogLabel: product.catalogLabel || undefined,
        jointsTitle: product.jointsTitle || undefined,
        jointsCtaLabel: product.jointsCtaLabel || undefined,
        showInMenu: product.showInMenu,
        showInCarousel: product.showInCarousel,
        sortOrder: product.sortOrder,
        layout: product.layout,
        guidePdfUrl: product.guidePdfUrl,
        detailsCadUrl: product.detailsCadUrl,
        bimModelUrl: product.bimModelUrl,
        advantages: product.advantages,
        specs: product.specs,
        tiles: product.tiles,
        joints: product.joints,
        schemaParagraphs: product.schemaParagraphs,
      },
      status: 'published',
    });

    strapi.log.info(`Seeded product: ${product.slug}`);
  }
}

function designCardData(item: (typeof DESIGN_CATEGORY_SEEDS)[number]) {
  return {
    showOnHome: Boolean(item.showOnHome),
    cardBadge: item.cardBadge,
    cardTitle: item.cardTitle,
    cardDescription: item.cardDescription,
    cardImageUrl: item.cardImageUrl,
    cardBadgeIcon: item.cardBadgeIcon,
    cardTheme: item.cardTheme,
    cardTargetSlug: item.cardTargetSlug,
    cardCtaLabel: item.cardCtaLabel,
    cardIconKey: item.cardIconKey,
  };
}

export async function seedDesignCategories(strapi: Core.Strapi) {
  for (const item of DESIGN_CATEGORY_SEEDS) {
    const existing = await strapi.db.query('api::projektavimas.projektavimas').findOne({
      where: { slug: item.slug },
    });

    if (existing?.documentId) {
      if (item.showOnHome) {
        await strapi.documents('api::projektavimas.projektavimas').update({
          documentId: existing.documentId,
          data: designCardData(item),
          status: 'published',
        });
        strapi.log.info(`Updated projektavimas card copy: ${item.slug}`);
      }
      continue;
    }

    await strapi.documents('api::projektavimas.projektavimas').create({
      data: {
        name: item.name,
        menuTitle: item.menuTitle,
        slug: item.slug,
        menuIconName: item.menuIconName,
        badge: item.badge,
        pageTitle: item.pageTitle,
        subtitle: item.subtitle || undefined,
        pageIntro: item.pageIntro,
        diagramTitle: item.diagramTitle,
        diagramSubtitle: item.diagramSubtitle,
        diagramImageUrl: item.diagramImageUrl,
        assemblyTitle: item.assemblyTitle,
        assemblyCaption: item.assemblyCaption,
        assemblyBackgroundUrl: item.assemblyBackgroundUrl,
        ctaLabel: item.ctaLabel,
        showInMenu: item.showInMenu,
        sortOrder: item.sortOrder,
        hotspots: item.hotspots,
        ...designCardData(item),
      },
      status: 'published',
    });

    strapi.log.info(`Seeded projektavimas: ${item.slug}`);
  }
}

export async function seedSlides(strapi: Core.Strapi) {
  for (const slide of SLIDE_SEEDS) {
    const existing = await strapi.db.query('api::slide.slide').findOne({
      where: { slug: slide.slug },
    });

    const slideCopy = {
      name: slide.name,
      tabSubtitle: slide.tabSubtitle,
      badge: slide.badge,
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      targetSlug: slide.targetSlug,
      ctaLabel: slide.ctaLabel,
      ctaAction: slide.ctaAction,
      analysisCtaLabel: slide.analysisCtaLabel,
      calculatorLabel: slide.calculatorLabel,
      highlights: slide.highlights,
      downloadsTitle: slide.downloadsTitle,
    };

    if (existing?.documentId) {
      await strapi.documents('api::slide.slide').update({
        documentId: existing.documentId,
        data: slideCopy as any,
        status: 'published',
      });
      strapi.log.info(`Updated slide copy: ${slide.slug}`);
      continue;
    }

    await strapi.documents('api::slide.slide').create({
      data: {
        name: slide.name,
        slug: slide.slug,
        tabSubtitle: slide.tabSubtitle,
        badge: slide.badge,
        title: slide.title,
        subtitle: slide.subtitle,
        description: slide.description,
        imageUrl: slide.imageUrl,
        targetSlug: slide.targetSlug,
        ctaLabel: slide.ctaLabel,
        ctaAction: slide.ctaAction,
        analysisCtaLabel: slide.analysisCtaLabel,
        calculatorLabel: slide.calculatorLabel,
        highlights: slide.highlights,
        downloadsTitle: slide.downloadsTitle,
        publishedInCarousel: slide.publishedInCarousel,
        sortOrder: slide.sortOrder,
        downloads: slide.downloads,
      },
      status: 'published',
    });

    strapi.log.info(`Seeded slide: ${slide.slug}`);
  }
}

export async function seedVystytojai(strapi: Core.Strapi) {
  await forceUpdateSingleType(
    strapi,
    'api::vystytojai-setting.vystytojai-setting',
    VYSTYTOJAI_SETTING_SEED,
    'vystytojai settings'
  );

  for (const item of VYSTYTOJAI_BENEFIT_SEEDS) {
    await forceUpdateBySlug(strapi, 'api::vystytojas.vystytojas', item.slug, item, 'vystytojas');
  }
}

export async function seedInzinerinePagalba(strapi: Core.Strapi) {
  await forceUpdateSingleType(
    strapi,
    'api::inzinerine-pagalba.inzinerine-pagalba',
    INZINERINE_PAGALBA_SEED,
    'inzinerine pagalba banner'
  );
}

export async function seedGamybosProcesas(strapi: Core.Strapi) {
  const existing = await strapi.db.query('api::gamybos-procesas.gamybos-procesas').findOne({});
  if (existing) return;

  await strapi.documents('api::gamybos-procesas.gamybos-procesas').create({
    data: GAMYBOS_PROCESAS_SEED,
    status: 'published',
  });
  strapi.log.info('Seeded gamybos procesas block.');
}

export async function seedHero(strapi: Core.Strapi) {
  await forceUpdateSingleType(strapi, 'api::hero-setting.hero-setting', HERO_SETTING_SEED, 'hero settings');

  for (const item of HERO_CARD_SEEDS) {
    await forceUpdateBySlug(strapi, 'api::hero-card.hero-card', item.slug, item, 'hero card');
  }
}

export async function seedHeader(strapi: Core.Strapi) {
  await upsertSingleType(
    strapi,
    'api::header-setting.header-setting',
    HEADER_SETTING_SEED,
    'header settings'
  );

  const existing = await strapi.db.query('api::header-setting.header-setting').findOne({});
  const documentId = existing?.documentId || existing?.document_id;
  if (!documentId) return;

  await strapi.documents('api::header-setting.header-setting').update({
    documentId,
    data: {
      pillMokymai: HEADER_SETTING_SEED.pillMokymai,
      mobileMokymaiCta: HEADER_SETTING_SEED.mobileMokymaiCta,
    } as any,
    status: 'published',
  });
  strapi.log.info('Updated header akademija labels.');
}

export async function seedMokymai(strapi: Core.Strapi) {
  await upsertSingleType(
    strapi,
    'api::mokymai-setting.mokymai-setting',
    MOKYMAI_SETTING_SEED,
    'mokymai settings'
  );

  const existing = (await strapi.documents('api::mokymai-setting.mokymai-setting').findFirst({
    populate: { formTopics: true, calendarEvents: true } as any,
  })) as any;
  if (existing?.documentId) {
    await strapi.documents('api::mokymai-setting.mokymai-setting').update({
      documentId: existing.documentId,
      data: {
        badge: MOKYMAI_SETTING_SEED.badge,
        title: MOKYMAI_SETTING_SEED.title,
        intro: MOKYMAI_SETTING_SEED.intro,
        certificateNote: MOKYMAI_SETTING_SEED.certificateNote,
        registerCta: MOKYMAI_SETTING_SEED.registerCta,
        formTopics: MOKYMAI_SETTING_SEED.formTopics,
        calendarNote: MOKYMAI_SETTING_SEED.calendarNote,
        ...(!existing.calendarEvents || existing.calendarEvents.length === 0
          ? { calendarEvents: MOKYMAI_SETTING_SEED.calendarEvents }
          : {}),
      } as any,
      status: 'published',
    });
    strapi.log.info('Updated mokymai akademija copy and registration topics.');
  }
}

export async function seedPageChrome(strapi: Core.Strapi) {
  await forceUpdateSingleType(
    strapi,
    'api::homepage-setting.homepage-setting',
    HOMEPAGE_SETTING_SEED,
    'homepage settings'
  );
  await upsertSingleType(
    strapi,
    'api::projektai-setting.projektai-setting',
    PROJEKTAI_SETTING_SEED,
    'projektai settings'
  );
  await upsertSingleType(
    strapi,
    'api::tinklarastis-setting.tinklarastis-setting',
    TINKLARASTIS_SETTING_SEED,
    'tinklarastis settings'
  );
  await forceUpdateSingleType(
    strapi,
    'api::dokumentai-setting.dokumentai-setting',
    DOKUMENTAI_SETTING_SEED,
    'dokumentai settings'
  );
}

export async function seedSeoPages(strapi: Core.Strapi) {
  for (const page of SEO_PAGE_SEEDS) {
    const existing = await strapi.db.query('api::seo-page.seo-page').findOne({
      where: { slug: page.slug },
    });
    if (existing) continue;

    await strapi.documents('api::seo-page.seo-page').create({
      data: page,
      status: 'published',
    });
    strapi.log.info(`Seeded SEO page: ${page.path}`);
  }
}
