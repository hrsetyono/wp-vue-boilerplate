<script setup>
import { useContentStore } from '@/stores/content';

import PostList from '@/components/PostList.vue';

const contentStore = useContentStore();
const { posts } = contentStore;
</script>

<template>
  <main class="home-page">
    <div class="wp-block-group alignfull has-background has-color-1-light-background-color">
      <div class="wp-block-group__inner-container">
        <h1 class="alignwide">
          Latest Posts
        </h1>
      </div>
    </div>
    <PostList :posts="posts" />
  </main>
</template>

<style lang="sass" scoped>
.home-page
  padding-bottom: var(--groupSpacing)
</style>
