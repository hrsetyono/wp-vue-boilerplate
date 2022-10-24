<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/user/helpers-user';

const router = useRouter();
const emit = defineEmits(['message', 'loading']);

const newPassword = ref('');
const newPasswordConfirm = ref('');

/**
 * Submit reset password request
 */
const resetPassword = async () => {
  emit('loading', true);

  const response = await api.post('/password/reset', {
    user_pass: newPassword,
    user_pass_confirm: newPasswordConfirm,
  });

  emit('loading', false);

  switch (response.status) {
    // if working
    case 200:
      router.push({
        name: 'login',
        query: {
          message: response.data.message,
          messageType: 'good',
        },
      });
      break;

    // if error
    case 403:
    case 500:
      emit('message', response.data.message);
      break;

    default:
      emit('message', 'Connection error. Is your internet fine?');
  }
};
</script>

<template>
  <section>
    <form class="user-form" @submit.prevent="resetPassword">
      <label class="user-form__field">
        <span>New Password</span>
        <input
          v-model="newPassword"
          type="password"
        >
      </label>

      <div class="user-form__submit">
        <button type="submit">
          Reset Password
        </button>
      </div>
    </form>

    <footer class="form-links">
      <router-link :to="{ name: 'login' }">
        Login
      </router-link>
      |
      <router-link :to="{ name: 'register' }">
        Register
      </router-link>
    </footer>
  </section>
</template>

<style lang="sass" scoped>
@import "@/css/helpers"
@import "@/user/user"
</style>
