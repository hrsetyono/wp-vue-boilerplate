<script setup>
import { useStore } from 'vuex';

import HouseSVG from '../svg/house.svg';
import UserSVG from '../svg/user.svg';
import PhoneSVG from '../svg/phone.svg';
import InstagramSVG from '../svg/social-instagram.svg';
import YoutubeSVG from '../svg/social-youtube.svg';
import TwitterSVG from '../svg/social-twitter.svg';

const store = useStore();
</script>

<template>
  <aside
    v-if="store.state.isOffcanvasOpen"
    class="offcanvas"
    @click="store.commit('closeOffcanvas')"
  >
    <Transition name="slide" appear>
      <div class="offcanvas__inner" @click.stop>
        <ul class="offcanvas__nav" @click="store.commit('closeOffcanvas')">
          <li>
            <router-link to="/">
              <HouseSVG />
              <span>Home</span>
            </router-link>
          </li>
          <li>
            <router-link to="/page/about-us">
              <UserSVG />
              <span>About Us</span>
            </router-link>
          </li>
          <li>
            <router-link to="/page/contact-us">
              <PhoneSVG />
              <span>Contact Us</span>
            </router-link>
          </li>
        </ul>

        <!-- Social Media -->
        <footer class="offcanvas__buttons">
          <a href="https://instagram.com" target="_blank">
            <InstagramSVG />
          </a>
          <a href="https://twitter.com" target="_blank">
            <TwitterSVG />
          </a>
          <a href="https://youtube.com" target="_blank">
            <YoutubeSVG />
          </a>
        </footer>
      </div>
    </Transition>

    <button
      class="offcanvas__close"
      @click="store.commit('closeOffcanvas')"
    />
  </aside>
</template>

<style lang="sass" scoped>
.offcanvas
  position: fixed
  z-index: 20
  top: 0
  right: 0
  bottom: 0
  left: 0
  background-color: rgba(black, .5)

.offcanvas__inner
  display: flex
  flex-direction: column
  overflow-y: auto
  background-color: var(--textInvert)

  position: absolute
  top: 0
  right: 0
  bottom: 0
  width: 300px
  box-shadow: var(--shadow1)

.offcanvas__nav
  list-style-type: none
  padding: 1rem

  a
    display: flex
    align-items: center
    padding: 0.75rem 1rem

  svg
    width: 1rem
    height: 1rem
    margin-right: 0.5rem

.offcanvas__buttons
  display: flex
  flex-wrap: wrap
  column-gap: 0.5rem
  row-gap: 0.5rem
  background-color: var(--grayLight)

  margin-top: auto
  border-top: 1px solid var(--grayLight)

  a
    display: flex
    align-items: center
    justify-content: center
    flex: 1
    padding: 1rem
    background-color: transparent

  svg
    width: 1.25rem
    height: 1.25rem
  :deep(path)
    fill: var(--gray)

.offcanvas__close
  display: inline-block
  position: absolute
  z-index: 5
  top: 0.5rem
  left: 0.5rem

  background: transparent url('../svg/times.svg') no-repeat center center
  background-size: 1.25rem auto
  opacity: .75
  filter: invert(1)

  width: 2.5rem
  height: 2.5rem
  padding: 0.5rem
  outline: none
  border: none

// ANIMATION
.slide-enter-from,
.slide-leave-to
  opacity: 0
  transform: translateX(50%)

.slide-enter-to,
.slide-leave-from
  opacity: 1
  transform: none

.slide-enter-active,
.slide-leave-active
  transition: var(--gTransition)
</style>