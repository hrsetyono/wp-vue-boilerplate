import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { myFetch } from '@lib/MyFetch';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const route = useRoute();

  /**
   * User registration
   */
  async function register(fields) {
    try {
      const userId = await myFetch.post('/register', fields);
      return userId;
    } catch (error) {
      error.message = error.message || 'connectionError';
      return Promise.reject(error);
    }
  }

  /**
   * Get a nonce for validating submitted form
   */
  async function getRegisterNonce() {
    const response = await myFetch.get('/register/nonce');
    return response;
  }

  /**
   * Send a password reset email
   */
  async function forgotPassword(email) {
    try {
      const response = await myFetch.post('/password/forgot', {
        email,
        reset_url: window.location.origin + router.resolve({ name: 'passwordReset' }).fullPath,
      });

      return response;
    } catch (error) {
      error.message = error.message || 'connectionError';
      return Promise.reject(error);
    }
  }

  /**
   * Reset the password
   */
  async function resetPassword(pass, passConfirm) {
    try {
      const response = await myFetch.post('/password/reset', {
        user_pass: pass,
        user_pass_confirm: passConfirm,
        key: route.query.key,
        username: route.query.username,
      });

      return response;
    } catch (error) {
      error.message = error.message || 'connectionError';
      return Promise.reject(error);
    }
  }

  return {
    register,
    getRegisterNonce,

    forgotPassword,
    resetPassword,
  };
});

export default useUserStore;
