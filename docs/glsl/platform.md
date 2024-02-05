---
lang: zh-CN
title: 平台
# sidebar: auto
---

## 1.WebGL 平台

原生 WebGL 需配合 JavaScript 执行，也可通过 [glsl-canvas 插件](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas) 直接在 VSCode 中运行。

```glsl
/*
WebGL 内置变量（可不声明直接使用）
- float gl_PointSize：设置顶点尺寸，仅 顶点着色器 + 点绘制模式 生效。
- vec4 gl_Position：设置顶点坐标，仅 顶点着色器 生效。
- vec4 gl_FragColor：设置片元颜色，仅 片元着色器 生效。
- vec2 gl_PointCoord：获取基于渲染坐标系的片元坐标，仅 片元着色器 生效。
- vec3 gl_FragCoord：获取基于 Canvas 坐标系的片元坐标，仅 片元着色器 生效。
- float gl_FragDepth：设置片元深度值，默认用 gl_FragCoord.z 设置，仅 片元着色器 生效。
*/

// 一.顶点着色器
attribute vec4 aPosition; // js 传入顶点数据

void main() {
  // 1.设置顶点尺寸：点渲染模式生效 gl.drawArrays(gl.POINTS, 0, 点数量)
  gl_PointSize = 20.0;

  // 2.设置顶点坐标
  gl_Position = aPosition;
}

// 二.片元着色器
void main() {
  // 1.设置片元颜色
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

  // 2.利用渲染坐标系的片元坐标绘制部分像素
	float r = distance(gl_PointCoord, vec2(0.5, 0.5));
  if(r < 0.5){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  } else {
    discard;
  }

  // 3.利用 Canvas 坐标系的片元坐标绘制渐变
  gl_FragColor = vec4(gl_FragCoord.x / 500.0 * 1.0, 1.0, 0.0, 1.0);
}
```

- gl_PointCoord 和 gl_FragCoord 的区别

  ![image-20240118153528185](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202401181535297.png)

  - **gl_PointCoord**：相对渲染点的坐标，范围 `[0.0, 1.0]`。
  - **gl_FragCoord**：相对 Canvas 画布的坐标，范围不限。

## 2.Three.js 平台

Three.js 一般在 [ShaderMaterial](https://threejs.org/docs/index.html#api/zh/materials/ShaderMaterial) 中处理 Shader 效果，具体可用变量请参考 [WebGLProgram.js](https://github.com/mrdoob/three.js/blob/dev/src/renderers/webgl/WebGLProgram.js#L661)。

```glsl
/**
* Three.js 传递变量（可不声明直接使用）
* - attribute vec3 position：顶点坐标
* - attribute vec3 normal：顶点法向量
* - attribute vec2 uv：顶点 uv 坐标
* - uniform mat4 modelViewMatrix：模型视图矩阵 = 视图矩阵 x 模型矩阵
*   - uniform mat4 modelMatrix：模型矩阵
*   - uniform mat4 viewMatrix：视图矩阵
* - uniform mat4 projectionMatrix：投影矩阵
* - uniform vec3 cameraPosition：相机坐标
* - uniform bool isOrthographic：是否正交投影相机
* - uniform mat3 normalMatrix：法线矩阵，用于将顶点着色器的法向量转换为相机空间中的法向量
*/

// 一.顶点着色器
varying vec2 vUv;

void main() {
  // 1.最终顶点坐标 = 投影矩阵 * 模型视图矩阵 * 顶点坐标
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // 2.传递 uv
  vUv = uv;
}

// 二.片元着色器
varying vec2 vUv;

void main() {
  // 1.设置片元颜色
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

## 3.ShaderToy 平台

[ShaderToy](https://www.shadertoy.com/) 一般只使用片元着色器，可通过 [Shader Toy 插件](https://marketplace.visualstudio.com/items?itemName=stevensona.shader-toy) 直接在 VSCode 中运行。

```glsl
/*
ShaderToy 内置变量（可不声明直接使用）
- vec2 fragCoord：获取基于 Canvas 坐标系的片元坐标（等价于 gl_FragCoord）
- vec4 fragColor：设置片元颜色（等价于 gl_FragColor）
- vec4 iResolution：Cavans 整体大小，一般取 x、y 维度。
- float iTime：Shader 开始执行到现在经过的时间。
- vec2 iMouse：用户鼠标在 Canvas 的坐标。
*/

// ShaderToy 引入纹理
#iChannel0"https://s2.loli.net/2023/09/10/QozT59R6KsYmb3q.jpg"
#iChannel1"https://s2.loli.net/2023/09/10/Jb8mIhZMBElPiuC.jpg"

/*
ShaderToy 片元着色器主函数
- fragColor：输出像素颜色
- fragCoord：输入像素坐标
*/
void mainImage(out vec4 fragColor, in vec2 fragCoord){
  // 1.获取当前片元 uv
  vec2 uv = fragCoord / iResolution.xy;

  // 2.根据 uv 提取纹理
  vec4 tex0 = texture2D(iChannel0, uv);
  vec4 tex1 = texture2D(iChannel1, uv);

  // 3.绘制片元
  fragColor=vec4(mix(tex0, tex1, 0.5).rgb, 1.0);
}
```
