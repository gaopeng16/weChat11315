<template>
  <div class="min-height100 attention-body">
    <div class="pri-top">
      <i-row>
        <i-col span="12">
          <div class="vip-img">
            <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_vip3.png'">
          </div>
        </i-col>
        <i-col span="12">
          <div class="vip">{{ vipLevel == 0 ? '普通会员':'VIP会员'}}</div>
          <div>{{mobile}}</div>
        </i-col>
      </i-row>
      <a href="/pages/meOptions/vipPrivilege/main" class="look-privilege font-click">立即开通会员</a>
    </div>
    <div style="height:20rpx;background:#F0F0F0"></div>
    <div class="privilege-con">
      <img mode="widthFix" v-if="imgUrl && vipLevel" :src="imgUrl+'bg_vip2.png'">
      <img mode="widthFix" v-else-if="imgUrl" :src="imgUrl+'bg_vip1.png'">
    </div>
  </div>
</template>
<script>
import config from "@/config";
import { mapState } from "vuex";
import { formatTime, showLoading, hideLoading } from "@/utils";
export default {
  data() {
    return {
      imgFile: config.imgFile,
      imgUrl: config.imgUrl,
      userId: "",
      mobile: ""
    };
  },
  computed: {
    ...mapState(["vipLevel"])
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
.attention-body {
  background: #f7f7f7;
}
.pri-top {
  position: relative;
  padding: 30rpx 0;
  .vip {
    margin-top: 64rpx;
    font-size: 40rpx;
  }
  .look-privilege {
    position: absolute;
    top: 30rpx;
    right: 20rpx;
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
