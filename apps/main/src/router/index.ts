import type { App } from 'vue';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';

export const Layout = () => import('@/layouts/index.vue');

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },

  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/system/user',
    children: [
      {
        path: '401',
        component: () => import('@/views/error/401.vue'),
        meta: { hidden: true }
      },
      {
        path: '404',
        component: () => import('@/views/error/404.vue'),
        meta: { hidden: true }
      }
    ]
  },

  {
    path: '/system/:pathMatch(.*)',
    component: Layout,
    meta: { hidden: true }
  }
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_ROUTE as string),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
