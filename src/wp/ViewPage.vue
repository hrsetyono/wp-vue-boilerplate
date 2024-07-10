<script setup>
import { useRoute } from 'vue-router';
import { ref, watch, onBeforeMount } from 'vue';

import { useWpStore } from './stores-wp';
import LoadingSpinner from '@components/LoadingSpinner.vue';

const route = useRoute();
const wpStore = useWpStore();

const page = ref();
const isLoading = ref(true);

const onReady = async () => {
  isLoading.value = true;

  // API call to get page content
  page.value = await wpStore.getPage(route.params.slug);
  document.title = document.title.replace(route.meta.title, page.value.title.rendered);

  isLoading.value = false;
};

// trigger onReady after route changed or before mounted
watch(route, onReady);
onBeforeMount(onReady);
</script>

<template>
  <LoadingSpinner v-if="isLoading" />
  <section v-else class="page">
    <h1>{{ page.title }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <main v-html="page.content" />
  </section>
</template>

<style lang="sass" scoped>
</style>
