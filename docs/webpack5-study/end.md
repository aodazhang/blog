---
lang: zh-CN
title: 10.总结
# sidebar: auto
---

## 告一段落

本文写到这里就告一段落了，相信你对 webpack5 已经从不会到入门了。来回顾一下之前学到的内容：

- 在 [简介](/webpack5-study/) 中，我们一起探讨了 webpack 的存在意义和学习方法。
- 在 [最简单的示例](/webpack5-study/the-simplest-example.html) 中我们对比了无构建工具和使用 webpack 实现一段相同的逻辑的区别。
- 接下来的 [Entry 和 Output](/webpack5-study/entry-output.html)、[处理静态资源](/webpack5-study/static-resource.html)、[使用 Babel 编译](/webpack5-study/compile-with-babel.html)、[处理 HTML 和 CSS](/webpack5-study/html-css.html) 是本文的核心章节，里面的每个配置项都很重要，建议反复学习直到彻底明白。
- 在 [区分开发环境与生产环境](/webpack5-study/development-production.html) 中我们引入了一系列实用的项目配置和第三方插件，其中不少知识点都是面试常考问题。
- 在 [实战：构建一个 Vue3 项目](/webpack5-study/create-vue.html) 中我们逐步实现了一个可移植 @vue/cli 项目的 webpack 环境，以后面对其他技术栈的 webpack 配置你是否更有自信了？
- 在 [优化 webpack](/webpack5-study/optimization.html) 中我们补上了最后一块短板，帮助你从另一个角度审视了前端性能优化的诸多问题，以及利用 webpack 如何优化这些问题。

纸上得来终觉浅，绝知此事要躬行。对于软件开发来说更是如此，只有多动手实践才能理解自己不熟悉的知识。作者还在持续学习的路上，期待与你共同进步！

## 后续如何学习

webpack 继续往后走大概有两条路：

- 熟悉更多的 webpack 配置及社区资源，可以根据需求定制构建过程，为团队提供最佳实践
- 深入了解 webpack 底层机制，可以根据需求定制 webpack 插件和 loader

不管哪个方向都不是几篇文章可以讲明白的了，这需要你多逛逛技术论坛和公众号，收集一些大佬们输出的相关文章。在工作中多思考手上的项目还有什么优化的空间？webpack 究竟还能做什么？总而言之一句话，多动手多总结。

## 关于 vite

[vite](https://cn.vitejs.dev/) 和 webpack 是竞争者，在前端属于同一个生态位。两者区别在于 vite 提供了更多的预设，配置更简单；而且 vite 直接在网页上用了 esm 去加载 js 文件，开发环境下速度肯定是快于 webpack 这种每次都编译的。但是目前还存在两个问题：

- 测试和生产不是同一套构建流程，导致输出代码有差异，这其中的风险需要自己评估
- 还是绕不开的兼容性问题，即便生产环境配置了 [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 后依然在某些低版本安卓机上白屏，导致某个项目紧急换回 webpack

就 2022 年末这个时间点来说，如果你做的是新项目并且没有兼容性要求，那么直接用 vite 没什么问题。但如果对兼容性和稳定性比较看重，还是 webpack 更保险，毕竟：

> **稳定，压倒一切的大局**
