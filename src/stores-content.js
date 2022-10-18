import { ref } from 'vue';
import { defineStore } from 'pinia';
import { wpApi, api } from './helpers';

export const useContentStore = defineStore('content', () => {
  const posts = ref([]);

  /**
   * Get list of blog posts
   */
  async function queryPosts() {
    if (posts.value.length <= 0) {
      const response = await wpApi.get('/posts?_embed');
      posts.value = response.data;
    }

    return posts;
  }

  /**
   * Get a Page title and content
   */
  async function queryPage(store, slug) {
    const response = await wpApi.get(`/pages?slug=${slug}`);
    return response.data;
  }

  return {
    posts,
    queryPosts,
    queryPage,
  };
});

export default useContentStore;
