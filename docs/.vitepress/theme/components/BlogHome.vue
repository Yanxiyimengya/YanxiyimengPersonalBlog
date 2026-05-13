<script setup lang="ts">
import { computed, ref } from 'vue'
import { data as posts } from '../posts.data'
import HomeBlogTab from './home/HomeBlogTab.vue'
import profilePhoto from '../../../img/profile photo.jpg'

const tabs = [
  { key: 'blog', label: '博客', component: HomeBlogTab },
] as const

type HomeTabKey = (typeof tabs)[number]['key']

const activeTab = ref<HomeTabKey>('blog')

const postCount = computed(() => posts.length)
const topicCount = computed(() => new Set(posts.map((post) => post.topic)).size)
</script>

<template>
  <div class="blog-home bili-style-home">
    <section class="space-banner">
      <div class="space-banner__cover"></div>

      <div class="space-profile">
        <div class="space-profile__avatar">
          <img :src="profilePhoto" alt="头像" class="space-profile__avatar-image" />
        </div>

        <div class="space-profile__body">
          <div class="space-profile__info">
            <div class="space-profile__top">
              <h1>烟汐忆梦_YM</h1>
              <span class="space-profile__badge">技术博客</span>
            </div>

            <p class="space-profile__sign">喜欢计算机技术，喜欢游戏 XD</p>
          </div>

          <div class="space-profile__stats">
            <div class="space-stat">
              <span class="space-stat__label">文章数</span>
              <strong>{{ postCount }}</strong>
            </div>
            <div class="space-stat">
              <span class="space-stat__label">专题数</span>
              <strong>{{ topicCount }}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-nav">
      <div class="space-nav__tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="space-nav__tab"
          :class="{ active: activeTab === tab.key }"
          type="button"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </section>

    <component
      :is="tab.component"
      v-for="tab in tabs"
      v-show="activeTab === tab.key"
      :key="tab.key"
    />
    
  </div>
</template>
