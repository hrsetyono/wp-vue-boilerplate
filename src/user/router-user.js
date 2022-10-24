import { useUserStore } from '@/user/stores-user';

import ViewLogin from '@/user/ViewLogin.vue';
import ViewRegister from '@/user/ViewRegister.vue';
import ViewPasswordForgot from '@/user/ViewPasswordForgot.vue';
import ViewPasswordReset from '@/user/ViewPasswordReset.vue';

export const userRoutes = [
  {
    path: '/login',
    name: 'login',
    component: ViewLogin,
    meta: {
      title: 'Login',
      layout: 'LayoutLogin',
      allowGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: ViewRegister,
    meta: {
      title: 'Register',
      layout: 'LayoutLogin',
      allowGuest: true,
    },
  },
  {
    path: '/password-forgot',
    name: 'passwordForgot',
    component: ViewPasswordForgot,
    meta: {
      title: 'Forgot Password',
      layout: 'LayoutLogin',
      allowGuest: true,
    },
  },
  {
    path: '/password-reset',
    name: 'passwordReset',
    component: ViewPasswordReset,
    meta: {
      title: 'Reset Password',
      layout: 'LayoutLogin',
      allowGuest: true,
    },
  },
];

/**
 * Get route args depending on auth state
 */
export const getNextRoute = (to) => {
  const userStore = useUserStore();

  // if allow guest, no need to check for loggedIn status
  if (to.meta.allowGuest) {
    return null;
  }

  // if not logged in
  if (!userStore.isLoggedIn) {
    return {
      name: 'login',
      query: {
        redirectTo: to.fullPath,
        message: 'Please login to view that page',
      },
    };
  }

  return null;
};

export default userRoutes;
