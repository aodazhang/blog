/**
 * @description navbar导航栏配置
 */

const navbar = [
  { text: '关于', link: '/about/' },
  {
    text: '语雀',
    children: [
      {
        text: 'Nest.js 入门：最简单的 CURD（一）',
        link: 'https://www.yuque.com/aodazhang/work/uigdo9gtl0yucgx9'
      },
      {
        text: 'Nest.js 入门：参数校验与转换（二）',
        link: 'https://www.yuque.com/aodazhang/work/mnmgkep9ufo0uciq'
      },
      {
        text: 'Canvas 案例：贪吃蛇',
        link: 'https://www.yuque.com/aodazhang/work/fq379neymch7nfbq'
      }
    ]
  },
  {
    text: '专栏',
    children: [
      {
        text: '工程化',
        children: [{ text: 'Webpack5 从不会到入门', link: '/webpack5-study/' }]
      }
    ]
  },
  {
    text: '杂谈',
    children: [
      {
        text: '编程语言',
        children: [
          { text: 'TypeScript', link: '/typescript/' },
          { text: 'GLSL', link: '/glsl/' },
          { text: 'Markdown', link: '/markdown/' }
        ]
      },
      {
        text: '前端技术',
        children: [
          // { text: 'HTML + CSS', link: '/html-css/' }
          { text: 'Canvas 绘图', link: '/canvas/' }
        ]
      },
      {
        text: '后端技术',
        children: [
          { text: 'Nest.js 框架', link: '/nestjs/' },
          { text: 'MySQL 数据库', link: '/mysql/' }
          // { text: 'Docker 容器', link: '/docker/' }
        ]
      }
    ]
  },
  {
    text: '实验室',
    children: [
      {
        text: 'Library',
        children: [
          { text: 'aoda.css', link: '/aoda-css/' },
          { text: 'ecs-lite', link: '/ecs-lite/' }
        ]
      },
      {
        text: 'Project',
        children: [
          {
            text: '淘豆购票（用户端）',
            link: 'https://project.aodazhang.com/taodou-ticket'
          },
          {
            text: '淘豆购票（管理端）',
            link: 'https://project.aodazhang.com/taodou-ticket-admin'
          }
        ]
      }
    ]
  }
]

export default navbar
