<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { useContentStore } from '@/stores-content';

const route = useRoute();
const contentStore = useContentStore();
const post = ref();
const nextPost = ref();
const prevPost = ref();

const onReady = () => {
  const index = contentStore.posts.findIndex((p) => p.slug === route.params.slug);

  if (index < 0) { return; }

  const nextIndex = index === 0 ? null : index + 1;
  const prevIndex = index === contentStore.posts.length - 1 ? null : index - 1;

  post.value = contentStore.posts[index];
  document.title = document.title.replace(route.meta.title, post.value.title.rendered);

  if (nextIndex) {
    nextPost.value = contentStore.posts[nextIndex];
  }
  if (prevIndex) {
    prevPost.value = contentStore.posts[prevIndex];
  }
};

// trigger onReady after route changed or after first mounted
watch(route, onReady);
onMounted(onReady);
</script>

<template>
  <section v-if="post" class="post">
    <header class="wp-block-group | post__header">
      <div class="wp-block-group__inner-container">
        <div class="wp-block-columns alignwide">
          <div class="wp-block-column">
            <h1>{{ post.title.rendered }}</h1>
            <time>{{ post.date }}</time>
          </div>
          <div
            v-if="post._embedded['wp:featuredmedia']"
            class="wp-block-column"
            style="flex-basis:30%"
          >
            <figure>
              <img :src="post._embedded['wp:featuredmedia'][0].source_url">
            </figure>
          </div>
        </div>
      </div>
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

  figure
    position: relative
    border: 4px solid var(--textInvert)
    border-radius: var(--gRadius)
    margin-bottom: -3rem
    padding-bottom: 70%
    height: 0
    box-shadow: var(--shadow1)

  img
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center center

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
