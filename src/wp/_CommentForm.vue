<script setup>
import { ref } from 'vue';
import { useUIStore } from '@/stores-ui';
import { useWpStore } from './stores-wp';

const emit = defineEmits(['submit']);
const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
  parentId: {
    type: Number,
    default: null,
  },
});

const wpStore = useWpStore();
const uiStore = useUIStore();

const formBody = ref();
const formMessage = ref();
const formMessageType = ref('error');

const submitComment = async () => {
  uiStore.isLoading = true;
  formMessage.value = '';

  if (!formBody.value) {
    formMessage.value = 'Comment cannot be empty';
    formMessageType.value = 'error';
    return;
  }

  try {
    const response = await wpStore.postComment({
      post: props.postId,
      content: formBody.value,
      parent: props.parentId,
    });
    formMessage.value = 'Comment posted successfully';
    formMessageType.value = 'success';
    formBody.value = '';
    emit('submit', response.data);
  } catch (error) {
    formMessage.value = error.message;
    formMessageType.value = 'error';
  }

  uiStore.isLoading = false;
};
</script>

<template>
  <form class="comment-form" @submit.prevent="submitComment">
    <textarea
      v-model="formBody"
      rows="6"
      :placeholder="parentId ? 'Write your reply here' : 'Write your comment here'"
    />
    <p class="comment-form__submit">
      <input
        type="submit"
        :value="parentId ? 'Submit Reply' : 'Submit Comment'"
      >
    </p>

    <Transition name="fade" mode="out-in">
      <div
        v-if="formMessage"
        class="comment-form__message"
        :class="`is-${formMessageType}`"
      >
        {{ formMessage }}
      </div>
    </Transition>
  </form>
</template>

<style lang="sass" scoped>

.comment-form
  display: flex
  flex-wrap: wrap
  row-gap: 1rem
  column-gap: 1rem
  position: relative

  .comment &
    margin-top: 2rem

.comment-form__submit
  width: 100%

.comment-form__message
  width: 50%
  background-color: var(--textInvert)
  padding: 0.5rem 1rem
  border-left: 4px solid var(--colorAlert)
  border-radius: var(--gRadius)
  box-shadow: var(--shadow0)

  font-size: var(--sFontSize)

  &.is-success
    border-left-color: var(--colorGood)

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
</style>
