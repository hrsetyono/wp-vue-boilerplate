<script setup>
import { ref } from 'vue';
import { useUIStore } from '@/stores-ui';
import { useUserStore } from './stores-user';

const emit = defineEmits(['message']);
const uiStore = useUIStore();
const userStore = useUserStore();

const email = ref('');

/**
 * Submit reset password request
 */
const forgotPassword = async () => {
  uiStore.isLoading = true;

  try {
    const response = await userStore.forgotPassword(email.value);
    emit('message', response.message, 'good');
    email.value = '';
  } catch (error) {
    emit('message', error.message);
  }

  uiStore.isLoading = false;
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
