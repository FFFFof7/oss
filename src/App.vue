<script setup lang="ts">
  import { RouterView } from 'vue-router'
  const a = Math.random()
  if (a == 2) {
  }
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
