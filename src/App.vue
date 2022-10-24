<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/user/stores-user';

import Layout from '@/Layout.vue'; // this is preloaded to make transition smooth
import LayoutLogin from '@/LayoutLogin.vue';

const route = useRoute();

const getLayout = () => {
  switch (route.meta.layout) {
    case 'LayoutLogin':
      return LayoutLogin;
      // return defineAsyncComponent(() => import('./LayoutLogin.vue'));

    default:
      return Layout;
  }
};

// Validate API token for every refresh
onMounted(async () => {
  const userStore = useUserStore();
  userStore.validateToken();
});
</script>

<template>
  <component :is="getLayout()" />
</template>

<style lang="sass" scoped>
</style>
