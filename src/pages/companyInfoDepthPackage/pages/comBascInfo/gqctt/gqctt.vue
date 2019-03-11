<template>
  <div class="default-bg">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <web-view :src="src"></web-view>
  </div>
</template>
<script>
import store from "@/store";
import { mapState } from "vuex";
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
      src: ""
    };
  },
  computed: {
    ...mapState(["vipLevel"]),
    companyId() {
      return store.state.companyDetailsData.basicInfo.basic.id;
    }
  },
  methods: {
    checkLogin() {
      const loginInfo = wx.getStorageSync("loginInfo");
      if (!loginInfo) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    }
  },
  mounted() {
    this.checkLogin();
    this.src =
      this.host +
      "/company/gqctt.html?companyId=" +
      this.companyId +
      "&autoWidth=900&autoHeight=550&user=true&vipLevel=" +
      this.vipLevel +
      "&isApp=1";
  }
};
</script>
<style lang="scss" scoped>
</style>

