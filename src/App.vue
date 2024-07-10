<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/user/stores-auth';

import Layout from '@/main/Layout.vue'; // this is preloaded to make transition smooth
import LayoutLogin from '@/user/LayoutLogin.vue';

const route = useRoute();

const getLayout = () => {
  switch (route.meta.layout) {
    case 'LayoutLogin':
      return LayoutLogin;
    default:
      return Layout;
  }
};

// Validate API token for every refresh
onMounted(async () => {
  const authStore = useAuthStore();
  authStore.validateToken();
});
</script>

<template>
  <component :is="getLayout()" />
</template>

<style lang="sass" scoped>
</style>
