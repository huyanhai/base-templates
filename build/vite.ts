import vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import UnoCSS from 'unocss/vite';
import { UserConfig } from 'vite';
import { NEED_CDN_PKGS, formateCdnInfo } from './constants';
import { createHtmlPlugin } from 'vite-plugin-html';
import pluginExternal from 'vite-plugin-external';

export const plugins = [
  vue(),
  UnoCSS(),
  // API 自动导入
  AutoImport({
    // 导入 Vue 函数，如：ref, reactive, toRef 等
    imports: ['vue', '@vueuse/core', 'pinia', 'vue-router', 'vue-i18n'],
    resolvers: [
      // 导入 Element Plus函数，如：ElMessage, ElMessageBox 等
      ElementPlusResolver({ importStyle: 'sass' })
    ],
    eslintrc: {
      enabled: false,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true
    },
    vueTemplate: true,
    // 导入函数类型声明文件路径 (false:关闭自动生成)
    // dts: true
    dts: 'typings/auto-imports.d.ts'
  }),
  // 组件自动导入
  Components({
    resolvers: [
      // 导入 Element Plus 组件
      ElementPlusResolver({ importStyle: 'sass' })
    ],
    // 指定自定义组件位置(默认:src/components)
    dirs: ['src/components', 'src/**/components'],
    // 导入组件类型声明文件路径 (false:关闭自动生成)
    // dts: true
    dts: 'typings/components.d.ts'
  }),
  pluginExternal(NEED_CDN_PKGS)
];

export function useCdn() {
  return createHtmlPlugin({
    inject: {
      data: {
        title: 'test',
        description: ''
      },
      tags: formateCdnInfo()
    },
    minify: 'terser'
  });
}

export function build(isProduction: boolean): UserConfig['build'] {
  return {
    chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
    minify: isProduction ? 'terser' : false, // 只在生产环境启用压缩
    terserOptions: isProduction
      ? {
          compress: {
            keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
            drop_console: true, // 生产环境去除 console.log, console.warn, console.error 等
            drop_debugger: true, // 生产环境去除 debugger
            pure_funcs: ['console.log', 'console.info'] // 移除指定的函数调用
          },
          format: {
            comments: false // 删除注释
          }
        }
      : {},
    rollupOptions: {
      output: {
        // manualChunks: {
        //   "vue-i18n": ["vue-i18n"],
        // },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: (assetInfo) => {
          const info = assetInfo.names[0].split('.');
          let extType = info[info.length - 1];
          if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(extType || '')
          ) {
            extType = 'media';
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(extType || '')) {
            extType = 'img';
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(extType || '')) {
            extType = 'fonts';
          }
          return `${extType}/[name].[hash].[ext]`;
        }
      },
      external: isProduction ? Object.keys(NEED_CDN_PKGS) : []
    }
  };
}
