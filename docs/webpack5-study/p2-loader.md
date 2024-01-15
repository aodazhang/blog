---
lang: zh-CN
title: 加更2：自定义 loader
# sidebar: auto
---

## 烦人的 console.log

相信每个前端使用 chrome 开发者工具时都见到过这样的输出：

![截屏2023-01-05 12.36.03](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051236744.png)

如果是开发环境那很正常，每个前端都会利用 `console.log` 调试代码，但是在生产环境输出调试信息就存在严重的安全隐患了。在 [生产环境移除调试代码](/webpack5-study/development-production.html#生产环境移除调试代码) 中我们提到可通过 terser-webpack-plugin 删除调试代码，本节我们将手写一个可以删除 `console`、 `debugger` 的 webpack loader，来帮助你拓宽思路。

## Babel 是如何编译代码的？

在开始编写 loader 前，有必要介绍一下 [babel](https://www.babeljs.cn/docs/) 是如何编译代码的。严格来说 babel 是一个转译器，作用是将原始 js 代码转换成目标环境需要的 js 代码：

> 编译器（Compiler）是指从高级语言到低级语言的转换工具；从高级语言到高级语言的转换工具被称为转换编译器，简称转译器 (Transpiler)。
>
> - 高级语言：有很多用于描述逻辑的语言特性，比如分支、循环、函数、面向对象等，接近人的思维，可以让开发者快速的通过它来表达各种逻辑。例如 JavaScript、Python 等。
> - 低级语言：与硬件和执行细节有关，会操作寄存器、内存，具体做内存与寄存器之间的复制，需要开发者理解熟悉计算机的工作原理，熟悉具体的执行细节。例如汇编语言、机器语言等。

babel 的编译流程大体上分为三个阶段：

![截屏2023-01-05 11.11.20](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051123740.png)

1. **parse**：将源代码按照一定规则转换为 AST 抽象语法树。
2. **transform**：遍历 AST，调用各种 transform 插件对 AST 进行增删改查。
3. **generate**：将 AST 按照一定规则转换为目标代码，并生成 source map。

### AST

> AST 全称是 **Abstract Syntax Tree**，中文为抽象语法树，将我们所写的代码转换为机器能识别的一种树形结构。其本身是由一堆节点 Node 组成，每个节点都表示源代码中的一种结构。不同结构用类型 Type 来区分，常见的类型有：Identifier 标识符，Expression 表达式，VariableDeclaration 变量定义，FunctionDeclaration 函数定义等。

推荐一个非常实用的工具 [AST Explorer](https://astexplorer.net/)，AST 中包含非常多的节点类型，全部记住并不现实，对此你只需要学会查询即可：

![WX20230105-141918](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051419907.png)

### parse

parse 阶段分为词法分析、语法分析两个步骤。例如下面这段代码：

```javascript
let name = 'guang'
```

首先代码会被拆分成不能细分的单词（token），也就是 `let`、 `name`、 `=`、 `'guang'` ，这个按照单词的构成规则来拆分字符串的过程是**词法分析**。

然后对单词（token）进行递归的组装生成 AST，这个过程是**语法分析**。

![截屏2023-01-05 11.33.54](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051134112.png)

### transform

transform 阶段主要是对 AST 执行遍历，遍历到不同的 AST 节点时会调用相应的 visitor 函数对节点进行增删改查。

![截屏2023-01-05 11.38.21](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051138965.png)

### generate

generate 阶段会根据 AST 生成目标代码字符串，同时生成 source map，不同的 AST 对应的不同结构的字符串。

![截屏2023-01-05 12.32.40](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051232765.png)

### 扩展

babel 本身是一个复杂的工具体系，限于篇幅这里只会讲解开发 loader 需要用到的第三方库和 API，如果你对这方面相关的知识很感兴趣，推荐你阅读 [Babel 插件通关秘籍](https://juejin.cn/book/6946117847848321055)。

## 手写 unconsole-loader

在 [使用 Babel 编译](/webpack5-study/compile-with-babel.html) 中我们提到 webpack 是通过 babel-loader 桥接到 babel 工具链处理 js 的，因此只要是涉及 js 的问题本质上可以通过增加一个 loader 来解决。

### webpack loader

webpack 中的 loader 本质是一个函数：

```javascript
module.exports = function (source) {
  // do something
  const target = fn(source)
  return target
}
```

这里需要解释几点：

1. loader 函数不能是箭头函数，因为该函数会被 webpack 调用，内部 `this` 指向会发生变化。
2. `source` 代表对应文件的源代码输入，`return target` 代表对应文件的目标代码输出。
3. 此例 loader 写法代表 I/O 操作是同步执行。

### 需求分析

我们希望实现的功能如下：

- 打包时自动删除所有 `console`、`debugger` 相关的调试代码

- 某些特殊情况下，可以通过关键字来保留某行 `console` 代码，类似 [eslint 禁用规则](https://zh-hans.eslint.org/docs/latest/user-guide/configuring/rules#-3)

  ```javascript
  /* unconsole-disable-next-line */
  console.log('test') // 不会被删除
  ```

分析上面功能，结合之前对于 webpack 配置与 babel 编译流程的学习，给出一个实现思路：

1. 创建一个自定义 loader，让其先于 babel-loader 处理 js 文件。
2. 在 loader 内部封装 babel 编译流程，在 transform 阶段识别 AST 中的 `console`、`debugger` 节点。
3. `debugger` 节点可直接删除；`console` 节点需要判断是否存在注释节点且包含 unconsole-disable-next-line 字段，如果满足上述条件则保留，不满足则删除。

### babel 快速入门

使用 babel 编译流程需要安装下面三个依赖：

```shell
npm i @babel/parser @babel/traverse @babel/generator -D
```

| 依赖             | 版本     | 作用                                                                                                                              |
| :--------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| @babel/parser    | ^7.20.7  | 源代码解析为 AST，对应 [parse 阶段](/webpack5-study/p2-loader.html#parse)                                                         |
| @babel/traverse  | ^7.20.12 | 可配置 visitor 函数增删改查 AST，babel 在遍历 AST 时会回调该函数，对应 [transform 阶段](/webpack5-study/p2-loader.html#transform) |
| @babel/generator | ^7.20.7  | AST 生成目标代码，并输出 source map，对应 [generate 阶段](/webpack5-study/p2-loader.html#generate)                                |

在这里给出一个示例，帮助你从代码角度快速上手 babel 编译流程：

- babel-transpiler.js

  ```javascript
  const parser = require('@babel/parser')
  const traverse = require('@babel/traverse').default
  const generate = require('@babel/generator').default

  /************************** 源代码 **************************/

  const sourceCode = `
  const arr = Array(10).fill('a')
  debugger
  `

  /************************** parse 解析阶段 **************************/

  /**
   * 调用 parser.parse(input, options) 根据源代码生成对应 AST
   * - input：源代码字符串
   */
  const ast = parser.parse(sourceCode, { sourceType: 'unambiguous' })

  /************************** transform 转换阶段 **************************/

  /**
   * 调用 traverse(parent, opts) 遍历各个节点，当命中指定类型节点时触发 callback
   * - parent：parser 生成的 AST
   */
  traverse(ast, {
    // 遍历到 debugger 关键字会调用该函数
    DebuggerStatement(path, state) {
      path.remove() // 移除该节点
    }
  })

  /************************** generate 生成阶段 **************************/

  /**
   * 调用 generate(ast) 根据 AST 生成对应目标代码
   */
  const { code } = generate(ast)

  console.log('生成代码：', code)
  ```

分析这段代码，其实**我们需要关心的只有 transform 阶段**，其他阶段不需要额外的配置保持默认即可。我们将源代码复制到 [AST Explorer](https://astexplorer.net/) 中分析 `debugger` 的 AST 节点类型：

![WX20230105-143955](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051451366.png)

如图所示，`debugger` 在 AST 中对应的节点类型为 `DebuggerStatement`，因此在 traverse 函数每次遍历到此节点时都会调用内部声明的 DebuggerStatement 函数。我们的需求之一就是要直接删除代码中的 `debugger`，因此直接在回调函数执行 `path.remove()` 来删除该节点对应的 AST 即可。通过 node 运行该文件查看输出结果，可以看到生成代码中已无 `debugger`：

![截屏2023-01-05 14.57.26](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051457155.png)

### 实现功能

将自定义 loader 命名为 unconsole-loader，并嵌入上面的代码：

- unconsole-loader.js

  ```javascript
  const parser = require('@babel/parser')
  const traverse = require('@babel/traverse').default
  const generate = require('@babel/generator').default

  module.exports = function (source) {
    /************************** parse 解析阶段 **************************/

    /**
     * 调用 parser.parse(input, options) 根据源代码生成对应 AST
     * - input：源代码字符串
     */
    const ast = parser.parse(source, { sourceType: 'unambiguous' })

    /************************** transform 转换阶段 **************************/

    /**
     * 调用 traverse(parent, opts) 遍历各个节点，当命中指定类型节点时触发 callback
     * - parent：parser 生成的 AST
     */
    traverse(ast, {
      // 遍历到 debugger 关键字会调用该函数
      DebuggerStatement(path, state) {
        path.remove() // 移除该节点
      }
    })

    /************************** generate 生成阶段 **************************/

    /**
     * 调用 generate(ast) 根据 AST 生成对应目标代码
     */
    const { code } = generate(ast)

    return code
  }
  ```

在 unconsole-loader 中输入是 webpack 读取的 js 源代码 `source`，输出是经过处理的目标代码 `code`，接下来我们继续实现删除 `console` 的功能。在 [AST Explorer](https://astexplorer.net/) 中分析 `console` 的 AST 节点类型：

![WX20230105-152035](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051520954.png)

如图所示，每一个 `console` 都是由 `ExpressionStatement` 表达式语句、`CallExpression` 调用表达式、`MemberExpression` 成员变量表达式三层结构组成的：

- 最外层 ExpressionStatement：代表 `console.log(1)` 是一个语句，它是一个可独立执行的单位，其中 `expression` 属性代表该语句对应的表达式。
- 中间层 CallExpression：代表 `console.log(1)` 这个表达式被调用，其中 `callee` 属性指向当前被调用的函数。
- 最内层 MemberExpression：代表访问 `console` 对象上的 `log` 属性，该子结构具有函数调用，因此实际上整个表达式就成为了一个 `CallExpression`。

搞清楚了 `console` 的 AST 结构之后，我们可以确定遍历节点为 `CallExpression`，但 AST 中所有表达式调用都会触发这个 callback，因此我们还需要判断该节点上的 `callee` 属性是否匹配 `console`，从而完成删除功能：

- unconsole-loader.js

  ```javascript
  traverse(ast, {
    // 遍历到调用表达式会调用该函数
    CallExpression(path, state) {
      // 1.获取 CallExpression 下的 callee 路径
      const calleePath = path.get('callee')
      // 2.检测 callee 路径是否部分匹配 console
      if (calleePath?.matchesPattern('console', true)) {
        path.remove() // 移除该节点
      }
    }
  })
  ```

最后一个要实现的功能是根据关键字来保留某行 `console` 代码，在 [AST Explorer](https://astexplorer.net/) 中分析注释的 AST 节点类型：

![WX20230105-154343](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051544373.png)

如图所示，我们可以得到 4 点信息：

- 注释节点是 `CallExpression` 的兄弟节点
- 注释内容在节点的 `value` 属性上
- 注释方式对应了两种 AST 节点类型，`CommentLine` 单行注释、`CommentBlock` 多行注释
- 注释位置对应了两种 AST 属性，`leadingComments` 代码前注释、`trailingComments` 代码后注释

搞清楚了注释的 AST 结构之后，我们继续编写代码：

- unconsole-loader.js

  ```javascript
  traverse(ast, {
    // 遍历到调用表达式会调用该函数
    CallExpression(path, state) {
      // 1.获取 CallExpression 下的 callee 路径
      const calleePath = path.get('callee')
      // 2.检测 callee 路径是否部分匹配 console
      if (calleePath?.matchesPattern('console', true)) {
        // 2-1.获取当前路径父节点 ExpressionStatement 下的前缀注释
        const leadingComments = path.parentPath.node.leadingComments
        // 2-2.是否存在关键字注释
        let hasToken = false
        if (leadingComments?.length) {
          for (let i = 0; i < leadingComments.length; i++) {
            const commentNode = leadingComments[i]
            // 识别 行注释 和 块注释
            if (!['CommentLine', 'CommentBlock'].includes(commentNode.type)) {
              continue
            }
            // 是否存在关键字注释
            if (/\bunconsole-disable-next-line\b/g.test(commentNode.value)) {
              hasToken = true
              break
            }
          }
        }
        // 2-3.不存在关键字注释则移除该节点
        !hasToken && path.remove()
      }
    }
  })
  ```

到此 unconsole-loader 的功能就全部完成了，我们在 webpack 配置中引入自定义 loader，并且编写测试代码。**注意 unconsole-loader 要先于 babel-loader 执行**：

- wepback.config.js

  ```javascript
  // 四.公共配置
  const commonConfig = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // 排除 node_modules 中引入的 js 文件
          use: [
            'babel-loader',
            // 引入自定义 loader
            './unconsole-loader.js'
          ]
        }
      ]
    }
  }
  ```

* HomeView.vue

  ```vue
  <template>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </template>

  <script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'HomeView',
    components: { HelloWorld },
    created() {
      debugger
      // unconsole-disable-next-line
      console.log(1)
      //unconsole-disable-next-line
      console.error(2)
      /* unconsole-disable-next-line */
      console.info(3)
      /**
       * unconsole-disable-next-line test
       */
      console.group(4)
      // test unconsole-disable-next-line
      console.table(5)
      // aunconsole-disable-next-line
      console.log(6)
      // unconsole-disable-next-lineb
      console.log(7)
      // unconsole-disablec-next-line
      console.log(8)
      /**
       * unconsole-disable-nextd-line
       */
      console.log(9)
      console.log(10)
      debugger
    }
  }
  </script>
  ```

运行 serve 指令后，打开 http://localhost:3000/ 查看控制台输出和预期一致，其中 1 ～ 5 为合法注释、6 ～ 9 为非法注释：

![截屏2023-01-05 16.05.16](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202301051607906.png)

## 本节代码

> [p2.loader](https://gitee.com/aodazhang/webpack5-study/blob/master/p2.loader/unconsole-loader.js)
