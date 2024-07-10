<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from './stores-user';

const emit = defineEmits(['message', 'loading']);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const newPassword = ref('');
const newPasswordConfirm = ref('');

const isValidURL = computed(() => route.query.username && route.query.key);

/**
 * Submit reset password request
 */
const resetPassword = async () => {
  emit('loading', true);
  const response = await userStore.resetPassword(
    newPassword.value,
    newPasswordConfirm.value,
  );
  emit('loading', false);

  switch (response.status) {
    // if working
    case 200:
      newPassword.value = '';
      newPasswordConfirm.value = '';

      router.push({
        name: 'login',
        query: {
          message: response.message,
          messageType: 'good',
        },
      });
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
  <section v-if="isValidURL">
    <form
      class="user-form"
      @submit.prevent="resetPassword"
    >
      <p>
        Enter a new password for your account:
      </p>
      <label class="user-form__field">
        <span>New Password</span>
        <input
          v-model="newPassword"
          type="password"
        >
      </label>
      <label class="user-form__field">
        <span>New Password Confirm</span>
        <input
          v-model="newPasswordConfirm"
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
      <router-link :to="{ name: 'passwordForgot' }">
        Back to Forgot Password
      </router-link>
    </footer>
  </section>
  <section v-else>
    <div class="user-form has-text-align-center">
      <p>
        The link you followed has already expired. Please fill the Forgot Password form again.
      </p>
      <p>
        <router-link class="button" :to="{ name: 'passwordForgot' }">
          Back to Forgot Password
        </router-link>
      </p>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import "@assets/helpers"
@import "@/user/user"
</style>
