<script setup>
</script>

<template>
  <main class="home-page">
    <h1>Homepage</h1>
    <p>
      Welcome to Vue Boilerplate! To edit the homepage go to <code>/src/wp/ViewHome.vue</code>
    </p>
    <p>
      To change the base layout like Header and Footer, go to <code>/src/main/Layout.vue</code>
    </p>
    <p>
      <router-link :to="{ name: 'posts' }">Click here</router-link> to view blog posts.
    </p>
  </main>
</template>

<style lang="sass" scoped>
.home-page
  padding-bottom: var(--groupSpacing)
</style>
