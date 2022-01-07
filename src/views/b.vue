<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()
</script>

<template>
  <div>
    <h1>B</h1>
    <button @click="router.push({ name: 'a' })">to A</button>
  </div>
</template>
