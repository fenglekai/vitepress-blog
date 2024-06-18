# 使用Gulp+Rollup构建组件库



## 遇到的问题

### Gulp 关于转换es为cjs

> 在gulp@^4

```
gulp --require @esbuild-kit/cjs-loader -f gulpfile.js
```

> 在gulp@^5

```
gulp --preload @esbuild-kit/cjs-loader -f gulpfile.js
```

### vue打包后存在@vue/runtime-dom依赖

rollup构建后出现node_modules依赖项@vue/runtime-dom，在ts转js后没有正确的使用vue，而是使用了@vue/runtime-dom。

解决办法: 在需要构建子项目的`package.json`中添加peerDependencies依赖

```json
{
    "peerDependencies": {
    	"vue": "^3.4.27"
    }
}
```

