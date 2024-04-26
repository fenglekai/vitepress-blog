# Electron构建桌面应用

为解决前端部署到其他主机复杂步骤（比如：docker部署，`nginx`部署），直接构建桌面应用打开即用，用户操作简单便捷的部署方案。

基于[react-big-screen](https://gitee.com/MTrun/react-big-screen)框架二次开发构建

## 使用环境

- 本机使用的是`Deepin` 20.6，基于`Debian` 10.10底层。
- Node 12.22.12
- React 16.2.0
- data-view-react 1.2.4
- Electron 11.5.0
- Electron-builder 22.10.5
- wine 7.0

## 开始构建

> Electron官方文档：https://www.electronjs.org/zh/docs/latest/

### 安装依赖

```shell
npm install -D electron@11.5.0
npm install -D electron-builder@22.10.5
```

这里主要是为了配合之前项目框架的Node版本做了匹配，高版本会出现很多错误。

### 创建Electron入口文件

参考网上教程创建`main.js`在根目录

```js
// 引入electron并创建一个Browserwindow
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

// 获取在 package.json 中的命令脚本传入的参数，来判断是开发还是生产环境
const mode = process.argv[2];

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;

function createWindow() {
  //创建浏览器窗口,宽高自定义
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.on("resize", () => {
    mainWindow.reload();
  });
  if (mode === "dev") {
    // 加载应用----适用于 react 项目
    mainWindow.loadURL("http://localhost:9001/");
  } else {
    // 加载应用-----react项目打包后的路径
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "./dist/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  // 打开开发者工具，默认不打开
  // mainWindow.webContents.openDevTools()
  // 关闭window时触发下列事件.
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on("ready", createWindow);
// 所有窗口关闭时退出应用.
app.on("window-all-closed", function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});
```



### 修改package.json文件

新增几个关键项

```json
{
  "name": "project name",
  "version": "0.1.0",
  "homepage": "./",
  "main": "main.js",
  "scripts": {
    "electron-start": "electron . dev",
    "electron": "electron .",
    "build-win64": "electron-builder --win --x64",
    "build-linux": "electron-builder --linux",
    "build-mac": "electron-builder --mac"
  },
  "build": {
    "productName": "productName",
    "appId": "appId",
    "copyright": "",
    "directories": {
      "buildResources": "./",
      "output": "build"
    },
    "files": [
      "dist/**/*",
      "node_modules/**/*",
      "main.js"
    ],
    "win": {
      "icon": "./dist/favicon.ico",
      "target": [
        "nsis"
      ]
    },
    "linux": {
      "icon": "./dist/icon.png"
    },
    "mac": {
      "icon": "./dist/icon.png"
    },
    "nsis": {
      "installerIcon": "dist/favicon.ico",
      "uninstallerIcon": "dist/favicon.ico",
      "uninstallDisplayName": "卸载这个软件",
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "allowElevation": true,
      "createDesktopShortcut": true
    }
  }
}
```

### 运行项目

#### 开发模式

需要开启两个命令窗口

```shell
npm run start
```

这里注意要修改`main.js`下的`mainWindow.loadURL("http://localhost:9001/");`需要修改成你正在运行项目的端口

```shell
npm run electron-start
```

#### 预览模式

首先打包react项目

```shell
npm run build
```

这里也是需要注意对应打包文件的路径`pathname: path.join(__dirname, "./dist/index.html"),`

```shell
npm run electron
```

## 构建打包应用

这里使用的electron-builder，原因是与electron-force和electron-packager比较下`npm`周下载量多。

```shell
# windows
npm run build-win64
# linux
npm run build-linux
# mac
npm run build-mac
```

通过相应的命令可以构建出对应系统的应用，mac的构建还未尝试过，有需要的可以去找相关教程。

打包需要的配置主要是在package.json下的build字段,上面已经贴出配置了。需要注意的是ico格式转换和大小问题。

## wine安装教程

打包`exe`文件使用到的应用

> [deepin20.6安装wine7.0](https://blog.csdn.net/qq_40489522/article/details/125289723)

这篇文章教程非常详细，按照步骤安装就行。

## 遇到问题

1. `ico`文件不能通过`png`文件直接替换后缀。需要找个在线生成ico进行转换
2. Linux，Mac使用`png`格式的icon
3. icon大小需要256 x 256
4. Linux下的`exe`文件只能在`~/.wine/drive_c`目录下运行