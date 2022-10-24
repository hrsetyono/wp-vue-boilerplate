<script setup>
import { ref, defineEmits } from 'vue';
import { api } from '@/user/helpers-user';

const emit = defineEmits(['message', 'loading']);

const email = ref('');

/**
 * Submit reset password request
 */
const forgotPassword = async () => {
  emit('loading', true);

  const response = await api.post('/password/forgot', {
    email,
  });

  emit('loading', false);

  switch (response.status) {
    // if working
    case 200:
      emit('message', response.data.message, 'good');
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
    <form class="user-form" @submit.prevent="forgotPassword">
      <p>
        Provide us with your email and we will send a link to reset your password.
      </p>
      <label class="user-form__field">
        <span>Email</span>
        <input
          v-model="email"
          type="email"
        >
      </label>

      <div class="user-form__submit">
        <button type="submit">
          Send Request
        </button>
      </div>
    </form>

    <footer class="form-links">
      <router-link :to="{ name: 'login' }">
        Back to Login
      </router-link>
    </footer>
  </section>
</template>

<style lang="sass" scoped>
@import "@/css/helpers"
@import "@/user/user"
</style>
