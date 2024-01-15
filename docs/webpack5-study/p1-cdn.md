---
lang: zh-CN
title: 加更1：使用 CDN
# sidebar: auto
---

## cdn 配置方案

cdn 是一种基于分布式的内容分发系统，可以让用户就近访问 Web 应用所需的静态资源，提高页面加载速度。当我们准备在项目中采用 cdn 时，通常有两种方案：

1. **webpack 同时打包第三方库和业务逻辑**，js、css、静态资源部署到私有 cdn，服务器只存放 html 供用户访问。
2. **webpack 只打包业务逻辑**，第三方库通过公共 cdn 服务注入到页面中，服务器存放 webpack 打包文件。

首先我们要明确 cdn 应该用于生产环境，其次这两种方案的关键点在于**你所在的团队是否有私有 cdn 服务**。在 [优化 webpack](/webpack5-study/optimization.html) 这一节中我们提到过 [tree shaking](/webpack5-study/optimization.html#tree-shaking) 和 [code splitting](/webpack5-study/optimization.html#code-splitting) 的概念，理论上 webpack 同时打包第三方库和业务逻辑生成 js 的体积最小，因此方案一的优化效果最佳但成本高；方案二中公共 cdn 上提供的第三方库都是全量引入的，相对来说加载资源体积会变大但成本低廉。另外需要特别注意的是**公共 cdn 存在稳定性问题，可能会出现间歇性断联导致应用异常的情况**。

## 方案一

在 [Output 输出](/webpack5-study/entry-output.html#默认配置) 中我们提到过一个属性 `publicPath`，这个属性可以设定打包后 js、css、静态资源引入的根路径。我们先来看一下现在 webpack 配置下生产环境的打包结果：

- webpack.config.js

  ```javascript
  // 六.生产环境配置
  const prodConfig = {
    output: {
      publicPath: './'
    }
  }
  ```

运行 build 指令后，查看 dist 目录下的 index.html：

![WX20221230-101402](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212301014929.png)

因为我们在生产环境中将 `publicPath` 设定为一个相对路径，所以 html 引入文件的根路径也是这个相对路径。我们可以将这个属性设置为我们要部署的 cdn 服务路径，继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  // 六.生产环境配置
  const prodConfig = {
    output: {
      publicPath: 'https://cdn.test.com/' // 私有 cdn 路径
    }
  }
  ```

再次运行 build 指令后，查看 dist 目录下的 index.html 中引入的文件路径发生了变化，后续只需要将这些文件上传 cdn 即可：

![WX20221230-102006](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212301020609.png)

::: tip 思考
[后续如何学习](/webpack5-study/end.html#后续如何学习) 提到过大家可以深入了解 webpack 底层机制，自定义 webpack 插件和 loader。在这里我们是否可以开发一个插件，每次打包生产环境后自动将 dist 目录下的文件上传到 cdn 呢？
:::

## 方案二

当我们采用公共 cdn 服务时往往都是从出于成本考虑而不是性能，因此可知我们服务器的资源也是有限的，那么**这种方案最大的价值在于提升服务器可并发的用户数量**。假定服务器吞吐量为 1 M/s，当资源访问量从 200kb 下降到 100kb，理论上同一时间并发的用户数量就会翻倍。

### script 和 link

我们先来回顾一下基础知识，当渲染一个页面时，我们总是希望：

- css 样式在页面出现时就存在，不希望在 css 加载完之前页面就渲染出 dom 节点
- js 逻辑应该在 dom 解析后执行，因为 js 可能会获取并修改 dom 节点
- 多个 js 文件应该按照 `<script>` 标签引入顺序执行

基于上面三点，在传统开发中我们通常会将 `<link>` 标签放在 `<head>` 中，将 `<script>` 标签放在 `<body>` 最后：

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>p1.cdn</title>

    <!-- css 文件加载完之前会阻塞页面渲染，因此页面出现 dom 节点时 css 样式已生效 -->
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <div id="app"></div>

    <!-- js 文件加载完之前会阻塞页面渲染，因此需要放在所有 dom 节点之后，按顺序执行 -->
    <script src="./index1.js"></script>
    <script src="./index2.js"></script>
    <script src="./index3.js"></script>
  </body>
</html>
```

在现代浏览器中，`<script>` 标签支持了 `defer` 属性，对比参数如下：

| 参数                     | 执行时机       | 是否阻塞页面渲染 | 是否顺序执行 |
| :----------------------- | :------------- | :--------------- | :----------- |
| `<script>`               | 加载完毕       | ✔️               | ✔️           |
| `<script defer="defer">` | dom 树构建完毕 | ❌               | ✔️           |
| `<script defer="async">` | 加载完毕       | ❌               | ❌           |

由此可知普通的 `<script>` 标签**只能写在固定位置来保证符合预期**；`async` 是谁先加载完谁执行，不能保证脚本的执行顺序，**只适合不存在依赖关系的脚本**；`defer` 对书写位置没有要求，并且能保证脚本在 dom 解析后按顺序执行，是目前加载脚本的首选。

### externals 忽略打包

在 webpack 中我们可以配置 `externals` 来将某些第三方库排除在打包之外，修改 webpack 配置来忽略 vue3：

- webpack.config.js

  ```javascript
  // 六.生产环境配置
  const prodConfig = {
    externals: {
      vue: 'Vue' // 忽略 import 引入第三方库，例如 vue3
    }
  }
  ```

这里需要解释几点：

1. `externals` 的 key 代表项目中引入的 node_modules 第三方库，**value 代表与公共 cdn 脚本关联的全局变量**。

   ```javascript
   // 这里的 vue 从 node_modules 中引入
   import { createApp } from 'vue'
   ```

2. `externals` 对应的 `externalsType` 默认值为 `var`，一般不需要设置。

运行 build 指令后，查看 dist 目录下的分析报告 analyzer.html，可以看到 vue 没有被打包到 js 文件中：

- 配置前

  ![截屏2022-12-29 13.52.31](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291352923.png)

- 配置后

  ![截屏2022-12-30 11.16.32](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212301116435.png)

### 注入公共 cdn

在忽略掉相关的第三方库后，我们需要扩展 html-webpack-plugin 这个插件，在生成 html 时注入 [公共 cdn](https://www.bootcdn.cn/) 对应的脚本。首先来修改 public 目录下的 html 模版：

- index.html

  ```ejs
  <!DOCTYPE html>
  <html lang="">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title><%= htmlWebpackPlugin.options.title %></title>
      <!-- 注入 cdn js 脚本 -->
      <% htmlWebpackPlugin.options.js.forEach(item => { %>
        <script defer="defer" src="<%= item %>"></script>
      <% }) %>
      <!-- 注入 cdn css 样式 -->
      <% htmlWebpackPlugin.options.css.forEach(item => { %>
        <link rel="stylesheet" href="<%= item %>" />
      <% }) %>
    </head>
    <body>
      <noscript>
        <strong>
          We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
          properly without JavaScript enabled. Please enable it to continue.
        </strong>
      </noscript>
      <div id="app"></div>
      <!-- built files will be auto injected -->
    </body>
  </html>
  ```

这里需要解释几点：

1. html-webpack-plugin 使用的模版应用了 [ejs 语法](https://ejs.bootcss.com/)，感兴趣可以自行学习，这里不再赘述。
2. `htmlWebpackPlugin.options` 是 html-webpack-plugin 暴露的一个公共变量，源自插件实例化时传入的参数，在 ejs 模版上可以访问这个变量。
3. 脚本标签通过 `<script defer="defer">` 方式插入，不熟悉可以回顾一下 [script 和 link](/webpack5-study/p1-cdn.html#script-和-link)。

然后继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  // 二.webpack 插件
  const HtmlWebpackPlugin = require('html-webpack-plugin') // 根据模板生成 html

  // 三.全局变量
  // html-webpack-plugin 公共配置
  const htmlWebpackPluginOptions = {
    template: 'public/index.html', // html 模板位置
    favicon: 'public/favicon.ico', // html favicon 位置
    filename: 'index.html', // html 生成模板名
    chunks: ['main'], // 匹配 entry 的key
    title: 'p1.cdn', // html 标题
    meta: {
      viewport:
        'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no', // html 自适应移动端
      description: 'webpack5从不会到入门' // html 描述
    },
    minify: {
      removeComments: true, // html 删除注释
      collapseWhitespace: true // html 删除空白符与换行符
    }
  }
  // cdn 配置参数
  const cdn = {
    externals: {
      vue: 'Vue', // 忽略 import 引入第三方库，例如 vue3
      'vue-router': 'VueRouter',
      vuex: 'Vuex'
    },
    // html-webpack-plugin 注入 js 脚本，注意需要与 externals 一一对应
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/3.2.45/vue.runtime.global.prod.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vue-router/4.1.6/vue-router.global.prod.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vuex/4.1.0/vuex.global.prod.min.js'
    ],
    // html-webpack-plugin 注入 css 样式
    css: []
  }

  // 五.开发环境配置
  const devConfig = {
    plugins: [
      new HtmlWebpackPlugin({
        ...htmlWebpackPluginOptions,
        // 开发环境通过 node_modules 引入第三方库
        js: [],
        css: []
      })
    ]
  }

  // 六.生产环境配置
  const prodConfig = {
    externals: cdn.externals, // 忽略打包的第三方库
    plugins: [
      new HtmlWebpackPlugin({
        ...htmlWebpackPluginOptions,
        // 生产环境通过 cdn 引入第三方库
        js: cdn.js,
        css: cdn.css
      })
    ]
  }
  ```

这里需要解释几点：

1. cdn 中配置第三方库的 `externals` 和 `js` 要一一对应（包括版本）。
2. 公共 cdn 中常见的脚本类型如下， 通常使用 `global` 类型：

   > **文件名定义**
   >
   > - min：是否压缩混淆，没有代表未压缩混淆
   > - prod：是否生产版，没有代表开发版，包含完整异常调试信息
   > - runtime：是否只含运行时（h 函数），没有代表含有运行时 + 编译器（template 渲染）
   >
   > **global（浏览器全局变量版本）**，通过 `<script src="">` 引用，暴露一个全局变量 `Vue`，常用于 CDN
   >
   > - vue.global.js
   > - vue.global.min.js
   > - vue.global.prod.js
   > - vue.global.prod.min.js
   > - vue.runtime.global.js
   > - vue.runtime.global.min.js
   > - vue.runtime.global.prod.js
   > - vue.runtime.global.prod.min.js
   >
   > **cjs（构建 commonjs 模块版本）**，通过 `require()` 引用，常用于服务端渲染
   >
   > - vue.cjs.js
   > - vue.cjs.min.js
   > - vue.cjs.prod.js
   > - vue.cjs.prod.min.js
   >
   > **esm-browser（浏览器 esm 模块版本）**，通过 `<script type="module">` 引用
   >
   > - vue.esm-browser.js
   > - vue.esm-browser.min.js
   > - vue.esm-browser.prod.js
   > - vue.esm-browser.prod.min.js
   > - vue.runtime.esm-browser.js
   > - vue.runtime.esm-browser.min.js
   > - vue.runtime.esm-browser.prod.js
   > - vue.runtime.esm-browser.prod.min.js
   >
   > **esm-bundler（构建 esm 模块版本）**，通过打包工具引用（webpack、rollup）
   >
   > - vue.esm-bundler.js
   > - vue.esm-bundler.min.js
   > - vue.runtime.esm-bundler.js
   > - vue.runtime.esm-bundler.min.js

运行 build 指令后，查看 dist 目录下的分析报告，**可以看到 vue、vue-router、vuex 没有被打包到 js 文件中，公共 cdn 的脚本也已经成功注入到 index.html 中**：

- analyzer.html

  ![截屏2022-12-30 12.36.06](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212301236489.png)

* index.html

  ![WX20221230-130127](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212301301485.png)

## 本节代码

> [p1.cdn](https://gitee.com/aodazhang/webpack5-study/blob/master/p1.cdn/webpack.config.js)
