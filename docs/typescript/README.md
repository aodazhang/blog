---
lang: zh-CN
title: TypeScript 语法
sidebar: auto
---

## 1.数据类型

### 值类型

::: tip 提示

- 概念：对应 JavaScript 中的基本类型。**注意默认小写数据类型为 `TypeScript 类型`、大写数据类型为 `JavaScript 类型`**。
- `undefined` 和 `null` 的关系：
  - `undefined` 和 `null` 在 TypeScript 中是所有类型的子类型。
  - `null` 在 ES 标准中是 **引用类型**。

:::

```typescript
// 1.字符串 string
const str: string = 'abc'

// 2.数字 number
const num1: number = 6 // 十进制
const num2: number = 0b1010 // 二进制
const num3: number = 0o744 // 八进制
const num4: number = 0xf00d // 十六进制

// 3.布尔 boolean
const bool: boolean = true

// 4.符号 symbol (ES6)
const symb: symbol = Symbol('abc')

// 5.大整数 bigint (ES10)
const bigInt: bigint = 12n

// 6.未定义 undefined
const und: undefined = undefined

// 7.空值 null
const nul: null = null
```

### 引用类型

::: tip 提示

- 概念：元祖 Tuple 起源于函数式编程，是一个带有限定条件的数组；**可以对元祖进行越界操作，但元素类型必须符合限定条件**。

:::

```typescript
// 1.对象 object
const obj1: object = { a: '1' }
const obj2: object = [1, 2]
const obj3: object = ['a', 1]

// 2.数组 Array
const arr1: number[] = [1, 2]
const arr2: Array<number> = [3, 4]

// 3.只读数组 ReadonlyArray
const arr1: readonly string[] = ['1', '2']
const arr2: ReadonlyArray<string> = ['3', '4']

// 4.类数组 ArrayLikeObject
function arrayLikeObject() {
  // arguments
  arguments.length // 可以调用数组的 length 属性
  arguments.forEach // 不可以调用数组的 forEach 函数
  // htmlCollection
  let htmlCollection: HTMLCollection
}

// 5.元祖 Tuple
const tup: [string, number] = ['a', 1]
tup.push('true') // 可以对元祖push，但必须是元祖声明的类型
```

### 顶级类型

::: tip 提示

- `unknown` 和 `any` 的区别：
  - 相同点：值可以被任意修改。
  - 不同点：`any` 等价于 JavaScript 的变量类型； `unknown` 被确定是某个类型之前，不能进行实例化、getter、函数执行等操作。

:::

```typescript
// 1.任何 any
let an: any
an = '123'
an = 123 // 值可以被任意修改
an.test(1) // 函数执行不报错

// 2.未知 unknown
let un: unknown
un = '123'
un = 123 // 值可以被任意修改
un.test(1) // 函数执行报错
```

### 底部类型

::: tip 提示

- `never` 代表函数某个阶段永远不会执行，也不可能存在返回值。
- `void` 代表函数可以正常执行，仅没有返回值或不明确的返回值。

:::

```typescript
// 1.从不执行 never
function test1(): never {
  throw new Error() // 异常抛出，后续永远不会执行
}
function test2(): never {
  while (true) {} // 死循环，后续永远不会执行
}

// 2.空 void
function test3(): void {}
function test4(): void {
  return undefined
}
function test5(): void {
  return null
}
```

## 2.接口和类型定义

### interface 接口

::: tip 提示

- 概念：`interface` 针对对象的形状 (shape) 进行描述，也叫 duck typing (鸭子类型)。

:::

```typescript
// 1.接口
interface IPerson {
  name: string // 普通属性：属性必须存在
  age?: number // 可选属性：属性可以不存在
  readonly gender: 'male' | 'female' // 只读属性：只能在创建时被赋值，后续使用不得修改
  info: (message: string) => void // 函数属性
  [propName: string]: any // 索引签名属性
  new (): string // 实例化属性：构造函数返回一个字符串
}

const zxy: IPerson = {
  name: 'zxy',
  age: 18,
  gender: 'male',
  info(message) {},
  test: Symbol('a')
}
const zxyString = new zxy()

// 2.继承接口
// 单继承
interface ITimeMan extends IPerson {
  time1: number
}
// 多继承
interface ITimeWoman extends IPerson, ITimeMan {
  time2: number
}

const timeWoman: ITimeWoman = {
  name: 'a',
  age: 18,
  gender: 'male',
  info(message) {},
  test: Symbol('a'),
  time1: 1130, // 同时拥有 IPerson 和 ITimeMan 两个接口的属性
  time2: 1230
}
```

### type 类型定义

::: tip 提示

