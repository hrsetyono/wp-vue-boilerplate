<script setup>
import { ref, onMounted } from 'vue';
import { useUIStore } from '@/stores-ui';
import PostList from './_PostList.vue';
import { useWpStore } from './stores-wp';

const uiStore = useUIStore();
const wpStore = useWpStore();
const posts = ref([]);

onMounted(async () => {
  uiStore.isLoading = true;
  posts.value = await wpStore.getPosts();
  uiStore.isLoading = false;
});
</script>

<template>
  <main>
    <div class="wp-block-group alignfull has-background has-color-1-light-background-color">
      <h1 class="alignwide">
        Latest Posts
      </h1>
      <PostList :posts="posts" />
    </div>
  </main>
</template>

<style lang="sass" scoped>
</style>
