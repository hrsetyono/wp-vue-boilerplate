import { createRouter, createWebHistory } from 'vue-router';

import { useUserStore } from '@/stores/user';

import HomeView from '@/views/HomeView.vue';
import PageView from '@/views/PageView.vue';
import PostView from '@/views/PostView.vue';
import LoginView from '@/views/LoginView.vue';
import Error404 from '@/views/Error404.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/page/:slug',
      name: 'page',
      component: PageView,
      meta: {
        title: 'Loading…',
      },
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: PostView,
      meta: {
        title: 'Loading…',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
        allowGuest: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Error404,
      meta: {
        title: 'Page Not Found',
        allowGuest: true,
      },
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

router.beforeEach((to, from, next) => {
  // Change SEO metatag
  document.title = `${to.meta.title} | My Project`;

  const userStore = useUserStore();

  // if require login but not logged in
  if (!to.meta.allowGuest && !userStore.isLoggedIn) {
    next({
      name: 'login',
      query: { redirectTo: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
