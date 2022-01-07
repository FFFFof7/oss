<script setup lang="ts">
  import { RouterView } from 'vue-router'
  const a = Math.random()
  if (a == 2) {
  }
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade">
      <div class="container">
        <AButton type="primary">Primary Button</AButton>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>
</template>
