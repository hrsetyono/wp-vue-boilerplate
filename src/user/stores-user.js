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
      const response = await myFetch.post('/register', fields);

      return {
        status: response.status,
      };
    } catch (error) {
      return {
        status: error.response.status,
        code: error.response.data
          ? error.response.data.code
          : '',
        message: error.response.data
          ? error.response.data.message
          : 'connectionError',
      };
    }
  }

  /**
   * Get a nonce for validating submitted form
   */
  async function getRegisterNonce() {
    const response = await myFetch.get('/register/nonce');
    return response.data;
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

      return {
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.data
          ? error.response.data.message
          : 'connectionError',
      };
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

      return {
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.data
          ? error.response.data.message
          : 'connectionError',
      };
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
