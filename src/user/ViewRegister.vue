<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUIStore } from '@/stores-ui';
import { useUserStore } from './stores-user';

const router = useRouter();
const userStore = useUserStore();
const uiStore = useUIStore();
const emit = defineEmits(['message']);

const fields = ref({
  first_name: '',
  last_name: '',
  user_email: '',
  user_pass: '',
  user_pass_confirm: '',
  acf_gender: 'male',
  acf_job: '',
});

const nonce = ref('');
const timestamp = ref('');

/**
 * Do register and handle error / success
 */
const register = async () => {
  uiStore.isLoading = true;

  // clear all red border on error fields
  const $errorFields = document.querySelectorAll('.user-form__field.has-error');
  $errorFields.forEach(($f) => {
    $f.classList.remove('has-error');
  });

  try {
    const userId = await userStore.register({
      ...fields.value,
      _wpnonce: nonce.value,
      timestamp: timestamp.value,
    });

    sessionStorage.removeItem('registerForm');
    router.push({
      name: 'login',
      query: {
        message: 'registerSuccess',
        messageType: 'good',
      },
    });
  } catch (error) {
    emit('message', error.message);

    // Add red border to error field, the code is the same as field name
    document.querySelector(`[name=${error.code}]`).closest('label').classList.add('has-error');
    window.scrollTo(0, 0, { behavior: 'smooth' });
  }

  uiStore.isLoading = false;
};

// Backup any filled data so it's not empty if you refresh the page
const backupFilledData = () => {
  sessionStorage.setItem('registerForm', JSON.stringify(fields.value));
};

onMounted(async () => {
  // Get the nonce to validate in backend
  const response = await userStore.getRegisterNonce();
  nonce.value = response.nonce;
  timestamp.value = response.timestamp;

  // Restore filled data
  const cachedData = sessionStorage.getItem('registerForm');
  if (cachedData) {
    fields.value = JSON.parse(cachedData);
  }
});
</script>

<template>
  <section>
    <form
      class="user-form"
      @submit.prevent="register"
      @change="backupFilledData"
    >
      <label class="user-form__field">
        <span>Email</span>
        <input
          v-model="fields.user_email"
          type="text"
          name="user_email"
        >
      </label>
      <label class="user-form__field">
        <span>Password</span>
        <input
          v-model="fields.user_pass"
          type="password"
          name="user_pass"
        >
      </label>
      <label class="user-form__field">
        <span>Confirm Password</span>
        <input
          v-model="fields.user_pass_confirm"
          type="password"
          name="user_pass_confirm"
        >
      </label>
      <hr>
      <label class="user-form__field is-half">
        <span>First Name</span>
        <input
          v-model="fields.first_name"
          type="text"
        >
      </label>
      <label class="user-form__field is-half">
        <span>Last Name</span>
        <input
          v-model="fields.last_name"
          type="text"
        >
      </label>
      <label class="user-form__field">
        <span>Gender</span>
        <select v-model="fields.acf_gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label class="user-form__field is-half">
        <span>Birthday</span>
        <input
          v-model="fields.acf_birthday"
          type="text"
        >
      </label>
      <label class="user-form__field is-half">
        <span>Job</span>
        <input
          v-model="fields.acf_job"
          type="text"
        >
      </label>

      <div class="user-form__submit">
        <button type="submit">
          REGISTER NOW
        </button>
      </div>
    </form>

    <footer class="form-links">
      Already have an account?
      <router-link :to="{ name: 'login' }">
        Login Now
      </router-link>
    </footer>
  </section>
</template>

<style lang="sass" scoped>
@import "@assets/helpers"
@import "@/user/user"

.user-form
  width: 100%
  max-width: 640px
</style>
