<template>
  <div>
    <i-row>
      <i-col i-class="find-col" span="8" offset="4">
        <img @click="goSearch(4)" v-if="imgUrl" :src="imgUrl+'tb3_zgx.png'">
      </i-col>
      <i-col i-class="find-col" span="8" offset="2">
        <span @click="findSearch('/pages/companyClaimApplication/main')">
          <img v-if="imgUrl" :src="imgUrl+'tb3_qyrl.png'">
        </span>
      </i-col>
      <i-col i-class="find-col" span="8" offset="4">
        <span @click="findSearch('/pages/bussUserComMonitor/main')">
          <img v-if="imgUrl" :src="imgUrl+'tb3_ldjk.png'">
        </span>
      </i-col>
      <i-col i-class="find-col" span="8" offset="2">
        <span @click="findSearch('/pages/businessesAround/main')">
          <img v-if="imgUrl" :src="imgUrl+'tb3_qyzj.png'">
        </span>
      </i-col>
      <i-col i-class="find-col" span="8" offset="4">
        <span @click="findSearch('/pages/invoiceTitle/main')">
          <img v-if="imgUrl" :src="imgUrl+'tb3_hybg.png'">
        </span>
      </i-col>
      <i-col i-class="find-col" span="8" offset="2">
        <span @click="findSearch('/pages/newAddCompany/main')">
          <img v-if="imgUrl" :src="imgUrl+'tb3_add.png'">
        </span>
      </i-col>
    </i-row>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
import store from "@/store";
import NavigateBar from "@/components/NavigateBar";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  components: { NavigateBar },
  data() {
    return {
      navTitle: "发现",
      imgUrl: config.imgUrl,
      isLogin: false //判断是否登录
    };
  },
  methods: {
    myToast(con, type) {
      $Toast({
        content: con,
        type: type
      });
    },
    //判断登录状态
    checkLogin() {
      const loginInfo = wx.getStorageSync("loginInfo");
      if (!loginInfo) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    //跳转登录页
    goLogin() {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    },
    //找关系
    goSearch(type) {
      if (this.isLogin) {
        this.globalData.searchType = type;
        wx.switchTab({
          url: "/pages/search/main"
        });
      } else {
        this.myToast("请先登录!", "warning");
      }
    },
    findSearch(url) {
      if (this.isLogin) {
        wx.navigateTo({
          url: url
        });
      } else {
        this.myToast("请先登录!", "warning");
      }
    }
  },
  mounted() {
    this.checkLogin();
  },
  onShow() {
    if (!this.isLogin) {
      this.checkLogin();
    }
  }
};
</script>
<style lang="scss">
.find-col {
  margin: 50rpx 0;
  img {
    width: 200rpx;
    height: 200rpx;
  }
}
</style>
