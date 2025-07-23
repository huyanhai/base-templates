import { defineStore } from 'pinia';
import piniaStore from '@/store/index';

interface BaseState {
  lang: string;
  test: string;
}

export const baseStore = defineStore('base', {
  state: (): BaseState => ({
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
