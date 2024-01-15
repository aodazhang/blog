---
lang: zh-CN
title: 快速开始
# sidebar: auto
---

## 包管理器

#### 1.安装

```shell
npm i ecs-lite -S
# or
yarn add ecs-lite -S
```

推荐 `npm` 或 `yarn` 管理项目依赖，[CDN](/ecs-lite/start.html#cdn) 稳定性差且不支持 ESM。

#### 2.使用

```javascript
import { Component, System, World } from 'ecs-lite'

// 1.定义组件
class Position extends Component {
  constructor(x, y) {
    super()
    this.x = x
    this.y = y
  }
}

// 2.定义系统
class PositionSystem extends System {
  constructor() {
    super()
  }
  update(world) {
    for (const [entity, componentMap] of world.view(Position)) {
      const position = componentMap.get(Position)
      position.x += 10
      console.log('组件实例', position)
    }
  }
}

// 3.初始化实体、组件、系统
const world = new World()
world.addEntityWithComponents(world.createEntity('car'), new Position(0, 100))
world.addSystem(new PositionSystem())

// 4.启动world
world.start()
```

## CDN

#### 1.引入

```html
<script src="https://project.aodazhang.com/ecs-lite/ecs.iife.js"></script>
```

通过 `<script>` 标签加载 js 脚本后会向 window 注入一个全局变量 **ECS**，访问该变量可使用 ecs-lite 全部功能。

#### 2.使用

```html
<script>
  // 1.定义组件
  class Position extends ECS.Component {
    constructor(x, y) {
      super()
      this.x = x
      this.y = y
    }
  }

  // 2.定义系统
  class PositionSystem extends ECS.System {
    constructor() {
      super()
    }
    update(world) {
      for (const [entity, componentMap] of world.view(Position)) {
        const position = componentMap.get(Position)
        position.x += 10
        console.log('组件实例', position)
      }
    }
  }

  // 3.初始化实体、组件、系统
  const world = new ECS.World()
  world.addEntityWithComponents(world.createEntity('car'), new Position(0, 100))
  world.addSystem(new PositionSystem())

  // 4.启动world
  world.start()
</script>
```
