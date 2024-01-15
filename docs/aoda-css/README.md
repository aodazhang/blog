---
lang: zh-CN
title: 指南
# sidebar: auto
---

# 🎨 aoda.css

<a href="https://github.com/sass/dart-sass"><img :src="$withBase('/assets/aoda-css/dart-sass.svg')" /></a>&nbsp;
<a href="https://github.com/stylelint/stylelint"><img :src="$withBase('/assets/aoda-css/stylelint.svg')" /></a>&nbsp;
<img :src="$withBase('/assets/aoda-css/gzip.svg')" />&nbsp;

[aoda.css](https://gitee.com/aodazhang/aoda-css) 是一套基于 [ITCSS](https://itcss.io/) 思想设计的原子样式库，可以帮助你更快更轻松的编写页面 css 样式，平滑的解决项目中 css 难复用、难扩展、不易维护的问题。你可以通过 [demo](https://project.aodazhang.com/aoda-css/#/) 体验实际效果 🎉

## 兼容性

需要注意 aoda.css 使用了 IE 无法模拟的 CSS 变量，因此 **不兼容 IE 浏览器** 🤔

![caniuse](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/caniuse.png)

## 架构

aoda.css 在 [ITCSS](https://itcss.io/) 原有的七层结构上进行了拆分和重组，并参考了当下最热门 css 框架 [Tailwind](https://www.tailwindcss.cn/) 的原子化设计，将整体架构自顶向下设计为 **settings**、**mixins**、**base**、**atomic**、**component** 五层。在此架构中 **样式是从上到下单向传递的**，下层依赖上层提供的服务；从上到下复用性降低、定制性增高。

![aoda.css](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/css-lite.png)

## 开发

### Settings 变量

|              | 说明                                                                                |
| ------------ | ----------------------------------------------------------------------------------- |
| **设计目标** | 提供各类变量定义，包括样式和参数                                                    |
| **本层依赖** | 无                                                                                  |
| **开发建议** | 样式使用 css 变量，参数使用 scss 变量，详见 [settings](/aoda-css/api.html#settings) |

### Mixins 函数

|              | 说明                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| **设计目标** | 提供各类高复用性样式函数                                                 |
| **本层依赖** | setting 变量                                                             |
| **开发建议** | 可复用的一组样式抽象为一个函数，详见 [mixins](/aoda-css/api.html#mixins) |

### Base 基础

|              | 说明                                                      |
| ------------ | --------------------------------------------------------- |
| **设计目标** | 提供页面的基础样式，包括 css reset、dpr、暗色模式、响应式 |
| **本层依赖** | setting 变量、mixins 函数                                 |
| **开发建议** | 设置不针对特定组件的全局样式                              |

### Atomic 原子化

|              | 说明                                                                           |
| ------------ | ------------------------------------------------------------------------------ |
| **设计目标** | 提供基于属性选择器的原子样式，不破坏节点中 class 的语义化能力                  |
| **本层依赖** | setting 变量、mixins 函数                                                      |
| **开发建议** | 高频使用的一个样式抽象为一个原子样式，详见 [atomic](/aoda-css/api.html#atomic) |

### component 组件

|              | 说明                                                      |
| ------------ | --------------------------------------------------------- |
| **设计目标** | 只在一个块或者组件中生效的样式，例如元素的宽高            |
| **本层依赖** | setting 变量、mixins 函数、base 基础样式、atomic 原子样式 |
| **开发建议** | 使用 [BEM](https://en.bem.info/) 的方式定义组件 class     |
