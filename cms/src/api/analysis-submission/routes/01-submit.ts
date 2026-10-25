export default {
  routes: [
    {
      method: 'POST',
      path: '/analysis-form',
      handler: 'analysis-submission.submit',
      config: {
        auth: false,
      },
    },
  ],
};
