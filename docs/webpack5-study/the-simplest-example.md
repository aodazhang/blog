---
lang: zh-CN
title: 2.最简单的示例
# sidebar: auto
---

## 刀耕火种的年代

在聊 webpack 之前，先回顾一下原始的 H5 是如何开发的：

- index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>1.the-simplest-example</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="./index.js"></script>
    </body>
  </html>
  ```

- index.js

  ```javascript
  var app = document.getElementById('app')

  var header = document.createElement('div')
  header.innerText = 'header'
  app.appendChild(header)

  var main = document.createElement('div')
  main.innerText = 'main'
  app.appendChild(main)

  var footer = document.createElement('div')
  footer.innerText = 'footer'
  app.appendChild(footer)
  ```

通常情况下我们会将逻辑写在某个 js 文件，然后在 html 中通过 `<script>` 标签引入。**这种开发思想是面向过程的，随着逻辑增加和需求变更，js 文件会越来越不可维护**。

接下来我们采用面向对象的思想来改造一下上面的代码，将 `header`、`main`、`footer` 分散到三个不同的文件中，让每个对象中的逻辑高度内聚：

- index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>1.the-simplest-example</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="./header.js"></script>
      <script src="./main.js"></script>
      <script src="./footer.js"></script>
      <script src="./index.js"></script>
    </body>
  </html>
  ```

- header.js

  ```javascript
  function Header() {
    var header = document.createElement('div')
    header.innerText = 'header'
    app.appendChild(header)
  }
  ```

- main.js

  ```javascript
  function Main() {
    var main = document.createElement('div')
    main.innerText = 'main'
    app.appendChild(main)
  }
  ```

- footer.js

  ```javascript
  function Footer() {
    var footer = document.createElement('div')
    footer.innerText = 'footer'
    app.appendChild(footer)
  }
  ```

- index.js

  ```javascript
  var app = document.getElementById('app')
  new Header()
  new Main()
  new Footer()
  ```

看起来似乎好一些，但实际上这种开发方式带来了新的问题：

1. H5 加载资源的 http 请求变多，浏览器对于 http1.1 在同一时间开启的 tcp 信道数量有限，过多的静态资源请求会阻塞页面加载。

   ```html
   <!-- 面向过程时有一个 js 文件 -->
   <script src="./index.js"></script>

   <!-- 面向对象时有多个 js 文件 -->
   <script src="./header.js"></script>
   <script src="./main.js"></script>
   <script src="./footer.js"></script>
   <script src="./index.js"></script>
   ```

2. 每个 js 文件之间都是通过 html 弱关联的，变量来源不清晰，代码可读性很差。

   ```javascript
   function Header() {
     var header = document.createElement('div')
     header.innerText = 'header'
     // app 是某不知名全局变量
     app.appendChild(header)
   }
   ```

3. 多个 js 文件之间存在引入顺序，出现错误不易排查。

   ```html
   <script src="./header.js"></script>
   <script src="./index.js"></script>
   <!-- index.js 中调用 Main、Footer 时这两个js文件尚未加载，因此没效果 -->
   <script src="./main.js"></script>
   <script src="./footer.js"></script>
   ```

还好 ES6 为我们提供了 ESModule 的方案，让我们可以采用更佳的方式管理多个 js 文件：

- index.js

  ```javascript
  /**
   * 使用 ESM 方式引入：
   * 1.不需要在index.html中引入多个js文件，页面加载变快
   * 2.变量来源清晰可读
   * 3.不存在文件引入顺序的问题
   */
  import Header from './header.js'
  import Main from './main.js'
  import Footer from './footer.js'

  var app = document.getElementById('app')
  new Header()
  new Main()
  new Footer()
  ```

这个方案看似完美无缺了，但是最致命的 **ESM 在浏览器上兼容性并不好**，碰巧你公司标机的 chrome 都是 60 的...

![截屏2022-12-26 10.19.51](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212261020894.png)

这个时候我们可能要寻求更加现代的 H5 打包解决方案，webpack 应运而生。

## 向 webpack 迈进

### 初始化 npm

首先确保你本地安装了 [node](https://nodejs.org/zh-cn/download/)，然后执行下面指令初始化 npm，执行后目录下多了一个 package.json 的文件：

```shell
npm init -y
```

- package.json

  ```json
  {
    "name": "1.the-simplest-example",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
  ```

npm 最常用的功能就是安装依赖和运行脚本：

```shell
# 安装依赖到 dependencies
npm i 依赖名 -S
# 安装依赖到 devDependencies
npm i 依赖名 -D
# 运行脚本
npm run 脚本名
```

这里需要注意的是**脚本名对应 package.json 中的 scripts 字段**，你可以自定义任何脚本名。

### 使用 webpack

使用 webpack5 需要安装下面两个依赖：

```shell
npm i webpack webpack-cli -D
```

| 依赖        | 版本    | 作用                             |
| :---------- | :------ | :------------------------------- |
| webpack     | ^5.75.0 | webpack 核心模块                 |
| webpack-cli | ^5.0.0  | webpack 命令行工具，提供各类指令 |

首先创建一个 src 目录，将相关的代码都放在里面：

![截屏2022-12-26 16.51.00](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212261651059.png)

然后修改 npm scripts，新增一条 dev 指令：

- package.json

  ```json
  "scripts": {
  	"dev": "webpack ./src/index.js"
  }
  ```

这条指令的含义是以 package.json 文件所在位置作为起始路径，寻找下面 src 目录中的 index.js 作为**入口 js 文件，使用 webpack 编译该文件**。运行该指令后，我们可以看到在同目录下生成了一个 dist 文件夹，里面是编译好的 js 文件：

```shell
npm run dev
```

![截屏2022-12-26 16.52.58](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212261653401.png)

最终我们可以在 html 中引入该文件，就可以看到跟之前一样的效果了：

- index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>1.the-simplest-example</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="../dist/main.js"></script>
    </body>
  </html>
  ```

## 本节代码

> [1.the-simplest-example](https://gitee.com/aodazhang/webpack5-study/tree/master/1.the-simplest-example)
