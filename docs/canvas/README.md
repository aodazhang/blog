---
lang: zh-CN
title: 基础
# sidebar: auto
---

# Canvas

> 参考：[Canvas API 中文网](https://www.canvasapi.cn/)、[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)

Canvas 是浏览器的一种绘图 API，常用于活动页、游戏、数据可视化、动画特效、图片编辑器等场景。

- **图形**：由计算机绘制的直线、圆、矩形、曲线、图表等构成的，是由外部轮廓线条构成的矢量图。
- **图像**：由扫描仪、摄像机等输入设备捕捉实际画面而产生的数字图像，是由像素点阵构成的位图。
- **Canvas 动画本质**：不断清除上一次绘制的内容，重新绘制当前内容，只要页面 fps > 12 在人眼中就是一个完整的动画。

## Canvas 对比 SVG

|      |               Canvas               |                SVG                 |
| ---- | :--------------------------------: | :--------------------------------: |
| 结构 |          DOM（单一节点）           |          XML（多个节点）           |
| 类型 |      位图（受屏幕分辨率影响）      |    矢量图（不受屏幕分辨率影响）    |
| 事件 |             不支持事件             |              支持事件              |
| 绘制 |   需要重绘（内存不存储绘制对象）   |   不需要重绘（内存存储绘制对象）   |
| 性能 | 绘制范围较小、对象数量较多（>10k） | 绘制范围较大、对象数量较小（<10k） |

- Canvas：适用于数据量较大、绘制范围较小、清晰度要求一般的场景。
- SVG：适用于数据量较小、绘制范围较大、清晰度要求极高的场景。

## Canvas 标签

Canvas 标签同时存在 HTML 元素尺寸和绘图表面尺寸，默认 **HTML 元素尺寸 = 绘图表面尺寸**。Canvas 默认绘图表面尺寸为 **300 \* 150**，单位为 px。**当 HTML 元素尺寸 > 绘图表面尺寸时，Canvas 画面会出现拉伸、变形、模糊**。

创建 Canvas 方式如下：

- HTML（同时修改 HTML 元素尺寸 + 绘图表面尺寸）

  ```html
  <canvas id="canvas" width="500" height="500">您的浏览器不支持 Canvas</canvas>
  ```

- JavaScript（同时修改 HTML 元素尺寸 + 绘图表面尺寸）

  ```javascript
  const canvas = document.createElement('canvas')
  canvas.innerText = '您的浏览器不支持 Canvas'
  canvas.id = 'canvas'
  canvas.width = 500
  canvas.height = 500
  document.body.appendChild(canvas)
  ```

- CSS（只修改 HTML 元素尺寸，绘图表面尺寸会缩放适应 HTML 元素尺寸）

  ```html
  <style>
    #canvas {
      width: 600px;
      height: 300px;
    }
  </style>
  <!-- canvas 绘图表面尺寸会放大2倍，画面变糊 -->
  <canvas id="canvas">您的浏览器不支持 Canvas</canvas>
  ```

## 坐标系

Canvas 采用 **W3C 坐标系**, 以 HTML 元素 **左上角为原点，向右 x 正向，向下 y 正向**。

![image-20231127214022749](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311272140814.png)

如果需要转换 Canvas 坐标系为 **笛卡尔坐标系**，可采用以下方法：

```typescript
// 平移绘图原点到元素中心
ctx.translate(canvas.width / 2, canvas.height / 2)
// 对 Y 轴方向取反
ctx.scale(1, -1)
```

![image-20231127213925690](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311272139755.png)

## 兼容性

Canvas 兼容 IE9 以上，大多数情况不需要兼容性处理。

![image-20231127104942783](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311271049884.png)

对于不兼容的情况，可以采取下面方式处理：

- HTML：Canvas 标签的 innerText 内容会在浏览器不兼容 Canvas 时显示。

  ```html
  <canvas id="canvas">浏览器不支持 Canvas 会显示这行文本</canvas>
  ```

- JavaScript：通过能力检测判断是否可以调用。

  ```javascript
  // CanvasRenderingContext2D 的原型上存在 ellipse 函数再调用
  if (context.ellipse) {
    context.ellipse(400, 300, 200, 100, 0, 0, 2 * Math.PI)
  }
  ```

- IE6、7、8 不兼容：使用 [ExplorerCanvas](https://github.com/arv/ExplorerCanvas)。

  ```html
  <!-- 如果是ie浏览器则引入这个脚本 -->
  <!--[if IE
    ]><script type="text/javascript" src="../excanvas.js"></script
  ><![endif]-->
  ```

## 绘制流水线

一个完整的 **图形绘制流水线** 如下：

![微信截图_20210105230759](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311272147760.png)

一个完整的 **图像绘制流水线** 如下：

![微信截图_20210109221545](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202311272147051.png)

## 非零环绕原则

Canvas 判断图形是否需要填充采用 **非零环绕原则（Non-zero Winding）**，该图形学规则定义如下：

> 对于路径中的任意给定区域，从该区域向外引一条射线同时计数器置为 `0`，遇到顺时针路径则计数器 `+1`、遇到逆时针路径则计数器 `-1`，直到该射线不与任何路径相交为止。**最终若计数器不为 `0` 则认为该区域在路径内，需填充；若计数器为 `0` 则认为该区域不在路径内，不填充**。

```typescript
// 1.顺时针绘制内圆
ctx.arc(200, 200, 80, 0, 2 * Math.PI, true)
// 2.逆时针绘制外圆
ctx.arc(200, 200, 160, 0, 2 * Math.PI, false)
// 3.填充
ctx.fill()
```

![image-20231205133636127](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312051336228.png)

熟练利用该规则配合 [图形 API](/canvas/api.html#图形)，可以绘制各种镂空图形。

## 绘图上下文扩展

可以通过修改 `CanvasRenderingContext2D` 的原型来为 Canvas 绘图上下文扩展方法：

- 扩展 `moveTo`

  ```typescript
  // 1.保留原始 moveTo 函数实现
  const oldMoveTo = CanvasRenderingContext2D.prototype.moveTo
  // 2.在 CanvasRenderingContext2D 原型上定义新的对象，用于保存 moveTo 坐标
  CanvasRenderingContext2D.prototype.lastMoveTo = {}
  // 3.在 CanvasRenderingContext2D 原型上覆盖 moveTo 函数实现
  CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
    // 执行原始 moveTo
    oldMoveTo.apply(this, [x, y])
    // 扩展保存上一次 moveTo 坐标，在其他上下文中就可以访问 lastMoveTo 对象获得该坐标
    this.lastMoveTo.x = x
    this.lastMoveTo.y = y
  }
  ```

- 新增 `drawEllipse`

  ```typescript
  // 在 CanvasRenderingContext2D 原型上定义新的方法
  CanvasRenderingContext2D.prototype.drawEllipse = function () {
    this.save()
    this.beginPath()
    this.ellipse(400, 300, 200, 100, 0, 0, 2 * Math.PI)
    this.stroke()
    this.restore()
  }
  ```

## 离屏渲染

根据正常显示的 Canvas 标签创建一个大小一致的隐藏 Canvas 元素。先将指定内容绘制到离屏 Canvas 上下文中避免 UI 渲染，然后处理一些复杂逻辑，最后将缓存的内容一次性绘制到正常显示的 Canvas 元素上。**这样可以避免多余的渲染从而优化性能、实现复杂的视觉效果**。

```typescript
// 1.创建与正常显示 canvas 尺寸一样的离屏 canvas 元素
const cacheCanvas = document.createElement('canvas')
cacheCanvas.width = canvas.width
cacheCanvas.height = canvas.height
const cacheCtx = cacheCanvas.getContext('2d')

// 2.将原本正常显示 canvas 上的内容绘制到离屏 canvas 元素中
cacheCtx.fillStyle = 'red'
cacheCtx.fillRect(0, 0, 200, 100)

// 3.处理复杂逻辑并更新离屏 canvas
// ...
cacheCtx.fillStyle = 'blue'
cacheCtx.fillRect(0, 0, 400, 200)

// 4.最后使用 drawImage 将离屏 canvas 的内容一次性渲染到正常显示的 canvas 上
ctx.drawImage(cacheCanvas, 0, 0)
```

## 触控检测

一般 Canvas 应用不通过 [判断 API](/canvas/api.html#判断) 做触控检测，而是利用额外的 Canvas 同步绘制检测元素，配合 dom 事件获取点击坐标对应的 Canvas 颜色信息进行判断。

```typescript
// 1.正常 canvas 绘制元素：z-index 1
ctx.fillStyle = 'red'
ctx.beginPath()
ctx.rect(20, 20, 300, 150)
ctx.fill()

// 2.检测 canvas 同步绘制元素：z-index 2
collisionCtx.fillStyle = 'black'
collisionCtx.beginPath()
collisionCtx.rect(20, 20, 300, 150)
collisionCtx.fill()

// 3.监听 dom 事件
window.addEventListener('click', e => {
  // 获取点击浏览器坐标
  const { clientX, clientY } = e
  // 获取检测 canvas 左上角坐标
  const { left, top } = collisionCanvas.getBoundingClientRect()
  // 转换点击 canvas 坐标
  const point = {
    x: Math.round(clientX - left), // 取整
    y: Math.round(clientY - top)
  }
  // 获取点击 canvas 坐标对应的颜色信息
  const imageData = collisionCtx.getImageData(point.x, point.y, 1, 1)
  if (imageData.data[3] === 255) {
    // 触发点击逻辑
  }
})
```

![image-20231205170558236](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202312051705332.png)
