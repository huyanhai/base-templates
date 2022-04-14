import { createApp } from 'vue';
import App from './App.vue';

import { setupPinia } from '@/store/index';
import { setupI18n } from '@/locales';
import { setupRoute, router } from '@/router';
import { setupRouterGuard } from '@/router/guard';

import { setupNProgress } from '@/plugins/nprogress';

import 'tailwindcss/tailwind.css';

async function bootstrap() {
  const app = createApp(App);

  setupRoute(app);
  setupPinia(app);
  await setupI18n(app);
  setupRouterGuard(router);
  setupNProgress();

  app.mount('#app');
}

bootstrap();
