---
lang: zh-CN
title: 1.简介
# sidebar: auto
---

## 前言

本文内容基于作者学习与工作经验的总结，因此存在一定的局限性，文中若有疏漏之处欢迎各位读者批评指正。写作本文时我手敲了每一行代码以确保程序是可运行的，如果你发现某个地方存在报错，请先确认依赖版本与本文是否相同。

- 运行环境

  | 工具        | 版本    |
  | :---------- | :------ |
  | nodejs      | 16.15.1 |
  | webpack     | 5.75.0  |
  | webpack-cli | 5.0.0   |

- 示例代码：[webpack5-study](https://gitee.com/aodazhang/webpack5-study)

- 参考资料：[webpack 中文文档](https://webpack.docschina.org/)、[webpack](https://github.com/webpack/webpack)、[从基础到实战 手把手带你掌握新版 Webpack4.0](https://coding.imooc.com/class/316.html)

- 作者邮箱：<a readonly href="mailto:aodazhang@qq.com?subject=标题&body=正文">aodazhang@qq.com</a>

## Webpack 是什么？

工具如其名，webpack 本质就是一个**代码模块化打包工具**。其实官网上的 banner 图十分经典，可以准确的概括 webpack 在整个构建过程中做了什么：

![截屏2022-12-23 16.43.38](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212231643655.png)

简单来说，webpack 通过一个或多个 **js 文件**作为入口，递归分析其内部引用的所有类型文件（例如 js、css、png、jpg 等），并最终构建输出一个完整的 Web 应用。

## Webpack 解决了什么问题？

- 提供了基于现代 JavaScript 的 Web 应用构建解决方案。
- 社区资源丰富，基本覆盖了项目常见的打包诉求。
- 自动化程度高，显著提升中大型项目的开发与维护效率。

## 如何学习 Webpack？

本文关于 webpack 配置的思维导图如下：

![webpack5从不会到入门](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202212241148411.jpg)

很多同学觉得 webpack 难学，其实是有以下几个原因：

> 1. 框架自带的脚手架对 webpack 封装过多，例如 [@vue/cli](https://cli.vuejs.org/zh/guide/)，导致不想也没必要了解 webpack。
>
> 2. webpack 自身配置项数量庞大，难以辨认记忆，十分劝退。
>
> 3. 一个完整 webpack 配置实际上是由多种工具组合而成的，例如 [Babel](https://www.babeljs.cn/docs/)、[Sass](https://sass-lang.com/dart-sass)、[PostCSS](https://www.postcss.com.cn/) 等，其中每个工具单独拿出来都是一个复杂的配置点，对整体没有一个清晰的认知容易陷入迷茫。
>
> 4. 在工作中只做业务开发，**无法理解构建链路对于前端的意义**。

首先声明一点，**webpack、vite 这类构建工具并不是每个前端项目必须的**，一个简单 H5 页面直接用 jQuery 一把梭即可，完全没有必要浪费时间在 webpack 的配置上，如同软件设计模式中倡导不要为了设计而设计。

其次 webpack 更像是一个组织者，主要职责是组织和协调各类插件和 loader，本身只能执行简单的 js 编译和文件处理。因此在学习 webpack 之前，推荐你了解下 [Babel](https://www.babeljs.cn/docs/) 和 css 预处理器的使用，以便你更好的理解这些工具如何跟 webpack 协作。

最后要特别指出，**学习 webpack 不是一个记忆参数的过程，而是一个学会查文档和搜索社区资源的过程**。webpack 可用的配置项、plugins、loader 无数，本文也只会讲解最常用的那几个。所以当你每学习一个知识点后，都可以查看 [官方文档](https://webpack.docschina.org/) 对应的配置项说明，相信你会有新的收获。
