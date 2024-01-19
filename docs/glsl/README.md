---
lang: zh-CN
title: 基础语法
# sidebar: auto
---

## 1.起步

### 简介

Shader 代码运行在 GPU 中，主要负责一些图形图像的效果处理。当下浏览器兼容性较好的 WebGL 是基于 OpenGL ES 的，因此建议学习 GLSL 编写 Shader。主流的 Shader 编程语言如下：

- **GLSL**：OpenGL Shading Language，OpenGL 平台 API。

- **WGSL**：WebGPU Shading Language，WebGPU 平台 API。

- **HLSL**：High-Level Shading Language，DirectX 平台 API。

- **Cg**：C for Graphics，由英伟达开发，可编译为 GLSL、HLSL。

### 兼容性

![image-20240117211725469](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202401172117507.png)

![image-20240117211747563](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202401172117670.png)

![image-20240117211817351](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202401172118461.png)

## 2.定义

### 变量命名规则

- 大小写敏感：例如 `aposition` 和 `aPosition` 是不同变量。
- 只能使用数字、字母、下划线。
- 不能以数字开头。
- 不能以关键字命名：例如 `uniform` 、`attribute` 、`varying`。
- 不能以保留前缀开头：例如 `gl_`、`webgl_`、`_webgl_` 开头的变量被用于定义 GLSL 的内部变量，这是 GLSL 保留的命名前缀。
- 语句强制分号。

### 变量与常量

```glsl
<变量限定符> <精度限定符> 数据类型 变量名 = 数据值;
```

- 变量

  ```glsl
  // 1.定义变量
  int count = 10; // 整型
  float num1 = 10.0; // 浮点型
  mediump float num2 =20.0; // 指定精度的浮点型

  // 2.修改变量
  count = 20;
  num = 20.0;
  ```

- 常量

  ```glsl
  // 1.定义常量
  const int count = 10; // 整型常量
  const mediump float PI =3.1415926; // 指定精度的浮点型常量

  // 2.修改常量直接报错
  count = 20;
  ```

### 注释

```glsl
// 单行注释

/**
 * 多行注释
 */
```

## 3.数据类型

::: warning 注意

GLSL 中类型严格，任何与数据类型不相符的赋值都会报错。

:::

### 基本类型

```glsl
// 1.布尔型 bool
bool hasLight = false;

// 2.整型 int
int count = 10;

// 3.单精度浮点型 float（32 位，浮点型至少需要 1 位小数，否则系统运算时可能会识别为 int）
float num = 10.0;

// 4.空 void（常用于函数返回值）
void func() {}
```

- 强制类型转换

  ```glsl
  // float、bool 转 int（直接去掉浮点数部分，false 为 0、true 为 1）
  int a = int(10.0); // 10
  int b = float(true); // 1

  // int、bool 转 float（整型加 1 位小数，false 为 0.0、true 为 1.0）
  float c = float(10); // 10.0
  float d = float(false); // 0.0

  // int、float 转 bool（0 和 0.0 为 false、其他为 true）
  bool c = bool(10);
  ```

### 向量类型

::: warning 注意

齐次坐标：用 **n+1 维向量** 来表达 **n 维点坐标和向量**，w 为 0 时代表 **向量**，w 不为 0 时代表 **点坐标**，常用于透视除法。

:::

```glsl
// 1.单精度浮点型向量 vec（32位）
vec2 a = vec2(1.0, 2.0);
vec3 b = vec3(1.0, 2.0, 3.0);
vec4 c = vec4(1.0, 2.0, 3.0, 4.0);

// 2.整型向量 ivec
ivec2 d = ivec2(1, 2);
ivec3 e = ivec3(1, 2, 3);
ivec4 f = ivec4(1, 2, 3, 4);

// 3.布尔型向量 bvec
bvec2 g = bvec2(true, false);
bvec3 h = bvec3(true, false, true);
bvec4 i = bvec4(true, false, true, false);
```

- 分量

  |   空间坐标向量    | 颜色向量 | 纹理向量 | 下标 |
  | :---------------: | :------: | :------: | :--: |
  |         x         |    r     |    s     | [0]  |
  |         y         |    g     |    t     | [1]  |
  |         z         |    b     |    p     | [2]  |
  | w（齐次坐标分量） |    a     |    q     | [3]  |

- 赋值

  ```glsl
  // 1.单一值创建向量
  vec3 b = vec3(1.0); // -> vec3(1.0, 1.0, 1.0)

  // 2.高维向量赋值低维向量
  vec4 v4 = vec4(1, 2, 3, 4);
  vec2 v2 = vec2(v.xx); // -> vec2(1.0, 1.0)

  // 3.向量类型会自动对元素做类型转换
  vec2 coords = vec2(1, 2); // -> vec2(1.0, 2.0) 向量值自动转换为 float
  ```

