<script setup>
</script>

<template>
  <!-- GIF generated from icons8.com -->
  <div class="loading">
    <img src="/images/loading.gif">
  </div>
</template>

<style lang="sass" scoped>
.loading
  display: flex
  justify-content: center
  align-items: center

  position: fixed
  top: 0
  left: 0
  z-index: 101
  height: 100%
  width: 100%
  background-color: rgba(black, .5)

  img
    width: 3rem
    border-radius: var(--largeRadius)
</style>
