import { defineStore } from 'pinia';
import piniaStore from '@/store/index';

export const baseStore = defineStore('base', {
  state: () => ({
    lang: 'zh',
    test: '123'
  }),
  getters: {},
  actions: {
    setLang(lang: string) {
      this.lang = lang;
    }
  },
  persist: true
});

export function useBaseStore() {
  return baseStore(piniaStore);
}
