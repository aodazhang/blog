---
lang: zh-CN
title: 服务端
# sidebar: auto
---

## 1.技术栈

**XiaoMo 服务端** 是一套以 [TypeScript](https://github.com/Microsoft/TypeScript) 为编程语言、[Midway](http://www.midwayjs.org/) 为 Web 框架开发的后台服务端。在深入了解它之前，您应该了解或掌握以下技术：

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/)
- [Midway](http://www.midwayjs.org/docs/introduction)

## 2.关于 Nest

社区中一个呼声很高的类 Spring 的框架是 [Nest](https://docs.nestjs.cn/8/firststeps)，在重构时我曾尝试使用该技术写了一个 Demo 版本。至于最后放弃 **Nest** 的原因是我认为它对于前端来说过于厚重了，特别是绝大多数前端去写 CURD 时往往只是为了实现特定领域的业务需求，真正复杂的逻辑会交给后端来做。如果一定要使用大而全的技术，我觉得还是完整的按照后端学习路线从 Java 开始学起（或者 python 也不错），而不是一味追求用 Node 生态的产物来替代 Java。

## 3.架构设计

**XiaoMo** 在服务端需要执行数据收集、过滤、加工、处理等逻辑任务，承担了整个系统的核心功能。服务端架构如下图所示：

<img :src="$withBase('/assets/xiaomo/server1.jpg')" alt="图片" />

现有服务部署在我自己的阿里云上，基本可满足开发、测试环境的需求，生产环境还需要进一步的压力测试和稳定性验证。下面是我使用的一些硬件和运维配置：

- **服务器**：阿里云 ECS（1 核 1G）
- **数据库**：阿里云 RDS MySQL（1 核 1G）
- **操作系统**：CentOS（7.6）
- **SSL 证书**：[digicert](https://www.digicert.com/)
- **反向代理**：[nginx](http://nginx.org/en/download.html)（1.20.1）
- **运维**：[pm2](https://pm2.keymetrics.io/)（5.1.1）
