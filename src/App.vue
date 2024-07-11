<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/user/stores-auth';

import Layout from '@/main/Layout.vue'; // this is preloaded to make transition smooth
import LayoutLogin from '@/user/LayoutLogin.vue';
import LoadingSpinner from '@components/LoadingSpinner.vue';
import OfflineAlert from '@components/OfflineAlert.vue';
import VhFix from '@components/VhFix.vue';

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

  <VhFix />
  <LoadingSpinner />
  <OfflineAlert />
</template>

<style lang="sass" scoped>
</style>