- 概念：类似 `interface`，区别在于扩展了 **简单类型、字面量枚举类型、可辨别类型定义、工具类型**。

:::

```typescript
// 1.类型定义
type TypeDef1 = {
  name: string
  age: number
}
type TypeDef2 = (x: number, y?: number) => number

// 2.字面量类型枚举
type TypeDef3 = 'top' | 'bottom' | 'left' | 'right'

// 3.可辨别类型定义：调用方可以根据 actions 的不同匹配不同的类型
type TypeDef4 =
  | {
      actions: 'get'
      name: string
      age: number
    }
  | {
      actions: 'post'
      name: string
      id: number
    }

// 4.工具类型：遍历 T 上的 key，将其转换为可选属性
type OptionalType<T> = { [K in keyof T]?: T[K] }
```

### 对比

|      类型      |                              定义种类                              | 扩展方式          | 重复声明合并 | 泛型 |
| :------------: | :----------------------------------------------------------------: | ----------------- | :----------: | :--: |
| interface 接口 |                         对象类型、函数类型                         | extends 继承      |      ✔️      |  ✔️  |
| type 类型定义  | 对象类型、函数类型、简单类型、字面量枚举类型、可辨别类型、工具类型 | \|、\& 多类型融合 |      ❌      |  ✔️  |

## 3.多类型融合

### **`|` 联合类型（或）**

::: tip 提示

- 概念：指定某个变量为多个类型其中之一。

:::

```typescript
let union: string | number = '1'
union = 1
```

联合类型的变量 ts 只会提示所有类型的公共属性，调用某个类型的特有属性时会报错。解决方法如下：

- **`as` 类型断言**

  ```typescript
  function testUnion(union: string | number) {
    // 1.类型断言：通过 as 断言为 string 类型，检测变量上是否存在 string 实例的属性
    if ((union as string).length) {
      // 断言为 string 类型
      ;(union as string).length
    } else {
      // 断言为 number 类型
      ;(union as number).toFixed(1)
    }
  }
  ```

- **`in` 类型存在**

  ```typescript
  function testUnion(
    union: { a: string; b: number } | { a: string; c: string[] }
  ) {
    if ('b' in union) {
      // 推导为接口1类型
      union.b.toFixed(1)
    } else {
      // 推导为接口2类型
      union.c.push('1')
    }
  }
  ```

- **`typeof` 和 `instanceof` 类型判断**

  ```typescript
  function testUnion1(union: string | number) {
    if (typeof union === 'string') {
      // 推导为 string 类型
      union.length
    } else {
      // 推导为 number 类型
      union.toFixed(1)
    }
  }

  function testUnion2(union: string | string[]) {
    if (union instanceof Array) {
      // 推导为 string[] 类型
      union.push('1')
    } else {
      // 推导为 string 类型
      union.charAt(1)
    }
  }
  ```

### `&` 交叉类型（且）

::: tip 提示

- 概念：指定某个变量为多个类型之和。

:::

```typescript
let cross: { a: string; b: number } & { a: string; c: string[] } = {
  // 同时拥有 a、b、c 属性
  a: '1',
  b: 2,
  c: ['1']
}
```

## 4.Function 函数

### 函数类型

::: tip 提示

- 概念：函数类型的重点在于定义输入和输出的类型。

:::

```typescript
// 1.函数声明
// a: number = 10 默认参数
// b?: number 可选参数
const fn1 = (a: number = 10, b?: number): number => {
  return a + (b ? b : 0)
}

// 2.入参收敛
// ...rest: number[] // 收敛剩余参数到数组rest中
const fn2 = (a: number, ...rest: number[]): void => {}

// 3.接口声明函数
interface IFn3 {
  (a: string, b?: string): string
}
const fn3: IFn3 = (a = '1', b = '2') => {
  return `${a}${b}`
}
```

### 函数重载

::: tip 提示

- 概念：不同入参可以自动匹配不同的函数类型，同一个函数具有多种参数列表。

:::

```typescript
// 返回值类型：接口声明
interface INum {
  top: number
  bottom: number
  left: number
  right: number
}
// 重载类型：函数在不同输入状态下的表现
function fn4(all: number): INum
function fn4(top: number, bottom: number): INum
function fn4(top: number, bottom: number, left: number): INum
function fn4(top: number, bottom: number, left: number, right: number): INum
function fn4(a: number, b?: number, c?: number, d?: number) {
  !b && (b = a)
  !c && (c = a)
  !d && (d = a)
  return { top: a, bottom: b, left: c, right: d }
}
// 入参数量不同触发不同的函数类型
fn4(1)
fn4(1, 2)
fn4(1, 2, 3)
fn4(1, 2, 3, 4)
```

