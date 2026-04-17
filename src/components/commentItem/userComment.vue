<script setup lang="ts">
  import { useDataStore } from '../../stores/dataStore';
  import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
  import { ref } from 'vue';

  const comment = ref(``);
  const dataStore = useDataStore();
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isDesktop = breakpoints.greater('lg');

  const submitComment = () => {
    dataStore.createComment(
      comment.value,
    );
    dataStore.isAddComment = true;
    comment.value = ` `;
  }
</script>

<template>
  <section class="container" v-if="isDesktop && !dataStore.isAddComment">
    <img :src="dataStore.userData.currentUser.image.webp" alt="userImage" class="userImageNew">
    <textarea class="replyInput" placeholder="Add a comment..." v-model="comment"></textarea>
    <button type="button" class="replyBtn" @click="submitComment">
      <span>SEND</span>
    </button>
  </section>
  <section class="container" v-else-if="!isDesktop && !dataStore.isAddComment">
    <textarea class="replyInput" placeholder="Add a comment..." v-model="comment"></textarea>
    <div class="interaction">
      <img :src="dataStore.userData.currentUser.image.webp" alt="userImage" class="userImageNew">
      <button type="button" class="replyBtn" @click="submitComment">
        <span>SEND</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
  @import './commentItem.css';
</style>