---
lang: zh-CN
title: 指标
# sidebar: auto
---

## 异常 Exception

异常监控是前端监控系统设计中极为重要的一环，是保证产品质量最直接有效的手段。前端应用的异常情况大体来说分为以下几类：

- **代码异常**：如 js 运行时异常、Promise 内异常等
- **资源异常**：如 css 样式表加载异常、js 脚本加载异常、img 图片加载异常等
- **网络异常**：如 xhr 请求异常、fetch 请求异常等
- **特定平台或框架异常**：如 vue 生命周期钩子内异常等

### 1.代码异常

#### SyntaxError：语法错误

```javascript
const a
```

::: danger 错误
Uncaught SyntaxError: Missing initializer in const declaration
:::

只能在控制台捕获，语法错误通常可以在开发阶段被发现

#### TypeError：值不是所期待的类型

```javascript
const obj = null
obj.name
```

::: danger 错误
Uncaught TypeError: Cannot read properties of null (reading 'name')
:::

可以被 `window.onerror` 或 `window.addEventListener('error')` 捕获

#### ReferenceError：引用未声明的变量

```javascript
console.log(b)
```

::: danger 错误
Uncaught ReferenceError: b is not defined
:::

可以被 `window.onerror` 或 `window.addEventListener('error')` 捕获

#### RangeError：值不在其所允许的范围或者集合中

```javascript
;(function fn() {
  fn()
})()
```

::: danger 错误
Uncaught RangeError: Maximum call stack size exceeded
:::

可以被 `window.onerror` 或 `window.addEventListener('error')` 捕获

#### Promise 内部异常

```javascript
new Promise((resolve, reject) => {
  testPromise
  resolve('')
})
```

::: danger 错误
Uncaught (in promise) ReferenceError: testPromise is not defined
:::

可以被 `window.addEventListener('unhandledrejection')` 捕获

#### Async/Await 内部异常

```javascript
;(async function fn() {
  await testAsync
  return ''
})()
```

::: danger 错误
Uncaught (in promise) ReferenceError: testAsync is not defined
:::

可以被 `window.addEventListener('unhandledrejection')` 捕获

### 2.资源异常

#### css 样式表加载错误

```html
<link rel="stylesheet" href="http://testLink.css" />
```

::: danger 错误
GET http://testlink.css/ net::ERR_NAME_NOT_RESOLVED
:::

可以被 `window.addEventListener('error')` 捕获

#### javascript 脚本加载错误

```html
<script src="http://testScript.js"></script>
```

::: danger 错误
GET http://testscript.js/ net::ERR_NAME_NOT_RESOLVED
:::

可以被 `window.addEventListener('error')` 捕获

#### img 图片加载错误

```html
<img src="http://testImage.jpg" alt="测试图片" />
```

::: danger 错误
GET http://testimage.jpg/ net::ERR_NAME_NOT_RESOLVED
:::

可以被 `window.addEventListener('error')` 捕获

### 3.网络异常

#### xhr 请求错误

```javascript
const xhr = new XMLHttpRequest()
xhr.open('POST', 'https://lqd-labs.cn/xiaomo-server/api/app?current=1', true)
xhr.send(JSON.stringify({ name: 'zxy', age: 18 }))
```

::: danger 错误
POST https://lqd-labs.cn/xiaomo-server/api/app?current=1 401
:::

可以通过重写 `XMLHttpRequest.prototype.open` 和 `XMLHttpRequest.prototype.send` 函数捕获

#### fetch 请求错误

```javascript
fetch('https://lqd-labs.cn/xiaomo-server/api/app?current=1', {
  method: 'POST',
  body: JSON.stringify({ name: 'zxy', age: 18 })
})
  .then(() => {})
  .catch(() => {})
```

::: danger 错误
POST https://lqd-labs.cn/xiaomo-server/api/app?current=1 401
:::

可以通过重写 `window.fetch` 函数捕获

### 4.特定平台或框架异常

```vue
<template>
  <div>test</div>
</template>

<script>
export default {
  mounted() {
    testVue
  }
}
</script>
```

::: danger 错误
[Vue warn]: Error in mounted hook: "ReferenceError: testVue is not defined"
:::

可以被 `vue.config.errorHandler` 捕获

### 5.小结

针对上述每种异常情况，可以列出对应的捕获方式（不含平台或框架异常）：

