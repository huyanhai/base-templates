import type { ISyncRoute } from '../types';

import { lazy } from 'react';

export const routes: ISyncRoute[] = [
  {
    path: '/',
    component: lazy(() => import('@/layouts/Index')),
    meta: {
      title: '首页',
      auth: true
    },
    children: [
      {
        path: 'login',
        component: lazy(() => import('@/views/Login')),
        meta: {
          title: '登录',
          auth: false
        }
      },
      {
        path: 'home',
        component: lazy(() => import('@/views/Home')),
        meta: {
          title: '首页',
          auth: true
        }
      },
      {
        path: 'about',
        component: lazy(() => import('@/views/About')),
        meta: {
          title: '关于',
          auth: true
        }
      }
    ]
  },
  {
    path: '/403',
    component: lazy(() => import('@/views/403')),
    meta: {
      title: '403',
      auth: false
    }
  },
  {
    path: '/404',
    component: lazy(() => import('@/views/404')),
    meta: {
      title: '404',
      auth: false
    }
  }
];
