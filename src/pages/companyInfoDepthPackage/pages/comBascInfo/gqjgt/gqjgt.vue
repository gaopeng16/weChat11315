<template>
  <div class="default-bg">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <web-view :src="host+'/phone-shares.html?companyId='+companyId"></web-view>
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
      subTitle: "股权结构图",
      total: ""
    };
  },
  computed: {
    companyId() {
      return this.$store.state.companyId;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

