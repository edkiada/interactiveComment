<script setup lang="ts">
  import commentItem from '../components/commentItem/commentItem.vue';
  import UserComment from '../components/commentItem/userComment.vue';
  import { useDataStore } from '../stores/dataStore';

  const dataStore = useDataStore();
</script>

<template>
  <section class="mainContainer" v-if="dataStore.userData && dataStore.userData.comments">
    <commentItem 
      v-for="(item, index) in dataStore.userData.comments"
      :key="item"
      :comment="item"
      :currentUser="dataStore.userData.currentUser"
      :index="index"
      :parentArray="dataStore.userData.comments"
    />
  </section>
  <section class="mainContainer">
    <UserComment />
  </section>
</template>

<style scoped>
  @import '../styles/main.css';
</style>