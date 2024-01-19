---
lang: zh-CN
title: 内置函数
# sidebar: auto
---

## 1.通用函数

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
