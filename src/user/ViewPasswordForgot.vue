<script setup>
import { ref } from 'vue';
import { useUserStore } from './stores-user';

const emit = defineEmits(['message', 'loading']);
const userStore = useUserStore();

const email = ref('');

/**
 * Submit reset password request
 */
const forgotPassword = async () => {
  emit('loading', true);
  const response = await userStore.forgotPassword(email.value);
  emit('loading', false);

  switch (response.status) {
    // if working
    case 200:
      emit('message', response.message, 'good');
      email.value = '';
      break;

    // if error
    case 403:
    case 500:
    default:
      emit('message', response.message);
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
@import "@assets/helpers"
@import "@/user/user"
</style>
