# Grunt构建NPM项目

从创建到发布一个基于`grunt`任务流的`npm`包

关键词：`grunt`,`npm`,`webpack`,`babel`,`html`

## 初始化项目

新建`my-project`文件夹并进入文件夹输入命令：

```
npm init
```

按照提示输入对应信息，当然你可以一直回车，你的根目录下会生成一个`package.json`

```
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## 编写入口文件

创建一个`src`目录，接着在其目录下创建`index.js`，编写入口方法

```
function index() {
    console.log("entry");
    const result = "send something"
    return result
}

export default index
```

## 安装Grunt

我们项目基于`grunt`任务运行器，所以我们优先安装，详细配置可[查看官网](https://gruntjs.com/)

```
npm install --save-dev grunt

npm install --save-dev grunt-contrib-uglify
```

**注意：我们的依赖除非有在js中有导入，否则都会安装在`devDependencies`开发依赖中**

## 编写Grunt配置文件

在根目录新建`gruntfile.js`

```
module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true,
      },
      build: {
        files: {
          "lib/<%= pkg.name %>.min.js": ["src/*.js"],
        },
      },
    },
  });

  grunt.registerTask("default", ["uglify"]);
};
```

`grunt-contrib-uglify`可以把你的代码压缩，之后在`package.json`配置构建命令：

```
{
  "scripts": {
    "build": "grunt"
  }
}
```

运行`npm run build`构建生成`lib`目录，到这里我们已经准备好一个`npm`发布包了。

## NPM发布

在发布之前我们把需要的配置项给准备好，我直接贴出完整的配置项。

```
{
  "name": "@fenglekai/my-project",
  "version": "1.0.0",
  "description": "",
  "main": "lib/my-project.min.js",
  "files": [
    "lib/",
    "src/"
  ],
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "grunt"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "grunt": "^1.6.1",
    "grunt-contrib-uglify": "^5.2.2"
  }
}
```

主要的配置项为`files`,`main`,`publishConfig`

- `files` 需要上传到npm的文件
- `main` 应用的主入口
- `publishConfig` 推送时的配置项

之后使用`npm publish`命令推送。

如果你还没有`npm`账号需要去[官网](https://www.npmjs.com)注册，然后命令行使用`npm login`登录即可。

到这里，你已经完成一次`npm`包的分享快去项目里使用吧~

## 整体目录结构

```
.
├── gruntfile.js
├── lib
│   ├── my-project.min.js
│   └── my-project.min.js.map
├── package.json
├── package-lock.json
└── src
    └── index.js
```

更多详细过程可以参考链接：

> [超详细 如何发布自己的 npm 包](https://juejin.cn/post/7039140144250617887)
>
> [npm 发包者必读](https://juejin.cn/post/6844903870678695943)

### 你可能会遇到的问题

1. 包名重复导致无法上传

   ```
   npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/my-project - You do not have permission to publish "my-project". Are you logged in as the correct user?
   ```

   这是因为npm的包名必须独一无二，所以你需要在[NPM](https://www.npmjs.com)上搜索有没有与你包名相同的，最简单的办法是在包名前面加上`@<your-name>/`这可以大大降低包名重复的问题

2. 私有包无法上传，需要付费服务

   ```
   npm ERR! 402 Payment Required - PUT https://registry.npmjs.org/@fenglekai%2fmy-project - You must sign up for private packages
   ```

   需要上传的时候设置为公开：

   ```
   npm publish --access=public
   
   // or
   
   // package.json
   "publishConfig": {
     "access": "public"
   }
   ```

## 进阶配置

有时候我们需要在包下进行简单的浏览器交互测试，但是又不想去安装`vue`,`react`等框架的内容。

如何在`npm`包项目下使用`html`启用简单的web服务？

我这里提供一个自己写的示例关于excel导出的`npm`包，它带有babel转译与`webpack`打包构建`dev-server`服务，没有多余的配置结构很清晰。[awesome-excel](https://www.npmjs.com/package/awesome-excel)

