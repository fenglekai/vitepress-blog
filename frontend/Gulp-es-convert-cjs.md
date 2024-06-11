# Gulp 关于转换es为cjs

> 在gulp@^4

```
gulp --require @esbuild-kit/cjs-loader -f gulpfile.js
```

> 在gulp@^5

```
gulp --preload @esbuild-kit/cjs-loader -f gulpfile.js
```

