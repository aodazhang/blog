---
lang: zh-CN
title: API
# sidebar: auto
---

## settings

### css 变量

包含 css 的颜色、字体、字号、行高。影响基础样式、mixins 和 atomic 颜色相关样式，

#### 1.颜色

- base：html 默认字色（--aoda-color2）
- mixins：[font-color](/aoda-css/api.html#font-color-字体颜色)、[selection](/aoda-css/api.html#selection-鼠标选中)
- atomic：[animation](/aoda-css/api.html#animation-动画)、[typography](/aoda-css/api.html#typography-文本排版)、[visual](/aoda-css/api.html#visual-视觉)

#### 2.字体

- base：html 默认字体（--aoda-font-family1）

#### 3.字号

- base：html 默认字号（--aoda-font-size1）、h1 和 h2 默认字号（--aoda-font-size2）
- mixins：[font-size](/aoda-css/api.html#font-size-字体尺寸)

#### 4.行高

- base：html 默认行高（--aoda-line-height1）
- mixins：[font-size](/aoda-css/api.html#font-size-字体尺寸)

```scss
:root {
  // 1.颜色
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

  // 2.字体
  --aoda-font-family1: 'PingFangSC-Medium', 'PingFang SC', -apple-system, blinkmacsystemfont,
    'Helvetica Neue', helvetica, segoe ui, arial, roboto, 'miui',
    'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  --aoda-font-family2: avenir-heavy, 'PingFang SC', 'Helvetica Neue', arial,
    sans-serif;

  // 3.字号
  --aoda-font-size1: 16px;
  --aoda-font-size2: 20px;

  // 4.行高
  --aoda-line-height1: normal;
}
```

### scss 变量

包含 scss 的控制参数。影响基础样式、mixins 的函数参数 和 atomic 的生成参数。

#### 1.mixins 参数

- base：dpr/暗色模式/响应式的媒体查询
- mixins：[image-dpr](/aoda-css/api.html#image-dpr-本地适配图片)

#### 2.atomic 参数

- atomic：[所有](/aoda-css/api.html#atomic)

```scss
/****************************** 一.mixins参数 ******************************/

// 媒体查询：576px-
$mixins-xs: 'only screen and (max-width: 575px)';

// 媒体查询：576px+
$mixins-sm: 'only screen and (min-width: 576px) and (max-width: 767px)';

// 媒体查询：768px+
$mixins-md: 'only screen and (min-width: 768px) and (max-width: 991px)';

// 媒体查询：992px+
$mixins-lg: 'only screen and (min-width: 992px) and (max-width: 1199px)';

// 媒体查询：1200px+
$mixins-xl: 'only screen and (min-width: 1200px) and (max-width: 1399px)';

// 媒体查询：1400px+
$mixins-xxl: 'only screen and (min-width: 1400px)';

// 媒体查询：dpr3
$mixins-dpr3: 'only screen and (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)';

// 媒体查询：dpr2
$mixins-dpr2: 'only screen and (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2)';

// 媒体查询：亮色模式（mac/iphone亮暗适配）
$mixins-light: 'only screen and (prefers-color-scheme: light)';

// 媒体查询：暗色模式（mac/iphone亮暗适配）
$mixins-dark: 'only screen and (prefers-color-scheme: dark)';

/****************************** 二.atomic参数 ******************************/

// 颜色：1 ~ 20色号
$atomic-color: 20 !default;

// 位置：0px ~ 100px
$atomic-location: 100 !default;

// 边距：0px ~ 100px
$atomic-size: 100 !default;

// 边框倒角：0px ~ 60px
$atomic-border: 60 !default;

// 字号：12px ~ 72px
$atomic-font-size: 72 !default;

// 文字行数：1 ~ 6
$atomic-line: 6 !default;

// z-index：0 ~ 1000
$atomic-zindex: (0, 1, 2, 3, 4, 5, 10, 100, 1000) !default;

// 不透明度：0 ~ 1
$atomic-opacity: (
  '0': 0,
  '1': 0.1,
  '2': 0.2,
  '3': 0.3,
  '4': 0.4,
  '5': 0.5,
  '6': 0.6,
  '7': 0.7,
  '8': 0.8,
  '9': 0.9,
  '10': 1
) !default;

// 盒模型
$atomic-box-sizing: (
  'c': content-box,
  'b': border-box
) !default;

// 盒边距
$atomic-edge: (
  'p': padding,
  'm': margin
) !default;

// 可见性
$atomic-visibility: (
  'h': hidden,
  'v': visible
) !default;

// 图片适配
$atomic-object-fit: (
  'cr': cover,
  'cn': contain
) !default;

// 字重
$atomic-font-weight: (
  '100': 100,
  '200': 200,
  '300': 300,
  '400': 400,
  '500': 500,
  '600': 600,
  '700': 700,
  '800': 800,
  '900': 900,
  'l': lighter,
  'n': normal,
  'b': bold,
  'bo': bolder
) !default;

// 字行高
$atomic-line-height: (
  '1': 1,
  '11': 1.1,
  '12': 1.2,
  '13': 1.3,
  '14': 1.4,
  '15': 1.5,
  '2': 2,
  'n': normal
) !default;

// 字对齐
$atomic-text-align: (
  's': start,
  'c': center,
  'e': end,
  'l': left,
  'r': right
) !default;

// 定位：相对、绝对、固定、粘性
$atomic-position: (
  'r': relative,
  'a': absolute,
  'f': fixed,
  's': sticky
) !default;

// 方向：上、下、左、右
$atomic-direction: (
  't': top,
  'b': bottom,
  'l': left,
  'r': right
) !default;

// flex主轴方向
$atomic-flex-direction: (
  'r': row,
  'rr': row-reverse,
  'c': column,
  'cr': column-reverse
) !default;

// flex主轴换行
$atomic-flex-wrap: (
  'n': nowrap,
  'w': wrap
) !default;

// flex轴对齐
$atomic-flex-content: (
  'fs': flex-start,
  'fe': flex-end,
  'c': center,
  'sb': space-between,
  'sa': space-around,
  's': stretch
) !default;
```

## mixins

在指定选择器内部调用 mixins 即可生成对应样式。

```vue
<style lang="scss">
/* 1.引入 aoda.css 的内置 mixins */
@import '~aoda.css/dist/mixins/index.scss';

.button {
  /* 2.使用cursor生成鼠标手势 */
  @include cursor;
  width: 100px;
  height: 100px;
}
</style>
```

### transition 过渡动画

> 设置过渡动画效果

```scss
@include transition(
  $property: all,
  $duration: 0.35s,
  $timingFunction: ease,
  $delay: 0s
);
```

| 参数                | 说明         | 可选值                                                                                           |
| :------------------ | :----------- | :----------------------------------------------------------------------------------------------- |
| **$property**       | css 属性名   |                                                                                                  |
| **$duration**       | 动画时长     |                                                                                                  |
| **$timingFunction** | 动画曲线     | linear（线性）、ease（快缓入慢缓出）、ease-in（缓入）、ease-out（缓出）、ease-in-out（缓入缓出） |
| **$delay**          | 动画延迟时长 |                                                                                                  |

### animation 帧动画

> 设置帧动画效果

```scss
@include animation(
  $animationId,
  $duration: 0.5s,
  $timingFunction: ease,
  $delay: 0s,
  $iterationCount: 1,
  $direction: normal,
  $fillMode: forwards,
  $playState: running
);
```

| 参数                | 说明             | 可选值                                                                                           |
| :------------------ | :--------------- | :----------------------------------------------------------------------------------------------- |
| **$animationId**    | @keyframes 名称  |                                                                                                  |
| **$duration**       | 动画时长         |                                                                                                  |
| **$timingFunction** | 动画曲线         | linear（线性）、ease（快缓入慢缓出）、ease-in（缓入）、ease-out（缓出）、ease-in-out（缓入缓出） |
| **$delay**          | 动画延迟时长     |                                                                                                  |
| **$iterationCount** | 动画执行次数     | number（次数）、infinite（无限次）                                                               |
| **$direction**      | 动画执行顺序     | normal（正向）、reverse（反向）、alternate（先正向后反向）、alternate-reverse（先反向后正向）    |
| **$fillMode**       | 动画执行结束样式 | none（无）、backwards（动画起始帧样式）、forwards（动画结束帧样式）                              |
| **$playState**      | 动画执行状态     | running（运行）、paused（暂停）                                                                  |

### clip 路径裁切

> 根据指定路径裁切元素（不会改变容器尺寸）

```scss
@include clip($clipPath: inset(10px 10px));
```

| 参数          | 说明     | 可选值                                            |
| :------------ | :------- | :------------------------------------------------ |
| **$clipPath** | 裁切路径 | inset(长 宽)（矩形）、circle(半径 at x y)（圆形） |

### clip-svg 路径裁切

> 根据 svg 路径裁切元素（不会改变容器尺寸）

```scss
@include clip-svg($svgId: '#clip');
```

| 参数       | 说明        | 可选值 |
| :--------- | :---------- | :----- |
| **$svgId** | svg 元素 Id |        |

### cursor 鼠标手势

> 设置系统样式鼠标手势

```scss
@include cursor($cursor: pointer);
```

| 参数        | 说明     | 可选值                                               |
| :---------- | :------- | :--------------------------------------------------- |
| **$cursor** | 系统样式 | default（默认箭头）、pointer（可点击）、move（移动） |

### cursor-locale 鼠标手势

> 设置本地图片作为鼠标手势

```scss
@include cursor-locale(
  $baseUrl,
  $imageName,
  $imageExtension: 'png',
  $cursor: default
);
```

| 参数                | 说明         | 可选值                                               |
| :------------------ | :----------- | :--------------------------------------------------- |
| **$baseUrl**        | 资源基础路径 |                                                      |
| **$imageName**      | 图片名       |                                                      |
| **$imageExtension** | 图片扩展名   |                                                      |
| **$cursor**         | 系统样式     | default（默认箭头）、pointer（可点击）、move（移动） |

### cursor-network 鼠标手势

> 设置网络图片作为鼠标手势

```scss
@include cursor-network($url, $cursor: default);
```

| 参数        | 说明     | 可选值                                               |
| :---------- | :------- | :--------------------------------------------------- |
| **$url**    | 资源路径 |                                                      |
| **$cursor** | 系统样式 | default（默认箭头）、pointer（可点击）、move（移动） |

### selection 鼠标选中

> 设置鼠标选中的样式（pc）

```scss
@include selection($color: var(--aoda-color4), $backgroundColor: transparent);
```

| 参数                 | 说明   | 可选值 |
| :------------------- | :----- | :----- |
| **$color**           | 字色   |        |
| **$backgroundColor** | 背景色 |        |

### filter 滤镜

> 设置滤镜

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter($filterType: blur(3px));
```

| 参数            | 说明   | 可选值 |
| :-------------- | :----- | :----- |
| **$filterType** | 滤镜值 |        |

### filter-hue 色相

> 设置色相

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-hue($angle: 90deg);
```

| 参数       | 说明   | 可选值               |
| :--------- | :----- | :------------------- |
| **$angle** | 色相值 | 0deg（原色）~ 360deg |

### filter-saturate 饱和度

> 设置饱和度

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-saturate($percentage: 50%);
```

| 参数            | 说明   | 可选值    |
| :-------------- | :----- | :-------- |
| **$percentage** | 饱和度 | 1（原色） |

### filter-brightness 明度

> 设置明度

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-brightness($percentage: 50%);
```

| 参数            | 说明 | 可选值             |
| :-------------- | :--- | :----------------- |
| **$percentage** | 明度 | 0（暗）~ 1（原色） |

### filter-contrast 对比度

> 设置对比度

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-contrast($percentage: 50%);
```

| 参数            | 说明   | 可选值    |
| :-------------- | :----- | :-------- |
| **$percentage** | 对比度 | 1（原色） |

### filter-grayscale 灰度

> 设置灰度

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-grayscale($percentage: 50%);
```

| 参数            | 说明 | 可选值               |
| :-------------- | :--- | :------------------- |
| **$percentage** | 灰度 | 0（原色）~ 1（黑白） |

### filter-sepia 褐色度

> 设置褐色度

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-sepia($percentage: 50%);
```

| 参数            | 说明   | 可选值               |
| :-------------- | :----- | :------------------- |
| **$percentage** | 褐色度 | 0（原色）~ 1（褐色） |

### filter-invert 颜色反转

> 设置颜色反转

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-invert($percentage: 50%);
```

| 参数            | 说明       | 可选值               |
| :-------------- | :--------- | :------------------- |
| **$percentage** | 颜色反转度 | 0（原色）~ 1（反色） |

### filter-opacity 不透明度

> 设置不透明度

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-opacity($percentage: 50%);
```

| 参数            | 说明     | 可选值                 |
| :-------------- | :------- | :--------------------- |
| **$percentage** | 不透明度 | 0（透明）~ 1（不透明） |

### filter-blur 高斯模糊

> 设置高斯模糊

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加
:::

```scss
@include filter-blur($radius: 3px);
```

| 参数        | 说明     | 可选值 |
| :---------- | :------- | :----- |
| **$radius** | 模糊半径 |        |

### filter-blur 图片阴影

> 设置图片阴影

::: warning 注意
滤镜会导致 fixed 元素定位失效，建议分别给固定元素和其他元素加 filter，不要直接在 body 中添加；webkit 不支持 drop-shadow 的 spread 阴影扩展
:::

```scss
@include filter-shadow(
  $color: rgba(0, 0, 0, 0.5),
  $x: 5px,
  $y: 5px,
  $blur: 5px
);
```

| 参数       | 说明            | 可选值 |
| :--------- | :-------------- | :----- |
| **$color** | 阴影色          |        |
| **$x**     | 阴影 x 轴偏移值 |        |
| **$y**     | 阴影 y 轴偏移值 |        |
| **$blur**  | 阴影模糊值      |        |

### mix-blend 混合模式

> 设置多元素之间的混合模式

```scss
@include mix-blend($mixBlendMode: overlay);
```

| 参数              | 说明     | 可选值                                                                                                                                                                                                                                                                                                                                                         |
| :---------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **$mixBlendMode** | 混合模式 | initial（初始）、 inherit（继承）、 unset（复原）、 normal（无）、multiply（正片叠底）、screen（滤色）、overlay（叠加）、darken（变暗）、lighten（变亮）、color-dodge（颜色减淡）、color-burn（颜色加深）、hard-light（强光）、soft-light（柔光）、difference（差值）、exclusion（排除）、hue（色相）、saturation（饱和度）、color（颜色）、luminosity（亮度） |

### font-size 字体尺寸

> 设置字体尺寸

```scss
@include font-size(
  $fontSize: var(--aoda-font-size1),
  $textAlign: start,
  $fontWeight: normal,
  $lineHeight: var(--aoda-line-height1),
  $wordWrap: break-word,
  $wordBreak: break-all,
  $wordSpacing: normal
);
```

| 参数             | 说明     | 可选值                                                                       |
| :--------------- | :------- | :--------------------------------------------------------------------------- |
| **$fontSize**    | 字号     |                                                                              |
| **$textAlign**   | 对齐方式 |                                                                              |
| **$fontWeight**  | 字重     |                                                                              |
| **$lineHeight**  | 行高     |                                                                              |
| **$wordWrap**    | 文本换行 | normal（只在半角空格或连字符的地方进行换行）、break-word（在边界内换行）     |
| **$wordBreak**   | 文本间断 | normal、break-all（单词到边界时,下个字母自动到下一行）、keep-all（单词不断） |
| **$wordSpacing** | 文本间距 |                                                                              |

### font-style 字体样式

> 设置字体样式

```scss
@include font-style(
  $fontStyle: normal,
  $textIndent: 0,
  $textDecoration: none,
  $textTransform: none
);
```

| 参数                | 说明         | 可选值                       |
| :------------------ | :----------- | :--------------------------- |
| **$fontStyle**      | 字风格       | italic（斜体）               |
| **$textIndent**     | 字首行缩进   |                              |
| **$textDecoration** | 字修饰       | line-through（删除线）       |
| **$textTransform**  | 字大小写转换 | capitalize（单词首字母大写） |

### font-color 字体颜色

> 设置字体颜色

```scss
@include font-color($color: var(--aoda-color2), $textShadow: 0 0 0 transparent);
```

| 参数            | 说明     | 可选值 |
| :-------------- | :------- | :----- |
| **$color**      | 字色     |        |
| **$textShadow** | 字体阴影 |        |

### font-nowrap 文本省略号

> 设置文本换行省略号

```scss
@include font-nowrap($line: 1);
```

| 参数      | 说明     | 可选值 |
| :-------- | :------- | :----- |
| **$line** | 文本行数 |        |

### image-locale 本地图片

> 设置本地 background-image 图片

```scss
@include image-locale(
  $baseUrl,
  $imageName,
  $backgroundSize: cover,
  $imageExtension: 'png'
);
```

| 参数                | 说明         | 可选值                                                                   |
| :------------------ | :----------- | :----------------------------------------------------------------------- |
| **$baseUrl**        | 资源基础路径 |                                                                          |
| **$imageName**      | 图片名       |                                                                          |
| **$backgroundSize** | 图片适配     | cover（保持图片比例铺满容器）、contain（保持图片比例在容器完整显示图片） |
| **$imageExtension** | 图片扩展名   |                                                                          |

### image-network 网络图片

> 设置网络 background-image 图片

```scss
@include image-network($url, $backgroundSize: cover);
```

| 参数                | 说明     | 可选值                                                                   |
| :------------------ | :------- | :----------------------------------------------------------------------- |
| **$url**            | 资源路径 |                                                                          |
| **$backgroundSize** | 图片适配 | cover（保持图片比例铺满容器）、contain（保持图片比例在容器完整显示图片） |

### image-dpr 本地适配图片

> 根据 dpr 设置本地 background-image 图片

```scss
@include image-dpr(
  $baseUrl,
  $imageName,
  $backgroundSize: cover,
  $imageExtension: 'png'
);
```

| 参数                | 说明         | 可选值                                                                   |
| :------------------ | :----------- | :----------------------------------------------------------------------- |
| **$baseUrl**        | 资源基础路径 |                                                                          |
| **$imageName**      | 图片名       |                                                                          |
| **$backgroundSize** | 图片适配     | cover（保持图片比例铺满容器）、contain（保持图片比例在容器完整显示图片） |
| **$imageExtension** | 图片扩展名   |                                                                          |

### gradient-linear 双色线性渐变

> 设置 background-image 双色线性渐变

```scss
@include gradient-linear(
  $leftColor: #ffa751,
  $rightColor: #ffe259,
  $angle: 90deg
);
```

| 参数            | 说明     | 可选值 |
| :-------------- | :------- | :----- |
| **$leftColor**  | 渐变色 1 |        |
| **$rightColor** | 渐变色 2 |        |
| **$angle**      | 渐变角度 |        |

### gradient-repeating 重复线性渐变

> 设置 background-image 重复线性渐变

```scss
@include gradient-repeating($repeatColor: #ffa751, $angle: 45deg);
```

| 参数             | 说明     | 可选值 |
| :--------------- | :------- | :----- |
| **$repeatColor** | 渐变色   |        |
| **$angle**       | 渐变角度 |        |

### gradient-radial 双色径向渐变

> 设置 background-image 双色径向渐变

```scss
@include gradient-radial(
  $insideColor: #ffa751,
  $outsideColor: #ffe259,
  $shape: circle,
  $size: farthest-corner,
  $position: center
);
```

| 参数              | 说明       | 可选值 |
| :---------------- | :--------- | :----- |
| **$insideColor**  | 内部渐变色 |        |
| **$outsideColor** | 外部渐变色 |        |
| **$shape**        | 渐变形状   |        |
| **$size**         | 渐变尺寸   |        |
| **$position**     | 渐变位置   |        |

### img-fit 图片标签适配

> 设置 img 图片标签适配

```scss
@include img-fit($objectFit: cover);
```

| 参数           | 说明     | 可选值                                                                   |
| :------------- | :------- | :----------------------------------------------------------------------- |
| **$objectFit** | 图片适配 | cover（保持图片比例铺满容器）、contain（保持图片比例在容器完整显示图片） |

### clear-float 清除浮动

> 设置 img 图片标签适配

```scss
@include clear-float($clear: both);
```

| 参数       | 说明     | 可选值                                            |
| :--------- | :------- | :------------------------------------------------ |
| **$clear** | 清除方式 | left（左浮动）、right（右浮动）、both（两侧浮动） |

### center-flex 垂直居中

> 设置元素以 flex 方式垂直居中

```scss
@include center-flex;
```

### center-position 垂直居中

> 设置元素以 absolute 方式垂直居中

```scss
@include center-position;
```

### column 布局容器

> 设置元素作为 column 布局容器

```scss
@include column(
  $columnCount: 3,
  $columnGap: 0,
  $columnWidth: auto,
  $columnRuleWidth: 0,
  $columnRuleStyle: none,
  $columnRuleColor: rgb(0, 0, 0),
  $columnFill: auto
);
```

| 参数                 | 说明       | 可选值                                            |
| :------------------- | :--------- | :------------------------------------------------ |
| **$columnCount**     | 列数       | auto（本列内容决定）                              |
| **$columnGap**       | 列间距     | normal（1em）                                     |
| **$columnWidth**     | 列宽       | auto（本列内容决定）                              |
| **$columnRuleWidth** | 列边框宽度 |                                                   |
| **$columnRuleStyle** | 列边框样式 |                                                   |
| **$columnRuleColor** | 列边框颜色 |                                                   |
| **$columnFill**      | 列高度指定 | auto（本列内容决定）、balance（内容最多的列决定） |

### column-item 布局元素

> 设置元素作为 column 布局元素

```scss
@include column-item($columnSpan: none);
```

| 参数            | 说明           | 可选值              |
| :-------------- | :------------- | :------------------ |
| **$columnSpan** | 某一列是否跨列 | none（不跨列）、all |

### flex 布局容器

> 设置元素作为 flex 布局容器

::: warning 注意
元素设为 flex 布局容器以后，布局元素的 float、clear、vertical-align 属性将失效
:::

```scss
@include flex(
  $justifyContent: flex-start,
  $flexWrap: nowrap,
  $flexDirection: row,
  $alignItems: center,
  $alignContent: stretch
);
```

| 参数                | 说明             | 可选值                                                                                                                                     |
| :------------------ | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **$justifyContent** | 主轴对齐方式     | flex-start（起始对齐）、flex-end（结尾对齐）、center（居中对齐）、space-between（两侧对齐中间均分）、space-around（均分）、stretch（平铺） |
| **$flexWrap**       | 主轴换行方式     | nowrap（不换行）、wrap（换行）、wrap-reverse（反向换行）                                                                                   |
| **$flexDirection**  | 主轴方向         | row（行）、row-reverse（行反向）、column（列）、column-reverse（列反向）                                                                   |
| **$alignItems**     | 单交叉轴对齐方式 | flex-start（起始对齐）、flex-end（结尾对齐）、center（居中对齐）、space-between（两侧对齐中间均分）、space-around（均分）、stretch（平铺） |
| **$alignContent**   | 多交叉轴对齐方式 | flex-start（起始对齐）、flex-end（结尾对齐）、center（居中对齐）、space-between（两侧对齐中间均分）、space-around（均分）、stretch（平铺） |

### flex-item 布局元素

> 设置元素作为 flex 布局元素

```scss
@include flex-item(
  $flexGrow: 1,
  $flexShrink: 1,
  $flexBasis: auto,
  $order: 0,
  $alignSelf: auto
);
```

| 参数            | 说明                   | 可选值                                                                                                                                     |
| :-------------- | :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **$flexGrow**   | 元素是否支持放大       | 0（不支持）、1（支持）                                                                                                                     |
| **$flexShrink** | 元素是否支持缩小       | 0（不支持）、1（支持）                                                                                                                     |
| **$flexBasis**  | 基础值                 |                                                                                                                                            |
| **$order**      | 元素排序系数（小->大） |                                                                                                                                            |
| **$alignSelf**  | 元素交叉轴对齐方式     | flex-start（起始对齐）、flex-end（结尾对齐）、center（居中对齐）、space-between（两侧对齐中间均分）、space-around（均分）、stretch（平铺） |

### grid 布局容器

> 设置元素作为 grid 布局容器

::: warning 注意
元素设为 grid 布局容器以后，布局元素的 float、display: inline-block、display: table-cell、vertical-align、column-等属性将失效
:::

```scss
@include grid(
  $columnWidth: 100px,
  $rowHeight: 100px,
  $gridColumnGap: 5px,
  $gridRowGap: $gridColumnGap,
  $gridAutoFlow: row,
  $columns: auto-fill,
  $rows: auto-fill,
  $alignItems: stretch,
  $justifyItems: stretch,
  $alignContent: stretch,
  $justifyContent: stretch
);
```

| 参数                | 说明                       | 可选值                                                                  |
| :------------------ | :------------------------- | :---------------------------------------------------------------------- |
| **$columnWidth**    | 列宽度                     |                                                                         |
| **$rowHeight**      | 行宽度                     |                                                                         |
| **$gridColumnGap**  | 列间隔                     |                                                                         |
| **$gridRowGap**     | 行间隔                     |                                                                         |
| **$gridAutoFlow**   | 排列方向                   | row（行方向）、column（列方向）                                         |
| **$columns**        | 列数                       |                                                                         |
| **$rows**           | 行数                       |                                                                         |
| **$alignItems**     | 布局元素交叉轴填充方式     | start（起始对齐）、end（结尾对齐）、center（居中对齐）、stretch（平铺） |
| **$justifyItems**   | 布局元素主轴对齐方式       | start（起始对齐）、end（结尾对齐）、center（居中对齐）、stretch（平铺） |
| **$alignContent**   | 布局元素内部交叉轴填充方式 | start（起始对齐）、end（结尾对齐）、center（居中对齐）、stretch（平铺） |
| **$justifyContent** | 布局元素内部主轴对齐方式   | start（起始对齐）、end（结尾对齐）、center（居中对齐）、stretch（平铺） |

### grid-item 布局元素

> 设置元素作为 grid 布局元素

```scss
@include grid-item(
  $columnSpan: 1,
  $rowSpan: 1,
  $display: inline-grid,
  $alignSelf: auto,
  $justifySelf: auto
);
```

| 参数             | 说明               | 可选值              |
| :--------------- | :----------------- | :------------------ |
| **$columnSpan**  | 列占据比例         |                     |
| **$rowSpan**     | 行占据比例         |                     |
| **$display**     | 元素类型           | inline-grid（行内） |
| **$alignSelf**   | 元素交叉轴对齐方式 |                     |
| **$justifySelf** | 元素主轴对齐方式   |                     |

## atomic

atomic 全部采用 **属性选择器** ，因此在 html、jsx、template 中只要声明了对应的属性，原子样式便会生效。

```vue
<template>
  <div class="item" mt-10 ml-10 br-10 cu-p>
    <p co-6>测试文本</p>
  </div>
</template>
```

有些时候你需要动态控制样式是否生效，这里推荐使用 [Vue3 状态驱动的动态 CSS](https://v3.cn.vuejs.org/api/sfc-style.html#%E7%8A%B6%E6%80%81%E9%A9%B1%E5%8A%A8%E7%9A%84%E5%8A%A8%E6%80%81-css)，用状态值关联 css 变量和 template 样式：

```vue
<template>
  <div class="item" mt-10 ml-10 br-10 cu-p>
    <p co-6>测试文本</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 1.父组件动态传入一个参数
const props = withDefaults(defineProps<{ selected?: boolean }>(), {
  selected: false
})

// 2.设定状态值关联 css 变量和 template 样式
const backgroundColor = computed(() =>
  props.selected ? 'var(--aoda-color1)' : 'var(--aoda-color2)'
)
</script>

<style lang="scss" scoped>
.item {
  /* 3.绑定状态值 */
  background-color: v-bind(backgroundColor);
}
</style>
```

### 命名规则

#### 1.基础命名规则：`属性` - `参数`

- **属性**：通常由其真实的 css 属性名组合而成。如果是 **一个单词**，通常取 **前两位字母** 作为属性；如果是 **两个单词**，通常取 **每个单词首字母** 作为属性
- **参数**：如果是 **单词** 的话，通常是取其的 **首字母**；如果是 **数值** 的话，**整数不变**，**小数去小数点**

  ```scss
  /* 一.属性（1个单词）+ 参数（单词）*/
  position: relative; // -> po-r
  /* 二.属性（2个单词）+ 参数（单词）*/
  box-sizing: border-box; // -> bs-b
  /* 三.属性（2个单词）+ 参数（整数）*/
  line-height: 1; // -> lh-1
  /* 四.属性（2个单词）+ 参数（小数）*/
  line-height: 1.2; // -> lh-12
  ```

#### 2.单属性命名规则：`单属性` - `参数`

- **单属性**：只取首字母作为属性。目前只有特定的五个 css 使用了单属性命名，它们分别是 `z-index` 、`top`、`bottom`、`left`、`right`
- **参数**：同基础命名规则

  ```scss
  z-index: 100; // -> z-100
  top: 50px; // -> t-50
  ```

#### 3 容器属性命名规则：`容器属性` - `参数`

- **容器属性**：flex 相关的 css 都聚合在 `fl-` 命名空间下。这是由于布局容器属性相对比较集中，依据基本规则命名反而不利于使用
- **参数**：同基础命名规则

  ```scss
  flex-wrap: wrap; // -> fl-fww
  justify-content: center; // -> fl-jcc
  flex: 0 0 auto; // -> fl-0
  ```

#### 4.其他命名规则：`功能属性` - `参数`

- **功能属性**：不符合上述规则的其他 css 是根据功能来命名，目前有 `ab-`、`ac-`、`hb-`、`hc-`、`sa-` 、`nw-`
- **参数**：同基础命名规则

  ```scss
  .nw-1 {
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
  }
  ```

### animation 动画

| 命名    | 示例 | 范围   | 作用                                            |
| :------ | :--- | :----- | :---------------------------------------------- |
| hb-数值 | hb-1 | 1 ~ 20 | 鼠标悬停元素时变更背景色（pc）                  |
| hc-数值 | hc-1 | 1 ~ 20 | 鼠标悬停元素时变更字色（pc）                    |
| ab-数值 | ab-1 | 1 ~ 20 | 鼠标点击/触控点击元素时变更背景色（pc、mobile） |
| ac-数值 | ac-1 | 1 ~ 20 | 鼠标点击/触控点击元素时变更字色（pc、mobile）   |

```css
[hb-1]:hover {
  background-color: var(--aoda-color1);
}

[hc-1]:hover {
  color: var(--aoda-color1);
}

[ab-1]:active {
  background-color: var(--aoda-color1);
}

[ab-1]:active {
  color: var(--aoda-color1);
}
```

### box 盒模型

| 命名                   | 示例   | 范围                 | 作用                          |
| :--------------------- | :----- | :------------------- | :---------------------------- |
| bs-类型                | bs-b   | b、c                 | 盒模型                        |
| pa-数值                | pa-1   | 0 ~ 100              | 内边距                        |
| ph-数值                | ph-1   | 0 ~ 100              | 内边距左右                    |
| pv-数值                | pv-1   | 0 ~ 100              | 内边距上下                    |
| pt-数值                | pt-1   | 0 ~ 100              | 内边距上                      |
| pb-数值                | pb-1   | 0 ~ 100              | 内边距下                      |
| pl-数值                | pl-1   | 0 ~ 100              | 内边距左                      |
| pr-数值                | pr-1   | 0 ~ 100              | 内边距右                      |
| ma-数值                | ma-1   | 0 ~ 100              | 外边距                        |
| mh-数值                | mh-1   | 0 ~ 100、a           | 外边距左右                    |
| mv-数值                | mv-1   | 0 ~ 100              | 外边距上下                    |
| mt-数值                | mt-1   | 0 ~ 100              | 外边距上                      |
| mb-数值                | mb-1   | 0 ~ 100              | 外边距下                      |
| ml-数值                | ml-1   | 0 ~ 100              | 外边距左                      |
| mr-数值                | mr-1   | 0 ~ 100              | 外边距右                      |
| ov-类型                | ov-y   | h、a、x、y           | 超出距离后滚动                |
| sa-类型                | sa-t   | t、b                 | 移动端异型屏适配              |
| fl-主轴方向类型        | fl-r   | r、rr、c、cr         | flex 布局容器主轴方向         |
| fl-fw 主轴换行类型     | fl-fww | n、w                 | flex 布局容器主轴换行方式     |
| fl-jc 主轴对齐类型     | fl-jcc | fs、fe、c、sb、sa、s | flex 布局容器主轴对齐方式     |
| fl-ai 单交叉轴对齐类型 | fl-aic | fs、fe、c、sb、sa、s | flex 布局容器单交叉轴对齐方式 |
| fl-ac 多交叉轴对齐类型 | fl-acc | fs、fe、c、sb、sa、s | flex 布局容器多交叉轴对齐方式 |
| fl-元素缩放类型        | fl-0   | 0、1、g、s           | flex 布局元素缩放方式         |

```css
[bs-b] {
  box-sizing: border-box;
}

[pa-1] {
  padding: 1px;
}

[ph-1] {
  padding-left: 1px;
  padding-right: 1px;
}

[pv-1] {
  padding-top: 1px;
  padding-bottom: 1px;
}

[pt-1] {
  padding-top: 1px;
}

[pb-1] {
  padding-bottom: 1px;
}

[pl-1] {
  padding-left: 1px;
}

[pr-1] {
  padding-right: 1px;
}

[ma-1] {
  margin: 1px;
}

[mh-1] {
  margin-left: 1px;
  margin-right: 1px;
}

[mh-a] {
  margin-left: auto;
  margin-right: auto;
}

[mv-1] {
  margin-top: 1px;
  margin-bottom: 1px;
}

[mt-1] {
  margin-top: 1px;
}

[mb-1] {
  margin-bottom: 1px;
}

[ml-1] {
  margin-left: 1px;
}

[mr-1] {
  margin-right: 1px;
}

[ov-y] {
  overflow-x: hidden;
  overflow-y: auto;
}

[sa-t] {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

[fl-r] {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}

[fl-fww] {
  flex-wrap: wrap;
}

[fl-jcc] {
  justify-content: center;
}

[fl-aic] {
  align-items: center;
}

[fl-acc] {
  align-content: center;
}

[fl-0] {
  flex: 0 0 auto;
}
```

### misc 其他

| 命名    | 示例 | 范围 | 作用                        |
| :------ | :--- | :--- | :-------------------------- |
| us-类型 | us-n | n    | 禁用文本选中                |
| pe-类型 | pe-n | n    | 禁用 css 伪类和 js 事件触发 |

```css
[us-n] {
  user-select: none;
}

[pe-n] {
  pointer-events: none;
}
```

### position 定位

| 命名    | 示例  | 范围                 | 作用    |
| :------ | :---- | :------------------- | :------ |
| po-类型 | po-r  | r、a、f、s           | 定位    |
| z-数值  | z-100 | 0 ~ 5、10、100、1000 | z-index |
| t-数值  | t-20  | 0 ~ 100              | 位置上  |
| b-数值  | b-20  | 0 ~ 100              | 位置下  |
| l-数值  | l-20  | 0 ~ 100              | 位置左  |
| r-数值  | r-20  | 0 ~ 100              | 位置右  |

```css
[po-r] {
  position: relative;
}

[z-100] {
  z-index: 100;
}

[t-20] {
  top: 20px;
}

[b-20] {
  bottom: 20px;
}

[l-20] {
  left: 20px;
}

[r-20] {
  right: 20px;
}
```

### typography 文本排版

| 命名    | 示例   | 范围                                                     | 作用                   |
| :------ | :----- | :------------------------------------------------------- | :--------------------- |
| fs-数值 | fs-12  | 12 ~ 72                                                  | 字号                   |
| fw-数值 | fw-400 | 100、200、300、400、500、600、700、800、900、l、n、b、bo | 字重                   |
| lh-数值 | lh-15  | 1、11、12、13、14、15、2、n                              | 行高                   |
| ta-类型 | ta-c   | s、c、e、l、r                                            | 文本对齐               |
| co-数值 | co-1   | 1 ~ 20                                                   | 字色                   |
| nw-数值 | nw-1   | 1 ~ 6                                                    | 文本超出指定行数省略号 |

```css
[fs-12] {
  font-size: 12px;
}

[fw-400] {
  font-weight: 400;
}

[lh-15] {
  line-height: 1.5;
}

[ta-c] {
  text-align: center;
}

[co-1] {
  color: var(--aoda-color1);
}

[nw-1] {
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
}
```

### visual 视觉

| 命名    | 示例  | 范围      | 作用             |
| :------ | :---- | :-------- | :--------------- |
| bg-数值 | bg-1  | 1 ~ 20    | 背景色           |
| ba-数值 | ba-1  | 1 ~ 20    | 边框色           |
| bt-数值 | bt-1  | 1 ~ 20    | 边框色顶部       |
| bb-数值 | bb-1  | 1 ~ 20    | 边框色底部       |
| bs-数值 | bs-1  | 1 ~ 20    | 阴影色           |
| op-数值 | op-1  | 0 ~ 10    | 不透明度         |
| br-数值 | br-c  | 1 ~ 60、c | 边框倒角         |
| vi-类型 | vi-h  | h、v      | 可见性           |
| cu-类型 | cu-p  | p         | 鼠标手势         |
| of-类型 | of-cn | cr、cn    | img 图片标签适配 |

```css
[bg-1] {
  background-color: var(--aoda-color1);
}

[ba-1] {
  border: 1px solid var(--aoda-color1);
}

[bt-1] {
  border-top: 1px solid var(--aoda-color1);
}

[bb-1] {
  border-bottom: 1px solid var(--aoda-color1);
}

[bs-1] {
  box-shadow: 0 10px 15px 1px var(--aoda-color1);
}

[op-1] {
  opacity: 0.1;
}

[br-c] {
  border-radius: 50%;
}

[vi-h] {
  visibility: hidden;
}

[cu-p] {
  cursor: pointer;
}

[of-cn] {
  object-fit: contain;
  object-position: center;
}
```
