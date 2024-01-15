/**
 * @description vuepress配置文件
 * @extends https://v2.vuepress.vuejs.org/zh/reference/config.html
 */
import { defaultTheme, defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import navbar from './navbar'
import sidebar from './sidebar'

export default defineUserConfig({
  // 一.站点配置
  base: '/',
  lang: 'zh-CN', // <html lang="zh-CN"></html>
  title: '空闲星', // <title>空闲星</title>
  description: '技术交流与分享', // <meta name="description" content="技术交流与分享">
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // favicon.ico
    ['meta', { name: 'renderer', content: 'webkit' }] // 国产浏览器强制 webkit 渲染
  ],

  // 二.主题配置
  theme: defaultTheme({
    // 1.常规
    logo: '/favicon.ico',
    backToHome: '返回首页', // 404 返回链接文字
    // 2.git仓库信息
    // repo: 'https://github.com/aodazhang/blog', // 源码 git 仓库地址
    // repoLabel: 'GitHub', // 源码 git 仓库文本
    // 3.git文档编辑
    editLink: false, // 开启文档 git 编辑
    // editLinkText: '在 Github 上编辑此页面', // 文档 git 编辑文本
    // docsRepo: 'https://GitHub.com/aodazhang/blog.git', // 文档 git 仓库地址
    // docsBranch: 'master', // 文档 git 仓库分支
    // docsDir: 'docs', // 文档 git 仓库目录
    lastUpdated: true, // 开启文档 git 编辑时间戳
    lastUpdatedText: '最后更新时间', // 文档 git 编辑时间戳文本
    contributors: false, // 开启文档贡献者
    contributorsText: '此文档贡献者', // 文档贡献者文本
    // 4.导航栏
    navbar,
    // 5.侧边栏
    sidebarDepth: 2, // 侧边栏标题深度：提取 h1、h2、h3 标签
    sidebar
  }),

  // 三.打包工具配置

  // 四.目录配置

  // 五.Markdown配置

  // 六.开发配置

  // 七.插件配置
  plugins: [
    searchPlugin() // 本地搜索
  ]
})
