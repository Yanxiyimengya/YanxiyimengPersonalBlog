import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const base = ''
const icon = 'icon.svg'
const githubUrl = ''

export default defineConfig({
  base,
  srcDir: 'src',
  title: 'YmBlog',
  description: 'YmBlog',
  markdown: {
    config(md) {
      const defaultImageRule =
        md.renderer.rules.image ??
        ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const src = token.attrGet('src') ?? ''
        const alt = self.renderInlineAsText(token.children ?? [], options)
        const title = token.attrGet('title') ?? ''

        const escapeHtml = (value: string) =>
          md.utils.escapeHtml(value).replace(/"/g, '&quot;')

        if (!src) {
          return defaultImageRule(tokens, idx, options, env, self)
        }

        return `<MarkdownImageViewer src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" title="${escapeHtml(title)}" />`
      }
    }
  },
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
