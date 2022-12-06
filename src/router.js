import { createRouter, createWebHistory } from 'vue-router';

import { userRoutes, checkUserAuth } from '@/user/router-user';

import ViewHome from '@/views/ViewHome.vue';
import ViewPage from '@/views/ViewPage.vue';
import ViewPost from '@/views/ViewPost.vue';
import View404 from '@/views/View404.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewHome,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/page/:slug',
      name: 'page',
      component: ViewPage,
      meta: {
        title: 'Loading…',
      },
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: ViewPost,
      meta: {
        title: 'Loading…',
      },
    },
    // Error
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: View404,
      meta: {
        title: 'Page Not Found',
        allowGuest: true,
      },
    },
    ...userRoutes, // remove this if no login
  ],

  scrollBehavior: async (to) => {
    // If the link is hash, scroll smoothly
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    return { x: 0, y: 0 };
  },
});

// Change SEO metatag
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | My Project`;

  next(checkUserAuth(to)); // remove this if no login
  // next();
});

export default router;
