---
lang: zh-CN
title: 7.区分开发环境与生产环境
# sidebar: auto
---

## 一个打包 warning

到目前已经完成了对 html、css、js、静态资源的打包，理论上足够覆盖一个小型的 Web 应用的需求。但是每次在执行 dev 指令打包时你都会看到这样一个错误：

![截屏2022-12-28 09.19.47](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212280924387.png)

并且打包生成的 js 文件都像是乱码：

![截屏2022-12-28 09.28.13](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212280928579.png)

这是因为 webpack 没有指定模式导致的，在默认的 `production` 模式下，webpack 对打包的 js 文件执行了混淆和压缩。

## mode 模式

在 webpack 中存在 [模式](https://webpack.docschina.org/configuration/mode/) 的概念，不同的模式下 webpack 会执行不同的打包配置，模式对应的配置项是 `mode`，可配置参数如下：

- **development**：将全局环境变量 `NODE_ENV` 设置为 development，生成 eval 类型 source map，不启用 js 混淆与压缩。
- **production**：将全局环境变量 `NODE_ENV` 设置为 production，不生成 source map，启用 js 混淆与压缩。

首先修改当前入口 js 文件，输出当前 webpack 设定的全局变量：

- index.js

  ```javascript
  console.log('输出全局变量 NODE_ENV', process.env.NODE_ENV)
  ```

接下来在 webpack 配置中指定 mode 配置：

- webpack.config.js

  ```javascript
  module.exports = {
    mode: 'development'
  }
  ```

运行 dev 指令后，可以查看打包的 js 文件内容：

![WX20221228-100342](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281003655.png)

打开 index.html 后查看控制台输出了如下内容：

![截屏2022-12-28 10.04.30](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281004917.png)

## devtool 源码映射

`devtool` 是配置 webpack 如何生成 source map 的，默认值 `eval`。

### source map

由于 webpack 会对开发者的代码进行编译，因在浏览器运行的 css、js 并非是原始代码，出现报错很难回溯到具体的异常代码。**source map 本质是一个映射关系，可以定位编译代码和原始代码的对应关系**。首先修改当前入口 js 文件，主动抛出一个异常：

- index.js

  ```javascript
  console.log('输出全局变量 NODE_ENV', process.env.NODE_ENV)

  async function test() {
    throw '抛出异常'
  }
  test()
  ```

接下来在 webpack 配置中指定 devtool 配置：

- webpack.config.js

  ```javascript
  module.exports = {
    devtool: false // 关闭 source map
  }
  ```

运行 dev 指令后，打开 index.html 后查看控制台输出了如下内容：

![截屏2022-12-28 10.32.20](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281032991.png)

可以看到这种报错信息是不可读的，这是因为在不开启 source map 的情况下控制台报错定位的是编译后的 js。继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  module.exports = {
    devtool: 'source-map' // 生成 source map
  }
  ```

再次运行 dev 指令后，打开 index.html 后查看控制台输出了如下内容：

![截屏2022-12-28 10.39.09](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281043769.png)在这次报错信息中，我们可以清晰的看到异常调用堆栈，错误出自 ./src/index.js 的第 2 行，并且还能在视图中还原编译前的代码，这对于错误排查是非常便捷的。

### devtool 配置

限于篇幅这里只列出 `devtool` 的常用配置，具体参数含义可参考 [品质说明](https://webpack.docschina.org/configuration/devtool/#qualities)：

- `false` 关闭 source map，生产环境常用。

  > 之所以生产环境的 js 代码需要压缩和混淆，一方面是为了降低文件体积提高页面加载速度；另一方面是出于安全性考虑。source map 理论上会暴露源代码造成安全风险，因此生产环境通常不会开启，但也有 [例外](https://webpack.docschina.org/configuration/devtool/#production)。

- `eval-cheap-module-source-map` 精确到行生成 source map，运行速度快，测试环境常用。

## resolve 解析

resolve 是一组方便开发的配置选项，某些情况下为了引用资源可能会写一段这样的代码：

```javascript
import env from '../../../assets/env.jpg'
```

这种方式既麻烦又不直观，我们可以使用路径别名代替冗长的相对路径。首先在项目根路径下创建一个 jsconfig.json 配置文件：

- jsconfig.json

  ```json
  {
    "compilerOptions": {
      "baseUrl": ".", // 当前项目根路径
      "paths": {
        "@/*": ["src/*"] // 当前配置路径别名
      }
    }
  }
  ```

这个文件的意义在于项目中 js 使用路径别名时可以获得代码提示：

![截屏2022-12-28 12.52.23](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281252071.png)

继续修改 webpack 配置：

- webpack.config.js

  ```javascript
  module.exports = {
    resolve: {
      // 路径别名：js -> '@/'、css -> '~@/'
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      // 默认扩展名：.js 必须存在，否则 node_modules 中的文件无法解析
      extensions: ['.js']
    }
  }
  ```

这里需要解释几点：

1. `alias` 可以配置一个映射，key 代表路径别名，value 代表真实路径。webpack 在打包时会扫描代码中 `@import`、`import`、`require` 引用的路径别名进行替换。

2. `extensions` 可以配置一个扩展名数组，如果在引用资源时没有写文件扩展名，webpack 会根据该参数依次进行匹配。

3. webpack 存在默认引入文件名 `index`，例如下图中引用的就是 utils 目录下的 index.js 文件。

   ![WX20221228-124610](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281246662.png)

## 开发环境 vs 生产环境

做过 vue 项目的同学都知道，运行 `npm run serve` 可以开启一个测试服务器编写代码，运行 `npm run build` 可以打包项目用于发布。在本节学习 [mode 模式](/webpack5-study/development-production.html#mode-模式) 后我们知道 webpack 可以根据模式执行不同的打包配置，那么是否可以利用 webpack 实现这样效果呢？

### 分析需求

在编写配置之前，我们先来分析一下开发环境和生产环境需求有何不同：

| 需求                         | 开发环境                                                | 生产环境                                 |
| :--------------------------- | :------------------------------------------------------ | :--------------------------------------- |
| 本地服务器                   | ✔️ 启动一个本地服务器运行代码，且代码修改后页面自动刷新 | ❌                                       |
| source map                   | ✔️ 非常全面的 source map                                | ❌                                       |
| 代码压缩和混淆               | ❌                                                      | ✔️                                       |
| css 样式                     | ✔️ 通过 js 注入到 `<style>` 标签                        | ✔️ 抽离为独立的 css 文件并在 html 中引入 |
| console、debugger 等调试代码 | ✔️                                                      | ❌                                       |

明确需求后，我们便可以着手改造 webpack 配置了。

### 公共配置

首先要考虑当前 webpack 配置哪些是在所有环境中通用的，看下目前都配置了哪些功能：

- webpack.config.js

  ```javascript
  module.exports = {
    // 模式
    mode: 'development',
    // source map
    devtool: 'eval-cheap-module-source-map',
    // 打包入口
    entry: {},
    // 打包输出
    output: {},
    // 路径解析
    resolve: {},
    // 辅助插件
    plugins: [],
    // 模块解析
    module: {}
  }
  ```

这里需要解释几点：

1. `mode` 需要跟随环境变化，不同的配置会影响代码压缩和混淆，不能公用。
2. `devtool` 需要根据环境判断是否输出的 source map，不能公用。
3. `entry`、 `output`、`resolve`、`plugins` 在所有环境下都是相同的，可以公用。
4. `module` 除了 css 相关的参数，其他配置在所有环境下都是相同的，可以公用。

### webpack 分离配置

明确了 webpack 中的公共配置之后，开始改造项目，首先安装下面一个依赖：

```shell
npm i webpack-merge -D
```

| 依赖          | 版本   | 作用                    |
| :------------ | :----- | :---------------------- |
| webpack-merge | ^5.8.0 | 合并多个 webpack 配置项 |

然后将原本单一的 webpack.config.js 拆分为 webpack.common.js、webpack.dev.js、webpack.prod.js 三个文件：

- webpack.common.js（定义公共配置）

  ```javascript
  const path = require('path')

  // webpack 插件
  const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除目录
  const HtmlWebpackPlugin = require('html-webpack-plugin') // 根据模板生成 html

  // 生成文件名 hash 规则
  const hashRule = '[name]_[contenthash:8]'

  // 定义输出的目录
  const outputPath = path.resolve(__dirname, 'dist')

  module.exports = {
    // 单入口 -> 单输出
    entry: {
      main: './src/index.js'
    },
    output: {
      filename: `js/${hashRule}.js`,
      // 指定输出的目录
      path: outputPath,
      publicPath: './'
    },
    resolve: {
      // 路径别名：js -> '@/'、css -> '~@/'
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      // 默认扩展名：.js 必须存在，否则 node_modules 中的文件无法解析
      extensions: ['.js']
    },
    plugins: [
      new CleanWebpackPlugin({
        // 在每次打包前调用：删除输出的目录
        cleanOnceBeforeBuildPatterns: [outputPath]
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html', // html 模板位置
        favicon: 'public/favicon.ico', // html favicon 位置
        filename: 'index.html', // html 生成模板名
        chunks: ['main'], // 匹配 entry 的key
        title: '6.development-production', // html 标题
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
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // 排除 node_modules 中引入的 js 文件
          use: ['babel-loader'] // 第三方 loader 通过 use 调用
        },
        // 图片 > 100kb 复制到输出目录并将其 url 内联到打包输出的 js 中
        // 图片 < 100kb 作为 dataURI 内联到打包输出的 js 中
        {
          test: /\.(jpg|jpeg|png|gif|bmp|webp|svg|hdr)$/,
          type: 'asset',
          generator: {
            filename: `image/${hashRule}[ext]` // [ext] 代表输出文件原本的扩展名
          },
          parser: {
            dataUrlCondition: {
              maxSize: 100 * 1024 // 临界值设定为 100kb
            }
          }
        },
        // 字体：复制到输出目录并将其 url 内联到打包输出的 js 中
        {
          test: /\.(eot|ttf|woff|woff2|fnt)$/,
          type: 'asset/resource',
          generator: {
            filename: `font/${hashRule}[ext]`
          }
        },
        // 音视频：复制到输出目录并将其 url 内联到打包输出的 js 中
        {
          test: /\.(mp3|mp4|wav)$/,
          type: 'asset/resource',
          generator: {
            filename: `media/${hashRule}[ext]`
          }
        },
        // json、xml：复制到输出目录并将其 url 内联到打包输出的 js 中
        {
          test: /\.(json|xml)$/,
          type: 'asset/resource',
          generator: {
            filename: `file/${hashRule}[ext]`
          }
        },
        // 着色器语言：将文件作为字符串内联到打包输出的 js 中
        { test: /\.glsl$/, type: 'asset/source' }
      ]
    }
  }
  ```

* webpack.dev.js（定义开发环境）

  ```javascript
  // webpack 插件
  const { merge } = require('webpack-merge')
  // webpack 公共配置
  const common = require('./webpack.common')

  // 合并公共配置和开发环境配置
  module.exports = merge(common, {
    mode: 'development',
    // 精确到行生成 source map
    devtool: 'eval-cheap-module-source-map',
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
  })
  ```

* webpack.prod.js（定义生产环境）

  ```javascript
  // webpack 插件
  const { merge } = require('webpack-merge')
  // webpack 公共配置
  const common = require('./webpack.common')

  // 合并公共配置和生产环境配置
  module.exports = merge(common, {
    mode: 'production',
    // 关闭 source map
    devtool: false,
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
  })
  ```

最后修改 npm scripts，让其看上去和 @vue/cli 创建出来的项目一致：

- package.json

  ```json
  "scripts": {
  	"serve": "webpack --config ./webpack.dev.js",
  	"build": "webpack --config ./webpack.prod.js"
  }
  ```

分别运行 serve 指令和 build 指令，可以看到 dist 目录下的输出符合预期：

![截屏2022-12-28 13.43.32](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281343534.png)

### 开发环境配置本地服务器

在 webpack 中使用本地服务器需要安装下面一个依赖：

```shell
npm i webpack-dev-server -D
```

| 依赖               | 版本    | 作用                                 |
| :----------------- | :------ | :----------------------------------- |
| webpack-dev-server | ^4.11.1 | webpack 配套的本地服务器，支持热重载 |

接下来在 webpack 开发环境配置中添加 `devServer` 配置，设置本地服务器：

- webpack.dev.js

  ```javascript
  module.exports = merge(common, {
    output: {
      publicPath: '/' // 静态资源的公共路径需要设定为当前项目根路径
    },
    devServer: {
      static: {
        directory: common.output.path // 静态文件目录
      },
      port: 3000, // 端口号
      historyApiFallback: true, // 支持单页应用 history 路由 fallback
      open: false, // 禁止自动打开浏览器
      hot: true, // 开启热模块重载功能 hmr
      compress: true, // 开启 gzip 压缩
      client: {
        overlay: true, // 在浏览器端显示编译错误
        progress: false // 在浏览器端打印编译进度
      }
    }
  })
  ```

这里需要解释几点：

1. `static.directory` 代表本地服务器访问的静态目录，这里就是 webpack 输出的目录。
1. `historyApiFallback` 用于单页 history 路由应用，等价于 nginx 中的 `try_files`。
1. `hot` 设定为 true 后会开启 hmr 功能，当代码修改后页面自动刷新。

修改 serve 指令，让开发环境运行本地服务器监听文件变化，自动打包编译：

- package.json

  ```json
  "scripts": {
  	"serve": "webpack serve --config ./webpack.dev.js"
  }
  ```

运行 serve 指令后，可以看到 VSCode Terminal 输出了如下内容：

![截屏2022-12-28 14.06.37](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281406928.png)

打开 http://localhost:3000/ 查看控制台输出了如下内容：

![截屏2022-12-28 14.08.20](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281408354.png)

### 生产环境抽离 css

当前项目中的 css 样式是通过 js 注入到 `<style>` 标签的，这在开发环境中没问题，但在生产环境下不利于浏览器解析 cssom。在 webpack 中抽离 css 需要安装下面一个依赖：

```shell
npm i mini-css-extract-plugin -D
```

| 依赖                    | 版本   | 作用                                                                |
| :---------------------- | :----- | :------------------------------------------------------------------ |
| mini-css-extract-plugin | ^2.7.2 | 根据 css-loader 的输出，将 css 抽离为独立文件并在对应的 html 中引入 |

接下来在 webpack 生产环境配置中添加 mini-css-extract-plugin：

- webpack.prod.js

  ```javascript
  // webpack 插件
  const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取 css

  // 生成文件名 hash 规则
  const hashRule = '[name]_[contenthash:8]'

  module.exports = merge(common, {
    plugins: [
      new MiniCssExtractPlugin({
        // 抽离 css 文件名
        filename: `css/${hashRule}.css`,
        // 抽离 css chunk 文件名
        chunkFilename: `css/${hashRule}.chunk.css`
      })
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          // loader 的执行顺序是从下到上，从右到左
          use: [
            MiniCssExtractPlugin.loader, // mini-css-extract-plugin 自带的 loader
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
  })
  ```

运行 build 指令后，可以看到 dist 目录下的单独输出了 css 文件，并且在 html 中引入：

![WX20221228-142707](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281432498.png)

### 生产环境移除调试代码

在本节学习 [mode 模式](http://localhost:8080/webpack5-study/development-production.html#mode-模式) 时我们提到过当配置 `production` 时，webpack 对打包的 js 文件执行了混淆和压缩，实际上这步工作是调用了插件 [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) 完成的。在开发环境中我们经常使用 `console.log`、`debugger` 这类代码进行调试，但在生产环境中不希望输出任何调试信息，这样的需求可以通过 terser-webpack-plugin 自带的 `drop` 功能实现。 修改 webpack 生产环境配置：

- webpack.prod.js

  ```javascript
  // webpack 插件
  const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩 js

  module.exports = merge(common, {
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          parallel: true, // 开启多进程压缩 js
          terserOptions: {
            compress: {
              drop_console: true, // 删除 console
              drop_debugger: true // 删除 debugger
            }
          }
        }),
        '...' // 其余保持默认值
      ]
    }
  })
  ```

这里需要解释几点：

1. terser-webpack-plugin 是 webpack 自带的包，如果你采用 npm 管理依赖可不必手动安装，直接引入即可。

2. `minimizer` 存在默认参数，使用 `...` 可以将默认参数引入，否则会直接覆盖 webpack 默认的压缩配置。

运行 build 指令后，打开 index.html 查看控制台未输出任何调试信息：

![截屏2022-12-28 14.50.22](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212281450824.png)

## 本节代码

> [6.development-production](https://gitee.com/aodazhang/webpack5-study/tree/master/6.development-production)
