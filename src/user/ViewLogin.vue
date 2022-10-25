<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/user/stores-auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits(['message', 'loading']);

const email = ref('');
const password = ref('');

/**
 * Do login and handle error / success
 */
const login = async () => {
  emit('loading', true);
  const response = await authStore.login(email.value, password.value);
  emit('loading', false);

  switch (response.status) {
    // if working
    case 200:
      emit('message', response.message, 'good');

      setTimeout(() => {
        router.push(route.query.redirectTo || { name: 'home' });
      }, 1000);
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
    <form class="user-form" @submit.prevent="login">
      <label class="user-form__field">
        <span>Email</span>
        <input
          v-model="email"
          type="email"
        >
      </label>
      <label class="user-form__field">
        <span>Password</span>
        <input v-model="password" type="password">
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
@import "@/css/helpers"
@import "@/user/user"
</style>
