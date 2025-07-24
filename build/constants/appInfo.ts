import {
  name,
  version,
  engines,
  dependencies,
  devDependencies
} from '../../package.json';

// 平台的名称、版本、运行所需的 node 版本、依赖、构建时间的类型提示
export const APP_INFO = {
  pkg: { name, version, engines, dependencies, devDependencies },
  buildTimestamp: Date.now()
};
