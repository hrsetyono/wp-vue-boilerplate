<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { useWpStore } from './stores-wp';

import CommentSection from './_CommentSection.vue';

const route = useRoute();
const wpStore = useWpStore();
const post = ref();
const nextPost = ref();
const prevPost = ref();

const onReady = async () => {
  post.value = await wpStore.getPostBySlug(route.params.slug);

  if (!post.value) { return; }

  document.title = document.title.replace(route.meta.title, post.value.title.rendered);

  const postNav = await wpStore.getPostNav(route.params.slug);
  nextPost.value = postNav.next;
  prevPost.value = postNav.prev;
};

// trigger onReady after route changed or after first mounted
watch(route, onReady);
onMounted(onReady);
</script>

<template>
  <section v-if="post" class="post">
    <header class="wp-block-group | post-header">
      <figure v-if="post._embedded['wp:featuredmedia']">
        <img :src="post._embedded['wp:featuredmedia'][0].source_url">
      </figure>

      <h1>{{ post.title.rendered }}</h1>
      <time>{{ post.date_formatted }}</time>
    </header>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <main v-html="post.content.rendered" />

    <nav class="post-nav">
      <router-link
        v-if="prevPost"
        :to="{name: 'post', params: { slug: prevPost.slug }}"
        rel="prev"
      >
        <img
          v-if="prevPost._embedded['wp:featuredmedia']"
          :src="prevPost._embedded['wp:featuredmedia'][0].source_url"
        >
        <p>
          <em>« Previous Post</em>
          {{ prevPost.title.rendered }}
        </p>
      </router-link>

      <router-link
        v-if="nextPost"
        :to="{name: 'post', params: { slug: nextPost.slug }}"
        rel="next"
      >
        <img
          v-if="nextPost._embedded['wp:featuredmedia']"
          :src="nextPost._embedded['wp:featuredmedia'][0].source_url"
        >
        <p>
          <em>Next Post »</em>
          {{ nextPost.title.rendered }}
        </p>
      </router-link>
    </nav>

    <CommentSection :post-id="post.id" />
  </section>
  <main v-else class="post-not-found">
    <h2>
      Post Not Found
    </h2>
    <p>
      The post you are looking for is not found or has been deleted.
    </p>
  </main>
</template>

<style lang="sass" scoped>
@import "@assets/helpers"

.post-header
  padding: 1rem var(--gridRim)
  background-color: var(--grayLight)
  margin-bottom: var(--groupSpacing)
  text-align: center

  time
    display: block
    margin-top: 0

  figure
    position: relative
    border: 4px solid var(--textInvert)
    border-radius: var(--gRadius)
    width: 100%
    box-shadow: var(--shadow1)
    aspect-ratio: 2 / 1
    object-fit: cover
    object-position: center center

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

///// POST NAV

.post-nav
  display: flex
  column-gap: 2rem
  max-width: var(--contentSize)
  padding: 2rem 0
  margin: 0 auto
  border-top: 1px solid rgba(black, .1)

  img
    transition: var(--gTransition)

  a
    display: flex
    flex: 1
    align-items: center
    padding: 0.5rem 0
    max-width: 50%
    text-decoration: none
    color: var(--text)

  a:hover
    opacity: .9
    color: var(--text)
    transform: translateY(-2px)

    img
      box-shadow: var(--shadow1)

  a:active
    transition: none
    transform: translateY(1px)

  img
    width: 70px
    height: 70px
    margin-right: 0.5rem
    background-color: var(--gray)
    border-radius: 50%

  p
    flex: 1
    font-weight: var(--hFontWeight)
    font-family: var(--hFontFamily)
    line-height: 1.25

  em
    display: block
    margin-bottom: 0.25rem

    text-transform: uppercase
    font-family: var(--fontFamily)
    font-size: var(--xsFontSize)
    font-style: normal
    font-weight: 400

  //
  @media ($below-xs)
    flex-wrap: wrap

    a
      flex: auto
      width: 100%
      max-width: 100%

.post-nav a[rel="next"]
  flex-direction: row-reverse
  text-align: right

  img
    margin-right: 0
    margin-left: 0.5rem
</style>
