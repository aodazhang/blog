---
lang: zh-CN
title: 6.处理 HTML 和 CSS
# sidebar: auto
---

## 目前存在的问题

在前面的章节中我们已经针对静态资源、js 文件分别进行了处理，常规 Web 应用中只剩下 html、css 的部分还未处理。目前打包还存在下面几个问题：

1. 每次更新 js 文件和静态资源后打包，dist 目录下还存在上一次打包的内容。
2. js 文件名发生变化，需要在 index.html 中手动更新 `<script>` 标签的引用文件，非常繁琐。

对于上述问题，我们需要引入一个新的 webpack 配置项 **plugins** 来解决。

## plugins 插件

顾名思义，插件就是提供某种特定功能的软件。与 [loader](/webpack5-study/static-resource.html#模块与-loader) 不同，webpack 中的 **plugins 不针对某个具体类型的文件，而是在 webpack 运行到某个阶段提供某种辅助功能，类似 vue 的生命周期函数**。

### 清除目录

在 webpack 中清除指定目录需要安装下面一个依赖：

```shell
npm i clean-webpack-plugin -D
```

| 依赖                 | 版本   | 作用                              |
| :------------------- | :----- | :-------------------------------- |
| clean-webpack-plugin | ^4.0.0 | 在 webpack 某个指定的阶段删除目录 |

一般情况下我们需要在每次打包前删除上一次的构建文件，在这里我们可以将输出目录定义为变量，方便使用。修改 webpack 配置：

- webpack.config.js

  ```javascript
  const path = require('path')

  // webpack 插件
  const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除目录

  // 定义输出的目录
  const outputPath = path.resolve(__dirname, 'dist')

  module.exports = {
    output: {
      // 指定输出的目录
      path: outputPath
    },
    plugins: [
      new CleanWebpackPlugin({
        // 在每次打包前调用：删除输出的目录
        cleanOnceBeforeBuildPatterns: [outputPath]
      })
    ]
  }
  ```

### 生成 html

在 webpack 中生成 html 文件需要安装下面一个依赖：

```shell
npm i html-webpack-plugin -D
```

| 依赖                | 版本   | 作用                                                          |
| :------------------ | :----- | :------------------------------------------------------------ |
| html-webpack-plugin | ^5.5.0 | 通过指定的模版生成一个 html，并自动引入本次打包生成的 js 文件 |

调整一下文件目录，加入 favicon 图标并修改 index.html：

![截屏2022-12-27 13.59.06](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271359819.png)

- index.html

  ```ejs
  <!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <!-- ejs 注入点：html-webpack-plugin 配置的 html 标题 -->
      <title><%= htmlWebpackPlugin.options.title %></title>
    </head>

    <body ontouchstart>
      <noscript>
        <strong>
          <!-- ejs 注入点：html-webpack-plugin 配置的 html 标题 -->
          糟糕，<%= htmlWebpackPlugin.options.title %>不能运行在没有开启JavaScript的浏览器上！
        </strong>
      </noscript>
      <div id="app"></div>
    </body>
  </html>
  ```

html-webpack-plugin 的在生成 html 时需要指定模版文件，继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  // webpack 插件
  const HtmlWebpackPlugin = require('html-webpack-plugin') // 根据模板生成 html

  module.exports = {
    // 单入口 -> 单输出
    entry: {
      main: './src/index.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html', // html 模板位置
        favicon: 'public/favicon.ico', // html favicon 位置
        filename: 'index.html', // html 生成模板名
        chunks: ['main'], // 匹配 entry 的key
        title: '5.html-css', // html 标题
        meta: {
          viewport:
            'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no', // html 自适应移动端
          description: 'webpack5从不会到入门' // html 描述
        },
        minify: {
          removeComments: true, // html 删除注释
          collapseWhitespace: true // html 删除空白符与换行符
        }
      })
    ]
  }
  ```

运行 dev 指令后，可以看到 dist 目录下输出了如下内容：

![WX20221227-161846](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271620439.png)

可以看到我们在 plugins 中定义的 `title`、`meta`、`favicon` 都注入到了打包生成的 html 中，并且引入了打包的 js 文件。

## 相关技术

在打包 css 之前，先回顾一下业内常用的 css 相关技术：

> 1.  预处理器：用于 css 预编译，为 css 提供了类似脚本语言的逻辑处理能力。以 [Less](https://less.bootcss.com/)、[Sass](https://www.sass.hk/)、[Stylus](https://www.stylus-lang.cn/) 为代表。
> 2.  后处理器：用于 css 的后期处理，可通过插件为 css 提供类似 Babel polyfill 的能力，通常和预处理器串联使用。以 [PostCSS](http://postcss.docschina.org/) 为代表。
> 3.  css-in-js：一种在 js 中编写的 css 方案，让 css 可以使用 js 的逻辑处理能力。以 [styled-components](https://github.com/styled-components/styled-components) 为代表。

本文推荐使用 [Sass](https://www.sass.hk/) + [PostCSS](http://postcss.docschina.org/) 的组合来处理 css，这是业界最成熟的样式解决方案。

## 使用 CSS

在 webpack 中处理 css 需要安装下面两个依赖：

```shell
npm i css-loader style-loader -D
```

| 依赖         | 版本   | 作用                                                                |
| :----------- | :----- | :------------------------------------------------------------------ |
| css-loader   | ^6.7.3 | 分析多个 css 文件之间的依赖关系，将其合并为一段 css 输出            |
| style-loader | ^3.3.1 | 根据 css-loader 的输出，通过 js 注入到对应 html 的 `<style>` 标签内 |

注意从这里开始，我们的 loader 之间出现了先后顺序。一个 css 文件要先由 css-loader 进行分析处理，然后由 style-loader 注入到 html 的 `<style>` 标签中。在项目新增一个 css 文件，并在入口 js 中引入：

- style.css

  ```css
  * {
    padding: 0;
    margin: 0;
  }

  #app {
    display: flex;
    height: 200px;
    background-color: aqua;
  }
  ```

- index.js

  ```javascript
  import './style.css'
  ```

继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          // loader 的执行顺序是从下到上，从右到左
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
  ```

