---
lang: zh-CN
title: 基础
# sidebar: auto
---

## 1.依赖

> 参考：[nestjs 中文文档](https://docs.nestjs.cn/)、[nestjs 翻译](http://nestjs.inode.club/)

| 依赖                                                                                             | 版本        | 作用          | 说明                            |
| :----------------------------------------------------------------------------------------------- | ----------- | :------------ | :------------------------------ |
| [@nestjs/cli](https://docs.nestjs.com/cli)                                                       | 10.0.1      |               | nest 脚手架                     |
| [@nestjs/config](https://docs.nestjs.cn/9/techniques?id=%e9%85%8d%e7%bd%ae)                      | 3.1.1       | 环境变量      | 设置 nest 环境变量              |
| [cross-env](https://www.npmjs.com/package/cross-env)                                             | 7.0.3       | 环境变量      | 设置 node 环境变量              |
| [joi](https://joi.dev/api)                                                                       | 17.11.0     | 环境变量      | 校验环境变量                    |
| [@nestjs/cache-manager](https://www.npmjs.com/package/@nestjs/cache-manager)                     | 1.0.0       | 高速缓存      | 桥接层：nest -> cache-manager   |
| [cache-manager](https://www.npmjs.com/package/cache-manager)                                     | 5.2.1       | 高速缓存      | 缓存管理                        |
| [redis](https://www.npmjs.com/package/redis)                                                     | 4.6.10      | 数据库 Redis  | 桥接层：node -> redis           |
| [@nestjs/typeorm](https://docs.nestjs.cn/9/techniques?id=typeorm-%e9%9b%86%e6%88%90)             | 10.0.0      | 数据库 MySQL  | 桥接层：nest -> typeorm         |
| [typeorm](https://typeorm.bootcss.com/)                                                          | 0.3.16      | 数据库 MySQL  | orm 库                          |
| [mysql2](https://www.npmjs.com/package/mysql2)                                                   | 3.3.5       | 数据库 MySQL  | 桥接层：node -> mysql           |
| [typeorm-model-generator](https://www.npmjs.com/package/typeorm-model-generator)                 | 0.4.6       | 数据库 MySQL  | 根据 mysql 生成 typeorm 实体    |
| [prisma](https://prisma.yoga/getting-started)                                                    | 5.6.0       | 数据库 MySQL  | orm 库                          |
| [@prisma/client](https://prisma.yoga/getting-started)                                            | 5.6.0       | 数据库 MySQL  | 根据 prisma schema 生成迁移文件 |
| [class-validator](https://github.com/typestack/class-validator#validation-decorators)            | 0.14.0      | 校验参数      | 校验 dto 字段                   |
| [class-transformer](https://github.com/typestack/class-transformer#readme)                       | 0.5.1       | 校验参数      | 转换和过滤 dto 和 entity 字段   |
| [@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt)                                         | 10.1.1      | JWT           | 桥接层：nest -> jwt             |
| [@nestjs/schedule](https://www.npmjs.com/package/@nestjs/schedule)                               | 4.0.0       | 定时任务      | 设置定时任务                    |
| [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)                           | 7.1.3       | 安全          | 设置请求限流                    |
| [helmet](https://www.npmjs.com/package/helmet)                                                   | 7.0.0       | 安全          | 设置安全的 http headers         |
| [dayjs](https://www.npmjs.com/package/helmet)                                                    | 1.11.10     | 时间处理      | 处理各类时间转换                |
| @types/multer                                                                                    | 1.4.10      | 文件上传      |                                 |
| [nodemailer](https://nodemailer.com/about/)                                                      | 6.9.7       | 邮件          |                                 |
| [ejs](https://ejs.bootcss.com/)                                                                  | 3.1.9       | 模版引擎      |                                 |
| [superagent](https://ejs.bootcss.com/)                                                           | 8.1.2       | 爬虫          | 页面请求                        |
| [cheerio](https://cheerio.js.org/)                                                               | 1.0.0-rc.12 | 爬虫          | 页面元素分析                    |
| [husky](https://www.npmjs.com/package/husky)                                                     | 8.0.3       | 标准化 Commit | 监听 git 钩子函数并执行逻辑     |
| [lint-staged](https://www.npmjs.com/package/lint-staged)                                         | 15.0.2      | 标准化 Commit | 指定文件类型执行脚本            |
| [commitizen](https://www.npmjs.com/package/commitizen)                                           | 4.3.0       | 标准化 Commit | 标准化 git commit 信息          |
| [cz-customizable](https://www.npmjs.com/package/cz-customizable)                                 | 7.0.0       | 标准化 Commit | 自定义 git commit 信息          |
| [@commitlint/cli](https://commitlint.js.org)                                                     | 18.2.0      | 标准化 Commit | 检查 git commit 信息            |
| [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) | 18.1.0      | 标准化 Commit | 自定义 git commit 信息校验规则  |

```shell
# 1.安装脚手架
npm i @nestjs/cli -g
# 2.创建 nest 项目
nest n 项目名
# 3.安装依赖（TypeORM 版）
npm i @nestjs/config cross-env joi @nestjs/cache-manager cache-manager redis@4.6.7 @nestjs/typeorm typeorm mysql2 class-validator class-transformer @nestjs/jwt @nestjs/schedule express-rate-limit helmet dayjs nodemailer ejs superagent cheerio -S
npm i typeorm-model-generator @types/multer @types/nodemailer @types/ejs husky lint-staged commitizen cz-customizable @commitlint/cli @commitlint/config-conventional -D
# 4.安装依赖（Prisma 版）
npm i @nestjs/config cross-env joi redis @prisma/client class-validator class-transformer @nestjs/jwt @nestjs/schedule express-rate-limit helmet dayjs nodemailer ejs superagent cheerio -S
npm i prisma @types/multer @types/nodemailer @types/ejs husky lint-staged commitizen cz-customizable @commitlint/cli @commitlint/config-conventional -D
```

## 2.脚手架

> 参考：[cli 命令参考](https://docs.nestjs.cn/9/cli?id=cli%e5%91%bd%e4%bb%a4%e5%8f%82%e8%80%83)

### 指令

#### A.创建

```shell
# 创建新项目
nest n 项目名
```

#### B.运行

```shell
# 运行项目
nest start
# 运行项目 + 挂起
nest start --watch
# 运行项目 + 挂起 + 启用 node 调试
nest start --debug --watch
```

#### C.构建

```shell
# 构建项目
nest build
```

#### D.信息

```shell
# 显示项目信息（系统信息 + nest 脚手架信息 + nest 依赖信息）
nest i
```

#### E.生成

```shell
# 生成标准 CURD（控制器 + 服务 + 模块 + DTO + 实体 + 单元测试）
nest g resource 文件名
# 生成标准 CURD（测试执行，不生成文件）
nest g resource 文件名 -d
# 生成标准 CURD（不生成单元测试文件）
nest g resource 文件名 --no-spec
# 生成标准 CURD（不生成单独文件夹）
nest g resource 文件名 --no-flat
# 生成控制器（含单元测试）
nest g co 文件名
# 生成服务（含单元测试）
nest g s 文件名
# 生成模块
nest g mo 文件名
# 生成中间件（含单元测试）
nest g mi 文件名
# 生成守卫（含单元测试）
nest g gu 文件名
# 生成拦截器（含单元测试）
nest g itc 文件名
# 生成管道（含单元测试）
nest g pi 文件名
# 生成过滤器（含单元测试）
nest g f 文件名
```

### 配置文件

> 参考：[CLI 属性](https://docs.nestjs.cn/9/cli?id=cli-%e5%b1%9e%e6%80%a7)

- nest-cli.json

  ```json
  {
    // 1.基础配置
    "$schema": "https://json.schemastore.org/nest-cli",
    "collection": "@nestjs/schematics",
    // 2.路径配置
    "sourceRoot": "src", // standard 模式根路径
    // 3.编译配置
    "compilerOptions": {
      "deleteOutDir": true // 编译前是否移除输出目录（tsconfig.json 中 outDir指定）
    },
    // 4.生成配置
    "generateOptions": {
      "spec": false, // 生成文件是否包含单元测试（默认 true）
      "flat": false // 生成文件是否扁平化目录（默认 false，生成独立目录）
    }
  }
  ```

## 3.http 请求

### 相关装饰器

- **请求方式**：@Get、@Post、@Put、@Patch、@Delete、@Options、@Head

- **请求参数**：@Param、@Query、@Body、@Headers、@Ip

- **请求对象**：@Request、@Response（使用后需手动设置响应，nestjs 返回值无效）

### 参数解析

```typescript
/**
 * 1.url param
 * 接口：GET http://localhost:3000/app/:id
 * 常见：各类请求
 */
@Get(':id')
findOne(@Param('id') id: string) {}

/**
 * 2.url query
 * 接口：GET http://localhost:3000/app?id=&name=
 * 非英文字符编码：`?id=${encodeURIComponent(1)}&name=${encodeURIComponent('嗷大张')}`
 * 常见：各类请求
 */
@Get()
findOne(@Query() dto: any) {}

@Get()
findOne(@Query('name') name: string) {}

/**
 * 3.json
 * 接口：POST http://localhost:3000/app
 * body参数：{ id: 1, name: '嗷大张' }
 * Content-Type: application/json
 * 常见：各类请求
 */
@Post()
findOne(@Body() dto: any) {}

@Post()
findOne(@Body('name') name: string) {}

/**
 * 4.form-urlencoded
 * 接口：POST http://localhost:3000/app
 * body参数：id=&name=
 * 非英文字符编码：`?id=${encodeURIComponent(1)}&name=${encodeURIComponent('嗷大张')}`
 * Content-Type: application/x-www-form-urlencoded
 * 常见：表单提交
 */
@Post()
findOne(@Body() dto: any) {}

@Post()
findOne(@Body('name') name: string) {}

/**
 * 5.form-data
 * 接口：POST http://localhost:3000/app
 * body参数：const body = new FormData(); body.append('id', '1'); body.append('name', '嗷大张')
 * Content-Type: multipart/form-data
 * 常见：文件上传
 */
@UseInterceptors(FileInterceptor('file')) // 使用该类型拦截器才能解析 FormData
@Post()
findOneQuery(@Body() dto: any, @UploadedFile() file: Express.Multer.File) {}

/**
 * 6.自定义 header
 * 接口：POST http://localhost:3000/app
 * Content-Type: application/json
 * 常见：用户认证
 */
@Post()
findOne(@Headers() headers: Record<string, string>) {}

@Post()
findOne(@Headers('token') token: string) {}

/**
 * 7.请求 ip
 * 接口：POST http://localhost:3000/app
 * Content-Type: application/json
 * 常见：数据统计
 */
@Post()
findOne(@Ip() ip: string) {}
```

## 4.核心

### 相关装饰器

- **控制器**：@Controller

- **模块**：@Module

- **依赖注入**：@Injectable（无 DI 可不使用）、@Inject

### Controller 控制器

作用：定义接口、挂载组件、获取参数、调用服务

```typescript
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id)
  }

  @Post()
  create(@Body() createAppDto: CreateAppDto) {
    return this.appService.create(createAppDto)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppDto: UpdateAppDto
  ) {
    return this.appService.update(id, updateAppDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.remove(id)
  }
}
```

### Service 服务

作用：封装业务逻辑、调用数据库、处理其他三方请求

```typescript
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App) private readonly appRepository: Repository<App>
  ) {}

  findAll() {
    return this.appRepository.find()
  }

  findOne(id: number) {
    return this.appRepository.findOne({
      where: { id }
    })
  }

  async create(createAppDto: CreateAppDto) {
    const app = await this.appRepository.create(createAppDto)
    return this.appRepository.save(app)
  }

  async update(id: number, updateAppDto: UpdateAppDto) {
    const app = await this.findOne(id)
    const newApp = this.appRepository.merge(app, updateAppDto)
    return this.appRepository.save(newApp)
  }

  async remove(id: number) {
    return this.appRepository.delete(id)
  }
}
```

### Module 模块

作用：注入模块功能、导出模块功能、注入控制器、注入依赖

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([App])],
  exports: [AppService],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```

## 5.组件

### 相关装饰器

- **装饰器**：@UseGuards、@UseInterceptors、@UsePipes、@UseFilters

- **捕获**：@Catch

### 生命周期

各个组件执行顺序如下：

![nestjs](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202306031949418.jpg)

- 不同装饰器执行顺序

  ```typescript
  @B() // 后
  @A() // 先
  findAll() {}
  ```

- 同一装饰器内部执行顺序

  ```typescript
  // 单向前正：守卫、管道
  // 1.全局
  app.useGlobalPipes(
    new GlobalPipe(1), // 先
    new GlobalPipe(2) // 后
  )
  // 2.控制器、路由、参数
  @UsePipes(
    new RoutePipe(1), // 先
    new RoutePipe(2) // 后
  )
  findAll() {}

  // 单向后逆：过滤器
  // 1.全局
  app.useGlobalFilters(
    new GlobalFilter(1), // 后
    new GlobalFilter(2) // 先
  )
  // 2.控制器、路由
  @UseFilters(
    new RouteFilter(1), // 后
    new RouteFilter(2) // 先
  )
  findAll() {}

  // 双向前正后逆：拦截器
  // 1.全局
  app.useGlobalInterceptors(
    new GlobalInterceptor(1), // 前置：先、后置：后
    new GlobalInterceptor(2) // 前置：后、后置：先
  )
  // 2.控制器、路由
  @UseInterceptors(
    new RouteInterceptor(1), // 前置：先、后置：后
    new RouteInterceptor(2) // 前置：后、后置：先
  )
  findAll() {}
  ```

### Middleware 中间件

Nestjs 的中间件是跨框架的抽象层，与 Express 的中间件类似

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  /**
   * 调用函数
   * @param req 请求对象
   * @param res 响应对象
   * @param next 调用处理程序
   * @returns 无
   */
  use(req: Request, res: Response, next: () => void): void {
    // 1.前置执行区
    next()
    // 2.后置执行区
  }
}
```

```typescript
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { GlobalMiddleware, RouteMiddleware } from './middlewares'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  /**
   * 配置中间件
   * @param consumer 消费对象
   * @returns 无
   */
  configure(consumer: MiddlewareConsumer): void {
    // 1.注册 GlobalMiddleware，对所有路由生效
    consumer.apply(GlobalMiddleware).forRoutes('*')
    // 2.注册 RouteMiddleware，对指定路由生效 GET /api/v1/app
    consumer
      .apply(RouteMiddleware)
      .forRoutes({ path: 'app', method: RequestMethod.GET })
  }
}
```

### Guard 守卫

```typescript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request, Response } from 'express'

@Injectable()
export class ControllerGuard implements CanActivate {
  /**
   * 激活函数
   * @param context 系统上下文，继承自 ArgumentsHost
   * @returns 校验结果：true-通过、false-不通过
   */
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取当前进程上下文
    const ctx = context.switchToHttp()
    // 获取请求对象
    const request = ctx.getRequest<Request>()
    // 获取响应对象
    const response = ctx.getResponse<Response>()

    return true
  }
}
```

### Interceptor 拦截器

```typescript
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { Request, Response } from 'express'

@Injectable()
export class ControllerInterceptor implements NestInterceptor {
  /**
   * 拦截函数
   * @param context 系统上下文，继承自 ArgumentsHost
   * @param next 调用处理程序，CallHandler 必须调用 handle 才能进行下一步，返回一个 Observable 对象
   * @returns Observable 对象
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 1.前置执行区
    // 获取当前进程上下文
    const ctx = context.switchToHttp()
    // 获取请求对象
    const request = ctx.getRequest<Request>()
    // 获取响应对象
    const response = ctx.getResponse<Response>()

    return next
      .handle() // 调用 handle 返回 Observable 对象
      .pipe(
        // 2.后置执行区
        tap(() => {})
      )
  }
}
```

### Pipe 管道

```typescript
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ControllerPipe implements PipeTransform {
  /**
   * 转换函数
   * @param value 原始数据
   * @param metadata 配置数据 { metatype: [Function: Object], type: 'body', data: undefined }
   * @returns 转换后数据
   */
  transform(value: any, metadata: ArgumentMetadata): any {
    return value
  }
}
```

### Filter 过滤器

```typescript
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch() // 捕获所有异常
// @Catch(HttpException) // 捕获 HttpException 及其子类异常
export class ControllerFilter<T> implements ExceptionFilter {
  /**
   * 捕获函数
   * @param exception 异常对象，与当前 @Catch() 设定类型一致
   * @param host 系统上下文
   * @returns 无
   */
  catch(exception: T, host: ArgumentsHost): void {
    // 获取当前进程上下文
    const ctx = host.switchToHttp()
    // 获取请求对象
    const request = ctx.getRequest<Request>()
    // 获取响应对象
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: (exception as Error).message,
      data: null,
      timestamp: Date.now()
    })
  }
}
```

### 对比

| 组件               | 功能                                       | 依赖注入 | 系统上下文 | 元数据 | rxjs | 范围       | 位置                         |
| :----------------- | :----------------------------------------- | :------- | :--------- | :----- | :--- | ---------- | ---------------------------- |
| Middleware 中间件  | 通用逻辑                                   | ✅       | ❌         | ❌     | ❌   | 请求       | 路由匹配                     |
| Guard 守卫         | 校验权限、拦截不合规请求                   | ✅       | ✅         | ✅     | ❌   | 请求       | 全局、控制器、路由           |
| Interceptor 拦截器 | 转换响应参数、处理敏感字段、标准化正常响应 | ✅       | ✅         | ✅     | ✅   | 请求、响应 | 全局、控制器、路由           |
| Pipe 管道          | 校验请求参数、过滤非法请求参数             | ✅       | ❌         | ❌     | ❌   | 请求       | 全局、控制器、路由、请求参数 |
| Filter 过滤器      | 捕获控制器和服务异常、标准化异常响应       | ❌       | ✅         | ❌     | ❌   | 响应       | 全局、控制器、路由           |

## 6.全局

### 跨域

```typescript
/**
 * 设置跨域
 */
app.enableCors()
```

### 路由前缀

```typescript
/**
 * 设置全局路由前缀
 * 1.拼接规则：服务路径/全局路由前缀/请求版本
 */
app.setGlobalPrefix('api')
```

### 请求版本

```typescript
/**
 * 设置全局请求版本管理
 * 1.优先级：单个请求版本 > 控制器请求版本 > 全局请求版本
 */
app.enableVersioning({
  type: VersioningType.URI, // 版本号配置在路由上
  defaultVersion: '1' // 指定全局请求版本：/v1
})
```

### 静态资源

```typescript
/**
 * 设置静态资源目录
 * 1.说明：静态资源访问路径不受路由前缀、请求版本影响
 */
app.useStaticAssets(join(__dirname, '..', 'public'), {
  prefix: '/static' // 访问路径前缀：/static/test.png
})
```

## 7.中间件

### 限流

- 概念：控制同一时间段内同一 ip 访问频率

- 配置

  ```typescript
  import { rateLimit } from 'express-rate-limit'

  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 1, // 一个限流周期：1分钟
      max: 300 // 每个 ip 在限流周期内请求次数：300次（相当于每秒5次请求）
    })
  )
  ```

### header 安全

- 概念：设置安全响应 header

- 配置

  ```typescript
  import helmet from 'helmet'

  app.use(helmet())
  ```
