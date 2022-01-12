<script setup lang="ts">
  import { ref, computed } from 'vue'
  import FullScreenLayout from '@/layout/FullScreenLayout.vue'
  import AccountSign from './accountSign.vue'
  import QrcodeSign from './qrcodeSign.vue'
  import login_qrcode from '@/assets/image/login_qrcode.png'
  import login_phone from '@/assets/image/login_phone.png'
  const signMode = ref('account')
  const modeImg = computed(() => {
    return signMode.value === 'account' ? login_qrcode : login_phone
  })
  function checkoutSignMode() {
    signMode.value = signMode.value === 'account' ? 'qrcode' : 'account'
  }
</script>

<template>
  <FullScreenLayout>
    <div class="login">
      <div class="sign-container">
        <div class="sing-qrcode" @click="checkoutSignMode">
          <img :src="modeImg" />
        </div>
        <AccountSign v-if="signMode === 'account'"></AccountSign>
        <QrcodeSign v-else></QrcodeSign>
      </div>
    </div>
  </FullScreenLayout>
</template>

<style scoped lang="less">
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(@/assets/image/login_bg.png);
    background-size: cover;
    background-color: #b8e5f8;
    .sign-container {
      width: 400px;
      height: 400px;
      padding: 0 24px;
      background: #fff;
      border-radius: 5px;
      position: relative;
      .sing-qrcode {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
  }
</style>