- 取值

  ```glsl
  vec4 a = vec4(1.0, 2.0, 3.0, 4.0);

  // 相同类型的分量可以任意组合取值
  vec2 b = a.xw; // -> vec2(1.0, 4.0)
  vec3 c = a.xyz; // -> vec3(1.0, 2.0, 3.0)
  vec4 d = a.xyxx; // -> vec4(1.0, 2.0, 1.0, 1.0)
  vec4 e = a.rgrr; // -> vec4(1.0, 2.0, 1.0, 1.0)
  vec4 f = a.stss; // -> vec4(1.0, 2.0, 1.0, 1.0)
  ```

- 运算

  ```glsl
  vec4 a = vec4(1.0, 2.0, 3.0, 4.0);

  // 1.向量 和 数字：每个元素都与该数字运算
  // 加
  vec4 b = a + 1.0; // -> vec4(2.0, 3.0, 4.0, 5.0)
  // 减
  vec4 c = a - 1.0; // -> vec4(0.0, 1.0, 2.0, 3.0)
  // 乘
  vec4 d = a * 2.0; // -> vec4(2.0, 4.0, 6.0, 8.0)
  // 除
  vec4 e = a * 2.0; // -> vec4(0.5, 1.0, 1.5, 2.0)

  // 2.向量 和 向量：对应分量运算
  // 加
  vec4 f = a + vec4(-1.0, 2.0, -3.0, 4.0); // -> vec4(0.0, 4.0, 0.0, 8.0)
  // 减
  vec4 g = a - vec4(-1.0, 2.0, -3.0, 4.0); // -> vec4(2.0, 0.0, 6.0, 0.0)
  // 乘
  vec4 h = a * vec4(-1.0, 2.0, -3.0, 4.0); // -> vec4(-1.0, 4.0, -9.0, 16.0)
  // 除
  vec4 i = a * vec4(-1.0, 2.0, -3.0, 4.0); // -> vec4(-1.0, 1.0, -1.0, 1.0)
  ```

### 矩阵类型

::: warning 注意

矩阵参数是列主序的。

:::

```glsl
/**
 * 1.单精度浮点型 2x2 矩阵
 *
 * 1.0  3.0
 * 2.0  4.0
 */
mat2 a = mat2(
  1.0, 2.0,
  3.0, 4.0
);

/**
 * 2.单精度浮点型 3x3 矩阵
 *
 * 1.0  4.0  7.0
 * 2.0  5.0  8.0
 * 3.0  6.0  9.0
 */
mat3 b = mat3(
  1.0, 2.0, 3.0,
  4.0, 5.0, 6.0,
  7.0, 8.0, 9.0
);

/**
 * 3.单精度浮点型 4x4 矩阵
 *
 * 1.0  5.0  9.0   13.0
 * 2.0  6.0  10.0  14.0
 * 3.0  7.0  11.0  15.0
 * 4.0  8.0  12.0  16.0
 */
mat4 c = mat4(
  1.0, 2.0, 3.0, 4.0,
  5.0, 6.0, 7.0, 8.0,
  9.0, 10.0, 11.0, 12.0,
  13.0, 14.0, 15.0, 16.0
);
```

- 赋值

  ```glsl
  /**
   * 1.创建对角阵
   *
   * 1  0  0  0
   * 0  1  0  0
   * 0  0  1  0
   * 0  0  0  1
   */
  mat4 a = mat4(1.0);

  /**
   * 2.列向量创建矩阵
   *
   * 1  4  7
   * 2  5  8
   * 3  6  9
   */
  vec3 v1 = vec3(1, 2, 3);
  vec3 v2 = vec3(4, 5, 6);
  vec3 v3 = vec3(7, 8, 9);
  mat3 b = mat3(v1, v2, v3);
  ```

- 取值

  ```glsl
  /**
   * 1.0  5.0  9.0   13.0
   * 2.0  6.0  10.0  14.0
   * 3.0  7.0  11.0  15.0
   * 4.0  8.0  12.0  16.0
   */
  mat4 a = mat4(
    1.0, 2.0, 3.0, 4.0,
    5.0, 6.0, 7.0, 8.0,
    9.0, 10.0, 11.0, 12.0,
    13.0, 14.0, 15.0, 16.0
  );

  // 1.取第 2 列第 3 行数据
  float b = a[1][2]; // -> 7.0

  // 2.取第 2 列数据
  vec4 c = a[1]; // -> vec4(5.0, 6.0, 7.0, 8.0)
  ```

