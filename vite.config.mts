import {
  ConfigEnv,
  defineConfig,
  HtmlTagDescriptor,
  loadEnv,
  UserConfig
} from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import babel from '@rollup/plugin-babel';
import { createHtmlPlugin } from 'vite-plugin-html';
import externalGlobals from 'rollup-plugin-external-globals';

const external = {
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

const jsLink = [
  `https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.global.min.js`,
  `https://cdn.jsdelivr.net/npm/axios@1.7.9/dist/axios.min.js`,
  `https://cdn.jsdelivr.net/npm/vue-router@4.5.0/dist/vue-router.global.min.js`,
  `https://cdn.jsdelivr.net/npm/vue-i18n@11.0.1/dist/vue-i18n.global.min.js`,
  `https://cdn.jsdelivr.net/npm/vue-demi@0.14.10/lib/index.iife.min.js`,
  `https://cdn.jsdelivr.net/npm/pinia@2.3.1/dist/pinia.iife.min.js`
];

const cssLink = [];

const externalCDN: HtmlTagDescriptor[] = [
  ...jsLink.map((str) => injectType.js({ src: str })),
  ...cssLink.map((str) => injectType.css({ href: str }))
];

/** @type {import('vite').UserConfig} */
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_APP_BASE_API, VITE_APP_BASE_HOST } = loadEnv(
    mode,
    process.cwd()
  );

  const isDev = mode === 'development';
  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      vue(),
      babel({ babelHelpers: 'bundled' }),
      !isDev &&
        createHtmlPlugin({
          inject: {
            data: {
              title: 'test',
              description: ''
            },
            tags: externalCDN
          },
          minify: 'terser'
        })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      hmr: { overlay: false },
      port: 8090,
      open: false,
      cors: false,
      host: '0.0.0.0',
      proxy: {
        [VITE_APP_BASE_API]: {
          target: VITE_APP_BASE_HOST,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${VITE_APP_BASE_API}`), '')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames(chunkInfo) {
            if (chunkInfo.name?.endsWith('.css')) {
              return 'css/[name]-[hash].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          },
          // manualChunks(id) {
          //   if (id.includes('react')) {
          //     return 'react';
          //   }
          //   return 'other';
          // },
          // 小于5m尝试合并
          experimentalMinChunkSize: 5 * 1024
        },
        external: Object.keys(external),
        plugins: [externalGlobals(external)]
      }
    }
  });
};
