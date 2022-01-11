<script setup lang="ts">
  import { ref } from 'vue'

  const signMode = ref('password')
  const signModeList = [
    {
      name: '密码登录',
      key: 'password'
    },
    {
      name: '免密码登录',
      key: 'phoneValid'
    }
  ]
  function checkoutSignMode(mode: string) {
    signMode.value = mode
  }
</script>

<template>
  <div class="sign-flow-tabs">
    <div
      v-for="mode in signModeList"
      :key="mode.key"
      :class="{ active: signMode === mode.key }"
      class="sign-flow-tab"
      @click="checkoutSignMode(mode.key)"
    >
      {{ mode.name }}
    </div>
  </div>
</template>

<style scoped lang="less">
  .sign-flow-tabs {
    width: 100%;
    display: flex;
    position: relative;
    .sign-flow-tab {
      width: 80px;
      height: 60px;
      font-size: 16px;
      line-height: 60px;
      margin-right: 24px;
      cursor: pointer;
      &.active {
        font-weight: 600;
        font-synthesis: style;
        &::after {
          width: 20%;
          height: 3px;
          display: block;
          position: absolute;
          bottom: 0;
          background-color: #06f;
          content: '';
        }
      }
    }
  }
</style>
