import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

import qiankun from 'vite-plugin-qiankun';

import { plugins, build, include } from '../../build';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === 'production';

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: +env.VITE_APP_PORT,
      open: true,
      proxy: {
        // 代理 /dev-api 的请求
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 代理目标地址：https://api.youlai.tech
          target: env.VITE_APP_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    plugins: [
      ...plugins,
      qiankun('system', {
        useDevMode: true
      })
    ],
    // 预加载项目必需的组件
    optimizeDeps: {
      include
    },
    build: build(isProduction)
  };
});
