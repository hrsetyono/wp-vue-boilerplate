import { useUserStore } from '@/user/stores-user';

import ViewLogin from '@/user/ViewLogin.vue';
import ViewRegister from '@/user/ViewRegister.vue';
import ViewForgotPassword from '@/user/ViewForgotPassword.vue';

export const userRoutes = [
  {
    path: '/login',
    name: 'login',
    component: ViewLogin,
    meta: {
      title: 'Login',
      layout: 'Login',
      allowGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: ViewRegister,
    meta: {
      title: 'Register',
      layout: 'Login',
      allowGuest: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: ViewForgotPassword,
    meta: {
      title: 'Forgot Password',
      layout: 'Login',
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

  return null
}

export default userRoutes;
