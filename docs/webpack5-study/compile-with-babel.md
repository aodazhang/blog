---
lang: zh-CN
title: 5.使用 Babel 编译
# sidebar: auto
---

## 无法回避的兼容性

之前我们利用 webpack 打包输出了 js 文件，但实际上 webpack 只能处理一些最简单的 js 语法，例如 ESM，对于复杂的 js 语法就无能为力了。我们看下 webpack 是如何处理 ES6 之后的代码：

```javascript
// 1.ES6 的常量与变量
const a = 1
let b = '2'
b = '3'
console.log(a, b)

// 2.ES6 的 class 语法
class Main {
  constructor(data) {
    this.data = data
  }
  getData() {
    return this.data
  }
}
new Main()

// 3.ES6 的 Promise 语法
const promise = new Promise((resolve, reject) => {
  const image = new Image()
  image.src =
    'https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212241148411.jpg'
  image.onload = () => resolve(image)
  image.onerror = e => reject(e)
})

// 4.ES8 的 async、await 语法
async function loadImage() {
  const image = await promise
  console.log(image)
}
loadImage()

// 5.ES10 的 flat 语法
;[1, [2, 3], [4, 5, [6, 7]]].flat(2)
```

![截屏2022-12-27 09.45.38](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212270945472.png)

从上面的编译结果可知，webpack 对于高版本的 ES 语法是不做任何处理输出的，高版本的 ES 语法和 API 在部分浏览器上兼容性很差。而兼容性是前端近几年无法回避的问题，**你不能要求所有人都使用最新的 chrome 来访问你的页面**，总会有部分用户主动或被动的选择了非主流浏览器。幸运的是，[Babel](https://www.babeljs.cn/docs/) 可以帮助我们轻松的处理相关问题。Babel 在编译层面实际上做了两件事：

- 将高版本的 ES 语法转换成 ES5 或更低
- 将高版本的 ES API 通过 polyfill 的形式兼容低版本浏览器

## 使用 Babel

在 webpack 中使用 Babel 需要安装下面四个依赖：

```shell
npm i core-js -S
npm i @babel/core @babel/preset-env babel-loader -D
```

| 依赖              | 版本    | 作用                                                                                                                           |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------- |
| babel-loader      | ^9.1.0  | babel 和 webpack 之间的桥接层<br />如果单独使用 babel 执行编译，这里替换成 [@babel/cli](https://www.babeljs.cn/docs/babel-cli) |
| @babel/core       | ^7.20.7 | babel 核心模块                                                                                                                 |
| @babel/preset-env | ^7.20.2 | babel 最常用的编译预设                                                                                                         |
| core-js           | ^3.27.0 | ES API 垫片                                                                                                                    |

[Babel](https://www.babeljs.cn/docs/) 本质上是一个流程工具，高版本的 ES 语法和 API 的转换工作都是通过 plugin 来完成的。对于 Babel 来说需要搞清楚两个配置项：

- **presets**：是一个 babel 编译功能预设，包含常用 plugin 的集合。
- **plugins**：是对 presets 的扩展和补充，如果 presets 不能满足编译需求，可以单独添加 plugins 进行处理。

### 降级配置

在项目根目录下新建一个降级配置文件，写入如下配置：

![截屏2022-12-27 10.44.00](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271044315.png)

- .browserslistrc

  ```shell
  last 2 versions
  ```

**降级配置文件是 Babel 和后续 [PostCSS](/webpack5-study/html-css.html#使用-postcss) 执行兼容性调整的关键依据**，你可以通过 [browserslist](https://browserslist.dev/?q=bGFzdCAyIHZlcnNpb25z) 来查看对应配置兼容的浏览器基准线。

### Babel 配置

在根目录下新建一个 babel 配置文件，并写入如下配置：

![截屏2022-12-27 10.44.21](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271044760.png)

- babel.config.js

  ```javascript
  module.exports = {
    // 1.babel 预设
    presets: [
      [
        '@babel/preset-env', // 使用 @babel/preset-env 基础编译预设
        {
          useBuiltIns: 'usage', // 采用 core-js 的 polyfill 方案，并且按需降级
          corejs: 3 // core-js 版本为 v3
        }
      ]
    ],
    // 2.babel 插件
    plugins: []
  }
  ```

这里着重讲解一下 useBuiltIns 这个配置项，可以使用两个参数：

- **entry**：全量降级。需要在入口 js 文件第一行写入 `import 'core-js'`，编译时 babel 会按照 [降级配置](/webpack5-study/compile-with-babel.html#降级配置) 中定义的兼容性基准线，把需要降级的 ES API 一次性插入并替换到 `import 'core-js'` 的位置。不推荐这种方式，会提高打包 js 的体积影响页面加载性能。

  ```javascript
  import 'core-js'
  // 主逻辑开始
  ```

- **usage**：按需降级。编译时 babel 会扫描所有需要编译的 js 代码，根据实际使用到的 ES API 按需插入所需垫片。正常情况下的首选，但也有特殊情况。

  > **npm 生态本身是混乱且缺乏约束的，不少 npm 包直接使用 tsc 打包或者没有注入垫片，而出于性能考虑，一般情况下 node_modules 中的 library 不会参与项目编译，最终导致生产环境出现兼容性问题**。这个话题如果要展开就是另外的故事了，这里给出一篇 [扩展阅读](https://juejin.cn/post/7179049172706787387)，通常情况下我们不需要考虑这个问题。

### 关联 Webpack 和 Babel

完成 babel 的基本配置后，运行 dev 指令打包代码发现没有任何效果。这是因为 webpack 和 babel 两者当前是平行状态，我们**需要一个桥接层来允许 webpack 调用 babel 处理 js 代码，这就是 babel-loader**。继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // 排除 node_modules 中引入的 js 文件
          use: ['babel-loader'] // 第三方 loader 通过 use 调用
        }
      ]
    }
  }
  ```

这里需要解释几点：

1. `exclude` 是 `test` 的关联属性，代表满足 `test` 正则过滤的文件中需要排除的目录。项目中引入 node_modules 中的 library 是发布之前编译过的，一般情况不需要使用 babel 再次编译，这样能显著提升 babel 编译 js 的速度。
2. `use` 是一个数组，内部可配置一个或者多个 loader。

重新运行 dev 指令后，可以看到 dist 目录下的 js 输出已经全部做了语法转换了：

![截屏2022-12-27 11.04.49](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271105203.png)

我们可以对比一下 Webpack 和 Babel 打包出来的 js 文件大小：

![截屏2022-12-27 11.03.45](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271107580.png)

## 降级最优策略

浏览器本质上运行的只有 html、css、js。一般来说 html 标签只要能显示就不会产生兼容性问题，所以我们通过降级解决兼容性的方向只有两个：

- css 样式不兼容或不符合预期
- js 语法或 API 不兼容

在 webpack 的构建体系下，这两者都是根据 [降级配置](/webpack5-study/compile-with-babel.html#降级配置) 定义的浏览器基准线进行兼容性处理。不管 Babel 还是 PostCSS 在处理降级问题上本质都是通过注入垫片代码来覆盖各类情况，而注入垫片就意味着会增大打包的 css 和 js 文件体积，并且过多的垫片逻辑也会影响页面的运行性能。因此如何界定基准线就是一个需要你考量的问题，在这里分享一个《UNIX/LINUX 设计哲学》里的观点：

> 准则：寻求 90% 的解决方案

这个准则的含义是一个软件不可能满足所有人的需求，只要能满足其中 90% 人的需求就可以达到最高的投入产出比，同理降级最优策略亦是如此。我的项目中常用的降级配置如下：

```shell
> 1%
last 2 versions
not dead
```

## 本节代码

> [4.compile-with-babel](https://gitee.com/aodazhang/webpack5-study/blob/master/4.compile-with-babel/webpack.config.js)
