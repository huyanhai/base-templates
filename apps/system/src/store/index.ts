import type { App } from 'vue';
import { createPinia } from 'pinia';
import persistPlugin from 'pinia-plugin-persistedstate';

export * from './modules/base';
// import here

const pinia = createPinia();

export const setupPinia = (app: App) => {
  pinia.use(persistPlugin);
  app.use(pinia);
};

export default pinia;
