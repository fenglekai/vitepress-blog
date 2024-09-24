# 关于清理npx缓存

我在用自己写的包`less-write-changelog`时遇到问题，发现npx`会在本地建立很多缓存在.npm/_npx`下
你可以直接删除这个目录或者使用下面的命令清理。（我是真的代码洁癖啊）

```
npx clear-npx-cache
```

