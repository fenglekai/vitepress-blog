# PNPM管理

## 关于monorepo配置

> monorepo是一种单个仓库多个子项目的工作空间管理

项目根目录创建`pnpm-workspace.yaml`声明工作空间

```yaml
packages:
  - 'packages/*'
  - 'examples/*'
```

### 添加依赖到某个工作区

```shell
# package => 包名
# workspace => 工作区名，等同于package.json下的name
pnpm add <package> -F <workspace>
```

### 运行工作区下的脚本

在`package.json`下添加scripts

```
"scripts": {
    "dev": "pnpm -C examples/vue-app dev"
},
```

命令运行examples/vue-app/package.json下的scripts对应的dev脚本

### 在子项目路径下安装全局依赖

```
pnpm add <package> -w
```

依赖添加到与`pnpm-workspace.yaml`同级的`package.json`中
