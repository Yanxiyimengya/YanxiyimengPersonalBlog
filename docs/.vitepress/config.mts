import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/YanxiyimengPersonalBlog/',
  srcDir: 'src',
  title: '忆梦的博客',
  description: '忆梦的个人技术博客',
  themeConfig: {
    nav: [{ text: '首页', link: '/' }],

    sidebar: [],

    aside: true,

    outline: {
      level: [2, 3],
      label: '目录'
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/Yanxiyimengya/' }],

    docFooter: {
      prev: false,
      next: false
    },

    search: {
      provider: 'local'
    }
  }
})
