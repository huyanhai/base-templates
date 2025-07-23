import { createApp, App as TApp } from 'vue';
import App from './App.vue';

import { setupPinia } from '@/store/index';
import { setupI18n } from '@/locales';
import { setupRoute, router } from '@/router';
import { setupRouterGuard } from '@/router/guard';

import { setupNProgress } from '@/plugins/nprogress';
import './assets/index.css';

import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper';

let app: TApp<Element> | null = null;
async function bootstrap() {
  app = createApp(App);
  await setupI18n(app);

  setupRoute(app);
  setupPinia(app);
  setupRouterGuard(router);
  setupNProgress();

  app.mount('#app-child');
  return app;
}

renderWithQiankun({
  async bootstrap() {
    console.log('system-app bootstraped');
  },
  async mount(props: any) {
    console.log('system-app mount', props);
    await bootstrap();
  },
  async unmount() {
    console.log('system-app unmount');
    app?.unmount();
    app = null;
  },
  // 添加 update 生命周期函数
  async update(props: any) {
    console.log('system-app update', props);
  }
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  bootstrap();
}
