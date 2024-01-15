---
lang: zh-CN
title: 4.处理静态资源
# sidebar: auto
---

## 模块与 loader

**在 webpack 里一切文件都可以称为模块**，它不仅是 js 文件，还可以是一个 css、字体、图片、音频等。由于 webpack 能识别的只有 js 文件，对于其他文件需要第三方的 loader 提供解决方案。因此 **loader 可以粗浅的理解为是一种特定类型文件的打包处理工具**。

## 静态资源处理

在 webpack4 中，对于字体、图片、音频这类静态资源通常采用 [raw-loader](https://github.com/webpack-contrib/raw-loader)、[file-loader](https://github.com/webpack-contrib/file-loader)、[url-loader](https://github.com/webpack-contrib/url-loader) 进行处理；而 webpack5 中内置了 [asset 资源模块](https://webpack.docschina.org/guides/asset-modules/)，可以十分便捷的处理各类资源文件，不必再安装额外的 loader。两者的对应关系如下：

| webpack4    | webpack5           | 功能                                                                                                                                                                    |
| :---------- | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| raw-loader  | **asset/source**   | 将文件作为字符串内联到打包输出的 js 中                                                                                                                                  |
| file-loader | **asset/resource** | 复制文件到输出目录并将其 url 内联到打包输出的 js 中                                                                                                                     |
| url-loader  | **asset**          | 设定一个临界值<br />文件尺寸 > 临界值：使用 **asset/resource** 处理，同上<br />文件尺寸< 临界值：使用 **asset/inline** 处理，将文件作为 data URI 内联到打包输出的 js 中 |

## module 模块

module 是 webpack 最核心的配置项，用来定义扩展名和 loader 之间的对应关系，一般常用的参数只有 `rules`。我们首先在 src 目录下新建 assets 文件夹，放入各种类型的静态资源文件：

![截屏2022-12-26 22.31.17](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212262232536.png)

可以看到里面有各种图片、字体、音视频、json 甚至是其他编程语言的文件，将其在 index.js 中全部引入：

- index.js

  ```javascript
  import env from './assets/env.jpg' // jpg 图片
  import sprites from './assets/sprites.png' // png 图片
  import zkkl from './assets/zkkl.ttf' // ttf 字体
  import point from './assets/point.wav' // wav 音频
  import data from './assets/data.json' // json 文件
  import frag from './assets/frag.glsl' // glsl 着色器语言

  console.log(env)
  console.log(sprites)
  console.log(zkkl)
  console.log(point)
  console.log(data)
  console.log(frag)
  ```

接下来在 webpack.config.js 中添加 module 配置，来解析各个静态资源文件：

- webpack.config.js

  ```javascript
  module.exports = {
    module: {
      rules: [
        // 图片 > 100kb 复制到输出目录并将其 url 内联到打包输出的 js 中
        // 图片 < 100kb 作为 dataURI 内联到打包输出的 js 中
        {
          test: /\.(jpg|png)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 100 * 1024 // 临界值设定为 100kb
            }
          }
        },
        // 字体、音视频、json：复制到输出目录并将其 url 内联到打包输出的 js 中
        { test: /\.(ttf|wav|json)$/, type: 'asset/resource' },
        // 着色器语言：将文件作为字符串内联到打包输出的 js 中
        { test: /\.glsl$/, type: 'asset/source' }
      ]
    }
  }
  ```

这里需要解释几点：

1. `test` 接收一个正则表达式用来**匹配文件的扩展名**，代表对文件类型的过滤。
2. `type` 代表使用 webpack5 的内置模块，这一点和第三方 loader 使用的配置项不同。

运行 dev 指令后，可以看到 dist 目录下输出了如下内容：

![截屏2022-12-27 14.53.22](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271454826.png)

打开 index.html 后查看控制台输出了如下内容：

![截屏2022-12-27 14.53.39](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271454414.png)

- 图片：jpg 图片大于 100kb，因此复制到输出目录并将其 url 内联到了 main.js 中；png 图片小于 100kb，因此打包为 data URI 内联到了 main.js 中。
- 字体、音视频、json 文件：复制到输出目录并将其 url 内联到了 main.js 中。
- 着色器语言：将文件作为字符串内联到了 main.js 中。

## asset 最优策略

通过上面的示例，你已经掌握了最基础的静态资源打包方法。现在我们的构建系统还存在几个问题：

1. 所有静态资源都打包在 dist 目录下，没有根据文件种类进行划分，这样稍显凌乱。

2. 在 [Output 最优策略](/webpack5-study/entry-output.html#output-最优策略) 我们提到过 js 文件在生产环境中最大化利用浏览器缓存的需求，同样静态资源也需要进行 contenthash 运算来确保每次打包中哪些资源需要刷新缓存。

3. 当 type 设定为 asset 时，如何界定 url 和 data URI 的临界值？

第一个问题需要引入新的配置项 `generator.filename` 来指定 [asset 资源模块](https://webpack.docschina.org/guides/asset-modules/) 输出文件的路径；第二个问题可以通过定义一个全局的生成文件名 hash 规则来解决；第三个问题通常来说**只对图片资源采用 asset**，临界值一般设定为 50kb ~ 100kb，高于 100kb 的图片作为 data URI 写入打包的 js 中反而会对应用加载性能产生影响。下面继续修改 webpack 配置文件：

- webpack.config.js

  ```javascript
  // 生成文件名 hash 规则
  const hashRule = '[name]_[contenthash:8]'

  module.exports = {
    output: {
      // 打包 js 文件也遵循这个命名原则
      filename: `js/${hashRule}.js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: './'
    },
    module: {
      rules: [
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

重新运行 dev 指令后，可以看到 dist 目录下的静态资源输出符合预期：

![截屏2022-12-27 14.49.23](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271450307.png)

打开 index.html 后查看控制台输出了如下内容，可知静态资源的 url 会随着输出目录的变化而更新：

![截屏2022-12-27 14.45.00](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212271450562.png)

## 本节代码

> [3.static-resource](https://gitee.com/aodazhang/webpack5-study/blob/master/3.static-resource/webpack.config.js)
