export default {
  routes: [
    {
      method: 'GET',
      path: '/authorities/grouped',
      handler: 'authority.grouped',
      config: {
        auth: false,
      },
    },
  ],
};