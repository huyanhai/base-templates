import { HtmlTagDescriptor } from 'vite';
import { APP_INFO } from './appInfo';

// 需要走cdn的包
export const NEED_CDN_PKGS = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  'vue-i18n': 'VueI18n',
  pinia: 'Pinia',
  axios: 'axios',
  dayjs: 'dayjs'
};

const injectType: Record<
  'js' | 'css',
  (attrs: Record<string, string>) => HtmlTagDescriptor
> = {
  js: (attrs) => ({
    tag: 'script',
    injectTo: 'body',
    attrs: {
      ...attrs
    }
  }),
  css: (attrs) => ({
    tag: 'link',
    injectTo: 'head',
    attrs: {
      rel: 'stylesheet',
      ...attrs
    }
  })
};

export function formateCdnInfo() {
  const cdnLists: HtmlTagDescriptor[] = [];
  const keys = Object.keys(APP_INFO.pkg.dependencies).sort((a, b) =>
    a === 'vue' ? -1 : b === 'vue' ? 1 : 0
  );

  for (const key of keys) {
    const version =
      APP_INFO.pkg.dependencies[
        key as keyof (typeof APP_INFO)['pkg']['dependencies']
      ];

    if (NEED_CDN_PKGS[key as keyof typeof NEED_CDN_PKGS]) {
      cdnLists.push(
        injectType.js({
          src: `https://cdn.jsdelivr.net/npm/${key}@${version}`
        })
      );
    }
  }
  return cdnLists;
}
