---
lang: zh-CN
title: API
# sidebar: auto
---

## Core

### Entity 实体

> 定义某一个业务对象，本质是唯一性 id，关联特定的组件集合，需要通过 [World 实例](/ecs-lite/api.html#world-世界) 创建。

类签名

```typescript
class Entity {
  /**
   * 构造函数
   * @param id 实体id
   * @param name 实体名
   */
  constructor(public readonly id: number, public readonly name?: string)
}
```

### Component 组件

> 定义某种业务的数据结构，一个 [Entity](/ecs-lite/api.html#entity-实体) 上可以动态挂载多个 Component，需要继承 Component 抽象类定义。

类签名

```typescript
abstract class Component {}
```

### System 系统

> 定义某种业务的逻辑，每个 System 使用多个 [Component](/ecs-lite/api.html#component-组件) 的数据编写逻辑，存在生命周期，需要继承 System 抽象类定义。

类签名

```typescript
abstract class System {
  /**
   * 更新时调用
   * @param world 世界实例
   * @param frame 帧渲染时间
   * @returns 无
   */
  public abstract update(world: World, frame?: number): void

  /**
   * 销毁时调用
   * @param world 世界实例
   * @returns 无
   */
  public abstract destory(world: World): void
}
```

### World 世界

> 负责管理调度内部的所有实体、组件、系统，需要实例化后使用。

类签名

```typescript
class World {
  /**
   * 构造函数
   * @param data 业务变量
   */
  constructor(data?: unknown)

  /**
   * 启动主循环
   * @returns 世界实例
   */
  public start(): World

  /**
   * 暂停主循环
   * @returns 世界实例
   */
  public pause(): World

  /**
   * 创建实体
   * @param name 实体名
   * @returns 实体
   */
  public createEntity(name?: string): Entity

  /**
   * 删除实体
   * @param entity 实体
   * @returns 世界实例
   */
  public removeEntity(entity: Entity): World

  /**
   * 重置实体
   * @returns 世界实例
   */
  public resetEntity(): World

  /**
   * 查询实体名关联的实体
   * @param name 实体名
   * @returns 实体
   */
  public findNameWithEntities(name: string): Entity[]

  /**
   * 移除实体名关联的实体
   * @param name 实体名
   * @returns 世界实例
   */
  public removeNameWithEntities(name: string): World

  /**
   * 新增实体关联的组件
   * @param entity 实体
   * @param components 组件
   * @returns 世界实例
   */
  public addEntityWithComponents(
    entity: Entity,
    ...components: Component[]
  ): World

  /**
   * 移除实体关联的组件
   * @param entity 实体
   * @param constructors 组件构造函数
   * @returns 世界实例
   */
  public removeEntityWithComponents(
    entity: Entity,
    ...constructors: ComponentConstructor[]
  ): World

  /**
   * 查询实体关联的组件构造函数-组件实例映射
   * @param entity 实体
   * @returns 组件构造函数-组件实例映射
   */
  public findEntityWithComponents(entity: Entity): ComponentMap

  /**
   * 查询组件构造函数关联的实体、组件构造函数-组件实例映射
   * @param constructors 组件构造函数
   * @returns [实体, 组件构造函数-组件实例映射]
   */
  public view(...constructors: ComponentConstructor[]): [Entity, ComponentMap][]

  /**
   * 新增系统
   * @param system 系统
   * @returns 世界实例
   */
  public addSystem(system: System): World

  /**
   * 移除系统
   * @param system 系统
   * @returns 世界实例
   */
  public removeSystem(system: System): World

  /**
   * 重置系统
   * @returns 世界实例
   */
  public resetSystem(): World
}
```

## Create

### createId 创建 id

> 通过 Generator 循环累加生成数字 id。

函数签名

```typescript
function* createId(): IterableIterator<number>
```

## Device

### getSystemInfo 获取系统信息

> 通过解析 navigator.userAgent 获取系统相关信息。

函数签名

```typescript
function getSystemInfo(): SystemInfo
```

返回值类型

```typescript
type SystemInfo = {
  /** 系统 */
  system: 'windows' | 'macos' | 'linux' | 'android' | 'ios'
  /** 系统版本 */
  systemVersion: string
}
```

### getBrowserInfo 获取浏览器信息

> 通过解析 navigator.userAgent 获取浏览器相关信息。

函数签名

```typescript
function getBrowserInfo(): BrowserInfo
```

返回值类型

```typescript
type BrowserInfo = {
  /** 浏览器内核 */
  engine: 'webkit' | 'gecko' | 'presto' | 'trident'
  /** 浏览器内核版本 */
  engineVersion: string
  /** 浏览器载体 */
  browser: 'chrome' | 'safari' | 'firefox' | 'opera' | 'edge' | 'ie'
  /** 浏览器载体版本 */
  browserVersion: string
  /** 浏览器外壳 */
  shell:
    | 'wechat'
    | 'qq'
    | 'uc'
    | '360'
    | '2345'
    | 'sougou'
    | 'liebao'
    | 'maxthon'
  /** 浏览器外壳版本 */
  shellVersion: string
}
```

### getDeviceInfo 获取设备信息

> 通过解析 navigator.userAgent 获取系统相关信息 + 浏览器相关信息。

函数签名

```typescript
function getDeviceInfo(): SystemInfo & BrowserInfo
```

返回值类型

- 参考 [getSystemInfo](/ecs-lite/api.html#getsysteminfo-获取系统信息)、[getBrowserInfo](/ecs-lite/api.html#getbrowserinfo-获取浏览器信息) 的返回值类型

### getDeviceSize 获取设备窗口尺寸

> 获取当前运行应用的浏览器视口尺寸及设备 dpr。

函数签名

```typescript
function getDeviceSize(): DeviceSize
```

返回值类型

```typescript
type DeviceSize = {
  /** dpr */
  ratio: number
  /** 像素比（宽/高） */
  ascept: number
  /** 视口宽度 */
  width: number
  /** 视口高度 */
  height: number
}
```

### isMobile 是否为移动端

> 通过系统信息判断是否运行在移动端上。

函数签名

```typescript
function isMobile(): boolean
```

## Is

### isTypeOf 是否为指定类型

> 判断入参的具体类型。

函数签名

```typescript
function isTypeOf(val: unknown): ParamType
```

返回值类型

```typescript
type IsType =
  | 'null'
  | 'undefined'
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'function'
  | 'generatorfunction'
  | 'asyncfunction'
  | 'array'
  | 'uint8array'
  | 'uint16array'
  | 'uint32array'
  | 'float32array'
  | 'float64array'
  | 'object'
  | 'reflect'
  | 'date'
  | 'formdata'
  | 'blob'
  | 'promise'
  | 'regexp'
  | 'set'
  | 'weakset'
  | 'map'
  | 'weakmap'
  | 'file'
```

### isString 是否为有效字符串

> 判断入参是否为非空字符串。

函数签名

```typescript
function isString(val: unknown): val is string
```

### isNumber 是否为有效数字

> 判断入参是否为非 NaN、Infinity、-Infinity 数字。

函数签名

```typescript
function isNumber(val: unknown): val is number
```

### isFunction 是否为函数

> 判断入参是否为函数。

函数签名

```typescript
function isFunction(val: unknown): val is (...rest: unknown[]) => void
```

### isObject 是否为普通对象

> 判断入参是否为普通对象。

函数签名

```typescript
function isObject(val: unknown): boolean
```

### isArray 是否为普通数组

> 判断入参是否为普通数组。

函数签名

```typescript
function isArray(val: unknown): val is unknown[]
```

### isDate 是否为日期对象

> 判断入参是否为日期对象。

函数签名

```typescript
function isDate(val: unknown): val is Date
```

### isRegExp 是否为正则表达式

> 判断入参是否为正则表达式。

函数签名

```typescript
function isRegExp(val: unknown): val is RegExp
```

### isFormData 是否为表单对象

> 判断入参是否为表单对象。

函数签名

```typescript
function isFormData(val: unknown): val is FormData
```

### isBlob 是否为 blob 对象

> 判断入参是否为 blob 对象。

函数签名

```typescript
function isBlob(val: unknown): val is Blob
```

### isPromise 是否为 promise 对象

> 判断入参是否为 promise 对象。

函数签名

```typescript
function isPromise(val: unknown): val is Promise<unknown>
```

### isFile 是否为文件对象

> 判断入参是否为文件对象。

函数签名

```typescript
function isFile(val: unknown): val is File
```

## Matrix

### matrixIdentity 标准化矩阵

> 返回标准化矩阵。

函数签名

```typescript
/**
 * @param row 矩阵行数
 * @returns 标准化矩阵
 */
function matrixIdentity(row: number): number[]
```

### matrixAdd 矩阵相加

> 返回计算后的矩阵。

函数签名

```typescript
/**
 * @param m1 矩阵1
 * @param m2 矩阵2
 * @returns 执行计算后的矩阵
 */
function matrixAdd(m1: number[], m2: number[]): number[]
```

### matrixSub 矩阵相减

> 返回计算后的矩阵。

函数签名

```typescript
/**
 * @param m1 矩阵1
 * @param m2 矩阵2
 * @returns 执行计算后的矩阵
 */
function matrixSub(m1: number[], m2: number[]): number[]
```

### matrixMultiply3d 矩阵相乘（图形学法）

> 返回计算后的矩阵。

函数签名

```typescript
/**
 * @param m1 矩阵1
 * @param m2 矩阵2
 * @returns 执行计算后的矩阵
 */
function matrixMultiply3d(m1: number[], m2: number[]): number[]
```

### matrixMultiply 矩阵相乘

> 返回计算后的矩阵。

函数签名

```typescript
/**
 * @param m1 矩阵1
 * @param m2 矩阵2
 * @param row1 矩阵1行数
 * @param row2 矩阵2行数
 * @returns 执行计算后的矩阵
 */
function matrixMultiply(
  m1: number[],
  m2: number[],
  row1?: number,
  row2?: number
): number[]
```

### matrixMultiplyScalar 矩阵与标量相乘

> 返回计算后的矩阵。

函数签名

```typescript
/**
 * @param m 矩阵
 * @param scalar 标量
 * @returns 执行计算后的矩阵
 */
function matrixMultiplyScalar(m: number[], scalar: number): number[]
```

### matrixMultiplyScalar 转置矩阵（图形学法）

> 返回计算后的矩阵。

函数签名

```typescript
/**
 * @param m 矩阵
 * @returns 执行计算后的矩阵
 */
function matrixTranspose3d(m: number[]): number[]
```

### matrixTranspose 转置矩阵

> 返回计算后的矩阵。

函数签名

```typescript
/**
 * @param m 矩阵
 * @param row 矩阵行数
 * @returns 执行计算后的矩阵
 */
function matrixTranspose(m: number[], row?: number): number[]
```

### matrixTranslate2d 平移矩阵（二维）

> 返回平移矩阵。

函数签名

```typescript
/**
 * @param x x 轴平移距离
 * @param y y 轴平移距离
 * @returns 平移矩阵
 */
function matrixTranslate2d(x: number, y: number): number[]
```

### matrixTranslate3d 平移矩阵（三维）

> 返回平移矩阵。

函数签名

```typescript
/**
 * @param x x 轴平移距离
 * @param y y 轴平移距离
 * @param z z 轴平移距离
 * @returns 平移矩阵
 */
function matrixTranslate3d(x: number, y: number, z: number): number[]
```

### matrixRotate2d 旋转矩阵（二维）

> 返回旋转矩阵。

函数签名

```typescript
/**
 * @param rad 旋转弧度
 * @returns 旋转矩阵
 */
function matrixRotate2d(rad: number): number[]
```

### matrixRotate3dX 绕 x 轴旋转矩阵（三维）

> 返回旋转矩阵。

函数签名

```typescript
/**
 * @param rad 旋转弧度
 * @returns 旋转矩阵
 */
function matrixRotate3dX(rad: number): number[]
```

### matrixRotate3dY 绕 y 轴旋转矩阵（三维）

> 返回旋转矩阵。

函数签名

```typescript
/**
 * @param rad 旋转弧度
 * @returns 旋转矩阵
 */
function matrixRotate3dY(rad: number): number[]
```

### matrixRotate3dZ 绕 z 轴旋转矩阵（三维）

> 返回旋转矩阵。

函数签名

```typescript
/**
 * @param rad 旋转弧度
 * @returns 旋转矩阵
 */
function matrixRotate3dZ(rad: number): number[]
```

### matrixScale2d 缩放矩阵（二维）

> 返回缩放矩阵。

函数签名

```typescript
/**
 * @param sx x轴缩放比例
 * @param sy y轴缩放比例
 * @returns 缩放矩阵
 */
function matrixScale2d(sx: number, sy: number): number[]
```

### matrixScale3d 缩放矩阵（三维）

> 返回缩放矩阵。

函数签名

```typescript
/**
 * @param sx x轴缩放比例
 * @param sy y轴缩放比例
 * @param sz z轴缩放比例
 * @returns 缩放矩阵
 */
function matrixScale3d(sx: number, sy: number, sz: number): number[]
```

### matrixOrthogonal3d 正交投影矩阵（三维）

> 返回正交投影矩阵。

函数签名

```typescript
/**
 * @param left 左边距
 * @param right 右边距
 * @param top 上边距
 * @param bottom 下边距
 * @param near 近平面
 * @param far 远平面
 * @returns 正交投影矩阵
 */
export function matrixOrthogonal3d(
  left: number,
  right: number,
  bottom: number,
  top: number,
  near: number,
  far: number
): number[]
```

## To

### toRad 角度转弧度

> 返回转换后的弧度。

函数签名

```typescript
/**
 * @param angle 角度
 * @returns 弧度
 */
function toRad(angle: number): number
```

### toAngle 弧度转角度

> 返回转换后的角度。

函数签名

```typescript
/**
 * @param rad 弧度
 * @returns 角度
 */
function toAngle(rad: number): number
```

## Vector

### Vector2 二维向量

> 继承向量抽类构建的二维向量类。

类签名

```typescript
class Vector2 extends Vector {
  /**
   * 1.初始化向量
   */
  constructor(public x: number = 0, public y: number = 0)

  /**
   * 2.归一化向量
   * @returns 归一化向量
   */
  public normalize(): Vector2

  /**
   * 3.向量相加
   * @param vec 向量
   * @returns this
   */
  public add(vec: Vector2)

  /**
   * 4.向量相减
   * @param vec 向量
   * @returns this
   */
  public sub(vec: Vector2)

  /**
   * 5.向量相乘
   * @param vec 向量
   * @returns this
   */
  public multiply(vec: Vector2)

  /**
   * 6.向量与标量相乘
   * @param scalar 标量
   * @returns this
   */
  public multiplyScalar(scalar: number)

  /**
   * 7.向量与标量相除
   * @param scalar 标量
   * @returns this
   */
  public divisionScalar(scalar: number)

  /**
   * 8.点乘
   * @param vec 向量
   * @returns 计算结果
   */
  public dot(vec: Vector2): number

  /**
   * 9.叉乘
   * @param vec 向量
   * @returns 计算结果
   */
  public cross(vec: Vector2): number

  /**
   * 10.距离
   * @param vec 向量
   * @returns 计算结果
   */
  public distance(vec: Vector2): number
}
```

### Vector3 三维向量

> 继承向量抽类构建的三维向量类。

类签名

```typescript
class Vector3 extends Vector {
  /**
   * 1.初始化向量
   */
  constructor(public x: number = 0, public y: number = 0, public z: number = 0)

  /**
   * 2.归一化向量
   * @returns 归一化向量
   */
  public normalize(): Vector3

  /**
   * 3.向量相加
   * @param vec 向量
   * @returns this
   */
  public add(vec: Vector3)

  /**
   * 4.向量相减
   * @param vec 向量
   * @returns this
   */
  public sub(vec: Vector3)

  /**
   * 5.向量相乘
   * @param vec 向量
   * @returns this
   */
  public multiply(vec: Vector3)

  /**
   * 6.向量与标量相乘
   * @param scalar 标量
   * @returns this
   */
  public multiplyScalar(scalar: number)

  /**
   * 7.向量与标量相除
   * @param scalar 标量
   * @returns this
   */
  public divisionScalar(scalar: number)

  /**
   * 8.点乘
   * @param vec 向量
   * @returns 计算结果
   */
  public dot(vec: Vector3): number

  /**
   * 9.叉乘
   * @param vec 向量
   * @returns 垂直于两个向量的第三向量
   */
  public cross(vec: Vector3): Vector3

  /**
   * 10.距离
   * - 目标向量到当前向量的距离
   * @param vec 向量
   * @returns 计算结果
   */
  public distance(vec: Vector3): number
}
```
