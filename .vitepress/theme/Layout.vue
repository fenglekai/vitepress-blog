<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
import Twikoo from './components/Twikoo.vue'

const { Layout } = DefaultTheme;
const { page, frontmatter } = useData();

</script>

<template>
  <Layout>
    <template #home-features-after>
      <div class="home-comment-container">
        <div class="container">
          <Twikoo></Twikoo>
        </div>
      </div>
    </template>
    <template #doc-after>
      <Twikoo></Twikoo>
    </template>
  </Layout>
</template>

<style>
.home-comment-container {
  padding: 0 24px;
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 640px) {
  .home-comment-container {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .home-comment-container {
    padding: 0 64px;
  }
}
</style>