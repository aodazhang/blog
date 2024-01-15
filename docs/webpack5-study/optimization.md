---
lang: zh-CN
title: 9.优化 webpack
# sidebar: auto
---

## 抛砖引玉

通过前面的学习我们得知 webpack 在任何环境下总是要先执行打包。当一个项目的代码和依赖变多后，**webpack 的机制注定会导致打包时间成倍提升**。那么优化构建速度在这个时候就显得尤其重要，特别是处于开发环境时，更快的打包速度会显著提升开发效率。

当一个应用打包发布到线上环境后，**构建产物是否符合前端性能优化的标准**就显得尤为重要。比如更小的文件体积、更高的缓存利用率、更快的加载速度等。所以优化 webpack 实际上就是解决两个问题：

- 优化构建速度
- 优化构建产物

## 优化构建速度

在 webpack4 的时候，我们通常会利用缓存、多进程、DLL 这类手段加快构建速度。而 webpack5 从底层优化了构建速度，一般情况下只需要升级最新版本的 nodejs 并配置 [cache](https://webpack.docschina.org/configuration/cache/) 就能满足项目需求。修改 webpack 配置：

- webpack.config.js

  ```javascript
  // 五.开发环境配置
  const devConfig = {
    cache: {
      type: 'filesystem' // webpack 使用磁盘缓存
    }
  }

  // 六.生产环境配置
  const prodConfig = {
    // 关闭缓存
    cache: false
  }
  ```

这里需要解释几点：

1. `type` 代表缓存类型，默认 `memory` 代表在内存中缓存，只对热重载有效；设置 `filesystem` 代表将缓存写入到 node_modules/.cache/webpack 目录下，每次启动时 webpack 会优先读取缓存。
2. 优化构建速度一般针对开发环境，生产环境不必开启缓存。

运行 serve 指令后，可以在 VSCode Terminal 中查看两次构建花费的时间，**使用 cache 后构建速度提升接近 4 倍**：

- 第一次启动（无缓存）

  ![WX20221229-122330](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291226549.png)

- 第二次启动（有缓存）

  ![WX20221229-122416](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291226335.png)

## 优化构建产物

优化构建产物之前，先安装一个插件来分析 webpack 究竟打包了什么：

```shell
npm i webpack-bundle-analyzer -D
```

| 依赖                    | 版本   | 作用                              |
| :---------------------- | :----- | :-------------------------------- |
| webpack-bundle-analyzer | ^4.7.0 | 根据 webpack 打包结果生成分析报告 |

一般情况下我们只需要分析生产环境，修改 webpack 配置：

- webpack.config.js

  ```javascript
  // 二.webpack 插件
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // bundle 包分析工具

  // 六.生产环境配置
  const prodConfig = {
    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: false, // 是否启动本地服务
        analyzerMode: 'static', // 只输出静态 html 文件
        reportFilename: 'analyzer.html' // 分析文件名称
      })
    ]
  }
  ```

运行 build 指令后，可以看到 dist 目录下输出了如下内容：

![截屏2022-12-29 13.04.01](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291304060.png)

打开 analyzer.html 可以看到本次打包的分析结果：

![截屏2022-12-29 13.03.10](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291303523.png)

### tree shaking

软件工程中有一个 tree shaking（摇树）的概念，是指在**编译结果中应该只包含用到的代码，不应该包含没有用到的代码**。通过分析报告得知，虽然项目里只用到了一小部分 vue3 的 API，但是在构建产物中整个 vue3 都被打包了进来，这会增加不必要的 js 文件体积。因此需要在打包时启用 tree shaking 来优化构建产物，修改 webpack 配置：

- webpack.config.js

  ```javascript
  // 四.公共配置
  const commonConfig = {
    optimization: {
      usedExports: true // 开启 tree shaking
    }
  }
  ```

再次运行 build 指令后，打开 analyzer.html 对比两次打包的分析结果，**使用 tree shaking 后 vue 引入的 js 体积降低近 60%**：

- 未开启 tree shaking

  ![截屏2022-12-29 13.11.49](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291312448.png)

- 开启 tree shaking

  ![截屏2022-12-29 13.11.10](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291312922.png)

在实际项目中，由于我们不可能只使用一个 npm 包，所以 tree shaking 对于优化构建产物体积至关重要。**但需注意 tree shaking 本质上是一种静态代码分析机制，因此只能支持 ESM 这类基于静态引入的代码，对于 CommonJS 这类可以运行时引入的代码是无效的**。

### code splitting

在前面几节我们通过 contenthash 算法对文件名进行处理，这种方式的意义在于如果一个文件内容没有发生变化，那么它的文件名也不会发生变化，这样可以最大化利用浏览器的缓存机制提高页面加载速度。

在实际项目中，**vue、vue-router 这类引入的第三方 npm 包很少会发生变化，但是业务代码会随着需求经常变动**。通过打包的分析结果我们得，项目中引用的第三方 npm 包和业务逻辑都输出到 main.js 文件中了：

![截屏2022-12-29 13.34.17](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291334984.png)

这样只要业务代码变更一次，main.js 的文件名就会变动一次，浏览器就需要重新加载一次第三方 npm 包和业务逻辑。对于这种情况需要执行 code splitting（代码分割），将公共部分抽离到独立的 js 文件。修改 webpack 配置：

- webpack.config.js

  ```javascript
  // 四.公共配置
  const commonConfig = {
    optimization: {
      splitChunks: {
        chunks: 'all', // 对同步 + 异步引入的 js 开启 code splitting
        cacheGroups: {
          // vendors 组规则：对 node_modules 引入的 js 文件执行
          vendor: {
            test: /node_modules/,
            name: 'node_modules', // 生成文件名
            priority: 1, // 拆分权重：优先级1
            minSize: 0 * 1024, // 拆分最小体积（进行拆分 js 文件的最小体积）：>=0kb拆分
            minChunks: 1 // 拆分最小复用（进行拆分 js 文件的最少 import 次数）：>=1次拆分
          },
          // common 组规则：对所有 js 文件执行
          common: {
            name: 'common',
            priority: 0, // 优先级0
            minSize: 0 * 1024, // >=0kb拆分
            minChunks: 2 // >=2次拆分
          }
        }
      }
    }
  }
  ```

这里需要解释几点：

1. `chunks` 代表对哪种方式引入的的代码进行拆分，webpack 支持 [懒加载](https://webpack.docschina.org/guides/lazy-loading/)。
2. `cacheGroups` 代表一组拆分规则，在这里可以针对 node_modules 设定一组单独的拆分规则，然后在设定一组拖底的公共拆分规则，通过 `priority` 权重确定应用哪组规则。
3. `minChunks` 代表一个 js 文件在项目中被引用多少次就进行拆分。**对于 node_modules 引用的第三方 npm 包，引用一次也应该被拆分；而项目中的 js 文件至少应该引用 2 次才进行拆分，否则没有意义**。

再次运行 build 指令后，可以看到 dist 目录下输出了如下内容，**此时项目中引用的第三方 npm 包已经被拆分到一个独立的 js 文件**：

![截屏2022-12-29 13.50.05](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291350905.png)

打开 analyzer.html 可以看到本次打包的分析结果，**此时第三方 npm 包和业务代码已经分离，后续业务代码变化也不会影响到第三方 npm 包的缓存**：

![截屏2022-12-29 13.52.31](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291352923.png)

### gzip

**如果只能选择一种方式优化前端性能，那么毫无疑问就是 gzip**。gzip 本质是一种压缩算法，可以在保留文件有效信息的前提下降低文件体积，提高传输效率。打开上面的分析报告，我们可以看到 gzip 前后文件体积有多大区别：

- 未使用 gzip

  ![截屏2022-12-29 13.59.34](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291359026.png)

- 使用 gzip

  ![截屏2022-12-29 13.59.39](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291359593.png)

使用 gzip 直接让整个 Web 应用的体积降低了 1 倍多，并且这里还只统计了 js 文件，实际项目中静态资源也是影响页面加载速度的重要因素，而 gzip 对任何类型的文件都是生效的。使用 gzip 有两种方式：

- 用户访问页面时，先通过 nginx 自带的算法执行 gzip，再进行传输
- 在项目构建时采用工具执行 gzip，然后用户访问页面时 nginx 直接传输

两者相比自然是第二种方法效率更高，因为 nginx 虽然并发能力很强，但服务器资源有限，每次都对资源执行 gzip 会降低服务器的吞吐量；而如果只传输打包好的 gzip 文件，同样时间内服务器吞吐能力显然会提升，用户访问页面速度更快。

在 webpack 中执行 gizp 需要安装下面一个依赖：

```shell
npm i compression-webpack-plugin -D
```

| 依赖                       | 版本    | 作用                         |
| :------------------------- | :------ | :--------------------------- |
| compression-webpack-plugin | ^10.0.0 | 对打包生成的文件执行压缩处理 |

一般情况下我们只需要在生产环境下压缩文件，修改 webpack 配置：

- webpack.config.js

  ```javascript
  // 二.webpack 插件
  const CompressionWebpackPlugin = require('compression-webpack-plugin') // 对文件执行压缩

  // 六.生产环境配置
  const prodConfig = {
    plugins: [
      new CompressionWebpackPlugin({
        test: /\.(html|css|js|eot|ttf|woff|woff2|fnt|jpg|jpeg|png|gif|bmp|webp|svg|hdr|mp3|mp4|wav|json|xml)$/, // 匹配文件类型
        algorithm: 'gzip', // 压缩算法
        threshold: 0 * 1024, // gzip压缩大小阈值（kb）：文件大小 >0kb 执行压缩
        minRatio: 1.1, // gzip压缩比率阈值（%）：文件压缩阈值 <=1 执行压缩
        deleteOriginalAssets: false, // 不删除原始文件
        filename: '[path][base].gz' // gizp 生成文件名
      })
    ]
  }
  ```

这里需要解释几点：

1. `test` 接收一个正则表达式，代表插件生效的文件扩展名。
2. `threshold` 设置为 0，如果要用 gzip 就对所有文件都执行。
3. `minRatio` 设置为大于 1 的某个数，这样即便 gzip 没有降低文件体积也会生成对应压缩文件。
4. `deleteOriginalAssets` 设置为 false，保留原始文件作为静态资源 fallback。

再次运行 build 指令后，可以看到 dist 目录下输出了如下内容，**所有文件都生成了 `.gz` 压缩包**：

![截屏2022-12-29 14.22.44](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212291423023.png)

## 本节代码

> [8.optimization](https://gitee.com/aodazhang/webpack5-study/blob/master/8.optimization/webpack.config.js)
