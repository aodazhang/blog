---
lang: zh-CN
title: 内置函数
# sidebar: auto
---

## 1.条件函数

### step 阶梯

::: warning 注意

在 Shader 中应该避免使用 if 语句，因为 if 的处理器分支切换特性会降低 GPU 并行处理能力。

:::

根据输入值和阈值的关系输出结果，`x <= edge` 返回 0.0、`x > edge` 返回 1.0，常用于替代 [if-else](/glsl/#if-else-判断)。

```glsl
/**
 * edge：阈值。
 * x：输入值。
 */
float step(float edge, float x)
vec2 step(vec2 edge, vec2 x)
vec3 step(vec3 edge, vec3 x)
vec4 step(vec4 edge, vec4 x)
```

### smoothstep 平滑阶梯

根据输入值和阈值的关系输出结果，`x < edge1` 返回 0.0、`x > edge2` 返回 1.0、`x 介于 edge1 和 edge2 之间` 返回平滑过渡值，常用于 SDF 图形边缘锯齿优化。该函数实现公式为 `3 * x^2 - 2 * x^3`。

```glsl
/**
 * edge1：阈值 1。
 * edge2：阈值 2。
 * x：输入值。
 */
float smoothstep(float edge1, float edge2, float x)
```

### mix 混合

根据输入值和插值系数的关系输出结果，`k 为 0` 返回 x、`k 为 1` 返回 y、`k 介于 0 和 1 之间` 返回 x 和 y 的线性插值，常用于颜色混合。该函数实现公式为 `x * (1.0 - k) + y * k`。

```glsl
/**
 * x：输入值 1。
 * y：输入值 2。
 * k：插值系数，范围 [0, 1]。
 */
float mix(float x, float y, float k)
vec2 mix(vec2 x, vec2 y, float k)
vec3 mix(vec3 x, vec3 y, float k)
vec4 mix(vec4 x, vec4 y, float k)
```

## 2.指数函数

### pow 幂

计算 x 的 y 次幂。

```glsl
/**
 * x：底数。
 * y：指数。
 */
float pow(float x, float y)
```

### exp 以自然为底幂

计算自然数 e 的 x 次幂。

```glsl
/**
 * x：指数。
 */
float exp(float x)
```

### exp2 以 2 为底幂

计算 2 的 x 次幂。

```glsl
/**
 * x：指数。
 */
float exp2(float x)
vec2 exp2(vec2 x)
vec3 exp2(vec3 x)
vec4 exp2(vec4 x)
```

### log 对数

计算以 base 为底 x 的对数。

```glsl
/**
 * x：真数。
 * base：底数。
 */
float log(float x, float base)
```

### log2 以 2 为底对数

计算以 2 为底 x 的对数。

```glsl
/**
 * x：真数。
 */
float log(float x)
```

### sqrt 平方根

计算 x 的平方根。

```glsl
/**
 * x：被开方数。
 */
float sqrt(x)
```

### inversesqrt 平方根倒数

计算 x 平方根的倒数，等价于 `1.0 / sqrt(x)`，但计算速度更快。

```glsl
/**
 * x：被开方数。
 */
float inversesqrt(float x)
```

## 3.三角函数

### sin 正弦

计算 angle 的正弦值。

```glsl
/**
 * angle：弧度。
 */
float sin(float angle)
```

### cos 余弦

计算 angle 的余弦值。

```glsl
/**
 * angle：弧度。
 */
float cos(float angle)
```

### tan 正切

计算 angle 的正切值。

```glsl
/**
 * angle：弧度。
 */
float tan(float angle)
```

### asin 反正弦

计算 x 的反正弦值，结果范围 `[-π/2, π/2]`。

```glsl
/**
 * x：正弦值，范围 [-1, 1]。
 */
float asin(float x)
```

### acos 反余弦

计算 x 的反余弦值，结果范围 `[0, π]`。

```glsl
/**
 * x：余弦值，范围 [-1, 1]。
 */
float acos(float x)
```

### atan 反正切

计算 x 的反正切值，结果范围 `[-π/2, π/2]`。

```glsl
/**
 * x：正切值。
 */
float atan(float x)
```

### radians 角度转弧度

计算 degrees 的弧度。

```glsl
/**
 * degrees：角度。
 */
float radians(float degrees)
```

### degrees 弧度转角度

计算 radians 的角度。

```glsl
/**
 * radians：弧度。
 */
float degrees(float radians)
```

## 4.向量函数

## 5.矩阵函数

## 6.纹理函数

### texture2D 纹理采样

根据 uv 从图片纹理中获取像素值。

```glsl
/**
 * sampler：sampler2D 数据。
 * uv：纹理坐标。
 */
vec4 texture2D(sampler2D sampler, vec2 uv)
```

### textureCube 立方体纹理采样

根据 uv 从 立方体图片纹理中获取像素值。

```glsl
/**
 * sampler：samplerCube 数据。
 * uv：纹理坐标。
 */
vec4 textureCube(samplerCube sampler, vec3 uv)
```
