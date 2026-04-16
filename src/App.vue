<script setup lang="ts">
import index from './views/main.vue';
import { useDataStore } from './stores/dataStore';
import { onMounted } from 'vue';

const dataStore = useDataStore();

onMounted(() => {
  dataStore.fetchData();
});
</script>

<template>
  <index />
</template>
