<template>
  <div class="default-bg">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <web-view :src="host+'/phone-shares.html?companyId='+companyId+'&companyName='+companyName"></web-view>
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
      total: "",
      companyId: ""
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.companyName = this.$root.$mp.query.companyName;
    console.log(this.companyId,this.companyName)
  }
};
</script>
<style lang="scss" scoped>
</style>

