const open = {
  auth: false,
  policies: [],
  middlewares: [],
};

export default {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/training-form',
      handler: 'training-submission.submit',
      config: open,
    },
    {
      method: 'POST',
      path: '/mokymai',
      handler: 'training-submission.submit',
      config: open,
    },
    {
      method: 'GET',
      path: '/mokymai-grupes',
      handler: 'training-submission.groups',
      config: open,
    },
  ],
};
