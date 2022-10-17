<script setup>
defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="wp-block-latest-posts is-grid columns-3 alignwide">
    <li
      v-for="p in posts"
      :key="`post-${p.id}`"
    >
      <figure v-if="p._embedded['wp:featuredmedia']" class="wp-block-latest-posts__featured-image">
        <router-link :to="`/post/${p.slug}`">
          <img :src="p._embedded['wp:featuredmedia'][0].source_url">
        </router-link>
      </figure>

      <router-link :to="`/post/${p.slug}`">
        {{ p.title.rendered }}
      </router-link>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <dd class="wp-block-latest-posts__post-excerpt" v-html="p.excerpt.rendered" />
      <time class="wp-block-latest-posts__post-date">
        {{ p.date }}
      </time>
    </li>
  </ul>
</template>

<style lang="sass" scoped>
@import '../css/helpers'

</style>