这里需要解释几点：

1. 第三方的 loader 不需要像 plugins 一样先导入才能使用，直接配置即可。
2. **当 `use` 配置了多个 loader 时，在 webpack 中的执行顺序为从下到上、从右到左**。在这个示例中先执行 css-loader、再执行 style-loader。

运行 dev 指令后，打开 dist 目录下的 index.html 可以看到 css 样式正确显示：

![截屏2022-12-27 15.33.19](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271534878.png)

## 使用 PostCSS

在 webpack 中使用 Postcss 需要安装下面三个依赖：

```shell
npm i postcss postcss-loader autoprefixer -D
```

| 依赖           | 版本     | 作用                            |
| :------------- | :------- | :------------------------------ |
| postcss-loader | ^7.0.2   | postcss 和 webpack 之间的桥接层 |
| postcss        | ^8.4.20  | postcss 核心模块                |
| autoprefixer   | ^10.4.13 | css3 厂商前缀兼容性插件         |

### PostCSS 配置

在根目录下新建一个 PostCSS 配置文件，并写入如下配置：

![截屏2022-12-27 15.20.21](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271520926.png)

- postcss.config.js

  ```javascript
  module.exports = {
    // 1.postcss 插件
    plugins: {
      // 针对不同浏览器添加 css 前缀
      autoprefixer: {}
    }
  }
  ```

### 降级配置

PostCSS 的 [autoprefixer](https://github.com/postcss/autoprefixer) 插件使用与 Babel 相同的 [降级配置](/webpack5-study/compile-with-babel.html#降级配置)，会根据兼容基准线生成对应的 css 前缀。

### 关联 Webpack 和 PostCSS

与 Babel 一样，我们需要一个桥接层来允许 webpack 调用 PostCSS 处理 css 样式，这就是 postcss-loader。继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          // loader 的执行顺序是从下到上，从右到左
          use: ['style-loader', 'css-loader', 'postcss-loader']
        }
      ]
    }
  }
  ```

重新运行 dev 指令后，打开 dist 目录下的 index.html 可以看到 css 样式已经添加了厂商前缀：

![截屏2022-12-27 15.35.10](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271535857.png)

## 使用 Sass

在 webpack 中使用 Sass 需要安装下面两个依赖：

```shell
npm i sass sass-loader -D
```

| 依赖        | 版本    | 作用                         |
| :---------- | :------ | :--------------------------- |
| sass-loader | ^13.2.0 | sass 和 webpack 之间的桥接层 |
| sass        | ^1.57.1 | dart-sass 核心模块           |

### 关联 Webpack 和 Sass

首先将之前的 css 样式变更为 scss 语法：

- style.scss

  ```css
  $--bgColor: aqua;

  * {
    padding: 0;
    margin: 0;
  }

  #app {
    display: flex;
    height: 200px;
    background-color: $--bgColor;
  }
  ```

- index.js

  ```javascript
  import './style.scss'
  ```

然后需要一个桥接层来允许 webpack 调用 dart-sass 处理 css 样式，这就是 sass-loader。继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          // loader 的执行顺序是从下到上，从右到左
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    }
  }
  ```

重新运行 dev 指令后，打开 dist 目录下的 index.html 可以看到 scss 语法已经正确的转换为 css 样式：

![截屏2022-12-27 15.46.44](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271546512.png)

### 优化 css-loader

到目前为止关于 css 的打包就完成了，回顾一下各个 loader 的执行顺序：

1. 执行 sass-loader 调用 dart-sass 编译 scss 语法为 css 样式。
2. 执行 postcss-loader 调用 postcss 的 autoprefixer 插件为所有 css 样式添加厂商前缀。
3. 执行 css-loader 分析多个 css 文件之间的依赖关系，将其合并为一段 css 输出。
4. 执行 style-loader 将 css-loader 输出的 css 注入到 html 的 `<style>` 标签内。

看似一切都没问题，但是在 css 中通过 `@import` 语法引入的样式文件其实并没有执行 sass-loader 和 postcss-loader。我们需要单独配置 css-loader 以解决这个问题：

- webpack.config.js

  ```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          // loader 的执行顺序是从下到上，从右到左
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                // css 中通过 @import 引入的文件，也要先执行 sass-loader + postcss-loader
                importLoaders: 2
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    }
  }
  ```

## 本节代码

> [5.html-css](https://gitee.com/aodazhang/webpack5-study/blob/master/5.html-css/webpack.config.js)