## 5.Class 类

### 普通类

::: tip 提示

- 类 `Class`：定义了一切事物的抽象特点。
- 对象 `Object`：类的实例。
- 面向对象 OOP：
  - **封装 Encapsulation**：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象。
  - **继承 Inheritance**：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性。
  - **多态 Polymorphism**：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。

:::

```typescript
// 一.父类
class Car {
  // 类静态属性
  static type: string

  // 类实例属性
  public a: string = 'a' // 公共属性：可被外部、 内部、子类访问（不使用修饰符默认 public）
  protected b: number = 1 // 保护属性：可被内部、子类访问
  private c: boolean = true // 私有属性：可被内部访问
  public d!: string // 非空属性：默认状态下 ts 要求类实例属性都必须有初始值，可通过!强制告诉编译器该值不为空
  readonly e: string = 'e' // 只读属性：只能读取不能修改

  // 类构造函数
  constructor(d = '父类实例化属性') {
    this.d = d
  }

  public fn1() {}
  protected fn2() {}
  private fn3() {}
}

// 1.访问类的静态属性
Car.type
// 2.外部实例可以访问 public 属性
const car = new Car()
car.fn1()
car.a

// 二.子类
// 子类可以访问 public + protected 属性
class BBA extends Car {
  constructor(d: string) {
    super(d)
    this.d = '子类实例化属性'
  }

  // 子类可以覆写父类方法
  fn1() {
    console.log(this.a, this.b)
  }
}
```

### abstract 抽象类

::: tip 提示

- 如果多个类存在相同的属性或方法，可以使用抽象类将其抽象到公共类中。
- 抽象类不能被实例化，只能被继承；抽象类中可以定义抽象属性和方法，但是不能被实现。
- `interface` 和 `abstract` 的区别：
  - `interface` 主要用于 **定义对象** 公共的属性和方法。
  - `abstract` 主要用于 **定义类** 公共的属性和方法。

:::

```typescript
// 抽象类：抽象类只能被继承，不能直接实例化
abstract class Test {
  // 定义抽象属性：注意抽象属性是不可以被实现的
  abstract getTest(): string
  // 定义具体属性
  width: number

  getType() {
    return 'test'
  }
}

// 子类需要继承抽象类
class Test1 extends Test {
  // 需要实现抽象类中定义的抽象属性
  getTest() {
    return 'test'
  }
}
```

### implements 实现

::: tip 提示

- 概念：解耦类继承的一种机制。OOP 中类只能继承于另一个类，不同类之间共同的特性无法继承，这部分特性可以通过 `接口` + `implements` 实现。

:::

```typescript
// 1.定义 interface 接口
interface IRadio {
  switchRadio: (radio: boolean) => void
}

// 2.类 implements 实现
class Phone implements IRadio {
  switchRadio(radio: boolean) {}
}
class Tv implements IRadio {
  switchRadio(radio: boolean) {}
}
```

## 6.Enum 枚举

### 普通枚举

::: tip 提示

- 概念：一种映射机制，**只有枚举值为数字的才能进行反向枚举**。

:::

```typescript
/**
 * 1.数字枚举：同名枚举可以合并
 * {
 *   0: "Up",
 *   1: "Down",
 *   2: "Left",
 *   3: "Right",
 *   Up: 0,
 *   Down: 1,
 *   Left: 2,
 *   Right: 3
 * }
 */
enum ENUM1 {
  Up,
  Down,
  Left,
  Right
}
enum ENUM1 {
  Center = 4
}
// 正向枚举
ENUM1.Up // -> 0
ENUM1.Down // -> 1
ENUM1.Left // -> 2
ENUM1.Right // -> 3
ENUM1.Center // -> 4
// 反向枚举
ENUM1[0] // -> 'Up'
ENUM1[1] // -> 'Down'
ENUM1[2] // -> 'Left'
ENUM1[3] // -> 'Right'
ENUM1[4] // -> 'Center'

/**
 * 2.指定初始值枚举
 * {
 *   10: "Up",
 *   11: "Down",
 *   12: "Left",
 *   13: "Right",
 *   Up: 10,
 *   Down: 11,
 *   Left: 12,
 *   Right: 13
 * }
 */
enum ENUM2 {
  Up = 10,
  Down,
  Left,
  Right
}
// 正向枚举
ENUM2.Up // -> 10
ENUM2.Down // -> 11
ENUM2.Left // -> 12
ENUM2.Right // -> 13
// 反向枚举
ENUM2[10] // -> 'Up'
ENUM2[11] // -> 'Down'
ENUM2[12] // -> 'Left'
ENUM2[13] // -> 'Right'

/**
 * 3.字符串枚举
 * {
 *   Up: "a",
 *   Down: "b",
 *   Left: "c",
 *   Right: "d"
 * }
 */
enum ENUM3 {
  Up = 'a',
  Down = 'b',
  Left = 'c',
  Right = 'd'
}
// 正向枚举（无数字值不能反向枚举）
ENUM3.Up // -> 'a'
ENUM3.Down // -> 'b'
ENUM3.Left // -> 'c'
ENUM3.Right // -> 'd'

/**
 * 4.异构枚举
 * {
 *   1: "Up",
 *   2: "Left",
 *   Up: 1,
 *   Down: "a",
 *   Left: 2,
 *   Right: "b"
 * }
 */
enum ENUM4 {
  Up = 1,
  Down = 'a',
  Left = 2,
  Right = 'b'
}
// 正向枚举
ENUM4.Up // -> 1
ENUM4.Down // -> 'a'
ENUM4.Left // -> 2
ENUM4.Right // -> 'b'
// 反向枚举
ENUM4[1] // -> 'Up'
ENUM4[2] // -> 'Left'
```