- 运算

  ```glsl
   /**
   * 1.0  3.0
   * 2.0  4.0
   */
  mat2 a = mat2(
    1.0, 2.0,
    3.0, 4.0
  );

  // 1.矩阵 和 数字：每个元素都与该数字运算
  mat2 b = a * 10; // -> mat2(10.0, 20.0, 30.0, 40.0)

  // 2.矩阵 和 向量：线性代数规则
  vec2 c = a * vec2(1.0, 2.0); // -> vec2(5.0, 11.0)

  // 3.矩阵 和 矩阵：线性代数规则
  mat2 d = a * mat2(1.0, 2.0, 1.0, 2.0); // -> mat2(3.0, 6.0, 7.0, 14.0)
  ```

### 结构体类型

```glsl
// 1.定义结构体数据类型
struct DirectionalLight {
  vec2 direction;
  vec3 color;
  float level;
};

// 2.声明结构体变量
uniform DirectionalLight light1;
DirectionalLight light2 = DirectionalLight(
  vec2(1.0, 2.0),
  vec3(4.0, 5.0, 6.0),
  7.0
);
```

- 赋值

  ```glsl
  // 1.访问结构体成员赋值
  light2.level = 8.0;
  ```

- 取值

  ```glsl
  // 1.访问结构体成员取值
  float level = light2.level; // -> 8.0
  ```

### 取样器类型

::: warning 注意

取样器的存储限定符只能使用 `uniform`。

:::

```glsl
// 1.二维纹理（纹理图片的像素数据）
uniform sampler2D uDiffuse;

// 2.立方体纹理
uniform samplerCube uCubeDiffuse;
```

- 纹理映射

  ```glsl
  // 一.顶点着色器
  attribute vec4 aPosition;
  attribute vec2 aUv; // 纹理坐标
  varying vec2 vUv; // 传递片元着色器的纹理坐标

  void main() {
    gl_Position = aPosition;
    // 纹理坐标传递
    vUv = aUv;
  }
  ```

  ```glsl
  // 二.片元着色器
  precision mediump float;
  uniform sampler2D uDiffuse; // 纹理图片像素数据
  varying vec2 vUv; // 传递片元着色器的纹理坐标

  void main() {
    // 根据 uv 采集纹素后逐片元赋值
    gl_FragColor = texture2D(uDiffuse, vUv);
  }
  ```

## 4.变量限定符

::: warning 注意

用于描述变量如何被 GLSL 存储，**不同的变量限定符无法同时使用**。

:::

### const 常量

定义后数据值不可修改。

```glsl
const float PI = 3.1415926;
```

- 场景：声明一些不需要修改的参数，例如弧度。

### uniform 全局变量

用于向着色器传递指定参数，必须声明在所有着色器代码之前，在所有着色器中值保持一致（所有顶点数据相同）。

```glsl
uniform vec3 uColor;
```

- 场景：声明非顶点相关的数据，例如复变矩阵、二维纹理。
- 数据流：JavaScript -> 顶点着色器、片元着色器

### attribute 顶点变量

一般与 buffer 结合向着色器传递逐顶点信息（每个顶点数据不同）。

```glsl
attribute vec2 aPosition;
```

- 场景：声明顶点相关的数据，例如位置、颜色、法向量。
- 数据流：JavaScript -> 顶点着色器

### varying 传递变量

用于顶点着色器和片元着色器之间的数据传递及插值计算。

```glsl
varying vec2 vUv;
```

- 场景：声明需要插值计算的顶点数据。
- 数据流：顶点着色器 -> 片元着色器

## 5.精度限定符

::: warning 注意

定义指定数据类型的计算精度，**较高精度会占用更多系统资源**。

:::

### 精度级别

- **lowp**：低精度。
- **mediump**：中精度。
- **highp**：高精度。

### 声明方式

```glsl
// 1.全局声明：影响着色器内同数据类型精度
precision mediump float; // 中精度浮点型

// 2.单个声明：影响单一变量（不推荐，不利于后期维护）
lowp vec2 position; // 低精度浮点型二维向量
```

### 默认精度

|  数据类型   | 顶点着色器 |      片元着色器      |
| :---------: | :--------: | :------------------: |
|     int     |   highp    |       mediump        |
|    float    |   highp    | **无，必须手动设置** |
|  sampler2D  |    lowp    |         lowp         |
| samplerCube |    lowp    |         lowp         |

## 6.运算符

### 算数运算符

```glsl
// 1.数学计算
+  -  *  /

// 2.赋值计算
+=  -=  *=  /=

// 3.自增、自减
++  --
```

### 比较运算符

```glsl
// 1.大小比较
>  <  >=  <=

// 2.相等比较
==  !=
```

### 逻辑运算符

```glsl
// 1.或、且、非
||  &&  !

// 2.异或
^^
```

### 三元运算符

```glsl
// 1.三元
expression ? a : b
```

## 7.控制语句

### if-else 判断

