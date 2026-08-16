<script setup lang="ts">
import { computed, provide } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { dataSymbol } from 'vitepress/dist/client/app/data'
import ArticlePager from './components/ArticlePager.vue'
import { data as posts } from './posts.data'
import { getTopicSidebar } from './utils/posts'

const appData = useData()
const DefaultThemeLayout = DefaultTheme.Layout

const theme = computed(() => {
  const topicSidebar = getTopicSidebar(posts, appData.page.value.relativePath)

  if (!topicSidebar.length) {
    return appData.theme.value
  }

  return {
    ...appData.theme.value,
    sidebar: topicSidebar
  }
})

provide(dataSymbol, {
  ...appData,
  theme
})
</script>

<template>
  <DefaultThemeLayout>
    <template #doc-after>
      <ArticlePager />
    </template>
  </DefaultThemeLayout>
</template>
