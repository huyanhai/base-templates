import {
  registerMicroApps,
  start,
  RegistrableApp,
  initGlobalState,
  FrameworkLifeCycles
} from 'qiankun';

// 初始化全局状态
export const globalState = initGlobalState({
  user: null,
  theme: 'light',
  language: 'zh-CN'
});

// 监听全局状态变更
globalState.onGlobalStateChange((state, prev) => {
  console.log('全局状态变更：', state, prev);
});

// 全局生命周期钩子
const lifeCycles: FrameworkLifeCycles<any> = {
  beforeLoad: async (app: any) => {
    console.log('before load app', app.name);
  },
  beforeMount: async (app: any) => {
    console.log('before mount app', app.name);
  },
  afterMount: async (app: any) => {
    console.log('after mount app', app.name);
  },
  beforeUnmount: async (app: any) => {
    console.log('before unmount app', app.name);
  },
  afterUnmount: async (app: any) => {
    console.log('after unmount app', app.name);
  }
};

// 注册微应用
export const registerApps = async () => {
  const response = await fetch(
    `/${import.meta.env.VITE_USE_SUB_CONFIG_FILE_NAME}.json`
  );
  const file = await response.json();

  // 获取微应用配置
  const microApps: RegistrableApp<any>[] = file.map((item: any) => {
    return {
      name: item.name,
      entry: item.entry,
      container: '#subapp-viewport',
      activeRule: item.activeRule,
      props: {
        globalState,
        mainStore: (window as any).__MAIN_STORE__,
        cssIsolation: true // 启用样式隔离
      }
    };
  });
  registerMicroApps(microApps, lifeCycles);
};

// 启动 qiankun
export const startApps = (): void => {
  start({
    prefetch: false,
    sandbox: { experimentalStyleIsolation: true }
  });
};
