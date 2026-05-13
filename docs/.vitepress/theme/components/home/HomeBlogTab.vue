<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../../posts.data'
import { buildTopicSummaries, filterPostsByTopic } from '../../utils/posts'

const allTopicName = '全部'
const activeTopic = ref(allTopicName)

const topics = computed(() => buildTopicSummaries(posts, allTopicName))

const filteredPosts = computed(() =>
  filterPostsByTopic(posts, activeTopic.value, allTopicName)
)

function resolveLink(url: string) {
  return withBase(url)
}

function selectTopic(topic: string) {
  activeTopic.value = topic
}
</script>

<template>
  <section class="space-main">
    <aside class="space-sidebar">
      <div class="space-panel">
        <div class="side-nav">
          <button
            v-for="topic in topics"
            :key="topic.name"
            class="side-nav__item"
            :class="{ active: activeTopic === topic.name }"
            type="button"
            @click="selectTopic(topic.name)"
          >
            <div class="side-nav__item__main">
              <span class="side-nav__item__main-text">{{ topic.name }}</span>
              <span class="side-nav__item__desc">{{ topic.description }}</span>
            </div>
            <div class="side-nav__item__sub">
              <span class="side-nav__item__sub-text">{{ topic.count }}</span>
            </div>
          </button>
        </div>
      </div>
    </aside>

    <section class="space-content">
      <div class="space-panel">
        <div class="space-content__header">
          <div class="space-content__tabs">
            <span class="space-content__tab active">{{ activeTopic }}</span>
            <!-- <span class="space-content__tab">{{ activeTopic }}</span> -->
          </div>

          <div class="space-content__summary">
            共 <strong>{{ filteredPosts.length }}</strong> 篇
          </div>
        </div>

        <div v-if="filteredPosts.length" class="article-list">
          <a
            v-for="post in filteredPosts"
            :key="post.url"
            class="article-item"
            :href="resolveLink(post.url)"
          >
            <div class="article-item__main">
              <h2>{{ post.title }}</h2>
              <p>{{ post.summary }}</p>

              <div v-if="post.tags.length" class="article-item__tags">
                <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>

            <div class="article-item__meta">
              <span class="article-item__topic">{{ post.topic }}</span>
              <span class="article-item__date">{{ post.date }}</span>
            </div>
          </a>
        </div>

        <div v-else class="empty-state">
          <p>当前专题下还没有文章。</p>
        </div>
      </div>
    </section>
  </section>
</template>
