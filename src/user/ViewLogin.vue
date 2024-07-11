<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUIStore } from '@/stores-ui';
import { useAuthStore } from './stores-auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUIStore();
const emit = defineEmits(['message']);

const username = ref('');
const password = ref('');

/**
 * Do login and handle error / success
 */
const login = async () => {
  uiStore.isLoading = true;

  try {
    await authStore.login(username.value, password.value);
    emit('message', 'loginSuccess', 'good');
    setTimeout(() => {
      router.push(route.query.redirectTo || { name: 'home' });
    }, 1000);
  } catch (error) {
    emit('message', error.message);
  }

  uiStore.isLoading = false;
};
</script>

<template>
  <section>
    <form class="user-form" @submit.prevent="login">
      <label class="user-form__field">
        <span>Email or Username</span>
        <input
          v-model.trim="username"
          type="text"
        >
      </label>
      <label class="user-form__field">
        <span>Password</span>
        <input v-model.trim="password" type="password">
      </label>
      <router-link :to="{ name: 'passwordForgot' }" class="user-form__field-caption">
        Forgot Password?
      </router-link>

      <div class="user-form__submit">
        <button type="submit">
          Log In
        </button>
      </div>
    </form>

    <footer class="form-links">
      Don't have an account?
      <router-link :to="{ name: 'register' }">
        Register Now
      </router-link>
    </footer>
  </section>
</template>

<style lang="sass" scoped>
@import "@assets/helpers"
@import "@/user/user"
</style>
