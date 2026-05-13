import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const base = '/YanxiyimengPersonalBlog/'
const icon = 'icon.svg'
const githubUrl = 'https://github.com/Yanxiyimengya/'

export default defineConfig({
  base,
  srcDir: 'src',
  title: '忆梦的博客',
  description: '忆梦的个人技术博客',
  head: [
    ['link', { rel: 'icon', href: `${base}${icon}` }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' }
    ],

    sidebar: [],

    aside: true,

    outline: {
      level: [2, 3],
      label: '目录'
    },

    socialLinks: [{ icon: 'github', link: githubUrl }],

    docFooter: {
      prev: false,
      next: false
    },

    search: {
      provider: 'local'
    }
  }
})