### 常量枚举

::: tip 提示

- 概念：常量枚举不生成 js 代码而是在调用处直接编译值，理论上性能更好，但 **不能使用反向枚举**。

:::

```typescript
const enum ENUM5 {
  Up,
  Down,
  Left,
  Right
}

// 不生成 js 代码，直接编译值到调用处
ENUM5.Up // -> 0
```

## 7.Generics 泛型

### 普通泛型

::: tip 提示

- 概念：定义函数、接口、类时不定义具体类型，使用时在动态决定类型的一种容器机制。

:::

- 函数泛型

  ```typescript
  // 1.单一泛型
  function gen1<T>(val: T): T {
    return val
  }
  function gen2<T>(arr: T[]): number {
    return arr.length
  }

  // 2.多个泛型
  function gen3<T, U>(tuple: [T, U]): number {
    return tuple.length
  }
  ```

- 接口泛型

  ```typescript
  interface IGen1<T> {
    (val: T): T
  }

  // 作用于函数
  const igen1: IGen1<number> = val => val
  ```

- 类泛型

  ```typescript
  class Stack<T> {
    public arr: T[] = []

    public push(item: T) {
      this.arr.push(item)
    }

    public pop() {
      this.arr.pop()
    }
  }
  ```

### 约束泛型

::: tip 提示

- 概念：收敛泛型可能传入的类型。
  - `extends`：约束于指定的类型。
  - `keyof`：获取 **接口/类型定义的 key 集合** 的联合类型。
  - `is`：判断值是否为指定类型。

:::

```typescript
// 1.extends 约束指定类型：T 只能是 string 或 number
function gen4<T extends string | number>(val: T): T {
  return val
}
gen4(1)
gen4('a')

// 2.keyof 获取值为对象 key 的联合类型：T 只能是 IGen5、U 只能是 IGen5 的 key
interface IGen5 {
  name: string
  age: number
}
function gen5<T extends IGen5, U extends keyof T>(obj: T, key: U): T[U] {
  // U: 'name' | 'age'
  return obj[key]
}
gen5({ name: 'zxy', age: 18 }, 'age')

// 3.is 判断值是否为指定类型，主要是会带有特定的类型守卫功能
function isString(val: unknow): val is string {
  return typeof val === 'string'
}
function genString(val: number | string) {
  if (isString(val)) {
    // is 关键字可以在这里将 val 限定为 string，number 则不行
    console.log(val.length)
  }
}
```

### 多类型融合泛型

::: tip 提示

- 概念：可以约束泛型为多类型的融合。

:::

```typescript
interface IGenA {
  name: string
}
interface IGenB {
  age: number
}

// 1.交叉类型：且
function gen6<T extends IGenA & IGenB>(val: T): T {
  return val
}
gen6({ name: 'zxy', age: 18 })

// 2.联合类型：或
function gen7<T extends IGenA | IGenB>(val: T): T {
  return val
}
gen7({ name: 'zxy' })
gen7({ age: 18 })
```

### 实例化泛型

::: tip 提示

- 概念：指定泛型为某个类的实例。

:::

```typescript
function genNew<T>(val: { new (): T }): T {
  return new val()
}

// 返回类的实例
genNew(Date)
```

## 8.Decorator 装饰器

::: danger 警告
截止目前 Decorator 装饰器、Metadata 元数据的提案还在不停变化，暂无法保证该语法的稳定性，使用需谨慎。
:::

TypeScript 使用装饰器需要开启对应配置项：

- tsconfig.json

  ```json
  {
    "compilerOptions": {
      "experimentalDecorators": true, // 开启装饰器语法
      "emitDecoratorMetadata": true // 开启装饰器元信息
    }
  }
  ```

