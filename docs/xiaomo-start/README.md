---
lang: zh-CN
title: SDK
# sidebar: auto
---

## 1.环境要求

| 环境    | 类型   | 版本 |
| :------ | :----- | :--- |
| IE      | 浏览器 | >=9  |
| Edge    | 浏览器 | >=12 |
| Chrome  | 浏览器 | >=6  |
| Firefox | 浏览器 | >=7  |
| Safari  | 浏览器 | >=8  |

## 2.安装与使用

### 普通 HTML 应用

👷 施工中

### 基于 Webpack 构建的应用

#### 安装

```shell
npm i @lqdlabs/xiaomo -S
# or
yarn add @lqdlabs/xiaomo -S
```

#### 配置 Vue2

```javascript
import Vue from 'vue'
import App from './App.vue'
// 1.引入sdk
import XIAOMO from '@lqdlabs/xiaomo'

// 2.配置sdk
Vue.use(XIAOMO, {
  enable: true, // 启用SDK
  debug: true, // 启用SDK日志
  appCode: '你申请的appCode',
  url: '部署的上报接口'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
```

#### 配置 Vue3

```javascript
import { createApp } from 'vue'
import App from './App.vue'
// 1.引入sdk
import XIAOMO from '@lqdlabs/xiaomo'

const app = createApp(App)
// 2.配置sdk
app.use(NS, {
  enable: true, // 启用SDK
  debug: true, // 启用SDK日志
  appCode: '你申请的appCode',
  url: '部署的上报接口'
})
app.mount('#app')
```

#### 配置 React

```javascript
import React from 'react'
import { render } from 'react-dom'
import App from './App'
// 1.引入sdk
import XIAOMO from '@lqdlabs/xiaomo'

// 2.配置sdk
XIAOMO.init({
  enable: true, // 启用SDK
  debug: true, // 启用SDK日志
  appCode: '你申请的appCode',
  url: '部署的上报接口'
})

render(<App />, document.getElementById('root'))
```

## 3.配置项

### enable

- 类型：`boolean`
- 默认值：`false`

SDK 是否启用，关闭后将不会进行任何指标收集及上报。

### debug

- 类型：`boolean`
- 默认值：`false`

SDK 是否输出 debug 信息，开启后会在控制台输出各类指标信息。

### env

- 类型：`'h5' | 'miniprogram'`
- 默认值：`'h5'`

SDK 运行环境，不同的运行环境会加载对应的监听配置。

### appCode

- 类型：`string`
- 默认值：`null`

SDK 应用 code，需要在 [管理端](/xiaomo/viewAdmin/) 中申请后配置，非法的 appCode 数据不会被 [服务端](/xiaomo/server/) 接收。

### url

- 类型：`string`
- 默认值：`null`

SDK 上报接口地址，需要根据部署 [服务端](/xiaomo/server/) 的地址进行配置。

### immediate

- 类型：`boolean`
- 默认值：`false`

SDK 是否立即上报数据，SDK 默认会在浏览器空闲时进行数据上报，如果设定为 `true` 则会直接上报数据。

### vue

- 类型：`any`
- 默认值：`null`

vue 构造函数或实例，使用 `Vue.use` 配置 SDK 时可忽略此项。
