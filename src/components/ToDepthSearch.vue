<template>
  <div class="empty-body gray-body relative">
    <div class="empty text-center absolute">
      <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
      <div class="depth-btn" @click="toDepth">深度查询</div>
      <div class="sub-content-light mt20 text-center">点击深度查询更多内容</div>
    </div>
    <Vip v-if="showByVip"></Vip>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { SET_IS_DEPTH } from "@/store/mutation-types";
import Vip from "@/components/Vip";
import config from "@/config";
export default {
  props: ["url"],
  components: { Vip },
  data() {
    return {
      imgUrl: config.imgUrl,
      showByVip: false
    };
  },
  computed: {
    ...mapState(["companyName", "vipLevel"])
  },
  methods: {
    ...mapMutations({
      isDepth: SET_IS_DEPTH
    }),
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.vipLevel = loginInfo.vipLevel;
    },
    toDepth() {
      if (!this.vipLevel) {
        this.showByVip = true;
      } else {
        this.isDepth(true);
        wx.navigateTo({
          url: this.url + "?companyName=" + this.companyName
        });
      }
    }
  },
  mounted() {
    this.getLoginInfo();
  },
  onShow() {
    this.showByVip = false;
  }
};
</script>
<style lang="scss" scoped>
.empty-body {
  width: 100%;
  height: 100vh;
  .empty {
    width: 300rpx;
    height: 400rpx;
    left: 50%;
    top: 50%;
    margin-left: -150rpx;
    margin-top: -330rpx;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    .depth-btn {
      padding: 15rpx 20rpx;
      border-radius: 8rpx;
      background: #209bf9;
      color: #ffffff;
    }
  }
  .shade {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .shade-bg {
      width: 100%;
      height: 100%;
    }
    .vip {
      position: absolute;
      top: 20rpx;
      right: 0;
      width: 245rpx;
      height: 200rpx;
    }
  }
}
</style>