### 类装饰器

::: tip 提示

- 概念：**装饰器本质是一个函数，通过 `@` 符号来使用**，通过在原有代码外层包装了一层处理逻辑实现功能，不影响类本身的方法和属性。
- 执行时机：类定义立即执行、类实例化不会再次执行。
- 执行顺序：不同类装饰器从上到下、同类装饰器从下到上。

:::

```typescript
/**
 * 1.类装饰器参数
 * - constructor：类的构造函数
 */
function classDecorator(constructor: any): void {
  // 为装饰的类增加实例方法
  constructor.prototype.getName = () => {}
}

// 修饰类
@classDecorator
class Test {}

/**
 * 2.类装饰器执行时机
 */
@classDecorator
class Test {} // 类定义立即执行
const test = new Test() // 类实例化不会再次执行

/**
 * 3.类装饰器执行顺序
 */
@classDecorator2
@classDecorator1 // classDecorator1 先于 classDecorator2 执行
class Test1 {} // Test1 先于 Test2 执行

@classDecorator2
@classDecorator1
class Test2 {}
```

### 方法装饰器

::: tip 提示

- 执行时机：方法定义立即执行、调用方法不会再次执行。
- 执行顺序：不同方法装饰器从上到下、同方法装饰器从下到上。

:::

```typescript
/**
 * 1.方法装饰器参数
 * - target：实例方法对应类的 prototype、静态方法对应类的构造函数
 * - key：方法名
 * - descriptor：方法的属性描述符
 *  - value：属性值，这里就是方法本身
 *  - writable：是否可修改
 *  - enumerable：是否可枚举，例如 for in
 *  - configurable：是否可配置，例如 delete
 */
function methodsDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
): void {
  descriptor.writable = false // 设置修饰方法不能被重写
}

class Test {
  // 修饰实例方法
  @methodsDecorator
  getName() {}

  // 修饰静态方法
  @methodsDecorator
  static getAge() {}
}

const test = new Test('zhang')
test.getName = () => {} // 设置过属性描述符 descriptor.writable 后外部无法修改实例方法

/**
 * 2.方法装饰器执行时机
 */
class Test {
  @methodsDecorator
  getName() {} // 方法定义立即执行
}
const test = new Test()
test.getName() // 调用方法不会再次执行

/**
 * 3.方法装饰器执行顺序
 */
class Test {
  @methodsDecorator2
  @methodsDecorator1 // classDecorator1 先于 classDecorator2 执行
  getName1() {} // getName1 先于 getName2 执行

  @methodsDecorator2
  @methodsDecorator1
  getName2() {}
}
```

### 属性装饰器

::: tip 提示

- 概念：属性装饰器无法访问到类实例上的属性，只能访问到类原型上的属性。
- 执行时机：属性定义立即执行、访问属性不会再次执行。
- 执行顺序：不同属性装饰器从上到下、同属性装饰器从下到上。

:::

```typescript
/**
 * 1.属性装饰器参数
 * - target：类的 prototype
 * - key：属性名
 */
function propertyDecorator(target: any, key: string): any | void {
  /**
   * 修改原型属性
   * 注意：这种方式不能修改 Test 实例的 name，因为 target[key] 访问的是 Test.prototype[key]，两者不一样
   */
  target[key] = 'yu'
  /**
   * 属性装饰器可以返回一个 descriptor 属性描述符
   *  - value：属性值
   *  - writable：是否可修改
   *  - enumerable：是否可枚举，例如 for in
   *  - configurable：是否可配置，例如 delete
   */
  const descriptor: PropertyDescriptor = {
    writable: false
  }
  return descriptor
}

class Test {
  // 修饰实例属性
  @propertyDecorator
  public name: string = 'zhang'
}

const test = new Test()
test.name = 'xin' // 设置过属性描述符 descriptor.writable 后外部无法修改实例属性：Cannot assign to read only property 'name' of object '#<Test>'

/**
 * 2.属性装饰器执行时机
 */
class Test {
  @propertyDecorator
  public name: string = 'zhang' // 属性定义立即执行
}
const test = new Test()
test.name // 访问属性不会再次执行

/**
 * 3.属性装饰器执行顺序
 */
class Test {
  @propertyDecorator2
  @propertyDecorator1 // propertyDecorator1 先于 propertyDecorator2 执行
  public name: string = 'zhang' // name 先于 age 执行

  @propertyDecorator2
  @propertyDecorator1
  private age: number = 18
}
```

### 访问器装饰器

::: tip 提示

