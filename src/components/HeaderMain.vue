<script setup>
import { useStore } from 'vuex';
import MenuSVG from '../svg/menu.svg';

const store = useStore();
</script>

<template>
  <header class="header">
    <figure class="header__logo">
      <router-link :to="{name: 'home'}">
        <img src="/images/logo.svg">
      </router-link>
    </figure>

    <div class="header__toggle">
      <a @click="store.commit('toggleOffcanvas')">
        <MenuSVG />
      </a>
    </div>
  </header>
</template>

<style lang="sass" scoped>
.header
  display: flex
  background-color: var(--color1)
  padding: 0.5rem var(--gridRim)

.header__logo
  img
    max-height: 2rem

.header__toggle
  margin-left: auto

  svg
    height: 1rem
    width: 1rem
    filter: invert(1)
</style>
