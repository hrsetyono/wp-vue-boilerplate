<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

import PostList from '../components/PostList.vue';

const store = useStore();
const posts = ref(store.state.posts);
</script>

<template>
  <main class="homepage">
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
.homepage
  padding-bottom: var(--groupSpacing)
</style>
