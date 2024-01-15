---
lang: zh-CN
title: 服务端
# sidebar: auto
---

## 1.环境要求

| 环境 | 类型     | 版本  |
| :--- | :------- | :---- |
| Node | V8 引擎  | >=12  |
| pm2  | 运维工具 | >=5   |
| yarn | 包管理器 | >=1.2 |

## 2.安装与使用

### 安装

请使用 `yarn` 安装依赖：

```shell
# clone仓库
git clone https://github.com/LQDLabs/xiaomo-server.git
# 进入代码目录
cd xiaomo-server
# 安装依赖
yarn install
```

### 配置

[服务端](/xiaomo/server/) 的配置文件统一放在了 **`src/config`** 目录下，配置示例如下：

```typescript
// config.default.ts

export const common = {
  isLogger: true, // 是否开启日志
  isStack: true // http响应是否输出异常堆栈
}

// @midwayjs/view-ejs配置：https://midwayjs.org/docs/render#%E4%BD%BF%E7%94%A8-ejs
export const view = {
  defaultViewEngine: 'ejs',
  mapping: { '.ejs': 'ejs' }
}

// @midwayjs/sequelize配置：https://github.com/RobinBuschmann/sequelize-typescript
export const sequelize = {
  options: {
    database: '数据库表名',
    username: '数据库账号',
    password: '数据库密码',
    host: '数据库主机',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    define: {
      charset: 'utf8mb4'
    },
    encrypt: false,
    sync: {
      force: false,
      alter: true
    }
  },
  sync: true
}

// @midwayjs/axios配置：http://www.axios-js.com/zh-cn/docs/#%E9%85%8D%E7%BD%AE%E9%BB%98%E8%AE%A4%E5%80%BC
export const axios = {
  baseURL: '网络请求baseURL',
  timeout: 1000
}

// @midwayjs/swagger配置：http://www.midwayjs.org/docs/swagger
export const swagger = {
  title: 'XiaoMo',
  description: '前端监控系统API',
  version: 'v0.0.1',
  license: {
    name: 'MIT',
    url: 'https://github.com/LQDLabs/xiaomo-server/blob/master/LICENSE'
  }
}

export const secret = {
  aesAlgorithmOut: '外部加密算法',
  aesKeyOut: '外部加密密钥',
  aesIvOut: '外部加密向量',
  aesAlgorithmIn: '内部加密算法',
  aesKeyIn: '内部加密密钥',
  aesIvIn: '内部加密向量',
  jwtAlgorithm: 'jwt加密算法',
  jwtKey: 'jwt密钥',
  jwtExpiresIn: 'jwt有效时间'
}

// nodemailer配置：https://nodemailer.com/smtp/well-known/
export const email = {
  transport: {
    service: '邮箱服务类型',
    port: 465,
    secure: true,
    auth: { user: '用户名', pass: '密码' }
  },
  from: '发件人信息'
}
```

### 运行

确保你的服务器安装了 **[pm2](https://pm2.keymetrics.io/)**，然后在代码目录下运行指令：

```shell
# 构建应用 & pm2运行server
yarn prod
```
