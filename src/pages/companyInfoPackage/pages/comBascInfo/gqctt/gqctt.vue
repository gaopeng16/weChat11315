<template>
  <div class="default-bg">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <web-view v-if="src" :src="src"></web-view>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import { clearTimeout } from "timers";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      host: config.host,
      title: "基本信息",
      subTitle: "股权穿透图",
      total: "",
      src: "",
      vipLevel: 0,
      screenWidth: 0,
      screenHeight: 0,
      companyId: ""
    };
  },
  methods: {
    checkLogin() {
      const loginInfo = wx.getStorageSync("loginInfo");
      if (!loginInfo) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        this.vipLevel = loginInfo.vipLevel;
      }
    },
    getWH() {
      const that = this;
      wx.getSystemInfo({
        success: function(res) {
          that.screenWidth = res.screenWidth;
          that.screenHeight = res.screenHeight;
          that.src =
            that.host +
            "/company/gqctt.html?companyId=" +
            that.companyId +
            "&autoWidth=" +
            that.screenWidth +
            "&autoHeight=" +
            that.screenHeight +
            "&user=true&vipLevel=" +
            that.vipLevel +
            "&isApp=1";
        }
      });
    }
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.checkLogin();
    this.getWH();
  }
};
</script>
<style lang="scss" scoped>
</style>

