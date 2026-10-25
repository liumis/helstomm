import type { Core } from '@strapi/strapi';
import {
  enablePublicContentPermissions,
  ensureAdminUser,
  seedArticles,
  seedDocuments,
  seedProjects,
  seedContact,
  seedProducts,
  seedDesignCategories,
  seedSlides,
  seedVystytojai,
  seedInzinerinePagalba,
  seedGamybosProcesas,
  seedHero,
  seedHeader,
  seedMokymai,
  seedPageChrome,
  seedSeoPages,
} from './bootstrap/cms-setup';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureAdminUser(strapi);
    await enablePublicContentPermissions(strapi);
    await seedArticles(strapi);
    await seedDocuments(strapi);
    await seedProjects(strapi);
    await seedContact(strapi);
    await seedProducts(strapi);
    await seedDesignCategories(strapi);
    await seedSlides(strapi);
    await seedVystytojai(strapi);
    await seedInzinerinePagalba(strapi);
    await seedGamybosProcesas(strapi);
    await seedHero(strapi);
    await seedHeader(strapi);
    await seedMokymai(strapi);
    await seedPageChrome(strapi);
    await seedSeoPages(strapi);
    strapi.log.info('CMS bootstrap complete.');

  },
};
