---
lang: zh-CN
title: API
# sidebar: auto
---

## 管理

> [试一试](https://project.aodazhang.com/example/canvas-api/manage)

### canvas.width 绘图表面宽度 <Badge type="tip" text="HTMLCanvasElement 属性"/>

修改 Canvas 的元素宽度和绘图表面宽度。

```typescript
canvas.width: number
```

### canvas.height 绘图表面高度 <Badge type="tip" text="HTMLCanvasElement 属性"/>

修改 Canvas 的元素高度和绘图表面高度。

```typescript
canvas.height: number
```

### canvas.getContext 获取上下文 <Badge type="warning" text="HTMLCanvasElement 方法"/>

获取 Canvas、WebGL 等绘图上下文。

```typescript
/**
 * 1.contextId：绘图上下文类型
 * - '2d' -> Canvas 绘图上下文
 * - 'bitmaprenderer' -> 位图绘图上下文
 * - 'webgl' -> WebGL 绘图上下文（OpenGL ES 2.0）
 * - 'webgl2' -> WebGL2 绘图上下文（OpenGL ES 3.0）
 *
 * 2.options：绘图环境配置
 * - alpha：Canvas 是否支持全透明或半透明，默认为 true，关闭可提升渲染性能
 * - colorSpace：颜色空间
 *  - 'srgb' -> sRGB 颜色空间（默认）
 *  - 'display-p3' -> P3 颜色空间，色域更广颜色更准
 * - desynchronized：是否不同步
 * - willReadFrequently：是否存在重复读取，可以优化 ctx.getImageData() 多次读取行为
 */
canvas.getContext(contextId: string, options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D
```

> **示例**
>
> ```typescript
> // 获取 Canvas 绘图上下文
> const ctx = canvas.getContext('2d')
> // 绘制 200*100 矩形
> ctx.fillRect(0, 0, 200, 100)
> ```

### ctx.canvas 获取绘图标签 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

通过绘图上下文获取 Canvas 元素。

```typescript
ctx.canvas: HTMLCanvasElement
```

### ctx.clearRect 清除矩形区域 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

将 Canvas 元素中指定的矩形区域的绘制内容清空（变成透明）。

```typescript
/**
 * 1.x、y：矩形左上角 x、y 坐标
 *
 * 2.w、h：矩形宽度、高度
 */
ctx.clearRect(x: number, y: number, w: number, h: number): void
```

> **示例**
>
> ```typescript
> // 绘制 200*100 矩形
> ctx.fillRect(0, 0, 200, 100)
> // 清除指定矩形区域绘制内容
> ctx.clearRect(10, 10, 180, 80)
> ```
>
> ![image-20231128132033626](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311281320702.png)

### ctx.clip 按路径裁切 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

Canvas 绘制内容按照指定路径裁切。

```typescript
/**
 * 1.fillRule：填充规则
 * - 'nonzero' -> 非零环绕规则（默认）
 * - 'evenodd' -> 奇偶规则
 *
 * 2.path：Path2D 对象，IE 浏览器不兼容
 */
ctx.clip(fillRule?: CanvasFillRule): void
ctx.clip(path: Path2D, fillRule?: CanvasFillRule): void
```

> **示例**
>
> ```typescript
> // 裁切路径 100*100 矩形
> ctx.rect(50, 50, 100, 100)
> // 裁切
> ctx.clip()
> // 绘制 200*200 矩形
> ctx.fillRect(0, 0, 200, 200)
> ```
>
> ![image-20231128131905297](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311281319373.png)

### ctx.save 保存上下文状态 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

保存当前绘图上下文状态并入栈。Canvas 对于绘图的状态通过栈存储，且 **Canvas 中的变换、样式存在叠加现象**，因此最好在每个图形绘制前后使用 `ctx.save`、`ctx.restore` 来保证本次绘制的可控性。

```typescript
ctx.save(): void
```

> **示例**
>
> ```typescript
> // 状态一：红色矩形
> ctx.save() // 入栈 -> ['black']
> ctx.fillStyle = 'red' // 当前 -> 'red'
> ctx.fillRect(0, 0, 50, 50)
>
> // 状态二：绿色矩形
> ctx.save() // 入栈 -> ['black', 'red']
> ctx.fillStyle = 'green' // 当前 -> 'green'
> ctx.fillRect(60, 0, 50, 50)
>
> // 状态三：蓝色矩形
> ctx.save() // 入栈 -> ['black', 'red', 'green']
> ctx.fillStyle = 'blue' // 当前 -> 'blue'
> ctx.fillRect(120, 0, 50, 50)
>
> // 状态二：绿色矩形
> ctx.restore() // 出栈 -> ['black', 'red']，当前 -> 'green'
> ctx.fillRect(180, 0, 50, 50)
>
> // 状态一：红色矩形
> ctx.restore() // 出栈 -> ['black']，当前 -> 'red'
> ctx.fillRect(240, 0, 50, 50)
> ```
>
> ![image-20231128133633604](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311281336692.png)

### ctx.restore 恢复上下文状态 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

恢复上一次绘图上下文状态并出栈。Canvas 对于绘图的状态通过栈存储，且 **Canvas 中的变换、样式存在叠加现象**，因此最好在每个图形绘制前后使用 `ctx.save`、`ctx.restore` 来保证本次绘制的可控性。

```typescript
ctx.restore(): void
```

## 判断

> [试一试](https://project.aodazhang.com/example/canvas-api/is)

### ctx.isPointInStroke 是否在描边中 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

检测指定坐标点是否在描边路径中。

```typescript
/**
 * 1.x、y：检测点 x、y 坐标
 *
 * 2.path：Path2D 对象，IE 浏览器不兼容
 */
ctx.isPointInStroke(x: number, y: number): boolean
ctx.isPointInStroke(path: Path2D, x: number, y: number): boolean
```

> **示例**
>
> ```typescript
> // 绘制 200*100 矩形描边路径
> ctx.rect(10, 10, 200, 100)
> ctx.stroke()
> // 检测指定坐标点
> ctx.isPointInStroke(210, 50) // -> true
> ctx.isPointInStroke(110, 200) // -> false
> ```
>
> ![image-20231128135851316](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311281358407.png)

### ctx.isPointInPath 是否在填充中 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

检测指定坐标点是否在填充路径中。

```typescript
/**
 * 1.x、y：检测点 x、y 坐标
 *
 * 2.path：Path2D 对象，IE 浏览器不兼容
 *
 * 3.fillRule：填充规则
 * - 'nonzero' -> 非零环绕规则（默认）
 * - 'evenodd' -> 奇偶规则
 */
ctx.isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean
ctx.isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean
```

> **示例**
>
> ```typescript
> // 绘制 200*100 矩形填充路径
> ctx.rect(10, 10, 200, 100)
> ctx.fill()
> // 指定坐标点
> ctx.isPointInPath(100, 100) // -> true
> ctx.isPointInPath(300, 300) // -> false
> ```
>
> ![image-20231128140540546](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311281405635.png)

示例

## 变换

> [试一试](https://project.aodazhang.com/example/canvas-api/transform)

### ctx.translate 位移 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

位移 Canvas 绘图坐标系。

```typescript
/**
 * 1.x、y：绘图坐标系原点 x、y 坐标
 */
ctx.translate(x: number, y: number): void
```

> **示例**
>
> ```typescript
> // 绘图原点位移 (100, 100)
> ctx.translate(100, 100)
> ```
>
> ![image-20231201154426827](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312011544932.png)

### ctx.rotate 旋转 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

旋转 Canvas 绘图坐标系。

```typescript
/**
 * 1.angle：绘图坐标系旋转弧度（1° = Math.PI / 180、360° = 2 * Math.PI）
 * - 正数 -> 顺时针旋转
 * - 负数 -> 逆时针旋转
 */
ctx.rotate(angle: number): void
```

> **示例**
>
> ```typescript
> // 绘图坐标系顺时针旋转 30°
> ctx.rotate((30 / 180) * Math.PI)
> ```
>
> ![image-20231201154531731](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312011545836.png)

### ctx.scale 缩放 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

缩放 Canvas 绘图坐标系。

```typescript
/**
 * 1.x、y：绘图坐标系 x、y 轴缩放倍数（默认 1）
 */
ctx.scale(x: number, y: number): void
```

> **示例**
>
> ```typescript
> // 绘图坐标系缩小二分之一
> ctx.scale(0.5, 0.5)
> ```
>
> ![image-20231201150636981](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312011506083.png)

### ctx.transform 累加变换 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

累加变换 Canvas 绘图坐标系，每次执行 `ctx.transform` 都与上一次变换矩阵相乘（若该矩阵不存在则与单位矩阵相乘）。

```typescript
/**
 * 变换矩阵  ->  默认：单位矩阵
 * a  c  e   	  1  0  0
 * b  d  f   	  0  1  0
 * 0  0  1   	  0  0  1
 *
 * 1.a、d：水平、垂直缩放（默认 1）
 *
 * 2.e、f：水平、垂直位移（默认 0）
 *
 * 3.b、c：水平、垂直斜切（默认 0）
 */
ctx.transform(a: number, b: number, c: number, d: number, e: number, f: number): void
```

> **示例**
>
> ```typescript
> // 垂直斜切系数 0.5+0.5 等价于 ctx.transform(1, 0, 1, 1, 0, 0)
> ctx.transform(1, 0, 0.5, 1, 0, 0)
> ctx.transform(1, 0, 0.5, 1, 0, 0)
> ```
>
> ![image-20231201152633721](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312011526820.png)

### ctx.setTransform 变换 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

变换 Canvas 绘图坐标系，每次执行 `ctx.setTransform` 都与单位矩阵相乘，因此不会出现累加效果。

```typescript
/**
 * 变换矩阵  ->  默认：单位矩阵
 * a  c  e   	  1  0  0
 * b  d  f   	  0  1  0
 * 0  0  1   	  0  0  1
 *
 * 1.a、d：水平、垂直缩放（默认 1）
 *
 * 2.e、f：水平、垂直位移（默认 0）
 *
 * 3.b、c：水平、垂直斜切（默认 0）
 *
 * 4.transform：用对象形式写 a、b、c、d、e、f，该方式兼容性较差
 */
ctx.setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void
ctx.setTransform(transform?: DOMMatrix2DInit): void
```

> **示例**
>
> ```typescript
> // 垂直斜切系数 0.5
> ctx.setTransform(1, 0, 0.5, 1, 0, 0)
> // 垂直斜切系数 0.5（执行两次也不会累加）
> ctx.setTransform(1, 0, 0.5, 1, 0, 0)
> ```
>
> ![image-20231201153733843](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312011537961.png)

### ctx.resetTransform 重置变换 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

重置当前 Canvas 绘图坐标系变换为单位矩阵。

```typescript
ctx.resetTransform(): void
```

> **示例**
>
> ```typescript
> // 绘图原点位移 (100, 100)
> ctx.translate(100, 100)
> // 绘图坐标系顺时针旋转 30°
> ctx.rotate((30 / 180) * Math.PI)
> // 重置绘图坐标系变换
> ctx.resetTransform()
> ```
>
> ![image-20231201155643946](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312011556048.png)

### ctx.getTransform 获取变换矩阵 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

获取当前 Canvas 绘图上下文的变换矩阵。

```typescript
ctx.getTransform(): DOMMatrix
```

> **示例**
>
> ```typescript
> ctx.translate(100, 100)
> ctx.rotate((30 / 180) * Math.PI)
> ctx.getTransform() // -> { a: 0.8660254037844387 }
> ```
>
> **DOMMatrix DOM 矩阵**
>
> - 概念：4x4 矩阵对象，包含 `is2D`、`isIdentity` 等属性，主要用于各类 2D、3D 操作，该对象更多信息可参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMMatrix)。
> - 数据结构
>
>   ![image-20231201160317358](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312011603461.png)

## 样式

> [试一试](https://project.aodazhang.com/example/canvas-api/style)

### ctx.globalAlpha 全局不透明度 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 全局不透明度，只对当前绘图上下文生效，该效果受 `ctx.save` 和 `ctx.restore` 影响。

```typescript
/**
 * 0 -> 完全透明
 * 1 -> 完全不透明
 */
ctx.globalAlpha: number
```

> **示例**
>
> ![image-20231201181331155](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312011813274.png)

### ctx.lineWidth 描边宽度 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 描边宽度，单位 `px`，影响所有 `stroke` 类效果。**需要注意 Canvas 默认会将线条中心点和像素底部对齐，会导致 `1px` 显示效果模糊的问题。**

```typescript
/**
 * 1 -> 1px（默认）
 * 负数、0、NaN、Infinity -> 无效
 */
ctx.lineWidth: number
```

> **示例**
>
> ![image-20231204152259715](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312041522825.png)

### ctx.lineCap 描边端点 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 描边端点的样式。设置后会让线段稍微长一点，具备抹平线段首尾相连的功能。

```typescript
/**
 * 'butt' -> 无（默认）
 * 'round' -> 突出圆头
 * 'square' -> 突出方头
 */
ctx.lineCap: CanvasLineCap
```

> **示例**
>
> ![image-20231204153249926](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312041532034.png)

### ctx.lineJoin 描边转角 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 描边转角的样式。具备抹平线段首尾相连的功能。

```typescript
/**
 * 'bevel' -> 尖头，斜接角度过小时需要设置 miterLimit（默认）
 * 'round' -> 圆头
 * 'miter' -> 平头
 */
ctx.lineJoin: CanvasLineJoin
```

> **示例**
>
> ![image-20231204154004160](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312041540268.png)

### ctx.miterLimit 描边转角斜接长度 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 描边转角为 `miter` 时最大斜接长度，单位 `px`。

```typescript
/**
 * 10 -> 10px（默认）
 * 负数、0、NaN、Infinity -> 无效
 */
ctx.miterLimit: number
```

> **示例**
>
> ![image-20231204154935550](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312041549663.png)

### ctx.setLineDash 描边虚线 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

设置 Canvas 描边的虚线样式，单位 `px`。

```typescript
/**
 * [] -> 实线，常用来重置虚线（默认）
 * [10] -> 实线 10px、空白 10px，不断重复
 * [10, 20] -> 实线 10px、空白 20px，不断重复
 * [10, 20, 30] -> 实线 10px、空白 20px、实线 30px、空白 10px、实线 20px、空白 30px，不断重复
 * [10, 20, 30, 40] -> 实线 10px、空白 20px、实线 30px、空白 40px，不断重复
 */
ctx.setLineDash(segments: number[]): void
```

> **示例**
>
> ![image-20231204164636492](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312041646604.png)

### ctx.getLineDash 描边虚线测量 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

获取当前 Canvas 绘图上下文描边的虚线样式，单位 `px`。

```typescript
/**
 * [] -> 实线
 * [10] -> 实线 10px、空白 10px，不断重复
 * [10, 20] -> 实线 10px、空白 20px，不断重复
 * [10, 20, 30] -> 实线 10px、空白 20px、实线 30px、空白 10px、实线 20px、空白 30px，不断重复
 * [10, 20, 30, 40] -> 实线 10px、空白 20px、实线 30px、空白 40px，不断重复
 */
ctx.getLineDash(): number[]
```

> **示例**
>
> ```typescript
> ctx.setLineDash([10, 20])
> ctx.getLineDash() // -> [10, 20]
> ```

### ctx.lineDashOffset 描边虚线偏移 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 描边的虚线偏移，必须设置 [描边虚线](/canvas/api.html#ctx-setlinedash-描边虚线) 才有效，单位 `px`。

```typescript
/**
 * 0.0 -> 不偏移（默认）
 * 正数 -> 向描边起始方向偏移
 * 负数 -> 向描边结束方向偏移
 */
ctx.lineDashOffset: number
```

> **示例**
>
> ![image-20231204170115542](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312041701661.png)

### ctx.strokeStyle 描边样式 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 描边的样式，可以是颜色、渐变、图案。

```typescript
/**
 * 'red' -> 关键字色值
 * '#ffffff'、'#642' -> hex 色值
 * 'rgb(255, 128, 0)'、'rgba(100, 100, 100, 0.8)' -> rgb、rgba 函数
 * 'hsl(20, 62%, 28%)'、'hsla(40, 82%, 33%, 0.6)' -> hsl、hsla 函数
 * gradient -> Canvas 线性渐变、径向渐变、弧度渐变
 * pattern -> Canvas 图案
 */
ctx.strokeStyle: string | CanvasGradient | CanvasPattern
```

> **示例**
>
> ```typescript
> // 1.颜色
> ctx.strokeStyle = 'red'
> ctx.strokeRect(10, 10, 150, 75)
>
> // 2.渐变（相对 Canvas 坐标系设定）
> const gradient = ctx.createLinearGradient(190, 10, 340, 10)
> gradient.addColorStop(0, 'green')
> gradient.addColorStop(1, 'blue')
> ctx.strokeStyle = gradient
> ctx.strokeRect(190, 10, 150, 75)
>
> // 3.图案
> const pattern = ctx.createPattern(image, 'repeat')
> ctx.strokeStyle = pattern
> ctx.strokeRect(370, 10, 150, 75)
> ```
>
> ![image-20231204160553244](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312041605288.png)

### ctx.fillStyle 填充样式 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 填充的样式，可以是颜色、渐变、图案。

```typescript
/**
 * 'red' -> 关键字色值
 * '#ffffff'、'#642' -> hex 色值
 * 'rgb(255, 128, 0)'、'rgba(100, 100, 100, 0.8)' -> rgb、rgba 函数
 * 'hsl(20, 62%, 28%)'、'hsla(40, 82%, 33%, 0.6)' -> hsl、hsla 函数
 * gradient -> Canvas 线性渐变、径向渐变、弧度渐变
 * pattern -> Canvas 图案
 */
ctx.fillStyle: string | CanvasGradient | CanvasPattern
```

> **示例**
>
> ```typescript
> // 1.颜色
> ctx.fillStyle = 'red'
> ctx.fillRect(10, 10, 150, 75)
>
> // 2.渐变（相对 Canvas 坐标系设定）
> const gradient = ctx.createLinearGradient(190, 10, 340, 10)
> gradient.addColorStop(0, 'green')
> gradient.addColorStop(1, 'blue')
> ctx.fillStyle = gradient
> ctx.fillRect(190, 10, 150, 75)
>
> // 3.图案
> const pattern = ctx.createPattern(image, 'repeat')
> ctx.fillStyle = pattern
> ctx.fillRect(370, 10, 150, 75)
> ```
>
> ![image-20231204161752732](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312041617856.png)

### ctx.shadowColor 阴影色 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 绘图元素的阴影颜色。

```typescript
/**
 * 'rgba(0, 0, 0, 0)' -> 透明黑（默认）
 * 'red' -> 关键字色值
 * '#ffffff'、'#642' -> hex 色值
 * 'rgb(255, 128, 0)'、'rgba(100, 100, 100, 0.8)' -> rgb、rgba 函数
 * 'hsl(20, 62%, 28%)'、'hsla(40, 82%, 33%, 0.6)' -> hsl、hsla 函数
 */
ctx.shadowColor: string
```

> **示例**
>
> ![image-20231204204937454](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312042049503.png)

### ctx.shadowOffsetX 阴影水平偏移 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 绘图元素的阴影 X 轴偏移，单位 `px`。

```typescript
/**
 * 0 -> 0px（默认）
 * NaN、Infinity -> 无效
 */
ctx.shadowOffsetX: number
```

> **示例**
>
> ![image-20231204205744138](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312042057262.png)

### ctx.shadowOffsetY 阴影垂直偏移 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 绘图元素的阴影 Y 轴偏移，单位 `px`。

```typescript
/**
 * 0 -> 0px（默认）
 * NaN、Infinity -> 无效
 */
ctx.shadowOffsetY: number
```

> **示例**
>
> ![image-20231204205417506](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312042054551.png)

### ctx.shadowBlur 阴影模糊 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 绘图元素的阴影模糊值，常用来制作辉光效果，单位 `px`。

```typescript
/**
 * 0 -> 0px（默认）
 * 负数、NaN、Infinity -> 无效
 */
ctx.shadowBlur: number
```

> **示例**
>
> ![image-20231204205722342](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312042057458.png)

### ctx.createLinearGradient 线性渐变 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

创建 Canvas 线性渐变对象。**需要注意渐变坐标是基于 Canvas 坐标系，因为渐变是全局样式而非某个图形样式**。

```typescript
/**
 * 1.x0、y0：渐变起始点 x、y 坐标
 *
 * 2.x1、y1：渐变结束点 x、y 坐标
 */
ctx.createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient
```

> **示例**
>
> ```typescript
> // 1.创建线性渐变
> const gradient = ctx.createLinearGradient(10, 10, 300, 10)
>
> // 2.添加渐变点
> gradient.addColorStop(0, 'red')
> gradient.addColorStop(1, 'blue')
>
> // 3.设置样式
> ctx.strokeStyle = gradient
> ctx.fillStyle = gradient
>
> // 4.绘制图形
> ctx.fillRect(10, 10, 300, 150)
> ctx.strokeRect(10, 200, 300, 150)
> ```
>
> ![image-20231205090355430](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312050903471.png)

### ctx.createRadialGradient 径向渐变 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

创建 Canvas 径向渐变对象。**需要注意渐变坐标是基于 Canvas 坐标系，因为渐变是全局样式而非某个图形样式**。

```typescript
/**
 * 1.x0、y0：渐变起始圆中心 x、y 坐标
 *
 * 2.r0：渐变起始圆半径，通常设为 0
 *
 * 3.x1、y1：渐变结束圆中心 x、y 坐标，通常与 x0、y0 保持一致
 *
 * 4.r1：渐变结束圆半径，通常设定具体的渐变半径
 */
ctx.createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient
```

> **示例**
>
> ```typescript
> // 1.创建径向渐变
> const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 100)
>
> // 2.添加渐变点
> gradient.addColorStop(0, 'red')
> gradient.addColorStop(1, 'blue')
>
> // 3.设置样式
> ctx.fillStyle = gradient
>
> // 4.绘制图形
> ctx.beginPath()
> ctx.arc(150, 150, 100, 0, 2 * Math.PI)
> ctx.fill()
> ```
>
> ![image-20231205091711131](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312050917241.png)

### ctx.createConicGradient 弧度渐变 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

创建 Canvas 弧度渐变对象。**需要注意渐变坐标是基于 Canvas 坐标系，因为渐变是全局样式而非某个图形样式**。

```typescript
/**
 * 1.startAngle：渐变起始弧度，正数为顺时针方向、负数为逆时针方向（默认 0）
 *
 * 2.x、y：渐变圆中心 x、y 坐标
 */
ctx.createConicGradient(startAngle: number, x: number, y: number): CanvasGradient
```

> **示例**
>
> ```typescript
> // 1.创建弧度渐变
> const gradient = ctx.createConicGradient(Math.PI / 6, 150, 150)
>
> // 2.添加渐变点
> gradient.addColorStop(0, 'red')
> gradient.addColorStop(1, 'blue')
>
> // 3.设置样式
> ctx.fillStyle = gradient
>
> // 4.绘制图形
> ctx.beginPath()
> ctx.arc(150, 150, 100, 0, 2 * Math.PI)
> ctx.fill()
> ```
>
> ![image-20231205092324061](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312050923181.png)

### gradient.addColorStop 新增渐变点 <Badge type="warning" text="CanvasGradient 方法"/>

为指定 `CanvasGradient` 渐变对象添加渐变点，不同类型的渐变点位置有所差异。**需要注意多次对同一个渐变点位置添加颜色，只有第一个生效**。

```typescript
/**
 * 1.offset：渐变点位置，范围 0 起始 ~ 1 结束
 *
 * 2.color：色值
 * - 'red' -> 关键字色值
 * - '#ffffff'、'#642' -> hex 色值
 * - 'rgb(255, 128, 0)'、'rgba(100, 100, 100, 0.8)' -> rgb、rgba 函数
 * - 'hsl(20, 62%, 28%)'、'hsla(40, 82%, 33%, 0.6)' -> hsl、hsla 函数
 */
ctx.addColorStop(offset: number, color: string): void
```

> **示例**
>
> ![gradient](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312050942146.jpg)

### ctx.createPattern 资源图案 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

创建 Canvas 资源图案对象。**需要注意图案的位置是基于 Canvas 坐标系，因为图案是全局样式而非某个图形样式**。

```typescript
/**
 * 1.image：各类资源节点，例如 img、video、canvas、svg、ImageData、Blob 等，必须等到资源加载后再使用
 *
 * 2.repetition：平铺方式
 * - 'no-repeat' -> 不重复
 * - 'repeat' -> 水平垂直重复，'' 和 null 也会采用该配置（默认）
 * - 'repeat-x' -> 水平重复，垂直方向从 y 轴为 0 开始排布
 * - 'repeat-y' -> 垂直重复，水平方向从 x 轴为 0 开始排布
 */
ctx.createPattern(image: CanvasImageSource, repetition: string | null): CanvasPattern | null
```

> **示例**
>
> ```typescript
> // 1.创建资源节点
> const source = document.createElement('canvas')
> source.width = 60
> source.height = 60
> source.getContext('2d').drawImage(image, 0, 0, 60, 60)
>
> // 2.创建资源图案并绘制
> ctx.fillStyle = ctx.createPattern(source, 'no-repeat')
> ctx.fillRect(10, 10, 150, 150)
> ctx.fillStyle = ctx.createPattern(source, 'repeat')
> ctx.fillRect(180, 10, 150, 150)
> ctx.fillStyle = ctx.createPattern(source, 'repeat-x')
> ctx.fillRect(350, 10, 150, 150)
> ctx.fillStyle = ctx.createPattern(source, 'repeat-y')
> ctx.fillRect(10, 180, 150, 150)
> ```
>
> ![image-20231205101946386](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312051019531.png)

### ctx.drawFocusIfNeeded 轮廓高亮 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

指定 Canvas 的路径或子元素在 `focus` 状态下轮廓高亮。

```typescript
/**
 * 1.element：canvas 的 dom 子元素，当子元素 focus 时 Canvas 会在该元素外部绘制轮廓
 *
 * 2.path：Path2D 对象，IE 浏览器不兼容
 */
ctx.drawFocusIfNeeded(element: Element): void
ctx.drawFocusIfNeeded(path: Path2D, element: Element): void
```

## 图形

> [试一试](https://project.aodazhang.com/example/canvas-api/graphical)

### ctx.beginPath 开启路径 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

开启一个新的路径并重置当前路径绘制状态。**绘制每个图形前都需要调用，如果不调用会出现样式污染、路径污染的问题**。

```typescript
ctx.beginPath(): void
```

> **示例**
>
> ![image-20231205221559759](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312052215961.png)

### ctx.closePath 闭合路径 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

闭合当前路径。描边时创建从当前点回到起始点的路径，绘制封闭的多边形；填充时无效。**需要注意闭合路径和调用 `lineTo` 连接到起点两者是有区别的：前者是完全闭合的路径，后者只是重合的点使得路径看起来闭合**。

```typescript
ctx.closePath(): void
```

> **示例**
>
> ```typescript
> ctx.beginPath()
> // 1.设置矩形前三条边
> ctx.moveTo(10, 10)
> ctx.lineTo(300, 10)
> ctx.lineTo(300, 150)
> ctx.lineTo(10, 150)
> // 2.通过关闭路径设置第四条边
> ctx.closePath()
> // 3.绘制描边
> ctx.stroke()
> ```
>
> ![image-20231205222402864](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312052224963.png)

### ctx.moveTo 移动点 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

移动路径点到指定位置，不会创建直线路径。

```typescript
/**
 * 1.x、y：路径点 x、y 坐标
 */
ctx.moveTo(x: number, y: number): void
```

### ctx.lineTo 直线 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

移动路径点到指定位置并创建直线路径。**若当前路径没有调用过 `ctx.moveTo`，那么第一次执行 `ctx.lineTo` 会视为 `ctx.moveTo`**。

```typescript
/**
 * 1.x、y：路径点 x、y 坐标
 */
ctx.lineTo(x: number, y: number): void
```

> **示例**
>
> ```typescript
> // 路径 1
> ctx.beginPath()
> ctx.lineTo(10, 10) // 第一次调用 lineTo 视同 moveTo
> ctx.lineTo(200, 10)
> ctx.lineTo(400, 200)
> ctx.stroke()
>
> // 路径 2
> ctx.beginPath()
> ctx.lineTo(10, 10)
> ctx.lineTo(200, 200)
> ctx.stroke()
> ```
>
> ![image-20231206091054586](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312060910687.png)

### ctx.rect 矩形 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

在指定位置创建矩形路径。

```typescript
/**
 * 1.x、y：矩形左上角 x、y 坐标
 *
 * 2.w、h：矩形宽度、高度
 */
ctx.rect(x: number, y: number, w: number, h: number): void
```

> **示例**
>
> ```typescript
> // 创建 200*100 矩形路径
> ctx.rect(10, 10, 200, 100)
> ```
>
> ![image-20231206092556769](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312060925810.png)

### ctx.roundRect 圆角矩形 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

在指定位置创建圆角矩形路径。

```typescript
/**
 * 1.x、y：矩形左上角 x、y 坐标
 *
 * 2.w、h：矩形宽度、高度
 *
 * 3.radii：矩形倒角
 * - 10、[10] -> 全部倒角 10px
 * - [10, 20] -> 左上、右下倒角 10px，右上、左下倒角 20px
 * - [10, 20, 30, 40] -> 左上倒角 10px，右上倒角 20px，左下倒角 30px，右下倒角 40px
 */
ctx.roundRect(x: number, y: number, w: number, h: number, radii?: number | DOMPointInit | (number | DOMPointInit)[]): void
```

> **示例**
>
> ```typescript
> // 1.创建 200*100 矩形路径，全部倒角 10px
> ctx.roundRect(10, 10, 200, 100, 10)
>
> // 2.创建 200*100 矩形路径，左上、右下倒角 10px，右上、左下倒角 20px
> ctx.roundRect(10, 10, 200, 100, [10, 20])
>
> // 3.创建 200*100 矩形路径，左上倒角 10px，右上倒角 20px，左下倒角 30px，右下倒角 40px
> ctx.roundRect(10, 10, 200, 100, [10, 20, 30, 40])
> ```
>
> ![image-20231206114323917](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061143947.png)

### ctx.arc 圆 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

在指定位置创建圆路径。

```typescript
/**
 * 1.x、y：圆中心 x、y 坐标
 *
 * 2.radius：圆半径
 *
 * 3.startAngle、endAngle：圆开始弧度、结束弧度，弧度 = (角度 / 180) * Math.PI
 *
 * 4.counterclockwise：路径绘制方向
 * - false -> 顺时针（默认）
 * - true -> 逆时针
 */
ctx.arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void
```

> **示例**
>
> ```typescript
> // 顺时针创建四分之三圆路径
> ctx.arc(150, 150, 80, 0, 1.5 * Math.PI, false)
> ```
>
> ![image-20231206130223181](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061302289.png)

### ctx.ellipse 椭圆 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

在指定位置创建椭圆路径。

```typescript
/**
 * 1.x、y：椭圆中心 x、y 坐标
 *
 * 2.radiusX、radiusY：椭圆水平、垂直半径
 *
 * 3.rotation：椭圆旋转弧度，弧度 = (角度 / 180) * Math.PI
 *
 * 4.startAngle、endAngle：椭圆开始弧度、结束弧度，弧度 = (角度 / 180) * Math.PI
 *
 * 5.counterclockwise：路径绘制方向
 * - false -> 顺时针（默认）
 * - true -> 逆时针
 */
ctx.ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void
```

> **示例**
>
> ```typescript
> // 顺时针创建四分之三椭圆路径
> ctx.ellipse(150, 150, 80, 60, 0, 0, 1.5 * Math.PI, false)
> ```
>
> ![image-20231206143857121](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061438158.png)

### ctx.arcTo 圆弧曲线 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

通过两个控制点创建圆弧曲线路径，**生成的曲线分别与两个控制点的连线相切**。**需要注意曲线的起点默认是上一个路径的终点，如果是新开启的路径需要调用 `ctx.moveTo` 手动设置一个起点**。

```typescript
/**
 * 1.x1、y1：控制点1 x、y 坐标
 *
 * 2.x2、y2：控制点2 x、y 坐标
 *
 * 3.radius：圆弧半径
 */
ctx.arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void
```

> **示例**
>
> ```typescript
> // 1.设定圆弧曲线起点
> ctx.moveTo(10, 10)
> // 2.创建圆弧曲线路径
> ctx.arcTo(200, 10, 200, 200, 100)
> ```
>
> ![image-20231206150240046](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061502157.png)

### ctx.quadraticCurveTo 二次贝塞尔曲线 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

通过一个控制点和一个终点创建贝塞尔曲线路径。**需要注意曲线的起点默认是上一个路径的终点，如果是新开启的路径需要调用 `ctx.moveTo` 手动设置一个起点，若未设置起点则采用控制点作为起点**。

```typescript
/**
 * 1.cpx、cpy：控制点 x、y 坐标（无起点则该控制点作为起点）
 *
 * 2.x、y：终点 x、y 坐标
 */
ctx.quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
```

> **示例**
>
> ```typescript
> // 1.设定贝塞尔曲线起点
> ctx.moveTo(10, 10)
> // 2.创建二次贝塞尔曲线路径
> ctx.quadraticCurveTo(100, 100, 200, 10)
> ```
>
> ![image-20231206150537823](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061505929.png)

### ctx.bezierCurveTo 三次贝塞尔曲线 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

通过两个控制点和一个终点创建贝塞尔曲线路径。**需要注意曲线的起点默认是上一个路径的终点，如果是新开启的路径需要调用 `ctx.moveTo` 手动设置一个起点，若未设置起点则采用控制点 1 作为起点（一定程度上等价于存在起点的二次贝塞尔曲线）**。

```typescript
/**
 * 1.cp1x、cp1y：控制点1 x、y 坐标（无起点则该控制点作为起点）
 *
 * 2.cp2x、cp2y：控制点2 x、y 坐标
 *
 * 3.x、y：终点 x、y 坐标
 */
ctx.bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
```

> **示例**
>
> ```typescript
> // 1.设定贝塞尔曲线起点
> ctx.moveTo(10, 10)
> // 2.创建三次贝塞尔曲线路径
> ctx.bezierCurveTo(40, 100, 180, 100, 200, 10)
> ```
>
> ![image-20231206152232712](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061522815.png)

### ctx.stroke 绘制描边 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

对当前 Canvas 绘图上下文中存在的路径绘制描边。

```typescript
/**
 * 1.path：Path2D 对象，IE 浏览器不兼容
 */
ctx.stroke(): void
ctx.stroke(path: Path2D): void
```

> **示例**
>
> ```typescript
> // 1.开启路径
> ctx.beginPath()
> // 2.创建 200*100 矩形路径
> ctx.rect(10, 10, 200, 100)
> // 3.绘制描边
> ctx.stroke()
> ```
>
> ![image-20231206154728922](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061547025.png)

### ctx.strokeRect 绘制描边矩形 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

创建矩形路径并绘制描边，**需要注意该方法默认开启新路径**。

```typescript
/**
 * 1.x、y：矩形左上角 x、y 坐标
 *
 * 2.w、h：矩形宽度、高度
 */
ctx.strokeRect(x: number, y: number, w: number, h: number): void
```

> **示例**
>
> ```typescript
> // 创建 200*100 矩形路径并绘制描边
> ctx.strokeRect(10, 10, 200, 100)
> ```
>
> ![image-20231206154728922](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061547025.png)

### ctx.fill 绘制填充 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

对当前 Canvas 绘图上下文中存在的路径绘制填充。

```typescript
/**
 * 1.fillRule：填充规则
 * - 'nonzero' -> 非零环绕规则（默认）
 * - 'evenodd' -> 奇偶规则
 *
 * 2.path：Path2D 对象，IE 浏览器不兼容
 */
ctx.fill(fillRule?: CanvasFillRule): void
ctx.fill(path: Path2D, fillRule?: CanvasFillRule): void
```

> **示例**
>
> ```typescript
> // 1.开启路径
> ctx.beginPath()
> // 2.创建 200*100 矩形路径
> ctx.rect(10, 10, 200, 100)
> // 3.绘制填充
> ctx.fill()
> ```
>
> ![image-20231206155651357](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061556467.png)

### ctx.fillRect 绘制填充矩形 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

创建矩形路径并绘制填充，**需要注意该方法默认开启新路径**。

```typescript
/**
 * 1.x、y：矩形左上角 x、y 坐标
 *
 * 2.w、h：矩形宽度、高度
 */
ctx.fillRect(x: number, y: number, w: number, h: number): void
```

> **示例**
>
> ```typescript
> // 创建 200*100 矩形路径并绘制填充
> ctx.fillRect(10, 10, 200, 100)
> ```
>
> ![image-20231206155651357](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312061556467.png)

## 图像

> [试一试](https://project.aodazhang.com/example/canvas-api/image)

### canvas.toDataURL 图像转 Base64 URI <Badge type="warning" text="HTMLCanvasElement 方法"/>

同步获取 Canvas 渲染图像数据对应的 Base64 URI，可以通过 `background-image` 等 CSS 属性加载。

```typescript
/**
 * 1.type：图片 mimeType 类型
 * - 'image/png' -> png 格式（默认）
 * - 'image/jpeg' -> jpg 格式
 * - 'image/webp' -> webp 格式，需要浏览器支持
 *
 * 2.quality：图片压缩质量，0 最差 ~ 1 最好（默认 0.92），只对 jpg、webp 有效，png 为无损图片
 */
canvas.toDataURL(type?: string, quality?: number): string
```

> **Base64 URI 格式**
>
> ```shell
> # data:[<mime type>][;base64],<data>
> 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAF0lEQVQoU2NkIBIwEqmOYVQh3pAiOngACmkAC5eMKzgAAAAASUVORK5CYII='
> ```

### canvas.toBlob 图像转 Blob 数据 <Badge type="warning" text="HTMLCanvasElement 方法"/>

异步获取 Canvas 渲染图像数据对应的 Blob 对象，此方法可将图像数据缓存在磁盘上或内存中，该函数 IE 兼容性差。

```typescript
/**
 * 1.callback：生成 blob 数据的 callback
 * - blob => {}
 *
 * 2.type：图片 mimeType 类型
 * - 'image/png' -> png 格式（默认）
 * - 'image/jpeg' -> jpg 格式
 * - 'image/webp' -> webp 格式，需要浏览器支持
 *
 * 3.quality：图片压缩质量，0 最差 ~ 1 最好（默认 0.92），只对 jpg、webp 有效，png 为无损图片
 */
canvas.toBlob(callback: BlobCallback, type?: string, quality?: number): void
```

> **示例**
>
> ```typescript
> // 1.blob 上传图片
> canvas.toBlob(blob => {
>   const form = new FormData()
>   form.append('image', blob) // 图片数据存入 form 数据，后续可上传
> })
>
> // 2.blob 转换 url
> canvas.toBlob(blob => {
>   const url = URL.createObjectURL(blob) // 构建临时 url
>   URL.revokeObjectURL(url) // 图片不用可以释放
> })
> ```

### ctx.imageSmoothingEnabled 是否图像平滑 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

Canvas 渲染是否启用图像平滑处理。开启后 Canvas 会对图像进行抗锯齿处理，使得图像边缘更加平滑，但会增加渲染时间。

```typescript
/**
 * true -> 开启图像平滑处理（默认）
 * false -> 关闭图像平滑处理
 */
ctx.imageSmoothingEnabled: boolean
```

### ctx.imageSmoothingQuality 图像平滑品质 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

Canvas 图像平滑处理的品质。只有设定 `ctx.imageSmoothingEnabled = true` 时生效，级别越高占用系统资源越多。

```typescript
/**
 * 'low' -> 低
 * 'medium' -> 中
 * 'high' -> 高
 */
ctx.imageSmoothingQuality: ImageSmoothingQuality
```

### ctx.drawImage 绘制图像 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

绘制图像到 Canvas 指定区域。

```typescript
/**
 * 1.image：各类资源节点，例如 img、video、canvas、svg、ImageData、Blob 等，必须等到资源加载后再使用
 *
 * 2.dx、dy：图像左上角 x、y 坐标
 *
 * 3.dw、dh：图像宽度、高度（默认图像自身宽高，设置后按该宽高拉伸充满）
 *
 * 4.sx、sy：截取区域相对图像的左上角 x、y 坐标
 *
 * 5.sw、sh：截取区域相对图像的宽度、高度
 */
ctx.drawImage(image: CanvasImageSource, dx: number, dy: number): void
ctx.drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void
ctx.drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
```

> **示例**
>
> ```typescript
> // 图像（不指定宽高）
> ctx.drawImage(image, 10, 10)
> // 图像（指定宽高）
> ctx.drawImage(image, 10, 10, 200, 100)
> // 图像（指定截取区域）
> ctx.drawImage(image, 50, 50, 200, 200, 10, 10, 150, 150)
> ```
>
> ![drawimage](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311281606093.jpg)

### ctx.createImageData 创建图像数据 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

创建一个图像数据，默认为黑色透明的 ImageData 实例。

```typescript
/**
 * 1.sw、sh：图像数据宽高，单位为像素
 *
 * 2.settings：图像数据配置项
 * - colorSpace：颜色空间
 *  - 'srgb' -> sRGB 颜色空间（默认）
 *  - 'display-p3' -> P3 颜色空间，色域更广颜色更准
 *
 * 3.imagedata：图像数据，只复用该 ImageData 的宽高，像素信息会转换为黑色透明
 */
ctx.createImageData(sw: number, sh: number, settings?: ImageDataSettings): ImageData
ctx.createImageData(imagedata: ImageData): ImageData
```

> **ImageData 图像数据**
>
> - 概念：包含 `width`、`height`、`colorSpace`、`data` 四个属性，其中 `data` 数据以 4 位 1 组存储一个像素的 rgba 信息，可通过 1 次循环或 2 次循环进行遍历。
> - 数据结构
>   ![image-20231128163339231](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311281633324.png)
>
>   ![image-20231128162943922](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311281629960.png)
>
> - 遍历方法
>
>   ```typescript
>   // 1次循环遍历像素点（逐点遍历）
>   const pxCount = imageData.width * imageData.height // 图像像素点总数
>   for (let i = 0; i < pxCount; i++) {
>     const red = imageData.data[4 * i + 0] // r：0~255
>     const green = imageData.data[4 * i + 1] // g：0~255
>     const blue = imageData.data[4 * i + 2] // b：0~255
>     const alpha = imageData.data[4 * i + 3] // a：0~255
>   }
>
>   // 2次循环遍历像素点（按行遍历）
>   for (let i = 0; i < imageData.height; i++) {
>     for (let j = 0; j < imageData.width; j++) {
>       const p = i * imageData.width + j // 当前像素点位置
>       const red = imageData.data[4 * p + 0] // r：0~255
>       const green = imageData.data[4 * p + 1] // g：0~255
>       const blue = imageData.data[4 * p + 2] // b：0~255
>       const alpha = imageData.data[4 * p + 3] // a：0~255
>     }
>   }
>   ```

### ctx.getImageData 获取图像数据 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

获取 Canvas 指定区域的图像数据。

```typescript
/**
 * 1.sx、sy：截取区域左上角 x、y 坐标
 *
 * 2.sw、sh：截取区域宽度、高度
 *
 * 3.settings：图像数据配置项
 * - colorSpace：颜色空间
 *  - 'srgb' -> sRGB 颜色空间（默认）
 *  - 'display-p3' -> P3 颜色空间，色域更广颜色更准
 */
ctx.getImageData(sx: number, sy: number, sw: number, sh: number, settings?: ImageDataSettings): ImageData
```

### ctx.putImageData 绘制图像数据 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

绘制图像数据到 Canvas 指定区域。

```typescript
/**
 * 1.imagedata：图像数据
 *
 * 2.dx、dy：图像左上角 x、y 坐标
 *
 * 3.dirtyX、dirtyY：截取区域相对图像数据的左上角 x、y 坐标
 *
 * 4.dirtyWidth、dirtyHeight：截取区域相对图像数据的宽度、高度
 */
ctx.putImageData(imagedata: ImageData, dx: number, dy: number): void
ctx.putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void
```

## 文字

> [试一试](https://project.aodazhang.com/example/canvas-api/font)

### ctx.font 字体 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 绘制文本的字号、字体。

```typescript
/**
 * 默认值为 '10px sans-serif'
 * - 'font-size' -> 字号，支持单位值 px、rem，支持文字值 xx-small、x-small、medium、large、x-large、xx-large
 * - 'font-family' -> 字体，支持多个字体逗号分隔，需要注意外部引入的字体必须等待加载完成才能使用
 * - 'font-weight' -> 字重，支持宽度值 100 ~ 900，支持文字值 lighter、normal（默认-400）、bold（700）、bolder
 * - 'font-style' -> 字体风格，支持文字值 normal（默认）、italic（斜体-需要文字支持）、oblique（倾斜）
 * - 'font-variant' -> 小写字母风格，支持文字值 normal（默认）、small-caps（大写方式展现小写字母）
 */
ctx.font: string = 'font-weight font-style font-variant font-size font-family'
```

> **示例**
>
> ![font](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311291852504.jpg)

### ctx.textAlign 水平对齐方式 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置文字水平方向的对齐方式。

```typescript
/**
 * - 'left' -> 左对齐（默认）
 * - 'center' -> 居中对齐
 * - 'right' ->  右对齐
 * - 'start' -> 起始对齐，ltr-左对齐、rtl-右对齐
 * - 'end' ->  结束对齐，ltr-右对齐、rtl-左对齐
 */
ctx.textAlign: CanvasTextAlign
```

> **示例**
>
> ![image-20231129185728764](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311291857809.png)

### ctx.textBaseline 垂直对齐方式 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置文字垂直方向的对齐方式。

```typescript
/**
 * - 'top' -> 顶对齐，绘制文字的 y 轴位置为顶部基准线对齐
 * - 'hanging' -> 采用藏文、印度文基准线对齐
 * - 'middle' -> 居中对齐，绘制文字的 y 轴位置为居中基准线对齐
 * - 'alphabetic' -> 采用拉丁文基准线对齐（默认）
 * - 'ideographic' -> 采用中文、日文、韩文基准线对齐
 * - 'bottom' -> 底对齐，绘制文字的 y 轴位置为底部基准线对齐
 */
ctx.textBaseline: CanvasTextBaseline
```

> **示例**
>
> ![image-20231129190224554](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311291902668.png)

### ctx.direction 排版方向 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置文字排布的方向。

```typescript
/**
 * - 'inherit' -> 采用 Canvas 标签的 CSS 文字方向
 * - 'ltr' -> 文字从左到右绘制（默认）
 * - 'rtl' ->  文字从右到左绘制
 */
ctx.direction: CanvasDirection
```

> **示例**
>
> ![image-20231129191244526](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311291912641.png)

### ctx.fontKerning 紧凑间距 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置文字是否采用紧凑间距。

```typescript
/**
 * - 'none' -> 关闭间凑间距（默认）
 * - 'normal' -> 开启间凑间距
 * - 'auto' ->  浏览器自动定决定是否采用紧凑间距
 */
ctx.fontKerning: CanvasFontKerning
```

> **示例**
>
> ![image-20231129191542109](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311291915155.png)

### ctx.strokeText 绘制文字描边 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

采用描边方式绘制文字。

```typescript
/**
 * 1.text：文字
 *
 * 2.x、y：文字对齐点 x、y 坐标（对齐方式为 'left' + 'top' 时为左上角）
 *
 * 3.maxWidth：绘制文字最大宽度，超过该宽度会压缩每个文本宽度自适应，而非换行
 */
ctx.strokeText(text: string, x: number, y: number, maxWidth?: number): void
```

> **示例**
>
> ![image-20231129192612194](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311291926241.png)

### ctx.fillText 绘制文字填充 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

采用填充方式绘制文字。

```typescript
/**
 * 1.text：文字
 *
 * 2.x、y：文字对齐点 x、y 坐标（对齐方式为 'left' + 'top' 时为左上角）
 *
 * 3.maxWidth：绘制文字最大宽度，超过该宽度会压缩每个文本宽度自适应，而非换行
 */
ctx.fillText(text: string, x: number, y: number, maxWidth?: number): void
```

> **示例**
>
> ![image-20231129192626882](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311291926920.png)

### ctx.measureText 文本测量 <Badge type="warning" text="CanvasRenderingContext2D 方法"/>

测量指定文本的信息，例如文本宽度，**该方法是 Canvas 实现文本自动换行的关键**。

```typescript
/**
 * 1.text：文字
 */
ctx.measureText(text: string): TextMetrics
```

> **示例**
>
> ```typescript
> ctx.font = '40px sans-serif'
> ctx.measureText('ABCDefg@!& (文本测量)') // -> { width: 448.11993408203125 }
> ```
>
> **TextMetrics 文本度量**
>
> - 概念：包含 `width`、`actualBoundingBoxLeft`、`actualBoundingBoxRight` 等属性，其中主要使用 `width` 计算文本绘制尺寸，该对象更多信息可参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics)。
>
> * 数据结构
>
>   ![image-20231129193433401](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311291934515.png)

## 滤镜

> [试一试](https://project.aodazhang.com/example/canvas-api/filter)

### ctx.filter 滤镜 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 各类滤镜效果，可以多个叠加，语法与 [CSS 滤镜](/aoda-css/api.html#filter-滤镜) 类似。

```typescript
/**
 * 'url(#svgId)' -> 指定 svg 滤镜
 * 'hue-rotate(90deg)' -> 色相：0deg（原色）~ 360deg（原色）
 * 'saturate(100%)' -> 饱和度：100%（原色）
 * 'brightness(50%)' -> 明度：100%（原色）
 * 'contrast(200%)' -> 对比度：100%（原色）
 * 'grayscale(50%)' -> 灰度：0%（原色）~100%（黑白色）
 * 'sepia(60%)' -> 褐色度：0%（原色）~100%（褐色）
 * 'invert(75%)' -> 颜色反转：0%（原色）~100%（反色）
 * 'opacity(25%)' -> 不透明度：0%（透明）~100%（不透明）
 * 'blur(5px)' -> 模糊：模糊半径
 * 'drop-shadow(4px 4px 8px blue)' -> 阴影：阴影 x 轴偏移值、阴影 y 轴偏移值、阴影模糊半径、阴影色
 */
ctx.filter: string
```

> **示例**
>
> ![canvas-filter](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311271637699.jpg)

## 混合

> [试一试](https://project.aodazhang.com/example/canvas-api/composite)

### ctx.globalCompositeOperation 全局混合模式 <Badge type="tip" text="CanvasRenderingContext2D 属性"/>

设置 Canvas 绘图的层叠混合模式，对全局上下文生效，该效果不受 `ctx.save` 和 `ctx.restore` 影响。

```typescript
/**
 * 1.后绘制 遮挡 先绘制
 * 'source-over' -> 正常，后绘制 遮挡 先绘制（默认）
 * 'source-atop' -> 后绘制 被 先绘制 裁切
 * 'source-in' -> 后绘制 被 先绘制 裁切 且 只显示后绘制
 * 'source-out' -> 后绘制 被 先绘制 排除
 *
 * 2.先绘制 遮挡 后绘制
 * 'destination-over' -> 正常，先绘制 遮挡 后绘制
 * 'destination-atop' -> 先绘制 被 后绘制 裁切
 * 'destination-in' -> 先绘制 被 后绘制 裁切 且 只显示先绘制
 * 'destination-out' -> 先绘制 被 后绘制 排除
 *
 * 3.特殊遮挡
 * 'xor' -> 先绘制 异或 后绘制
 * 'copy' -> 只显示后绘制
 *
 * 4.颜色混合
 * 'lighter' -> 自然光，比较先绘制和后绘制的所有 RBG 通道值的总和，并显示更高值的颜色
 * 'lighten' -> 变亮，保留先绘制和后绘制中最亮的像素（与 'darken' 相反）
 * 'darken' -> 变暗，保留先绘制和后绘制中最暗的像素（与 'lighten' 相反）
 * 'multiply' -> 正片叠底，后绘制与先绘制的对应像素相乘，得到更暗的结果（与 'screen' 相反）
 * 'screen' -> 滤色，后绘制与先绘制对应的像素反转后相乘再反转，得到更亮的结果（与 'multiply' 相反）
 * 'overlay' -> 叠加，先绘制的暗处更暗、亮处更亮（'multiply' 与 'screen' 组合）
 * 'hard-light' -> 强光，类似叠加，后绘制的暗处更暗、亮处更亮（'multiply' 与 'screen' 组合）
 * 'soft-light' -> 柔光，强光的柔和版本，暗处不会死黑、亮处不会爆白（'multiply' 与 'screen' 组合）
 * 'color-dodge' -> 颜色减淡，先绘制 RGB 通道值除以后绘制 RGB 通道值的反向值，参考公式 = 先绘制底色 + (先绘制底色 * 后绘制顶色) / (255 - 后绘制顶色)
 * 'color-burn' -> 颜色加深，先绘制 RGB 通道值除以后绘制 RGB 通道值，再求反向值
 * 'difference' -> 差异，后绘制与先绘制 RGB 通道值相减的绝对值
 * 'exclusion' -> 排除，类似差异，对比度降低（与 'difference' 类似）
 * 'hue' -> 色调，采用先绘制的亮度和色度、后绘制的色调
 * 'saturation' -> 饱和度，采用先绘制的亮度和色调、后绘制的色度
 * 'color' -> 色值，采用先绘制的亮度、后绘制的色调和色度（与 'luminosity' 相反）
 * 'luminosity' -> 亮度，先用先绘制的色调和色度、后绘制的亮度（与 'color' 相反）
 */
ctx.globalCompositeOperation: GlobalCompositeOperation
```

> **示例**
>
> ![composite](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312012309912.jpg)
