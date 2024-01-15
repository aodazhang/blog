/**
 * @description sidebar侧边栏配置
 */
import fs from 'fs'
import path from 'path'

/**
 * 获取侧边栏分组
 * @param text 分组标题
 * @param prefixPath 匹配文档前缀路径
 * @param sort 分组排序
 * @returns 分组配置
 */
function sidebarItem(text: string, prefixPath: string, sort?: string[]) {
  const sidebarMap = new Map()
  fs
    // 获取 docs 目录下指定前缀路径下的 md 文件名
    .readdirSync(path.join(process.cwd(), 'docs', prefixPath))
    // 遍历文件名，以 xx.md 的 xx 作为 key，拼接前缀路径 + md 文件名（若为 README.md 则不返回文件名）作为 value
    .forEach(path =>
      sidebarMap.set(
        `${path.replace('.md', '')}`,
        `${prefixPath}${
          path === 'README.md' ? path.replace('README.md', '') : path
        }`
      )
    )
  let children: unknown[] = []
  if (Array.isArray(sort)) {
    // 存在分组排序：以该顺序生成 children
    children = sort.map(key => sidebarMap.get(key))
  } else {
    // 不存在分组排序：将 README.md 插入到 children 最前面，其余顺序排列生成 children
    for (let [key, value] of sidebarMap.entries()) {
      key === 'README' ? children.unshift(value) : children.push(value)
    }
  }
  return {
    text, // 分组标题
    collapsable: true, // 分组默认收起
    children // 分组下的页面
  }
}

const sidebar = {
  '/canvas/': [sidebarItem('Canvas 绘图', '/canvas/', ['README', 'api'])],
  '/html-css/': [sidebarItem('HTML + CSS', '/html-css/', ['README'])],
  '/nestjs/': [sidebarItem('Nest.js 框架', '/nestjs/', ['README'])],
  '/mysql/': [
    sidebarItem('MySQL 数据库', '/mysql/', ['README', 'sql', 'function'])
  ],
  '/docker/': [sidebarItem('Docker 容器', '/docker/', ['README'])],
  '/webpack5-study/': [
    sidebarItem('Webpack5 从不会到入门', '/webpack5-study/', [
      'README',
      'the-simplest-example',
      'entry-output',
      'static-resource',
      'compile-with-babel',
      'html-css',
      'development-production',
      'create-vue',
      'optimization',
      'end',
      'meeting',
      'p1-cdn',
      'p2-loader'
    ])
  ],
  '/markdown/': [
    '/markdown/README.md',
    '/markdown/flow.md',
    '/markdown/latex.md'
  ],
  '/aoda-css/': [
    '/aoda-css/README.md',
    '/aoda-css/start.md',
    '/aoda-css/api.md',
    '/aoda-css/extend.md'
  ],
  '/ecs-lite/': [
    '/ecs-lite/README.md',
    '/ecs-lite/start.md',
    '/ecs-lite/api.md'
  ],
  '/xiaomo/': [sidebarItem('设计理念', '/xiaomo/')],
  '/xiaomo-start/': [sidebarItem('快速开始', '/xiaomo-start/')]
}

export default sidebar
