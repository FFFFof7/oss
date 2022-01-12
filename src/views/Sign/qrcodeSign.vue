<script setup lang="ts">
  import { ref, onUnmounted } from 'vue'
  import { message } from 'ant-design-vue'
  import 'ant-design-vue/lib/message/style/index.css'
  import { qrcodeSign, getScanInfo } from '@/api/sign'
  import img from '@/assets/image/qrcode.png'
  let timer: ReturnType<typeof setInterval>
  onUnmounted(() => {
    clearInterval(timer)
  })
  const qrcodeImg = ref(img)
  const isScan = ref(true)
  qrcodeSign().then(({ data: { img } }) => {
    qrcodeImg.value = img
    getScanStatus().then(() => {
      message.success('登录成功')
    })
  })
  function getScanStatus() {
    let scanInfo = {}
    let isResult = true
    return new Promise((resolve) => {
      timer = setInterval(() => {
        if (Object.keys(scanInfo).length === 0 && isResult) {
          isResult = false
          getScanInfo().then(({ data: { status }, code }) => {
            isResult = true
            if (code === 200) {
              if (status === 1) {
                isScan.value = true
              }
              if (status === 2) {
                scanInfo = {
                  a: 123
                }
                resolve(scanInfo)
                clearInterval(timer)
              }
            }
          })
        }
      }, 1000)
    })
  }
</script>

<template>
  <div class="qrcodeSign">
    <h1 class="title">扫码登录</h1>
    <div v-if="!isScan" class="peddling">
      <div class="qrcode-content">
        <img :src="qrcodeImg" class="sign-qrcode" />
        <img src="@/assets/image/qrcode_message.png" class="qrcode-message" />
      </div>
      <div class="qrcode-guide-message">
        <p
          >打开
          <a href="javascript:;">App</a>
        </p>
        <p> 在「我的」页面顶部打开扫一扫 </p>
        <p> 如扫码异常请下载最新版客户端 </p>
      </div>
    </div>
    <div v-else class="scan-success"><h1>已扫描</h1></div>
  </div>
</template>

<style scoped lang="less">
  .qrcodeSign {
    .title {
      margin-top: 24px;
      text-align: center;
      color: #121212;
      font-weight: 500;
      font-size: 24px;
    }
    .peddling {
      .qrcode-content {
        margin-top: 40px;
        position: relative;
        img {
          transition: all 0.3s ease;
        }
        &:hover {
          .sign-qrcode {
            transform: translate3d(-70px, 0, 0);
          }
          .qrcode-message {
            opacity: 1;
          }
        }
        .sign-qrcode {
          height: 150px;
          width: 150px;
          margin: 0 auto;
        }
        .qrcode-message {
          width: 128px;
          position: absolute;
          top: -25px;
          right: 20px;
          opacity: 0;
        }
      }
      .qrcode-guide-message {
        text-align: center;
        margin-top: 24px;
        p {
          color: #121212;
          font-size: 14px;
          line-height: 22px;
          a {
            color: #175199;
          }
        }
      }
    }
  }
</style>
