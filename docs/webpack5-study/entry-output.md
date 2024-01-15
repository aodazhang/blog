---
lang: zh-CN
title: 3.Entry 和 Output
# sidebar: auto
---

## 使用配置文件

细心的同学可以发现，上节给出的示例中通过一个指令就进行了打包。这是因为在 webpack4 之后存在一个默认配置文件，当用户没有指定任何配置文件时会调用该文件。但通常情况下默认配置无法满足实际的项目需求，因此我们需要手动创建一个配置文件定义 webpack 的构建过程。

首先根目录下创建一个配置文件 webpack.config.js，并定义 entry 属性：

![截屏2022-12-26 16.53.50](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212261654182.png)

- webpack.config.js

  ```javascript
  module.exports = {
    entry: './src/index.js' // 这里指向要打包的入口 js 文件
  }
  ```

然后修改 npm scripts 的 dev 指令，通过 `--config` 来指定配置文件：

- package.json

  ```json
  "scripts": {
    "dev": "webpack --config ./webpack.config.js"
  }
  ```

运行 dev 指令后可以发现和之前效果一致：

```shell
npm run dev
```

![截屏2022-12-26 16.55.08](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212261655425.png)

## Entry 入口

### 单入口

在本文最开始的 [webpack 是什么](/webpack5-study/#webpack-是什么) 中我们提到过 webpack 本质是通过一个或多个 js 文件作为入口来打包应用。Entry 参数的作用就是用来配置从哪个入口来打包应用的，默认值如下：

```javascript
module.exports = {
  // 以配置文件同级的 src 目录下的 index.js 作为入口
  entry: './src/index.js'
}
```

此外 Entry 还支持对象的形式赋值，上面的默认配置等价于：

```javascript
module.exports = {
  // 单入口 -> 单输出
  entry: {
    main: './src/index.js'
  }
}
```

**在 Entry 中配置一个 js 文件作为入口，在 H5 开发中被称为单页应用模式（SPA）**，比如 [@vue/cli](https://cli.vuejs.org/zh/guide/) 创建的项目就是以 main.js 作为打包入口的单页应用：

![截屏2022-12-26 22.16.40](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212262218536.png)

### 多入口

**同理在 Entry 中配置多个 js 文件作为入口，在 H5 开发中被称为多页应用模式（MPA）**，通常脚手架创建的项目默认没有配置多页，需要用户自行配置。我们可以将上面的对象扩充多个入口：

```javascript
module.exports = {
  // 多入口 -> 多输出
  entry: {
    main: './src/index.js',
    test: './src/index.js'
  }
}
```

重新运行 dev 指令后，发现 dist 目录下输出了两个 js 文件：

![截屏2022-12-26 16.56.04](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212261656400.png)

## Output 输出

### 默认配置

有输入就有输出，**因此 Entry 和 Output 是一组对应的配置项**。Output 参数的作用就是用来配置打包后的 js 文件如何输出，默认值如下：

```javascript
const path = require('path')

module.exports = {
  output: {
    // 输出的文件名：以 entry 中的 key 作为文件名，也可以指定名称
    filename: '[name].js',
    // 输出的目录：当前同级目录 dist
    path: path.resolve(__dirname, 'dist'),
    // 输出的外部资源路径
    publicPath: './'
  }
}
```

这里需要解释几点：

1. `entry` 可以配置多个 js 文件作为入口，但是 `output` 只能配置单一的输出规则。

2. `filename` 可以指定名称但是不推荐，如果配置了多入口会因为无法输出到同一名字的文件中而报错。

3. `const path = require('path')` 是 nodejs 中的原生模块，用于路径处理；`__dirname` 代表当前文件所处的目录路径；`path.resolve(__dirname, 'dist')` 代表拼接 webpack.config.js 同级的 dist 目录路径并返回，这部分 API 详见 [path 文档](https://www.nodeapp.cn/path.html#path_path_resolve_paths)。

4. `publicPath` 可以配置静态资源的公共路径，例如项目有 cdn 服务，这里就可以写入 cdn 的路径。

### 模版字符串

`[name]` 这种语法在 webpack 中被称为模版字符串，作用是以何种规则生成文件名，**该功能对于生产环境静态资源加载优化至关重要**。常用的语法如下：

| 模版字符串      | 作用                                                      |
| :-------------- | :-------------------------------------------------------- |
| [name]          | chunk 的名称或 id                                         |
| [contenthash]   | 根据 chunk 的内容计算的 hash 值，文件内容发生变化才会改变 |
| [contenthash:8] | 同上，截取 hash 值前 8 位                                 |
| [path]          | 文件的路径                                                |
| [base]          | 文件的名称（包含扩展名）                                  |
| [ext]           | 文件的扩展名                                              |

### Output 最优策略

Output 的配置关键点在于 filename，原则上我们只需要保持默认的 `[name].js` 即可。但在生产环境中我们需要最大化利用浏览器缓存，因此可将其配置为 `[name]_[contenthash:8].js`。让 **webpack 根据 js 文件内容是否发生变化来更新文件名，文件名若变化也会触发浏览器缓存更新**。

由于实际项目打包的 js 文件可能会很多，这里我们在 filename 中加入 `js/`，代表将所有打包好 js 输出到 dist 目录的 js 文件夹下，方便归类静态资源：

```javascript
const path = require('path')

module.exports = {
  output: {
    filename: 'js/[name]_[contenthash:8].js', // 输出到 dist/js 目录下
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  }
}
```

重新运行 dev 指令后，发现 dist/js 目录下输出了两个根据 contenthash 命名 js 文件：

![截屏2022-12-26 17.00.15](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212261700275.png)

## 本节代码

> [2.entry-output](https://gitee.com/aodazhang/webpack5-study/blob/master/2.entry-output/webpack.config.js)
