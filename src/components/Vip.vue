<template>
  <div class="vip-body">
    <div class="vip-box relative">
      <img class="vip-bg" mode="widthFix" v-if="imgUrl" :src="imgUrl+'tc_bg_vip.png'">
      <a href="/pages/meOptions/vipPrivilege/main">
        <img class="vip-btn vip-btn1" mode="widthFix" v-if="imgUrl" :src="imgUrl+'tc_bg_01.png'">
      </a>
      <a href="/pages/meOptions/buyVip/main">
        <img class="vip-btn vip-btn2" mode="widthFix" v-if="imgUrl" :src="imgUrl+'tc_bg_02.png'">
      </a>
    </div>
  </div>
</template>
<script>
import config from "@/config.js";
export default {
  data() {
    return {
      imgUrl: config.imgUrl
    };
  }
};
</script>
<style lang="scss" scoped>
.vip-body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 9999;
  .vip-box {
    position: absolute;
    width: 400rpx;
    height: 500rpx;
    height: auto;
    left: 50%;
    top: 50%;
    margin-left: -200rpx;
    margin-top: -250rpx;
    .vip-bg {
      max-width: 100%;
      max-height: 100%;
    }
    .vip-btn {
      width: 146rpx;
      height: 80rpx;
      position: absolute;
      bottom: 30rpx;
    }
    .vip-btn1 {
      left: 42rpx;
    }
    .vip-btn2 {
      right: 42rpx;
    }
  }
}
</style>

