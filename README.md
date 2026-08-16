# YmBlog

基于 [VitePress](https://github.com/vuejs/vitepress) 的简洁、轻量化的静态个人博客站点模板。
旨在能够通过 Markdown 快速便捷地编写、发布个人博客。

# 如何使用
你可以非常快速地部署 YmBlog！

## 前置准备
Node.js 20+

YmBlog 基于 VitePress，因此你需要安装相关依赖才能构建网页。

拿npm举例：使用 `npm` 安装命令: `npm install -D vitepress`。

随后，就可以在仓库根目录使用命令行执行 `npm run dev` 就可以打开预览。

详细可以查看 [VitePress快速开始](https://vitepress.dev/zh/guide/getting-started) 获取详细的部署信息。

对于 Windows 用户，本仓库提供了 `scripts/start.bat` 它可以自动帮助你安装依赖以及启动预览。

# 构建并部署静态站点

可以在仓库根目录运行 `npm run build` 执行构建，静态站点会生成在 `docs/.vitepress/dist` 下。

可以通过Github Actions执行快速发布：

比如，新建一个 `articles` 分支用于提交文章，再新建一个 `pages` 分支用于发布内容。

```bash
git checkout main

git checkout -b articles

git checkout -b pages
```

随后，在仓库的主分支 `/.github/workflows/` 添加 GithubActions 工作流文件 `deploy.yml` （或者直接在 Github 网站在线配置工作流）：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [pages]
    paths:
      - 'docs/**'
      - 'package.json'
      - 'package-lock.json'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v5
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: docs/.vitepress/dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

这个文件监听 `pages` 分支的推送后构建内容，提交工作流文件后

我们需要配置 Github Pages，在 `Settings > Code and automation > Pages > Build and deployment` 指定以 Github Actions 构建。

最后在Github网站找到你克隆仓库的 `Settings > Code and automation > Environments > github-pages`将 Configure github-pages 设置为 No restriction。

我们只需要在 `articles` 分支提交文章，在命令行执行：

```bash
git checkout pages

git merge articles
```

将 articles 分支合并进 pages 分支，触发 GithubActions 自动构建。
