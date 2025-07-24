export const routes = [
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
    props: true,
    meta: {
      title: 'title.not_found',
      login: true
    }
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import('@/views/role/index.vue'),
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
