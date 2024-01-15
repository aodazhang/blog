---
lang: zh-CN
title: 直播会议
# sidebar: auto
---

## 为什么会有 webpack

软件工程基本上就处理两个问题：规模与重复

- 过去：前端除了写逻辑外该做的一样不少（图片处理、代码混淆等），只不过是纯手工重复劳动

  > [百度 fis](http://fis.baidu.com/fis3/index.html)

- 现在：构建工具承担了之前手工的重复劳动，前端专注业务逻辑

## 一个 vue2 示例

> 从第 8 节 [配置-vue3](/webpack5-study/create-vue.html#配置-vue3) 转入

使用 vue2 需要安装下面五个依赖：

```shell
npm i vue@2.6.14 vue-router@3.6.5 vuex@3.6.2 -S
npm i vue-template-compiler@2.6.14 vue-loader@15.10.1 -D
```

| 依赖                  | 版本     | 作用                                       |
| :-------------------- | :------- | :----------------------------------------- |
| vue                   | ^2.6.14  | vue2 核心模块                              |
| vue-router            | ^3.6.5   | vue2 路由模块                              |
| vuex                  | ^3.6.2   | vue2 状态管理工具                          |
| vue-template-compiler | ^2.6.14  | vue2 单文件编译模块                        |
| vue-loader            | ^15.10.1 | vue2 单文件编译模块和 webpack 之间的桥接层 |

这里需要解释几点：

1. `vue` 和 `vue-template-compiler` 的版本必须是一致的，否则编译 vue 代码时会报错。
2. `vue-loader` 在 v16 之后使用 `@vue/compiler-sfc` 编译文件，v16 之前使用 `vue-template-compiler`。

## webpack 常见面试题

##### 1.前端为何要进行打包和构建？

代码相关

- 体积更小（tree-shaking、压缩、合并），加载更快
- 引入编译过程，可以在开发阶段使用高级语言和语法（ts、es6、模块化、scss 等）
- 兼容性和错误检查（polyfill、postcss、eslint）

工程化相关

- 统一的开发环境
- 统一的构建流程和产出标准
- 集成公司构建规范

##### 2.module、chunk、bundle 的区别？

- module：各个源码文件，webpack 将其视为模块
- chunk：多模块合并生成的内存块，如 `entry`、`splitChunks`、`import()`
- bundle：最终的输出文件

##### 3.loader 和 plugin 的区别？

- loader：文件转换器，如 sass-loader
- plugin：功能扩展，如 html-webpack-plugin

##### 4.常见 loader 和 plugin 有哪些？

本文提到的所有 loader、plugin

##### 5.babel 和 webpack 的区别？

- babel：js 编译工具，不关心模块化
- webpack：打包构建工具，是多个 loader、plugin 的集合

##### 6.webpack 如何实现懒加载？

- `import()` 语法：例如 vue-router、react-router 的异步路由

##### 7.webpack 常用的性能优化手段？

优化构建速度

- 开启 cache

优化构建产物

- bundle 加 hash 处理缓存
- 小体积图片 base64 编码注入 js 减少 http 请求
- 首屏用不到的 js 懒加载
- tree shaking 忽略未使用代码
- code splitting 提取第三方库和公共代码
- gizp 压缩构建产物

##### 8.如何从零构建一个 vue 开发环境？

核心配置点要讲清楚，其他说个大概就可以

## 本节代码

> [meeting](https://gitee.com/aodazhang/webpack5-study/blob/master/meeting/webpack.config.js)
