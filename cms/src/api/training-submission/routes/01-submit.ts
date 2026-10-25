export default {
  routes: [
    {
      method: 'POST',
      path: '/training-form',
      handler: 'training-submission.submit',
      config: {
        auth: false,
      },
    },
  ],
};
