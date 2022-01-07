<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()

  function clickHandle() {
    fetch('/api/test2', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res)
    })
  }
</script>

<template>
  <div>
    <h1 @click="clickHandle">A</h1>
    <button @click="router.push({ name: 'b' })">to B</button>
  </div>
</template>
