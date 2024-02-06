import type { Router } from 'vue-router';

import { useTitle } from '@vueuse/core';
import { useNProgress } from '@/plugins/nprogress';
import { i18n } from '@/locales';

// 页面进度条
function setProgress(router: Router) {
  const { NProgressStart, NProgressDone } = useNProgress();
  router.beforeEach(async () => {
    NProgressStart();
  });
  router.afterEach(async () => {
    NProgressDone();
  });
}

// 页面标题
function setTitle(router: Router) {
  router.afterEach((to) => {
    const { title } = to.meta;
    const { t } = i18n.global;
    if (title) {
      useTitle().value = (t as any)(title as never);
    }
  });
}

// 初始化页面title
function initTitle(router: Router) {
  const title = router.currentRoute.value.meta.title;
  const { t } = i18n.global;
  title && (useTitle().value = (t as any)(title as never));
}

export function setupRouterGuard(router: Router) {
  initTitle(router);
  setProgress(router);
  setTitle(router);
}
