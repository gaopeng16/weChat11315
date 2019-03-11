<template>
  <div class="min-height100 gray-body">
    <div class="logo text-center">
      <img v-if="imgUrl" :src="imgUrl+'app_logo.png'">
      <span>企信查</span>
    </div>
    <div class="column overflow-hidden" @click="call">
      <img class="icon left" v-if="imgUrl" :src="imgUrl+'lianxi_call.png'">
      <div class="left ml10">
        电话:
        <span class="font-click">{{number}}</span>
      </div>
      <div class="right">
        <i-icon type="enter"/>
      </div>
    </div>
    <div class="line"></div>
    <div class="column overflow-hidden">
      <img class="icon left" v-if="imgUrl" :src="imgUrl+'lianxi_qq.png'">
      <div class="left ml10">QQ:248169769</div>
      <div class="right">
        <i-icon type="enter"/>
      </div>
    </div>
    <div class="line"></div>
    <div class="column overflow-hidden">
      <img class="icon left" v-if="imgUrl" :src="imgUrl+'lianxi_youxiang.png'">
      <div class="left ml10">商务合作:248169769@qq.com</div>
    </div>
    <div class="line"></div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      number: "400-18-11315"
    };
  },
  methods: {
    // 拨打电话
    call() {
      wx.makePhoneCall({
        phoneNumber: this.number
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  width: 120rpx;
  height: 170rpx;
  margin: 0rpx auto 30rpx auto;
  padding-top: 50rpx;
  line-height: 50rpx;
  img {
    width: 120rpx;
    height: 120rpx;
  }
}
.column {
  padding: 10rpx 30rpx;
  background: #ffffff;
  line-height: 60rpx;
  img {
    width: 30rpx;
    height: 30rpx;
    margin-top: 15rpx;
  }
}
</style>
