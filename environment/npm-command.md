# NPM命令

### 安装依赖

```
npm install
// or
npm i
```

### 从package-lock.json安装依赖

```
npm clean-install
// or
npm ci
```

### npm代理设置

```
npm config set proxy http://127.0.0.1:8002
npm config set https-proxy http://127.0.0.1:8002
```

### npm有验证的代理设置

```
npm config set proxy http://username:password@127.0.0.1:8002
npm confit set https-proxy http://username:password@127.0.0.1:8002
```

### npm查看代理设置

```
npm config get or npm config list
```

### npm删除代理设置

```
npm config delete proxy and npm config delete https-proxy
```

### npx提示版本过旧，需要npm、yarn全局删除依赖

```
# 可能是因为npx的缓存问题，清除缓存就好了
npx clear-npx-cache
```



## npm发包相关

> 转载于[npm 发包者必读](https://juejin.cn/post/6844903870678695943)

### npm更新版本

```
// version = v1.0.0
npm version patch
// v1.0.1
npm version prepatch
// v1.0.2-0
npm version minor
// v1.1.0
npm version major
// v2.0.0
```

### npm修改tag

```
// 不小心发错了
latest: 1.0.1-beta.0
// 将1.0.1-beta.0设置为beta
npm dist-tag add my-package@1.0.1-beta.0 beta
npm dist-tag add my-package@1.0.0 latest
```