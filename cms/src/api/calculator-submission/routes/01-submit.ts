const openPost = {
  auth: false,
  policies: [],
  middlewares: [],
};

export default {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/calculator-form',
      handler: 'calculator-submission.submit',
      config: openPost,
    },
    {
      method: 'POST',
      path: '/registracija',
      handler: 'calculator-submission.submit',
      config: openPost,
    },
    {
      method: 'POST',
      path: '/veiksmas',
      handler: 'calculator-submission.submit',
      config: openPost,
    },
  ],
};
