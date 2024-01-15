---
lang: zh-CN
title: Markdown 语法
# sidebar: auto
---

# 一级标题（vuepress 侧边栏 + 未设置 title 时显示）

## 二级标题（vuepress 侧边栏）

### 三级标题（vuepress 侧边栏）

#### 四级标题

##### 五级标题

###### 六级标题

```markdown
# 一级标题（vuepress 侧边栏 + 未设置 title 时显示）

## 二级标题（vuepress 侧边栏）

### 三级标题（vuepress 侧边栏）

#### 四级标题

##### 五级标题

###### 六级标题
```

<br />

## 1.文字

普通文字

**加粗文字**

_斜体文字_

**_斜体加粗文字_**

~~删除线文字~~

```markdown
普通文字

**加粗文字**

_斜体文字_

**_斜体加粗文字_**

~~删除线文字~~
```

<br />

## 2.引用

> 引用文字
>
> > 嵌套引用文字

```markdown
> 引用文字
>
> > 嵌套引用文字
```

<br />

## 3.emoji

😀😃🚌🚗

```markdown
😀😃🚌🚗
```

<br />

## 4.分割线

---

```markdown
---
```

<br />

## 5.图片

<img :src="$withBase('/assets/about/javascript.svg')" />

![外部图片](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/caniuse.png)

```markdown
<!-- public/assets/about 目录下 javascript svg 图片 -->
<img :src="$withBase('/assets/about/javascript.svg')" />

![外部图片](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/caniuse.png)
```

<br />

## 6.链接

[内部路由 1](/)

[内部路由 2](/about/)

[外部链接](https://baidu.com)

```markdown
[内部路由 1](/) <!-- 跳转到根目录 README.md -->

[内部路由 2](/about/) <!-- 跳转到 about 文件夹 README.md -->

[外部链接](https://baidu.com)
```

<br />

## 7.列表

- 无序列表 1
  - 无序列表 1-1
  - 无序列表 1-2
  - 无序列表 1-3
- 无序列表 2
- 无序列表 3

1. 有序列表 1
   1. 有序列表 1-1
   2. 有序列表 1-2
   3. 有序列表 1-3
2. 有序列表 2
3. 有序列表 3

```markdown
- 无序列表 1
  - 无序列表 1-1
  - 无序列表 1-2
  - 无序列表 1-3
- 无序列表 2
- 无序列表 3

1. 有序列表 1
   1. 有序列表 1-1
   2. 有序列表 1-2
   3. 有序列表 1-3
2. 有序列表 2
3. 有序列表 3
```

<br />

## 8.表格

| 课程名称 | 任课教师（右对齐） | 课程类型（左对齐） | 课程周期  |
| -------- | -----------------: | :----------------- | --------- |
| 大学英语 |             曾老师 | 必修               | 9.4~11.28 |
| 数据结构 |             董老师 | 必修               | 9.4~11.14 |

```markdown
| 课程名称 | 任课教师（右对齐） | 课程类型（左对齐） | 课程周期  |
| -------- | -----------------: | :----------------- | --------- |
| 大学英语 |             曾老师 | 必修               | 9.4~11.28 |
| 数据结构 |             董老师 | 必修               | 9.4~11.14 |
```

<br />

## 9.代码块

```javascript{1,6-7}
const fs = require('fs')
const path = require('path')
const nav = require('./nav')

function sidebarItem(title, prefixPath) {
  const children = fs
    .readdirSync(path.join(process.cwd(), 'docs', prefixPath))
    .map(path => `${prefixPath}${path.replace('README.md', '')}`)
  return {
    title,
    collapsable: true,
    children
  }
}
```

````markdown
<!-- 高亮 1、6、7 行的代码 -->

```javascript{1,6-7}
const fs = require('fs')
const path = require('path')
const nav = require('./nav')

function sidebarItem(title, prefixPath) {
  const children = fs
    .readdirSync(path.join(process.cwd(), 'docs', prefixPath))
    .map(path => `${prefixPath}${path.replace('README.md', '')}`)
  return {
    title,
    collapsable: false,
    children
  }
}
```
````

<br />

## 10.目录

[[toc]]

```markdown
[[toc]]
```

<br />

## 11.自定义容器（vuepress 组件）

::: tip 提示
这是一个提示
:::

::: warning 警告
这是一个警告
:::

::: danger 危险
这是一个危险警告
:::

::: details 详情
这是一个详情块，在 IE / Edge 中不生效
:::

```markdown
::: tip 提示
这是一个提示
:::

::: warning 警告
这是一个警告
:::

::: danger 危险
这是一个危险警告
:::

::: details 详情
这是一个详情块，在 IE / Edge 中不生效
:::
```

<br />

## 12.标记（vuepress 组件）

默认标记 <Badge type="tip" text="默认主题"/>

警告标记 <Badge type="warning" vertical="top" text="beta" />

```markdown
默认标记 <Badge type="tip" text="默认主题"/>

警告标记 <Badge type="warning" vertical="top" text="beta" />
```

<br />

## 13.自定义（vuepress 功能）

<div class="flappy-bird">
  <iframe src="https://project.aodazhang.com/ecs-lite"></iframe>
</div>

```markdown
<!-- vuepress 可直接在 markdown 中写入 html -->
<div class="flappy-bird">
  <iframe src="https://project.aodazhang.com/ecs-lite"></iframe>
</div>
```
