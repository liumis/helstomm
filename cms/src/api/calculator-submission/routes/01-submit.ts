export default {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/calculator-form',
      handler: 'calculator-submission.submit',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
