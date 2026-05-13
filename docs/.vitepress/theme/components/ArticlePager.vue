<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as posts } from '../posts.data'
import { getTopicPager } from '../utils/posts'

const { page } = useData()
const pager = computed(() => getTopicPager(posts, page.value.relativePath))
const hasNavigation = computed(() => Boolean(pager.value.prev || pager.value.next))

function resolveLink(url: string) {
  return withBase(url)
}
</script>

<template>
  <nav
    v-if="hasNavigation"
    class="prev-next"
    aria-labelledby="doc-footer-aria-label"
  >
    <span id="doc-footer-aria-label" class="visually-hidden">Pager</span>

    <div class="pager">
      <a
        v-if="pager.prev"
        class="VPLink link pager-link prev"
        :href="resolveLink(pager.prev.url)"
      >
        <span class="desc">上一页</span>
        <span class="title">{{ pager.prev.title }}</span>
      </a>
    </div>

    <div class="pager">
      <a
        v-if="pager.next"
        class="VPLink link pager-link next"
        :href="resolveLink(pager.next.url)"
      >
        <span class="desc">下一页</span>
        <span class="title">{{ pager.next.title }}</span>
      </a>
    </div>
  </nav>
</template>
