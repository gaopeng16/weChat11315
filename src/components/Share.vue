<template>
  <div class="share-body">
    <div class="share-body">
      <div class="go-index left" @click="goHome">
        <img v-if="imgUrl" :src="imgUrl+'home.png'"> 首页
      </div>
      <div class="share-page left">
        <button open-type="share" plain="true">
          <img v-if="imgUrl" :src="imgUrl+'share.png'"> 分享
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  data() {
    return {
      imgUrl: config.imgUrl
    };
  },
  methods: {
    goHome() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.share-body {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  button[plain] {
    border: 0;
  }
  .go-index {
    width: 50%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #ffffff;
    color: #5c6b77;
    font-size: 30rpx;
    border-top: solid 1px #dddee1;
    overflow: hidden;
    img {
      vertical-align: middle;
      width: 53rpx;
      height: 56rpx;
      border: none;
      margin-top: -7rpx;
    }
  }
  .share-page {
    width: 50%;
    text-align: center;
    background: #209bf9;
  }
  .share-page button {
    height: 82rpx;
    line-height: 82rpx;
    overflow: hidden;
    font-size: 30rpx;
    color: #ffffff;
    img {
      vertical-align: middle;
      width: 37rpx;
      height: 35rpx;
      border: none;
      margin-top: -2rpx;
    }
  }
}
</style>
