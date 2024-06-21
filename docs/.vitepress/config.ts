import type { DefaultTheme, Theme } from 'vitepress'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default () => {
  const sidebar = [
    {
      text: '指引',
      base: '/introduce/',
      items: [
        { text: '为什么选XParCai', link: '/why' },
        { text: '介绍', link: '/' },
        { text: '快速开始', link: '/starter' },
      ],
    },
    {
      text: '工具库',
      base: '/functions/',
      items: [
        {
          text: '@xparcai-utils/is',
          items: [
            { text: 'isType', link: '/is/isType' },
          ],
        },
      ],
    },
  ]

  function getFirstRoute(baseLink: string) {
    let concatLink = baseLink
    const recursion = (sidebarList: DefaultTheme.SidebarItem) => {
      if (sidebarList?.items)
        recursion(sidebarList.items?.[0])
      else
        concatLink = `/${concatLink}/${sidebarList?.link}`
    }
    const startSidebar = sidebar.find(f => f.base.includes(concatLink))
    if (startSidebar)
      recursion(startSidebar)
    return concatLink.replace(/\/+/g, '/')
  }

  const nav = [
    { text: '介绍', link: '/introduce/' },
    { text: '工具库', link: getFirstRoute('/functions/') },
  ]
  return defineConfig({
    title: 'XParCai工具库',
    description: 'Collection of common JavaScript or TypeScript utils.',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      outline: { label: '快速定位' },
      lastUpdated: { text: '最近更新时间' },
      docFooter: { prev: '上一篇', next: '下一篇' },
      editLink: {
        text: '为此页提供修改建议',
        pattern: 'https://github.com/xparcai/xparcai-utils/edit/main/docs/:path',
      },
      nav,
      sidebar,
      socialLinks: [
        { icon: 'github', link: 'https://github.com/xparcai/xparcai-utils' },
      ],

      notFound: {
        title: '页面找不到了',
        quote: '呀~这个工具函数大概是被吃掉了',
        linkText: '回到首页',
      },
    },
    markdown: {
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
  })
}
