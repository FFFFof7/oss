<template>
  <div class="full-screen-layout">
    <slot></slot>
  </div>
</template>
<style scoped lang="less">
  .full-screen-layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    :first-child {
      // width: 100%;
      // height: 100%;
    }
  }
</style>
