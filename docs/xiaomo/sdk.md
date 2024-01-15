---
lang: zh-CN
title: SDK
# sidebar: auto
---

## 1.技术栈

**XiaoMo SDK** 是一套以 [TypeScript](https://github.com/Microsoft/TypeScript) 为编程语言、[RxJS](https://github.com/ReactiveX/rxjs) 为编程范式开发的客户端触点系统。在深入了解它之前，您应该了解或掌握以下技术：

- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [Webpack](https://webpack.docschina.org/)
- [Rollup](https://www.rollupjs.com/)

## 2.为什么是 RxJS?

::: tip 简介
RxJS 是 Reactive Extensions for JavaScript 的缩写，起源于 Reactive Extensions，是一个基于可观测数据流 Stream 结合观察者模式和迭代器模式的一种异步编程的应用库。RxJS 是 ReactiveX 基于 JavaScript 版本的实现，用来处理异步或事件的 JavaScript 第三方库。
:::

上述是官方文档中对 **RxJS** 的定义，只看定义我们很难了解这项技术，限于篇幅关于 **RxJS** 的使用不在这里展开，有兴趣可以参考 [文档](https://rxjs.dev/guide/installation)。在这里我们只讨论为什么采用 **RxJS** 开发而不是其他编程范式，引用 Vue 作者尤雨溪的一段话：

> 我个人倾向于在适合 Rx 的地方用 Rx，但是不强求 Rx for everything。比较合适的例子就是比如多个服务端实时消息流，通过 Rx 进行高阶处理，最后到 view 层就是很清晰的一个 Observable，但是 view 层本身处理用户事件依然可以沿用现有的范式。

实际上在普通的业务开发中，我们经常需要处理的是 **页面 = 逻辑(数据)**，在这种情况下逻辑层相对来说并不复杂，往往只需要调用 xhr 进行网络请求，获取到数据后更新页面信息即可。然而在更加复杂的场景下逻辑层代码量会急剧扩张，稍有不慎代码就会处于无序的状态，这对于代码的可读性、可扩展性都是巨大的挑战，试想下面几种情况：

- **1.为一个按钮添加 click 事件，在按钮点击 n 次过程中，只有第 2 次之后的奇数次点击触发事件，其他不触发**
- **2.同时发起多个 xhr 异步请求，要求每次接收到响应时都携带其他已响应请求的结果**
- **3.设计一个游戏，上下左右键控制角色方向，空格键角色加速，注意相邻两次点击的方向键不能相同或相反**

请各位试想，这些场景下如何使用传统 `callback` 、`Promise` 来实现？如何实现才能保证代码的可读性和可扩展性？就算能实现又要耗费多少代码量呢？我们以第一个按钮点击问题为例，看看 **RxJS** 的实现：

```typescript
import { fromEvent } from 'rxjs'
import { filter, skip } from 'rxjs/operators'

// 1.监听button的click事件
fromEvent<Event>(document.getElementById('button'), 'click')
  .pipe(
    skip(2), // 2.跳过前两次点击
    filter((event, index) => index % 2 === 0) // 3.过滤掉偶数次点击
  )
  .subscribe(event => {
    // 4.observer接收事件
    console.log('第2次之后的奇数次点击触发事件', event)
  })
```

通过上述的例子，我们应该可以看到在复杂异步问题中 **RxJS** 代码逻辑是极为简洁清晰的。实际情况中**Web 前端的异常捕获、性能指标、行为特征等往往都是离散且异步的，并且需要针对每种数据进行单独处理，这是 XiaoMo SDK 采用 RxJS 作为编程范式的重要原因**。

## 3.构建系统

**XiaoMo SDK** 采用了双构建系统，即同时配置了 [Webpack](https://webpack.docschina.org/) 和 [Rollup](https://www.rollupjs.com/)。其中 Rollup 负责生产环境的标准 SDK 构建，Webpack 负责开发环境的 SDK 构建和所有环境演示页构建。构建关系图如下：

<img :src="$withBase('/assets/xiaomo/sdk_build.png')" alt="图片" />

#### 构建产物

- 开发环境：无框架演示页、React 演示页、Vue2 演示页
- 生产环境：标准 SDK（包含 cjs、esm、min 格式）、React 演示页、Vue2 演示页

## 4.SDK 设计

**XiaoMo** 在客户端触点的核心逻辑只有两步：**`收集数据` -> `上报`**。因此 SDK 设计的重点在于如何基于核心逻辑实现 **动态指标收集**、**数据加工及处理**、**多方式上报**、**扩展预留** 这四个功能，SDK 架构图如下：

<img :src="$withBase('/assets/xiaomo/sdk1.jpg')" alt="图片" />

SDK 通过 **RxJS** 将核心逻辑抽象为一个 **Streams 流**，通过 **Observer 订阅** 启动整个 SDK 的监控，整条链路上的节点可分为下面三类：

- **Observable 可观察对象**：将 SDK 配置、异常捕获、性能指标、行为操作等包装为可观察对象
- **Operators 操作符**：执行中间的数据加工及处理
- **Observer 观察者**：订阅并接收待提交数据，执行上报

由于 `Observable` 是根据 SDK 配置动态生成组合的，因此实现了**动态指标收集**。整个 **Streams** 的运行依赖 `Operators` 节点对 **数据进行加工及处理**。如果我们希望在 **`收集数据` -> `上报`** 之间增加新功能，只需要将对应逻辑封装在新的 `Operators` 里，并在 **Streams** 中添加新节点即可，这利用 **RxJS** 轻松实现了 **扩展预留**。在上报阶段，`Observer` 中的 **report** 函数会根据当前浏览器环境自动选择 [sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon) 或 [xhr](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 执行**多方式上报**，整条链路上的逻辑清晰易懂。
