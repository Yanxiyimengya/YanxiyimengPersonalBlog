<script setup lang="ts">
import AboutContent from './about-me/about-me.md'
</script>

<template>
  <section class="space-main space-main--single">
    <section class="space-content space-content--single">
      <div class="space-panel space-about">
        <div class="vp-doc">
          <AboutContent />
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.space-about {
  padding: 24px 28px;
}

.space-about :deep(.vp-doc) {
  max-width: none;
}

.space-about :deep(.vp-doc > :first-child) {
  margin-top: 0;
}

.space-about :deep(.vp-doc h1),
.space-about :deep(.vp-doc h2) {
  border-top: 0;
  letter-spacing: 0;
}

.space-about :deep(.vp-doc h1) {
  margin: 0;
  font-size: 30px;
  line-height: 1.2;
}

.space-about :deep(.vp-doc h2) {
  margin: 0 0 12px;
  font-size: 17px;
  line-height: 1.35;
}

.space-about :deep(.vp-doc p),
.space-about :deep(.vp-doc li) {
  color: var(--vp-c-text-2);
  line-height: 1.85;
}

.space-about :deep(.about-hero) {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 24px;
  align-items: center;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(2, 132, 199, 0.06), transparent 48%),
    var(--vp-c-bg-soft);
}

.dark .space-about :deep(.about-hero) {
  background:
    linear-gradient(135deg, rgba(96, 165, 250, 0.12), transparent 48%),
    var(--vp-c-bg-soft);
}

.space-about :deep(.about-hero__media) {
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-about :deep(.about-hero__media img) {
  display: block;
  max-width: 104px;
  height: auto;
}

.space-about :deep(.about-eyebrow) {
  margin: 0 0 10px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.space-about :deep(.about-lead) {
  margin: 14px 0 0;
  font-size: 15px;
}

.space-about :deep(.about-grid) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.space-about :deep(.about-card) {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.space-about :deep(.about-card p) {
  margin: 0;
}

.space-about :deep(.about-card ul) {
  margin: 0;
  padding-left: 18px;
}

.space-about :deep(.about-card li + li) {
  margin-top: 8px;
}

.space-about :deep(.about-tags) {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.space-about :deep(.about-tag) {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1;
}

.space-about :deep(.about-links) {
  list-style: none;
  padding-left: 0 !important;
}

.space-about :deep(.about-links li + li) {
  margin-top: 10px;
}

.space-about :deep(.about-quote) {
  margin: 18px 0 0;
  padding: 18px 20px;
  border: 1px solid rgba(2, 132, 199, 0.18);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 14px;
  background: rgba(2, 132, 199, 0.05);
  color: var(--vp-c-text-1);
  font-size: 15px;
}

.dark .space-about :deep(.about-quote) {
  border-color: rgba(96, 165, 250, 0.2);
  background: rgba(96, 165, 250, 0.08);
}

@media (max-width: 640px) {
  .space-about {
    padding: 20px 16px;
  }

  .space-about :deep(.about-hero) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px;
  }

  .space-about :deep(.about-hero__media) {
    justify-content: flex-start;
  }

  .space-about :deep(.about-grid) {
    grid-template-columns: 1fr;
  }
}
</style>