- 概念：TypeScript 规定 `get`、`set` 上只能使用一个装饰器，如果同时使用会报错。
- 执行时机：访问器定义立即执行、调用访问器不会再次执行。
- 执行顺序：不同访问器装饰器从上到下。

:::

```typescript
/**
 * 1.访问器装饰器参数
 * - target：类的 prototype
 * - key：属性名
 * - descriptor：属性描述符
 *  - get：访问器 get 函数
 *  - set：访问器 set 函数
 *  - enumerable：是否可枚举，例如 for in
 *  - configurable：是否可配置，例如 delete
 */
function visitDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // 注意 writable 最好用于 getter，在 setter 设置会报错
  descriptor.writable = false
}

class Test {
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  // 修饰访问器
  @visitDecorator
  get name() {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }
}

const test = new Test('zhang')
test.name = 'xin' // 设置过属性描述符 descriptor.writable 后外部无法修改实例属性

/**
 * 2.访问器装饰器执行时机
 */
class Test {
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  @visitDecorator // 访问器定义立即执行
  get name() {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }
}
const test = new Test()
test.name // 调用访问器不会再次执行
```

### 函数参数装饰器

::: tip 提示

- 概念：TypeScript 规定一个函数参数只能使用一个函数参数装饰器。
- 执行时机：函数参数定义立即执行、调用函数不会再次执行。
- 执行顺序：不同函数参数装饰器从上到下。

:::

```typescript
/**
 * 1.函数参数装饰器参数
 * - target：函数所属类的 prototype
 * - key：函数名
 * - paramIndex：参数所属位置，例如 0、1
 */
function paramsDecorator(target: any, key: string, paramIndex: number): any {}

class Test {
  getInfo(
    // 修饰函数参数，对应 paramIndex 0
    @paramsDecorator name: string,
    // 修饰函数参数，对应 paramIndex 1
    @paramsDecorator age: number
  ) {}
}
```

### reflect-metadata 元数据

::: tip 提示

