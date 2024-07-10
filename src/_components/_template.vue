<script setup>
defineProps({
  title: {
    type: String,
    default: 'Hello World',
  },
});

const description = 'Lorem ipsum dolor sit amet';
</script>

<template>
  <h2>{{ title }}</h2>
  <p>{{ description }}</p>
</template>

<style lang="sass" scoped>
</style>
