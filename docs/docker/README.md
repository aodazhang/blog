---
lang: zh-CN
title: 基础
# sidebar: auto
---

## 1.概念

### 基础架构

![image-20230610174929955](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202306101749772.png)

- **Client 客户端**：docker 命令行工具

- **Host 宿主机**：运行 docker 守护进程的服务器

- **Docker daemon 守护进程**：docker 守护进程，负责构建镜像和运行容器实例，客户端通过命令行与守护进程交互

- **Registry 仓库**：存储官方或个人的构建 docker 镜像，如 [DockerHub](https://hub.docker.com/)

### Volumes

数据卷，将**宿主机目录文件的绝对路径**和**容器目录文件的绝对路径**关联，两边都可增删改查，并可约束容器的读写权限。Volume 数据默认存储在 docker 的资源区域 `/var/lib/docker/volumes/` 目录

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/25/1660eff4b182c891~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

| 绑定方式             | 宿主机          | 容器         | 是否持久化存储 |
| :------------------- | :-------------- | :----------- | :------------- |
| Bind Mount 手动挂载  | 用户指定路径    | 用户指定路径 | ✅             |
| Volume 自动挂载      | docker 指定路径 | 用户指定路径 | ✅             |
| Tmpfs Mount 内存挂载 | docker 指定位置 | 用户指定路径 | ❌             |

![image-20230617181417783](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202306171814849.png)

## 2.安装

### Windows、Mac

通过 [客户端](https://www.docker.com/get-started/) 安装与卸载 docker、docker-compose

### Linux

```shell
# 1.安装
# 通过脚本自动安装 docker（官方脚本 + 阿里云镜像，推荐）
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# 通过脚本自动安装 docker（daocloud 脚本）
curl -sSL https://get.daocloud.io/docker | sh
# 通过二进制文件安装 docker-compose
curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
# 设置 docker-compose 执行权限
chmod +x /usr/local/bin/docker-compose

# 2.卸载
# 卸载 docker-compose
rm -rf /usr/local/bin/docker-compose
```

## 3.镜像加速

### 阿里云

Windows、Mac

![image-20230610194307515](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202306101943196.png)

Linux

### 道客

[镜像加速](https://www.daocloud.io/mirror)

## 4.Docker 指令

### 版本

```shell
# 查看 docker 版本
docker -v
# 查看 docker-compose 版本
docker-compose -v
```

### 镜像

```shell
# 一.查看
# 查看本地镜像（全部）
docker images
# 查看指定镜像（标签默认 latest）
docker images | grep 镜像名:标签

# 二.远程下载
# 从 DockerHub 下载镜像（标签默认 latest）
docker pull 镜像名:标签

# 三.本地构建
# 通过当前目录下的 Dockerfile 构建镜像（标签默认 latest、构建文件默认 Dockerfile）
docker build -t 镜像名称:标签 . [-f 指定构建文件]
```

### 容器

```shell
# 一.查看
# 查看本地容器实例（全部）
docker ps -a
# 查看本地容器实例（运行中）
docker ps
# 查看容器实例信息（全部）
docker inspect 容器名
# 查看容器实例信息（数据卷）
docker volume inspect 容器名
# 查看容器实例信息（网络）
docker network inspect 容器名
# 查看容器实例端口映射
docker port 容器名
# 查看容器实例资源占用
docker stats 容器名

# 二.创建
# 通过镜像创建容器实例：--restart 每次启动 docker 时重启、:ro 容器只读数据卷、:rw 容器读写数据卷、-d 设置容器实例在后台运行
docker run --name 容器名 [--restart=always] -p 宿主端口:容器端口 [--expose 容器暴露端口] [-v 宿主数据卷目录:容器数据卷目录:ro/:rw] [-e 环境变量] -d 镜像名

# 三.启动
# 启动容器实例
docker start 容器名

# 四.停止
# 停止容器实例
docker stop 容器名

# 五.移除
# 移除容器实例
docker rm 容器名
# 移除全部容器实例（运行中）
docker rm -f $(docker ps -aq)

# 六.日志
# 查看容器实例日志
docker logs -f 容器名
```

### 数据卷

```shell
# 一.查询
# 查看本地数据卷
docker volume ls

# 二.创建
# 创建数据卷
docker volume create 数据卷名

# 三.移除
# 移除数据卷
docker volume rm 数据卷名
# 移除没有被使用的数据卷
docker volume prune
```

## 5.Dockerfile 语法

### 基础构建

##### FROM

##### WORKDIR

##### COPY

##### RUN

##### ADD

##### EXPOSE

##### ENV

##### CMD

### 多阶段构建

## 6.Dockerfile 模版

### 前端（CSR）

镜像构建文件：Dockerfile

```shell
######################## 一.构建阶段 ########################

# 1.运行环境：基于一个基础镜像
# 使用外部镜像 node:latest、node:18、node:18-alpine，并设置一个别名
FROM node:18 as build-stage

# 2.工作目录
# 根目录下 app 文件夹
WORKDIR /app

# 3.复制：镜像外 -> 镜像内
# 当前目录下所有文件 复制到 镜像工作目录 /app
COPY . .

# 4.镜像执行命令
# 解决某些 linux 发行版 runc 路径异常的问题
# RUN ln -s /sbin/runc /usr/bin/runc
# npm 配置源
RUN npm config set registry https://registry.npmmirror.com
# 安装项目依赖
RUN npm i
# 构建项目
RUN npm run build:prod

######################## 二.运行阶段 ########################

# 1.运行环境：基于一个基础镜像
# 使用外部镜像 nginx:latest，并设置一个别名
FROM nginx:latest as prod-stage

# 2.工作目录
# 根目录下 app 文件夹
WORKDIR /app

# 3.复制：指定阶段镜像内 -> 本阶段镜像内
# build-stage 阶段构建目录 /app/dist 复制到 镜像工作目录 /app
COPY --from=build-stage /app/dist .
# 当前项目下 default.conf 复制到 nginx 配置文件目录
COPY default.conf /etc/nginx/conf.d/default.conf
```

Nginx 配置文件：default.conf

```shell
server {
    listen                       80;
    server_name                  localhost;

    location / {
      root                       /app;
      index                      index.html index.htm;
      try_files                  $uri $uri/ /index.html;
    }
}
```

### 后端（Nestjs）

镜像构建文件：Dockerfile

```shell
# 1.运行环境：基于一个基础镜像
# 使用外部镜像 node:latest、node:18、node:18-alpine
FROM node:18-alpine

# 2.工作目录
# 根目录下 app 文件夹
WORKDIR /app

# 3.复制：镜像外 -> 镜像内
# 当前目录下所有文件 复制到 镜像工作目录 /app
COPY . .

# 4.镜像执行命令
# 解决某些 linux 发行版 runc 路径异常的问题
# RUN ln -s /sbin/runc /usr/bin/runc
# npm 配置源
RUN npm config set registry https://registry.npmmirror.com
# 全局安装 pm2
RUN npm i pm2 -g
# 安装项目依赖
RUN npm i
# 构建项目
RUN npm run build

# 5.镜像环境变量
# node 环境变量
ENV NODE_ENV production

# 6.暴露宿主机
# 将容器内端口 3000 暴露到宿主机使用（注意需要与 nestjs 启动端口一致）
EXPOSE 3000
# 将容器内工作目录中的 logs、public 文件暴露到数据卷中供宿主机使用
VOLUME /Users/zhangxinyu/Downloads/db/nest/public:/app/public

# 7.容器实例启动时执行命令（1-6在镜像构建执行、7每次启动容器实例执行）
# CMD ["npm", "run", "start:uat"]
# 异常：pm2 默认后台启动，docker 感知不到，CMD 命令执行后 docker 容器就停止运行
# 解决方案：node、pm2-runtime 前台启动应用程序，从而使容器保持运行状态
CMD ["npm", "run", "start:prod:docker"]
```
