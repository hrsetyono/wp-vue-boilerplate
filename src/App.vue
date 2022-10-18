<script setup>
import { defineAsyncComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/user/stores-user';

const route = useRoute();

const getLayout = () => {
  const layout = route.meta.layout || '';
  return defineAsyncComponent(() => import(`./Layout${layout}.vue`));
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
