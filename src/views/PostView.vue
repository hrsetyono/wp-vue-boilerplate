<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref, onMounted, watch } from 'vue';

const route = useRoute();
const store = useStore();

const post = ref();
const nextPost = ref();
const prevPost = ref();

const onReady = () => {
  const index = store.state.posts.findIndex((p) => p.slug === route.params.slug);

  if (index < 0) { return; }

  const nextIndex = index === 0 ? null : index + 1;
  const prevIndex = index === store.state.posts.length - 1 ? null : index - 1;

  post.value = store.state.posts[index];

  if (nextIndex) {
    nextPost.value = store.state.posts[nextIndex];
  }
  if (prevIndex) {
    prevPost.value = store.state.posts[prevIndex];
  }
};

// trigger onReady after route changed or after first mounted
watch(route, onReady);
onMounted(onReady);
</script>

<template>
  <section v-if="post" class="post">
    <header class="post__header">
      <h1>{{ post.title.rendered }}</h1>
      <time>{{ post.date }}</time>
    </header>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <main v-html="post.content.rendered" />

    <footer class="post__nav">
      <router-link v-if="prevPost" :to="`/post/${prevPost.slug}`">
        <label>« Previous Post</label>
        <h6>{{ prevPost.title.rendered }}</h6>
      </router-link>

      <router-link v-if="nextPost" :to="`/post/${nextPost.slug}`">
        <label>Next Post »</label>
        <h6>{{ nextPost.title.rendered }}</h6>
      </router-link>
    </footer>
  </section>
  <section v-else class="post-not-found">
    <h2>
      Post Not Found
    </h2>
    <p>
      The post you are looking for is not found or has been deleted.
    </p>
  </section>
</template>

<style lang="sass" scoped>
.post__header
  padding: 1rem var(--gridRim)
  background-color: var(--color1Light)
  margin-bottom: var(--groupSpacing)

  time
    display: block
    margin-top: var(--blockSpacing)

.post__nav
  display: flex
  column-gap: 1rem
  background-color: var(--grayLight)
  padding: 1rem
  margin-top: var(--groupSpacing)

  label
    display: inline-block
    margin-bottom: 0.5rem
  a
    display: inline-block
  a:last-child
    margin-left: auto
    text-align: right
</style>
