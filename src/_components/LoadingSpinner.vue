<script setup>
</script>

<template>
  <div class="loading">
    <span />
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

  span
    width: 3rem
    height: 3rem
    border: 5px solid #FFF
    border-bottom-color: transparent
    border-radius: 50%
    display: inline-block
    box-sizing: border-box
    animation: loadingSpinner 1s linear infinite

@keyframes loadingSpinner
  0%
    transform: rotate(0deg)
  100%
      transform: rotate(360deg)
</style>
