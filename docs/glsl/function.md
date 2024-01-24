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

### all 全部

若 x 中所有元素都为 `true` 则返回 `true`，否则返回 `false`。

```glsl
/**
 * x：输入值。
 */
bool all(bvec2 x)
bool all(bvec3 x)
bool all(bvec4 x)
```

### any 任意

若 x 中有一个元素为 `true` 则返回 `true`，否则返回 `false`。

```glsl
/**
 * x：输入值。
 */
bool any(bvec2 x)
bool any(bvec3 x)
bool any(bvec4 x)
```

## 2.数学函数

### abs 绝对值

返回 x 的绝对值，如果 x 是整型会被强制转换为浮点型。

```glsl
/**
 * x：输入值。
 */
float abs(float x)
```

### sign 符号

返回 x 的符号，正数为 `1.0`、负数为 `-1.0`、0 为 `0.0`。

```glsl
/**
 * x：输入值，必须是 int、float 类型。
 */
float sign(float x)
```

### fract 返回小数

返回 x 的小数部分，结果范围 `[0, 1]`。

```glsl
/**
 * x：输入值。
 */
float fract(float x)
```

### round 四舍五入

返回 x 的四舍五入整数。

```glsl
/**
 * x：输入值。
 */
float round(float x)
```

### floor 向下取整

返回小于等于 x 的最近整数。

```glsl
/**
 * x：输入值。
 */
float floor(float x)
```

### ceil 向上取整

返回大于等于 x 的最近整数。

```glsl
/**
 * x：输入值。
 */
float ceil(float x)
vec2 ceil(vec2 x)
vec3 ceil(vec3 x)
vec4 ceil(vec4 x)
```

### min 最小值

返回输入值中的最小值，对于布尔类型会返回 `false`。

```glsl
/**
 * x：输入值 1。
 * y：输入值 2。
 */
float min(float x, float y)
bool min(bool x, bool y)
vec2 min(vec2 x, vec2 y)
vec3 min(vec3 x, vec3 y)
vec4 min(vec4 x, vec4 y)
```

### max 最大值

返回输入值中的最大值。

```glsl
/**
 * x：输入值 1。
 * y：输入值 2。
 */
float max(float x, float y)
vec2 max(vec2 x, vec2 y)
vec3 max(vec3 x, vec3 y)
vec4 max(vec4 x, vec4 y)
```

### clamp 中间值

返回输入值中的中间值，等价于 `min(max(x, y), z)`。

```glsl
/**
 * x：输入值 1。
 * y：输入值 2。
 * z：输入值 3。
 */
float clamp(float x, float y, float z)
vec2 clamp(vec2 x, vec2 y, vec2 z)
vec3 clamp(vec3 x, vec3 y, vec3 z)
vec4 clamp(vec4 x, vec4 y, vec4 z)
```

### mod 取模

返回被除数与除数的模（余数）。

```glsl
/**
 * x：被除数。
 * y：除数。
 */
float mod(float x, float y)
vec2 mod(vec2 x, vec2 y, vec2 z)
vec3 mod(vec3 x, vec3 y, vec3 z)
vec4 mod(vec4 x, vec4 y, vec4 z)
```

## 3.指数函数

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

## 4.三角函数

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

## 5.向量函数

## 6.矩阵函数

## 7.纹理函数

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
