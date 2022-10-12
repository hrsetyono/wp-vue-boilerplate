<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref, watch, onBeforeMount } from 'vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const route = useRoute();
const store = useStore();
const page = ref({ title: '', content: '' });
const isLoading = ref(true);

const onReady = async () => {
  isLoading.value = true;
  page.value = await store.dispatch('getPage', route.params.slug);
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
