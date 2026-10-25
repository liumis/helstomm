import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact-submission.contact-submission', {
  config: {
    find: { policies: [] },
    findOne: { policies: [] },
    create: { policies: [] },
  },
});
