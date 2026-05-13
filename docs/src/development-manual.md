---
title: YmBlog个人博客开发手册
date: 2026-05-13 13:00
summary: 记录个人博客的开发过程、开发规范、维护规则等
tags:
  - 开发
  - 前端
topic:
  name: 前端
  description:
---

# 前情提要

一直以来我都有想要搭建一个博客网站的想法，在分享技术博客时，我都习惯直接发布在 **Bilibili专栏** 上，但是由于 Bilibili 的专栏文档格式不太灵活，同时对 Markdown 支持不高，在编写专栏的时候还会偶尔与服务器断联导致内容丢失。

因此我搭建了这个 **个人博客**，用于技术分享。

## 文档项目技术栈的选择

最早我在处理项目文档编写的需求时接触到 docsify 这个框架。

对于文档编写，Markdown 驱动很适合写博客，同时我喜欢静态站点，不需要额外搭建一套复杂后台。

相对于 docsify，VitePress 在保证本身比较轻的同时，不依赖动态加载，这样网页的响应会比较快；而且 VitePress 的内置功能方便、可定制化程度较高，适合自由发挥，其热重载响应也非常快。

# 文档维护

- 本博客**页面框架、主题样式、代码脚本** 基于 [MIT License](https://github.com/Yanxiyimengya/YanxiyimengPersonalBlog/blob/main/LICENSE) 协议开源，所有人都可以预览、编辑项目的代码，用于构建自己的博客网站。
- 仓库内所有 **原创文章、笔记、教程、文字内容** 保留著作权，
  未经作者书面许可，**禁止商用、洗稿、原样转载、合集打包发布**。
- 文章允许个人学习用途合理引用，引用请注明原文出处与作者。

所有的文章在仓库目录的 `docs/src/` 路径下编写。

在文档的开头，可以使用 `frontmatter` 格式的元数据：

```yaml
title: <文章标题>
date: yyyy-MM-dd HH:mm
summary: <文章摘要信息>
tags:
  - <文章 tag1>
  - <文章 tag2>
topic:
  name: <文章所属合集>
  description: <文章所属合集简介>

head:
- - meta
  - name: description
    content: <文档简介>
- - meta
  - name: keywords
    content: <SEO信息1> <SEO信息2>
```

具体可以查看 [VitePress文档关于frontmatter的描述](https://vitepress.dev/zh/reference/frontmatter-config)

## 开发分支

对于页面的**布局修改**和**文章编写**，推荐使用不同的两个开发分支。

若需要预览项目，可以找到仓库目录 `scripts\start.bat` 运行这个批处理文件启动项目。

若需要清除构建的缓存页面，可以运行 `scripts\clear.bat`。

## 主页样式修改

你可以在位于仓库目录下的 `docs\.vitepress\theme\components\BlogHome.vue` 找到主页的 `vue` 样式。

### 修改头像

头像位于 `docs\img\profile photo.jpg` 按照源目录替换即可。
也可以直接并修改找到页面上方的 `import` 导入路径。

```ts
import profilePhoto from '../../../img/profile photo.jpg'
```

### 添加主页的分栏页

你可以找到页面上方的 `tabs` 常量数组，这里定义了主页的分栏子页，只需要添加一行关于页面的配置。

```ts
const tabs = [
  { key: 'blog', label: '博客', component: HomeBlogTab },
  { key: 'about', label: '关于我', component: HomeAboutTab },
  //..
] as const
```

- `key` 是这个子页的 `标识符`。
- `label` 是这个分栏显示的文本。
- `component` 是对应子页的 `.vue` 页面，需要将对应页面放到 `docs\.vitepress\theme\components\home\` 下。

比如，你可以编写一个引导器页面，用MD文档编写内容。

```vue
<script setup lang="ts">
import Content from './content.md'
</script>

<template>
  <section class="space-main space-main--single">
    <section class="space-content space-content--single">
      <div class="space-panel" style="padding: 24px 28px;">
        <div class="vp-doc">
          <Content />
        </div>
      </div>
    </section>
  </section>
</template>
```

### 修改默认分栏页

你可以在主页的 `activeTab` 字段指定默认展示的子页标识符。

```ts
const activeTab = ref<HomeTabKey>('blog') // 这里指定首页
```

这样每次进入首页，就会自动进入当前分栏页。
