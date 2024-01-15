---
lang: zh-CN
title: 简介
# sidebar: auto
---

## 🌈 简介

**XiaoMo（小莫）** 是一套轻量级前端监控系统，从应用的 **异常、性能、行为** 三个维度收集 [指标](/xiaomo/monitor/) 进行分析，帮助前端工程师快速定位并解决各种线上问题，确保项目在生产环境中健康运行。XiaoMo 由以下三部分构成：

- [SDK](/xiaomo/sdk/)：指标收集上报
- [服务端](/xiaomo/server/)：指标分析处理
- [管理端](/xiaomo/viewAdmin/)：综合管理

## 🚀 功能

- 异常捕获与代码定位
- 性能指标计算分析
- 页面行为统计分析
- 应用健康度分析

## ⚠️ 兼容性

由于使用了 IE 浏览器不兼容的 `PerformanceObserver`，因此在 IE 上的性能指标计算会受到一定程度的影响。