```glsl
if(x > 100){
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
} else if (x > 50) {
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
} else {
  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
```

### for 循环

```glsl
for(int i = 0; i < 10; i++) {
  if (i == 5) {
    continue; // 中断当前循环，进入下一次循环
  } else if (i == 8) {
    break; // 结束当前层级循环
  }
}
```

### while 循环

```glsl
int i = 0;
while (i < 10) {
  vec4 test = vec4(1.0, 0.0, 0.0, 1.0);
  i++;
}
```

### do-while 循环

```glsl
int i = 0;
do {
 vec4 test = vec4(1.0, 0.0, 0.0, 1.0);
 i++;
} while(i < 10)
```

### discard 舍弃

常用于其他控制语句中，可将不符合条件的片元舍弃，**仅用于片元着色器**。

```glsl
void main() {
  // 1.计算片元坐标距离渲染点中心的距离
	float r = distance(gl_PointCoord, vec2(0.5, 0.5));
  // 2.距离几何中心半径 < 0.5 的片元舍弃
  if(r < 0.5){
    discard;
  }
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

## 8.数组

### 语法

```glsl
数组元素的数据类型 数组变量名[数组元素个数];
```

### 定义

```glsl
// 1.浮点型数组 + 长度 100
float arr1[100];

// 2.浮点型向量数组 + 长度 20
vec3 arr2[20];

// 3.全局变量 + 浮点型数组 + 长度 3
uniform float num[3];

// 4.全局变量 + 结构体数组 + 长度 2
struct DirectionalLight {
  vec3 direction;
  vec4 color;
};
uniform DirectionalLight light[2];
```

- 赋值

  ```glsl
  // 1.普通数组 + 初始化赋值
  float num[3] = float[3](1.0, 2.0, 3.0);

  // 2.普通数组 + 索引赋值
  num[0]=3.0;

  // 3.结构体数组 + 索引赋值
  DirectionalLight light[2];
  light[0].direction = vec3(0.0);
  light[0].color = vec4(1.0);
  ```

- 取值

  ```glsl
  // 1.普通数组取值
  num[2]; // -> 3.0

  // 2.结构体数组取值
  light[0].color; // -> vec4(1.0, 1.0, 1.0, 1.0)
  ```

## 9.函数

::: warning 注意

GLSL 的函数不支持递归。

:::

### 语法

```glsl
返回值类型 函数名(<参数传递方式> 参数类型 参数名) {

}
```

| 参数传递方式 |                       处理方式                       | 是否可修改内部形参 | 是否会影响外部实参 | 拷贝次数 |
| :----------: | :--------------------------------------------------: | :----------------: | :----------------: | :------: |
|    **in**    |        复制实参数据到形参，默认的参数传递方式        |         ✅         |         ❌         |   1 次   |
| **const in** |                  复制实参数据到形参                  |         ❌         |         ❌         |   1 次   |
|   **out**    |             函数执行后将形参值复制到实参             |         ✅         |         ✅         |   1 次   |
|  **inout**   | 复制实参数据到形参，函数执行后将内部形参值复制到实参 |         ✅         |         ✅         |   2 次   |

### 定义

```glsl
// 1.定义设置分量 x 的函数
float func(out vec3 point) {
  point.x = 2.0;
  return point.x * point.x;
}

void main() {
  vec3 size = vec3(1.0, 0.0, 0.0);
  // 2.执行该函数后，size.x 被改变
  func(size);
  gl_PointSize= size.x;
  gl_Position = vec4(0.0,0.0,0.0,1.0);
}
```

## 10.编译预处理

::: warning 注意

一种文本替换机制，没有类型检查和作用域限制，在编译预处理阶段会自动将宏转换成对应代码，因此不需要分号。

:::

### #define 宏定义

```glsl
// 1.定义宏变量
#define PI 3.14159265359

// 2.定义宏函数
#define add(a,b)a+b
```

### #if、#ifdef、#endif 宏条件

```glsl
// 1.判断宏定义是否存在：如果存在宏定义 USE_COLOR，则保留 #ifdef 到 #endif 之间的代码
#ifdef USE_COLOR
	color.y = USE_COLOR;
#endif

// 2.判断条件是否成立：如果 10 > 0，则保留 #if 到 #endif 之间的代码
#if 10 > 0
	vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
#endif
```

### #include 宏引入

```glsl
// 1.引入外部 glsl 文件
#include <common>
#include <color>

// 2.引入 npm 包中的 glsl 文件
#include "/node_modules/lygia/generative/cnoise.glsl"

// 编译预处理后等于在当前文件中注入下面代码
float alpha = 0.5; // common.glsl 中定义的变量
uniform vec3 color; // color.glsl 中定义的变量
float cnoise() { } // lygia 中定义的柏林噪声函数
```