|      异常      | onerror | error | unhandledrejection | xhr 重写 | fetch 重写 |
| :------------: | :-----: | :---: | :----------------: | :------: | :--------: |
|  SyntaxError   |   ❌    |  ❌   |         ❌         |    ❌    |     ❌     |
|   TypeError    |   ✔️    |  ✔️   |         ❌         |    ❌    |     ❌     |
| ReferenceError |   ✔️    |  ✔️   |         ❌         |    ❌    |     ❌     |
|   RangeError   |   ✔️    |  ✔️   |         ❌         |    ❌    |     ❌     |
|    Promise     |   ❌    |  ❌   |         ✔️         |    ❌    |     ❌     |
|  Async/Await   |   ❌    |  ❌   |         ✔️         |    ❌    |     ❌     |
|  css 加载错误  |   ❌    |  ✔️   |         ❌         |    ❌    |     ❌     |
|  js 加载错误   |   ❌    |  ✔️   |         ❌         |    ❌    |     ❌     |
|  图片加载错误  |   ❌    |  ✔️   |         ❌         |    ❌    |     ❌     |
|  xhr 请求错误  |   ❌    |  ❌   |         ❌         |    ✔️    |     ❌     |
| fetch 请求错误 |   ❌    |  ❌   |         ❌         |    ❌    |     ✔️     |

最终可以采取下列方式进行异常监控：

- **代码异常（非 Promise）、资源异常**
  ```javascript
  window.addEventListener('error', 处理异常函数, true)
  ```
- **代码异常（Promise、Async/Await）**
  ```javascript
  window.addEventListener('unhandledrejection', 处理异常函数, true)
  ```
- **网络异常**
  ```javascript
  window.XMLHttpRequest.prototype.open = 重写xhr.open函数处理异常
  window.XMLHttpRequest.prototype.send = 重写xhr.send函数处理异常
  window.fetch = 重写fetch函数处理异常
  ```

## 性能 Performance

性能测量是保证应用交互体验的重要手段，通过对特定指标的分析可以得出有效的性能优化方案。前端应用的性能种类分为以下两类：

- **页面加载性能**：如资源加载速度、首屏渲染速度等
- **交互体验性能**：如操作响应延迟、布局偏移值、xhr 请求耗时等

### 1.DOM 指标

> 兼容性好，可获取 Web 页面基础性能指标，但不能满足现代前端精细化测量需求。

#### DOMContentLoaded

<img :src="$withBase('/assets/xiaomo/p1.png')" alt="图片" />

```javascript
window.addEventListener('DOMContentLoaded', event => {})
```

HTML 文档加载和解析完成之后触发（不包含 css 样式表、img 图片、iframe 等），通常作为**首屏参考指标**。

#### load

<img :src="$withBase('/assets/xiaomo/p2.png')" alt="图片" />

```javascript
window.addEventListener('load', event => {})
```

HTML 文档及所有资源（包含 css 样式表、img 图片、iframe 等）加载之后触发，通常作为**核心渲染指标**。

### 2.Performance 指标

> 兼容性较好，可获取 Web 页面加载阶段所有指标，能满足现代前端精细化测量需求。

<img :src="$withBase('/assets/xiaomo/p3.png')" alt="图片" />

关于 Performance Timing 指标的瀑布图如下：

<img :src="$withBase('/assets/xiaomo/p5.png')" alt="图片" />

#### redirect

```javascript
redirectEnd - redirectStart
```

页面地址重定向耗时，通常作为**首屏计算指标**。

#### appCache

```javascript
domainLookupStart - fetchStart
```

页面缓存读取耗时，通常作为**首屏计算指标**。

#### dns

```javascript
domainLookupEnd - domainLookupStart
```

DNS 域名解析耗时，通常作为**首屏计算指标**。

#### tcp

```javascript
connectEnd - connectStart
```

TCP 链接建立耗时，通常作为**首屏计算指标**。

#### ssl

```javascript
connectEnd - secureConnectionStart
```

SSL 安全认证耗时，通常作为**首屏计算指标**。

#### tti

```javascript
domInteractive - fetchStart
```

页面首次可交互耗时，通常作为**核心交互体验指标**。

### 3.PerformanceObserver 指标

> 兼容性一般，可获取 Web 页面新一代性能指标，能满足现代前端精细化测量需求。

<img :src="$withBase('/assets/xiaomo/p4.png')" alt="图片" />

#### fp（First Paint）

```javascript
new PerformanceObserver(entries => {
  for (const entry of entries) {
    if (entry.name === 'first-paint') {
      // 取值算法
    }
  }
}).observe({ type: 'paint', buffered: true })
```

从页面加载开始到第一个像素绘制到屏幕上的耗时，FP 发生的时间一定小于等于 FCP，通常作为**首屏参考指标**。

#### fcp（First Contentful Paint）

```javascript
new PerformanceObserver(entries => {
  for (const entry of entries) {
    if (entry.name === 'first-contentful-paint') {
      // 取值算法
    }
  }
}).observe({ type: 'paint', buffered: true })
```

