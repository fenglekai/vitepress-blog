# npm命令

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

