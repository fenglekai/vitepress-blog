<script setup>
import DefaultTheme from "vitepress/theme";
import { jarallax, jarallaxVideo } from "jarallax";
import { useData } from "vitepress";
import { ref, onMounted } from "vue";

const { Layout } = DefaultTheme;
const { page, frontmatter } = useData();
const jarallaxRef = ref(null);

onMounted(() => {
  // Optional video extension
  jarallaxVideo();
  let url = "mp4:/bgVideo.mp4";
  jarallax(jarallaxRef.value, {
    speed: 0.2,
    videoSrc: url,
  });
});
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <div ref="jarallaxRef" class="jarallax-wrapper"></div>
    </template>
  </Layout>
</template>

<style scoped>
.jarallax-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.3;
}
</style>
