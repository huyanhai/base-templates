export const routes = [
  {
    path: '/home',
    name: 'ChildHome',
    component: () => import('@/views/Home.vue'),
    props: true,
    meta: {
      title: 'title.not_found',
      login: true
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFountPage',
    component: () => import('@/views/NotFountPage.vue'),
    props: true,
    meta: {
      title: 'title.not_found',
      login: true
    }
  }
  // add here
];