- 概念：在类或类属性上存储一些元数据（额外的数据），方便后续利用反射获取数据。TypeScript 中经常与 [Decorators 装饰器](/typescript/#_8-decorators-装饰器) 联合使用，可访问 [reflect-metadata](https://github.com/rbuckton/reflect-metadata) 查看更多。
- 作用：为 `Reflect` 扩展元数据相关的静态方法。

:::

#### 安装

```shell
npm i reflect-metadata -S
```

#### 常用 API

```typescript
import 'reflect-metadata'

// 1-1.增、改：在当前类或类属性上定义元数据
Reflect.defineMetadata(metadataKey, metadataValue, target)
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)
// 1-2.增、改：在当前类、方法、属性上定义元数据（装饰器方式）
@Reflect.metadata(metadataKey, metadataValue)
class Test {
  @Reflect.metadata(metadataKey, metadataValue)
  getName() {}
}

// 2-1.查：获取当前类或类属性（含原型）的元数据 value
const result = Reflect.getMetadata(metadataKey, target)
const result = Reflect.getMetadata(metadataKey, target, propertyKey)
// 2-2.查：获取当前类或类属性本身（不含原型）的元数据 value
const result = Reflect.getOwnMetadata(metadataKey, target)
const result = Reflect.getOwnMetadata(metadataKey, target, propertyKey)
// 2-3.查：获取当前类或类属性（含原型）的元数据 key
const result = Reflect.getMetadataKeys(target)
const result = Reflect.getMetadataKeys(target, propertyKey)
// 2-4.查：获取当前类或类属性本身（不含原型）的元数据 key
const result = Reflect.getOwnMetadataKeys(target)
const result = Reflect.getOwnMetadataKeys(target, propertyKey)

// 3.删：删除当前类或类属性指定 key 的元数据
const result = Reflect.deleteMetadata(metadataKey, target)
const result = Reflect.deleteMetadata(metadataKey, target, propertyKey)

// 4-1.判断：当前类或类属性（含原型）是否存在指定 key 的元数据
const result = Reflect.hasMetadata(metadataKey, target)
const result = Reflect.hasMetadata(metadataKey, target, propertyKey)
// 4-2.判断：当前类或类属性本身（不含原型）是否存在指定 key 的元数据
const result = Reflect.hasOwnMetadata(metadataKey, target)
const result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey)
```

#### 基础使用

```typescript
import 'reflect-metadata'

/**
 * 1.对象
 */
const user = { name: 'zhang' }
// 定义元数据：key：'111'、value：'test1'、target：user
Reflect.defineMetadata('111', 'test1', user)
// 获取元数据：key：'111'、target：user
Reflect.getMetadata('111', user) // -> 'test1'
// 普通打印
console.log(user) // -> { name: 'zhang' }

/**
 * 2.类
 */
// 定义元数据：key：'222'、value：'test2'
@Reflect.metadata('222', 'test2')
class User {
  name = 'zhang'
}
// 获取元数据：key：'222'、target：User
Reflect.getMetadata('222', User) // -> 'test2'

/**
 * 3.类属性
 */
class User {
  // 定义元数据：key：'333'、value：'test3'
  @Reflect.metadata('333', 'test3')
  name = 'zhang'
}
// 获取元数据：key：'333'、target：User.prototype、targetProperty：'name'
Reflect.getMetadata('333', User.prototype, 'name') // -> 'test3'

/**
 * 4.类方法
 */
class User {
  // 定义元数据：key：'444'、value：'test4'
  @Reflect.metadata('444', 'test4')
  getName() {}
}
// 获取元数据：key：'444'、target：User.prototype、targetProperty：'getName'
Reflect.getMetadata('data', User.prototype, 'getName') // -> 'test4'
```

#### 结合 Decorator 实现后端接口路由绑定功能

```typescript
import 'reflect-metadata'
import { BodyRequest, RequestHandler, Response, Router } from 'express'

// 实例化 express 路由
const router = new Router()

/**
 * 1.方法装饰器
 * - 作用：通过工厂模式定义 http 方法和请求路径
 */
function getRequestDecorator(method: 'get' | 'post') {
  return function (path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      // 将 http 方法和请求路径通过装饰器绑定到类函数的元数据中
      Reflect.defineMetadata('method', method, target, key)
      Reflect.defineMetadata('path', path, target, key)
    }
  }
}
export const Get = getRequestDecorator('get')
export const Post = getRequestDecorator('post')

/**
 * 2.类装饰器
 * - 作用：获取类中所有绑定的请求路径、http方法、类函数名，自动绑定路由
 */
export function Controller(rootPath: string) {
  return function (constructor: any) {
    const prototype = constructor.prototype
    // 遍历类原型上的 key 获取方法名
    for (let key in prototype) {
      // 1.获取方法上绑定的元数据：请求路径
      const path = Reflect.getMetadata('path', prototype, key)
      // 2.获取方法上绑定的元数据：http方法
      const method = Reflect.getMetadata('method', prototype, key)
      // 3.获取方法
      const handler = prototype[key]
      // 4.部署路由：若请求路径、http方法都存在，则自动绑定express路由
      if (path && method) {
        const fullPath = rootPath ? `${rootPath}${path}` : path
        router[method](fullPath, handler)
      }
    }
  }
}

/**
 * 3.控制器绑定类装饰器、方法装饰器
 */
@Controller('/user')
export class UserController {
  @Get('/list')
  findAll(req: BodyRequest, res: Response): void {
    res.json({
      code: 200,
      message: '成功',
      data: [
        { id: 1, name: '小明', desc: '描述1' },
        { id: 2, name: '小凯', desc: '描述2' },
        { id: 3, name: '小孙', desc: '描述3' }
      ]
    })
  }
}
```

### 对比

|     装饰器     | 多重修饰 |    执行时机    | 执行次数 |                执行顺序                |
| :------------: | :------: | :------------: | :------: | :------------------------------------: |
|    类装饰器    |   允许   |    类定义时    |    1     |   不同类：上->下 <br /> 同类：下->上   |
|   方法装饰器   |   允许   |   方法定义时   |    1     | 不同方法：上->下 <br /> 同方法：下->上 |
|   属性装饰器   |   允许   |   属性定义时   |    1     | 不同属性：上->下 <br /> 同属性：下->上 |
|  访问器装饰器  |  不允许  |  访问器定义时  |    1     |           不同访问器：上->下           |
| 函数参数装饰器 |  不允许  | 函数参数定义时 |    1     |          不同函数参数：上->下          |

**同一个类不同装饰器执行顺序：**

- 函数参数装饰器
- 属性装饰器、访问器装饰器、方法装饰器（谁在上谁先执行，类应按照属性-访问器-方法顺序定义）
- 类装饰器

## 9.工具类型

### 系统工具类型

::: tip 提示

- 概念：TypeScript 自带的实用工具类型。

:::

```typescript
interface IPerson {
  name: string
  age?: number
  address?: string
}

// 1.Partial<Type>：转换接口属性为可选来构造一个新类型
type IPartial = Partial<IPerson> // -> { name?:string; age?:number; address?: string }

// 2.Required<Type>：转换接口属性为必填来构造一个新类型
type IRequired = Required<IPerson> // -> { name:string; age:number; address: string }

// 3.Pick<Type, Keys>：挑选接口某几个属性来构造一个新类型
type IPick = Pick<IPerson, 'age' | 'address'> // -> { age?:number; address?: string }

// 4.Omit<Type, Keys>：移除接口某几个属性来构造一个新类型
type IOmit = Omit<IPerson, 'name'> // -> { age?:number; address?: string }

// 5.NonNullable：移除 null、undefined来构造一个新类型
type INonNullable = NonNullable<string | number | undefined | null> // -> string | number

// 6.Extract<UnionType, ExtractedMembers>：通过两个类型的交集来构造一个新类型
type IExtract = Extract<'1' | '2' | '3', '1' | '2' | '4'> // -> '1' | '2'

// 7.Exclude<UnionType, ExcludedMembers>：通过 ExcludedMembers 的补集来构造一个新类型
type IExclude = Exclude<'1' | '2' | '3', '1'> // -> '2' | '3'
```

### 自定义工具类型

- 属性转换：`?` 可选、`-?` 必填、`readonly` 只读、`-readonly` 移除只读。

  ```typescript
  // 1.泛型属性 -> 必填 -?
  type ZxyTool1<T> = { [K in keyof T]-?: T[K] }

  // 2.泛型属性 -> 可选 ?
  type ZxyTool2<T> = { [K in keyof T]?: T[K] }

  // 3.泛型属性 -> 只读 readonly
  type ZxyTool3<T> = { readonly [K in keyof T]: T[K] }

  // 4.泛型属性 -> 移除只读 -readonly
  type ZxyTool4<T> = { -readonly [K in keyof T]: T[K] }

  // 5.泛型属性 -> 深度可选
  type ZxyTool5<T> = {
    [K in keyof T]?: T[K] extends object ? ZxyTool5<T[K]> : T[K]
  }

  // 使用 泛型属性深度可选
  interface ITest {
    name: string
    readonly age: number
    from?: string
    info: {
      farther: string
      mother: string
    }
  }
  type D = ZxyTool5<ITest>
  ```

- 条件判断：`类型 extends 条件 ? 类型1 : 类型2`

  ```typescript
  // 1.函数返回值条件判断
  function tj<T extends boolean>(val: T): T extends true ? string : number

  // 2.获取接口中的函数属性名称
  type FunctionName<T> = {
    // 遍历 T 的 key，对 T 的 value T[K] 做判断，属于 Function 的赋 key，其他的赋 never
    [K in keyof T]: T[K] extends Function ? K : never
  }[keyof T] // 使用 [keyof T] 作为 key 依次取出新 interface 的 value，由于 never 不会返回任何类型所以只返回了 'info'

  interface IMap {
    name: string
    age: number
    info(msg: string): void
  }
  type R = FunctionName<IMap> // -> 'info'
  ```

- 推导：`类型<infer 推导类型结果> `

  ```typescript
  // 1.推导数组中元素类型
  type ElementOf<T> = T extends Array<infer E> ? E : never

  type IMapE = ElementOf<[string, number]> // -> string | number
  ```

## 10.d.ts 声明文件

::: tip 提示

- 概念：配合 `declare` 用于声明全局类型的文件，不会被 tsc 编译且不需在项目中引用，可参考 [微软官方声明文件库](https://github.com/DefinitelyTyped/DefinitelyTyped/)。

:::

```typescript
/**
 * 定义全局关键字：declare
 * 变量关键字：var、const、let
 * 函数关键字：function
 * 对象关键字：namespace
 */

// 直接使用会报错
TestFn('#foo')

// 通过 declare 来全局声明一个函数变量类型，避免 ts 报错
declare function TestFn(val: string): void

// 1.定义全局变量
declare var $: (func: () => void) => void

// 2.使用全局函数实现重载：函数重载，一个函数可以有多种形式，定义一个全局函数的多个声明
interface JqueryInstance {
  html: (html: string) => JqueryInstance
}
declare function $(func: () => void): void
declare function $(selector: string): JqueryInstance

// 3.使用 interface 实现函数重载
interface JQuery {
  (func: () => void): void // 本身是函数，参数也是函数
  (sel: string): JqueryInstance // 本身是函数，参数是字符串
}
interface JqueryInstance {
  html: (html: string) => JqueryInstance
}
declare var $: JQuery

// 4.使用 namespace 实现函数重载
// 对对象进行类型定义、对类进行类型定义、namespace 的嵌套
interface JqueryInstance {
  html: (html: string) => JqueryInstance
}
declare function $(func: () => void): void
declare function $(sel: string): JqueryInstance
// $ 定义为命名空间：这里 namespace 就是充当一个属性定义的功能
declare namespace $ {
  // fn 定义为命名空间
  namespace fn {
    // init 定义为 class，可以执行构造函数
    class init {}
  }
}
```
