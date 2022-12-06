import { ref } from 'vue';
import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import { wpApi, api } from './helpers';

export const useContentStore = defineStore('content', () => {
  const posts = ref([]);

  /**
   * Get list of blog posts
   */
  async function getPosts() {
    if (posts.value.length <= 0) {
      const response = await wpApi.get('/posts?_embed');
      posts.value = response.data.map((p) => {
        p.date_formatted = dayjs(p.date).format('DD MMM YYYY');
        return p;
      });
    }

    return posts;
  }

  /**
   * Get a Page title and content
   */
  async function getPage(store, slug) {
    const response = await wpApi.get(`/pages?slug=${slug}`);
    return response.data;
  }

  /**
   * Get comments of a Post
   */
  async function getComments(postID) {
    const response = await wpApi.get(`/comments?post=${postID}&hierarchical=true`);

    const rawComments = response.data.map((c) => {
      c.date_formatted = dayjs(c.date).format('DD MMM YYYY');
      return c;
    });

    const comments = rawComments.filter((c) => c.parent === 0);
    const childComments = rawComments.filter((c) => c.parent !== 0);

    childComments.forEach((cc) => {
      const parentIndex = comments.findIndex((c) => c.id === cc.parent);
      comments.splice(parentIndex + 1, 0, cc);
    });

    return comments;
  }

  /**
   *
   */
  async function postComment(args) {
    try {
      const response = await wpApi.post('/comments', args);
      return response;
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }

  return {
    posts,
    getPosts,
    getPage,
    getComments,
    postComment,
  };
});

export default useContentStore;
