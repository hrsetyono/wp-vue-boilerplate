<script setup>
import { ref, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/user/stores-user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const emit = defineEmits(['message', 'loading']);

const email = ref('');
const password = ref('');

/**
 * Do login and handle error / success
 */
const login = async () => {
  emit('loading', true);
  const response = await userStore.login(email.value, password.value);
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
      emit('message', response.message);
      break;

    default:
      emit('message', 'Connection error. Is your internet fine?');
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
