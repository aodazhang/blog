---
lang: zh-CN
title: 扩展
# sidebar: auto
---

## sass 版本问题

`dart-sass`、`node-sass` 和 `sass-loader` 之间存在版本对应关系，aoda.css 建议使用官方推荐的 [dart-sass](https://github.com/sass/dart-sass) 作为 sass 编译器以获得更好的开发体验。nodejs 和 sass 工具链的版本对应关系如下表：

| nodejs | sass（dart-sass） | node-sass | sass-loader |
| :----: | :---------------: | :-------: | :---------: |
|  v17   |        --         |  v7.0.0   |     --      |
|  v16   |        --         |  v6.0.1   |     --      |
|  v15   |        --         |  v5.0.0   |     --      |
|  v14   |        --         |  v4.14.1  |   v12.4.0   |
|  v13   |        --         |  v4.13.1  |   v7.3.1    |
|  v12   |        --         |  v4.12.0  |     --      |
|  v11   |        --         |  v4.10.0  |     --      |
|  v10   |        --         |  v4.9.4   |     --      |
|   v8   |        --         |  v4.5.3   |     --      |

## vscode 插件支持

### vetur

aoda.css 通过该插件的 [Component Data](https://vuejs.github.io/vetur/guide/component-data.html) 提供特性支持。通过 [包管理器安装](/aoda-css/start.html#安装) 后会自动配置（重启 vscode 生效），使用 [atomic](/aoda-css/api.html#atomic) 功能时会出现相应的代码提示：

![vetur](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/vetur.png)

### volar

由于插件开发者的 [个人偏好](https://github.com/johnsoncodehk/volar/issues/418) 原因，aoda.css 目前无计划提供该插件支持。如果需要类似 Vetur 的效果，可自行定义 `.d.ts` 文件：

```typescript
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    div: import('vue').DefineComponent<{
      /** fl-主轴类型 row */
      readonly FlR: boolean
      /** fl-主轴类型 row-reverse */
      readonly FlRr: boolean
      /** fl-主轴类型 column */
      readonly FlC: boolean
      /** fl-主轴类型 column-reverse */
      readonly FlCr: boolean
    }>
  }
}

export {}
```

![volar](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/volar.png)

## postcss 插件推荐

### postcss-px-to-viewport

aoda.css 推荐使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 代替传统的 rem 适配方案，转换项目中的 px 单位为 vw。

#### 1.通过包管理器安装

```shell
yarn add postcss-px-to-viewport -D
```

#### 2.配置 postcss.config.js

```typescript
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      exclude: [/node_modules/], // 忽略转换的目录
      selectorBlackList: ['no2vw'], // 忽略转换的类名
      minPixelValue: 1, // 忽略转换的最大px值：>1px转换
      viewportWidth: 750, // 设计稿宽度
      unitPrecision: 3, // 转换后保留有效数字
      unitToConvert: 'px', // 转换前的单位
      viewportUnit: 'vw', // 转换后的单位
      fontViewportUnit: 'vw', // 字体转后后的单位
      mediaQuery: false // 是否转换媒体查询的单位
    }
  }
}
```
