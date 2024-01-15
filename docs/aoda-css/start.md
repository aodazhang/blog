---
lang: zh-CN
title: 快速开始
# sidebar: auto
---

## 安装

#### 1.通过包管理器安装

```shell
npm i aoda.css -S
# or
yarn add aoda.css -S
```

##### 2.通过 CDN 引用

```html
<link
  rel="stylesheet"
  href="https://project.aodazhang.com/aoda-css/index.css"
/>
```

## 使用

### 使用 css 文件

css 文件是 aoda.css 的原始编译产物，因此不需要引入任何构建工具即可使用。在 css 中您只能修改 settings 中的 [css 变量](/aoda-css/api.html#css-变量) 来调整样式，不能使用 aoda.css 的其他功能，也不能通过 [postcss](https://github.com/postcss/postcss) 对 aoda.css 的样式进行二次处理。

#### 1.创建 css 变量文件

```css
/* 修改默认的css变量 */
:root {
  --aoda-color1: #fff;
  --aoda-color2: #333;
  --aoda-color3: #666;
  --aoda-color4: #aaa;
  --aoda-color5: #f3f4f7;
  --aoda-color6: #3b7ff3;
  --aoda-color7: #fff;
  --aoda-color8: #fff;
  --aoda-color9: #fff;
  --aoda-color10: #fff;
  --aoda-color11: #fff;
  --aoda-color12: #fff;
  --aoda-color13: #fff;
  --aoda-color14: #fff;
  --aoda-color15: #fff;
  --aoda-color16: #fff;
  --aoda-color17: #fff;
  --aoda-color18: #fff;
  --aoda-color19: #fff;
  --aoda-color20: #fff;

  --aoda-font-size1: 16px;
  --aoda-font-size2: 20px;
}
```

#### 2.配置

```typescript
import { createApp } from 'vue'
import App from './App.vue'
// 1.引入 aoda.css
import 'aoda.css'
// 2.引入自定义的 css 变量文件
import './cssVar.css'

createApp(App).mount('#app')
```

#### 3.使用

```vue
<template>
  <!-- 通过属性选择器使用 aoda.css 提供的原子样式 -->
  <div id="app" bg-5>
    <ul fl-r>
      <li co-2>测试文字</li>
      <li co-2>测试文字</li>
      <li co-2>测试文字</li>
    </ul>
  </div>
</template>
```

### 使用 scss 文件

使用 scss 文件需要您的项目里集成了相关工具（例如 [dart-sass](https://github.com/sass/dart-sass) 和 [sass-loader](https://github.com/webpack-contrib/sass-loader)）。在 scss 中您可以使用 aoda.css 全部功能（例如修改 settings 中的 [scss 变量](/aoda-css/api.html#scss-变量) 来影响 [mixins](/aoda-css/api.html#mixins)、[atomic](/aoda-css/api.html#atomic)），也可以通过 [postcss](https://github.com/postcss/postcss) 对 aoda.css 的样式进行二次处理。

#### 1.创建 scss 变量文件

```scss
// 1.修改默认的 scss 变量
$atomic-font-size: 90; // 默认生成 12px ~ 72px 的字号，这里修改为生成 12px ~ 90px 的字号

// 2.引入 aoda.css 的 scss 文件
@import '~aoda.css/dist/index.scss';

// 3.修改默认的 css 变量
:root {
  --aoda-color1: #fff;
  --aoda-color2: #333;
  --aoda-color3: #666;
  --aoda-color4: #aaa;
  --aoda-color5: #f3f4f7;
  --aoda-color6: #3b7ff3;
  --aoda-color7: #fff;
  --aoda-color8: #fff;
  --aoda-color9: #fff;
  --aoda-color10: #fff;
  --aoda-color11: #fff;
  --aoda-color12: #fff;
  --aoda-color13: #fff;
  --aoda-color14: #fff;
  --aoda-color15: #fff;
  --aoda-color16: #fff;
  --aoda-color17: #fff;
  --aoda-color18: #fff;
  --aoda-color19: #fff;
  --aoda-color20: #fff;

  --aoda-font-size1: 16px;
  --aoda-font-size2: 20px;
}
```

#### 2.配置

```typescript
import { createApp } from 'vue'
import App from './App.vue'
// 引入自定义的 scss 变量文件
import './scssVar.css'

createApp(App).mount('#app')
```

#### 3.使用

```vue
<template>
  <!-- 通过属性选择器使用 aoda.css 提供的原子样式 -->
  <div id="app" bg-5>
    <ul fl-r>
      <!-- 这里可以使用 scss 变量生成的 90px 字号 -->
      <li co-2 fs-90>测试文字</li>
      <li co-2 fs-90>测试文字</li>
      <li co-2 fs-90>测试文字</li>
    </ul>
  </div>
</template>
```
