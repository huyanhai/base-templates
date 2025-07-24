# Monorepo

## 基于 pnpm 的 Monorepo

## 初始化

```
pnpm init
```

## 全局依赖管理

```
pnpm [add | remove] <package_name> -w
```

## 全局安装本地依赖

```
pnpm add @<packages_name>/<workspace_name> -w
```

## 指定 packages 依赖管理

```
pnpm [add | remove] <package_name> --filter @<packages_name>/<workspace_name>
```

## 添加项目目录

```
pnpm gen <workspace_name>
```

## 运行指定项目指定命令

```
pnpm run -C packages/<workspace_name> <command_name> 或者 pnpm run pkg <workspace_name> <command_name>

pnpm run pkg demo test
```

## 将子包安装到根目录
```
pnpm add 子包 --workspace -w
```

## 开发规范

- vue 组件使用 PascalCase(首写字母大写)命名
- vue 组件内使用组件时，采用 kebab-case(短横线分割)命名
- ts/js 文件使用 camelCase (首写字母小写)命名
- 静态资源 使用 kebab-case(短横线分割)命名
- 文件夹使用 kebab-case(短横线分割)命名
