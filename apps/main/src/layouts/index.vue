<template>
  <div class="layout-wrapper">
    <LeftLayout />
  </div>
</template>

<script setup lang="ts">
import LeftLayout from './views/LeftLayout.vue';
import { startApps } from '@micro-app/micro';

onMounted(() => {
  startApps();
});
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
}
</style>
