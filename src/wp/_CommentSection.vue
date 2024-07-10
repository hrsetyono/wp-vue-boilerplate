<script setup>
import { ref, onMounted } from 'vue';
import { useWpStore } from './stores-wp';
import CommentForm from './_CommentForm.vue';

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
});

const wpStore = useWpStore();
const comments = ref();
const replyingTo = ref();

const isLoading = ref(true);

/**
 * Add new comment to the array. If parent, add to first position. If child, add next to the parent.
 */
const addNewComment = (newComment) => {
  if (newComment.parent === 0) {
    comments.value.splice(0, 0, newComment);
  } else {
    const parentPos = comments.value.findIndex((c) => c.id === newComment.parent);
    comments.value.splice(parentPos + 1, 0, newComment);
  }
};

/**
 * Display a form next to a comment for Reply
 */
const toggleReplyForm = (commentId) => {
  if (commentId === replyingTo.value) {
    replyingTo.value = null;
  } else {
    replyingTo.value = commentId;
  }
};

// Get comments
onMounted(async () => {
  comments.value = await wpStore.getComments(props.postId);
  isLoading.value = false;
});
</script>

<template>
  <footer class="comment-section">
    <h4 class="has-text-align-center">
      Comments
    </h4>

    <CommentForm
      v-if="!replyingTo"
      :post-id="postId"
      @submit="addNewComment"
    />

    <div v-if="isLoading" class="comment-loading">
      <span />
    </div>
    <Transition
      v-else-if="comments"
      name="fade"
      mode="out-in"
      appear
    >
      <ol class="comments">
        <li
          v-for="c in comments"
          :key="c.id"
          class="comment"
          :class="{ 'is-child-comment': c.parent !== 0 }"
        >
          <header>
            <img :src="c.author_avatar_urls['48']">
            <strong>
              {{ c.author_name }}
            </strong>
            <time>
              {{ c.date_formatted }}
            </time>
          </header>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="comment__body" v-html="c.content.rendered" />

          <a
            v-if="(c.parent === 0)"
            href="#reply"
            @click.prevent="toggleReplyForm(c.id)"
          >
            {{ replyingTo === c.id ? 'Cancel' : 'Reply' }}
          </a>

          <CommentForm
            v-if="replyingTo === c.id"
            :post-id="postId"
            :parent-id="c.id"
            @submit="addNewComment"
          />
        </li>
      </ol>
    </Transition>
  </footer>
</template>

<style lang="sass" scoped>
.comment-section
  background-color: rgba(black, .025)
  padding: 1.5rem 0

  > *
    max-width: var(--contentSize)
    margin: 1rem auto

///// COMMENT LIST

.comments
  list-style-type: none
  padding: 0
  margin-top: 2rem

.comment
  position: relative
  background-color: var(--textInvert)
  padding: 1rem
  margin-bottom: 0.5rem
  border-radius: var(--gRadius)

  &.is-child-comment
    margin-left: 1.5rem

  header
    display: flex
    align-items: center
    column-gap: 0.5rem
    margin-bottom: 0.5rem
    line-height: 1
  img
    border-radius: 50%
    width: 30px
  time
    opacity: .75
    font-size: var(--xsFontSize)
    line-height: 1

.comment__body
  :deep(* + *)
    margin-top: 1rem

a[href="#reply"]
  position: absolute
  top: 1rem
  right: 1rem
  padding: 0 0.25rem
  border-radius: var(--gRadius)

  font-size: var(--xsFontSize)
  text-transform: uppercase

  &:hover
    background-color: var(--color1Light)

// Transition
.fade-enter-from,
.fade-leave-to
  opacity: 0
  transform: translateY(1rem)

.fade-enter-to,
.fade-leave-from
  opacity: 1
  transform: none

.fade-enter-active,
.fade-leave-active
  transition: var(--gTransition)
  transition-delay: .3s

// Loading
.comment-loading
  padding-top: 2rem
  text-align: center

  span
    width: 2.5rem
    height: 2.5rem
    border: 5px solid var(--color1)
    border-bottom-color: transparent
    border-radius: 50%
    display: inline-block
    box-sizing: border-box
    animation: commentLoadingSpinner 1s linear infinite

@keyframes commentLoadingSpinner
  0%
    transform: rotate(0deg)
  100%
      transform: rotate(360deg)

</style>
