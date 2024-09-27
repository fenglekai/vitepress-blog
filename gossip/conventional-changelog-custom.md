# 关于客制化Conventional Changelog

当初想着conventional-changelog太棒了，自动生成文档、清晰的看到每个版本的变动信息，但是在看过源码然后再配置的时候，我是真的有点想骂脏话的冲动了。

1. 因为我是直接在github上看源码的，项目下packages下非常多的包。每个包的功能虽然相对独立，但是关联性又很强。比如：core核心库，我想用他的options.config配置去设置预设，但是其中的`parser`、`writer`配置项又对应`conventional-commits-parser`、`conventional-changelog-writer`中的选项，我又要跳到对应的包README去看API

2. core的config api说明不全/ts声明也是隐晦难懂层层嵌套

   > This should serve as default values for other arguments of `conventionalChangelogCore` so you don't need to rewrite the same or similar config across your projects. Any value in this could be overwritten. If this is a promise (recommended if async), it should resolve with the config. If this is a function, it expects a node style callback with the config object. If this is an object, it is the config object. The config object should include `context`, `gitRawCommitsOpts`, `parserOpts` and `writerOpts`.
   >
   > 这应该作为 conventionalChangelogCore 其他参数的默认值，因此您无需在项目中重写相同或相似的配置。其中的任何值都可以被覆盖。如果这是一个承诺（如果是异步则建议），它应该使用配置进行解析。如果这是一个函数，它期望使用配置对象进行节点样式回调。如果这是一个对象，它就是配置对象。配置对象应包括 context、gitRawCommitsOpts、parserOpts 和 writerOpts。

   

## config配置

说明提供的配置是

```js
conventionalChangelogCore(
  {
    config: {
    	context: {},
    	gitRawCommitsOpts: {},
    	parserOpts: {},
    	writerOpts: {},
    },
  },
)
```

实际我使用的配置

```js
export default async function createPreset(useHeader = true) {
  return {
    parser: createParserOpts(),
    writer: await createWriterOpts(useHeader),
    commits: gitRawCommitsOpts,
    whatBump,
  };
}

conventionalChangelogCore(
  {
    config: createPreset(),
    releaseCount: 0,
    outputUnreleased: false,
  }
)
```

最后看源码才知道config接收的参数只有四个，在merge-config.js被使用替换

```js
conventionalChangelogCore(
  {
    config: {
    	context: {},
    	commits: {},
    	parser: {},
    	writer: {},
    },
  },
)
```

那么问题来了whatBump在哪？