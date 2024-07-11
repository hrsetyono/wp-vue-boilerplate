import { ref } from 'vue';
import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import { wpFetch } from '@lib/MyFetch';

export const useWpStore = defineStore('wp', () => {
  const cachedPosts = ref([]);

  /**
   * Get list of WP posts
   */
  async function getPosts() {
    if (cachedPosts.value.length === 0) {
      const response = await wpFetch.getFromSession('/posts?_embed');
      cachedPosts.value = response.map((p) => {
        p.date_formatted = dayjs(p.date).format('DD MMM YYYY');
        return p;
      });
    }

    return cachedPosts.value;
  }

  /**
   * Get single post data by slug
   */
  async function getPostBySlug(slug) {
    const posts = await getPosts();
    const post = posts.find((p) => p.slug === slug);
    return post;
  }

  /**
   * Get the previous and next post
   */
  async function getPostNav(slug) {
    const posts = await getPosts();
    const currentIndex = posts.findIndex((p) => p.slug === slug);

    const nextIndex = currentIndex === 0 ? null : currentIndex + 1;
    const prevIndex = currentIndex === posts.length - 1 ? null : currentIndex - 1;

    return {
      next: nextIndex ? posts[nextIndex] : null,
      prev: prevIndex ? posts[prevIndex] : null,
    };
  }

  /**
   * Get a Page title and content
   */
  async function getPage(store, slug) {
    const response = await wpFetch.get(`/pages?slug=${slug}`);
    return response.data;
  }

  /**
   * Get comments of a Post
   */
  async function getComments(postID) {
    const response = await wpFetch.get(`/comments?post=${postID}&hierarchical=true`);

    const rawComments = response.map((c) => {
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
      const response = await wpFetch.post('/comments', args);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    getPosts,
    getPostBySlug,
    getPostNav,
    getPage,
    getComments,
    postComment,
  };
});

export default useWpStore;
