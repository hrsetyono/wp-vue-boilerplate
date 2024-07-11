<script setup>
import { useRoute } from 'vue-router';
import { ref, watch, onBeforeMount } from 'vue';
import { useUIStore } from '@/stores-ui';
import { useWpStore } from './stores-wp';

const route = useRoute();
const uiStore = useUIStore();
const wpStore = useWpStore();

const page = ref();

const onReady = async () => {
  uiStore.isLoading = true;

  // API call to get page content
  page.value = await wpStore.getPage(route.params.slug);
  document.title = document.title.replace(route.meta.title, page.value.title.rendered);

  uiStore.isLoading = false;
};

// trigger onReady after route changed or before mounted
watch(route, onReady);
onBeforeMount(onReady);
</script>

<template>
  <section v-if="page" class="page">
    <h1>{{ page.title }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <main v-html="page.content" />
  </section>
</template>

<style lang="sass" scoped>
</style>