从页面加载开始到任意元素在屏幕上完成渲染的时间，该指标越高代表页面白屏时间越长，通常作为**首屏参考指标**。

#### lcp（Largest Contentful Paint）

```javascript
new PerformanceObserver(entries => {
  for (const entry of entries) {
    // 取值算法
  }
}).observe({ type: 'largest-contentful-paint', buffered: true })
```

从页面加载开始到最大元素在屏幕上完成渲染的时间，由于最大元素在渲染过程中可能发生变化，因此该指标是动态的，另外该指标会在用户第一次交互后停止记录，该指标越高代表页面白屏时间越长，通常作为**核心渲染指标**。

#### fid（First Input Delay）

```javascript
new PerformanceObserver(entries => {
  for (const entry of entries) {
    // 取值算法
  }
}).observe({ type: 'first-input', buffered: true })
```

页面在 fcp 和 tti 之间首次响应用户操作的延迟，该指标越高代表页面操作越迟钝，通常作为**核心交互体验指标**。

#### tbt（Total Blocking Time）

```javascript
new PerformanceObserver(entries => {
  for (const entry of entries) {
    if (entry.name !== 'self') {
      return
    }
    // 取值算法
  }
}).observe({ type: 'longtask', buffered: true })
```

页面 fcp 到 tti 之间的所有长任务阻塞时间总和，该指标越高代表页面操作越迟钝，通常作为**首屏参考指标**。

#### cls（Cumulative Layout Shift）

```javascript
let tbt = 0
new PerformanceObserver(entries => {
  for (const entry of entries) {
    // 只统计和用户行为无关的偏移（忽略用户拖拽缩放窗口、拖拽文本框等）
    if (!entry.hadRecentInput) {
      // 取值算法
    }
  }
}).observe({ type: 'layout-shift', buffered: true })
```

页面累计位移偏移值，会统计所有意外布局偏移的累积分数（布局偏移分数 = 影响分数 \* 距离分数），该指标越高代表页面实际体验稳定性越差，通常作为**核心交互体验指标**。

### 4.网络请求指标

> XMLHttpRequest 兼容性佳，fetch 兼容性一般，两者都需要重写对应函数实现才可获取性能指标。

#### xhr

<img :src="$withBase('/assets/xiaomo/p6.png')" alt="图片" />

```javascript
window.XMLHttpRequest.prototype.open = 重写xhr.open函数计算耗时
window.XMLHttpRequest.prototype.send = 重写xhr.send函数计算耗时
```

ajax 请求响应速度，通常作为**核心交互体验指标**。

#### fetch

<img :src="$withBase('/assets/xiaomo/p7.png')" alt="图片" />

```javascript
window.fetch = 重写fetch函数计算耗时
```

fetch 请求响应速度，通常作为**核心交互体验指标**。

### 5.小结

针对上述性能指标，结合 Google 提出网站用户体验的三大核心指标，可列出实际的测量指标：

|     性能指标     |  兼容性  |      测量特性      | 指标标准 |
| :--------------: | :------: | :----------------: | :------: |
| DOMContentLoaded |    好    | HTML 加载解析速度  |   参考   |
|     **load**     |  **好**  |    **渲染速度**    | **核心** |
|     redirect     |   较好   |    加载速度计算    |   参考   |
|     appCache     |   较好   |    加载速度计算    |   参考   |
|       dns        |   较好   |    加载速度计算    |   参考   |
|       tcp        |   较好   |    加载速度计算    |   参考   |
|       ssl        |   较好   |    加载速度计算    |   参考   |
|     **tti**      | **较好** | **首次可交互速度** | **核心** |
|        fp        |   一般   |      渲染速度      |   参考   |
|       fcp        |   一般   |      渲染速度      |   参考   |
|     **lcp**      | **一般** |    **渲染速度**    | **核心** |
|     **fid**      | **一般** | **首次可交互速度** | **核心** |
|       tbt        |   一般   |   首次可交互速度   |   参考   |
|     **cls**      | **一般** | **布局意外偏移值** | **核心** |
|     **xhr**      |  **好**  |  **请求响应速度**  | **核心** |
|    **fetch**     | **一般** |  **请求响应速度**  | **核心** |

## 行为 Behavior

页面行为统计是辅助异常监控和性能分析的手段，涵盖了用户的日访问量、访问次数、设备环境等诸多类别。通常来说页面行为和异常与性能相比会更侧重业务，但 **XiaoMo** 的设计初衷并非是面向业务开发的埋点系统，因此只会**匿名收集有限的页面行为数据**。

### 1.访问

#### pv

页面浏览量（Page View），页面每天访问的次数。

#### uv

页面访问用户数（User View），页面每天访问的 ip 数量。

### 2.小结

👷 施工中
