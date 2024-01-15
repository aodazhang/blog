---
lang: zh-CN
title: 指南
# sidebar: auto
---

# 🚀 ecs-lite

<img :src="$withBase('/assets/ecs-lite/gzip.svg')" />&nbsp;<img :src="$withBase('/assets/ecs-lite/coverage.svg')" />

[ecs-lite](https://gitee.com/aodazhang/ecs-lite) 是基于 ts 实现的纯 ECS 库，可用于学习交流及简易的 H5 游戏开发！

## 实体组件系统

**实体组件系统 ECS（Entity Component System）** 最早由 [Unity](https://docs.unity3d.com/Packages/com.unity.entities@0.1/manual/index.html) 提出，该架构常用于游戏业务场景，因为游戏中存在大量物体相关的运算与迭代，ECS 扁平化设计对于游戏逻辑的开发与维护更具优势。

> _相关阅读：[《守望先锋》架构设计与网络同步](https://juejin.cn/post/6844903635864780813)_

ecs-lite 参考 [EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples)、[jakeklassen/ecs](https://github.com/jakeklassen/ecs) 实现了一个精简的 ECS 内核，以 [Flappy Bird](/ecs-lite/#游戏-flappy-bird) 为例，其内部 ECS 架构如下图所示：

![ecs-lite](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/ecs-lite.png)

### Entity 实体

**定义唯一性 id**，用于关联特定的组件集合。例如小鸟精灵实体关联了 `位置`、`尺寸`、`速度`、`角度`、`图片`、`渲染` 六个组件，代表小鸟的位置、运动属性、贴图及最终渲染到 canvas 画布上的配置。

### Component 组件

**定义某种业务的数据结构**。例如 `位置` 组件定义了物体坐标 x、y。

### System 系统

**定义某种业务的逻辑**，在 ecs-lite 每一轮循环中被调用一次，可以通过内部 world 实例获取到指定的实体及其关联的组件，并对组件中的数据进行修改。例如 _速度计算系统_ 在每次执行 update 函数时都会获取实体的 `位置`、`速度` 组件，并更新该实体运动后的坐标 x、y。

### World 世界

**负责管理调度内部的所有 Entity、Component、System**。理论上可以创建多个 world 实例，但同一时间应该仅有一个 world 实例被渲染到页面上。

## 示例

### 游戏：Flappy Bird

<div class="flappy-bird">
  <iframe src="https://project.aodazhang.com/ecs-lite"></iframe>
</div>

在此示例中，页面每个元素都是一个 [Entity 实体](/ecs-lite/#entity-实体)，例如背景、地面、障碍物、小鸟、计分器、开始按钮；每个 Entity 关联了多个 [Component 组件](/ecs-lite/#component-组件)，例如图片、位置、尺寸、速度、旋转、文字、得分、渲染；每个 [System 系统](/ecs-lite/#system-系统) 负责处理一种特定的逻辑，例如点击事件、障碍物生成、速度控制、旋转控制、碰撞检测、得分计算、页面渲染。游戏里所有的 Entity、Component、System 由 [World 世界](/ecs-lite/#world-世界) 实例来统一调度管理。
