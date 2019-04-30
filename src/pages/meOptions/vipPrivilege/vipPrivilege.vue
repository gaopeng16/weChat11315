<template>
  <div>
    <i-tabs :current="current" @change="handleChange">
      <i-tab key="tab1" title="VIP会员"></i-tab>
      <i-tab key="tab2" title="企业会员"></i-tab>
      <i-tab key="tab3" title="SVIP会员"></i-tab>
    </i-tabs>
    <div v-if="current=='tab1'">
      <div class="pri-top">
        <i-row>
          <i-col span="12">
            <div class="vip-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_vip3.png'">
            </div>
          </i-col>
          <i-col span="12">
            <div class="vip font-click">VIP会员</div>
            <a href="/pages/meOptions/buyVip/main">
              <div class="vip-btn">立即成为VIP</div>
            </a>
          </i-col>
        </i-row>
      </div>
      <div style="height:20rpx;background:#F0F0F0"></div>
      <div class="privilege-con">
        <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'bg_vip2.png'">
      </div>
    </div>
    <!--  -->
    <div v-if="current=='tab2'">
      <div class="pri-top">
        <i-row>
          <i-col span="12">
            <div class="vip-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_vip2.png'">
            </div>
          </i-col>
          <i-col span="12">
            <div class="vip font-click">企业会员</div>
            <a href="/pages/meOptions/buyComVip/main">
              <div class="vip-btn">立即购买</div>
            </a>
          </i-col>
        </i-row>
      </div>
      <div style="height:20rpx;background:#F0F0F0"></div>
      <div class="privilege-con">
        <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'bg_vip3.png'">
      </div>
    </div>
    <!--  -->
    <div v-if="current=='tab3'">
      <div class="pri-top">
        <i-row>
          <i-col span="12">
            <div class="vip-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'svip.png'">
            </div>
          </i-col>
          <i-col span="12">
            <div class="vip font-click">SVIP会员</div>
            <a href="/pages/meOptions/buySvip/main">
              <div class="vip-btn">立即购买</div>
            </a>
          </i-col>
        </i-row>
      </div>
      <div style="height:20rpx;background:#F0F0F0"></div>
      <div class="privilege-con">
        <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'bg_vip3.png'">
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import config from "@/config";
import { formatTime, showLoading, hideLoading } from "@/utils";
export default {
  data() {
    return {
      imgFile: config.imgFile,
      imgUrl: config.imgUrl,
      userId: "",
      mobile: "",
      current: "tab1"
    };
  },
  methods: {
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
      this.mobile = loginInfo.mobile;
    },
    handleChange(detail) {
      this.current = detail.target.key;
    }
  },
  mounted() {
    this.getLoginInfo();
  }
};
</script>
<style lang="scss" scoped>
.pri-top {
  position: relative;
  padding: 30rpx 0;
  .vip {
    width: 200rpx;
    text-align: center;
    margin-top: 44rpx;
    font-size: 30rpx;
  }
  .vip-btn {
    width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    margin-top: 20rpx;
    border-radius: 35rpx;
    color: #ffffff;
    background: linear-gradient(to right, #58e5f7, #3babff);
    box-shadow: 0rpx 0rpx 10rpx 10rpx rgba(0, 0, 0, 0.1);
  }
}
.vip-img {
  width: 230rpx;
  height: 150rpx;
  margin: 30rpx auto;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.privilege-con {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
