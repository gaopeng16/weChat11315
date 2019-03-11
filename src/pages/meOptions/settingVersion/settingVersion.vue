<template>
  <div>
    <div class="logo text-center">
      <img v-if="imgUrl" :src="imgUrl+'app_logo.png'">
      <span>企信查</span>
    </div>
    <div class="about title text-center">已是最新版本: v{{version}}</div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      version: config.version
    };
  }
};
</script>
<style lang="scss" scoped>
.logo {
  width: 120rpx;
  height: 170rpx;
  margin: 50rpx auto 30rpx auto;
  line-height: 50rpx;
  img {
    width: 120rpx;
    height: 120rpx;
  }
}
.about {
  padding: 20rpx;
}
</style>
