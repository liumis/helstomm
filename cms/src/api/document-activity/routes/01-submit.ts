export default {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/document-activity',
      handler: 'document-activity.submit',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
