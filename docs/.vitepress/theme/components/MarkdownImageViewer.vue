<script setup lang="ts">
import { computed, ref } from 'vue'
import { ImageViewer } from 'tdesign-vue-next'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    title?: string
  }>(),
  {
    alt: '',
    title: ''
  }
)

const visible = ref(false)

const images = computed(() => [
  {
    mainImage: props.src,
    thumbnail: props.src
  }
])

const viewerTitle = computed(() => props.title || props.alt || '')

function openViewer() {
  visible.value = true
}
</script>

<template>
  <span class="ym-markdown-image">
    <img
      class="ym-markdown-image__img"
      :src="src"
      :alt="alt"
      :title="title"
      loading="lazy"
      @click="openViewer"
    />

    <ImageViewer
      v-model="visible"
      :images="images"
      :title="viewerTitle"
      :close-on-overlay="true"
      :close-on-esc-keydown="true"
      :show-overlay="true"
    />
  </span>
</template>

<style scoped>
.ym-markdown-image {
  display: inline-block;
  max-width: 100%;
}

.ym-markdown-image__img {
  display: block;
  max-width: 100%;
  cursor: zoom-in;
}
</style>
