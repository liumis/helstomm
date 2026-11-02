import type { StrapiApp } from '@strapi/strapi/admin';
import { PaperPlane } from '@strapi/icons';

export default {
  config: {
    locales: [],
  },
  register(app: StrapiApp) {
    app.addMenuLink({
      to: '/uzklausos',
      icon: PaperPlane,
      intlLabel: {
        id: 'uzklausos.menu',
        defaultMessage: 'Užklausos',
      },
      permissions: [],
      position: 1,
      Component: async () => {
        const { default: FormsPage } = await import('./forms-dashboard/FormsPage');
        return { default: FormsPage };
      },
    });

    app.registerPlugin({
      id: 'uzklausos',
      name: 'Užklausos',
    });

    if ('widgets' in app) {
      app.widgets.register({
        id: 'form-inbox',
        icon: PaperPlane,
        title: {
          id: 'uzklausos.widget.title',
          defaultMessage: 'Formų užklausos',
        },
        link: {
          label: {
            id: 'uzklausos.widget.link',
            defaultMessage: 'Atidaryti dashboard',
          },
          href: '/uzklausos',
        },
        component: async () => {
          const { default: FormsWidget } = await import('./forms-dashboard/FormsWidget');
          return FormsWidget;
        },
        permissions: [{ action: 'plugin::content-manager.explorer.read' }],
      });
    }
  },
  bootstrap() {},
};
