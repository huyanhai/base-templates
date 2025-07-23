import Layout from '@/layout/index.vue';
export const routes = [
  {
    path: '/:catchAll(.*)',
    name: 'NotFountPage',
    component: () => import('@/views/NotFountPage.vue'),
    props: true,
    meta: {
      title: 'title.not_found',
      login: true
    }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    props: true,
    meta: {
      title: 'title.not_found',
      login: true
    }
  },
  {
    path: '/child',
    redirect: '/child/home'
  },
  {
    path: '/child/:pathMatch(.*)',
    component: Layout
  },
  {
    path: '/system',
    redirect: '/system/home'
  },
  {
    path: '/system/:pathMatch(.*)',
    component: Layout
  }
];
