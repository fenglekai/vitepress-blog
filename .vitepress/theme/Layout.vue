<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { ref, onMounted } from "vue";

const { Layout } = DefaultTheme;
const { page, frontmatter } = useData();

</script>

<template>
  <Layout>
    <template #home-hero-after>
    </template>
  </Layout>
</template>