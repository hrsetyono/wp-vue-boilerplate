import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import PageView from './views/PageView.vue';
import PostView from './views/PostView.vue';

import Error404 from './views/Error404.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/page/:slug',
      name: 'page',
      component: PageView,
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: PostView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Error404,
    },
  ],
  scrollBehavior: async (to) => {
    // If the link is hash, scroll smoothly there
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    return { x: 0, y: 0 };
  },
});
