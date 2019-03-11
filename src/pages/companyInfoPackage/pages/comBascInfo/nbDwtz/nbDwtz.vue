<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content" :key="index" v-for="(item,index) in investInfo">
      <BlockTitle :bt="bt" :title="item.entname" :hasBt="true"></BlockTitle>
      <div class="lh50">注册号/统一信用代码：
        <span class="font-click">{{item.regno}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      title: "企业年报",
      subTitle: "对外投资信息",
      total: "",
      bt: "对外投资企业名称"
    };
  },
  computed: {
    investInfo() {
      return JSON.parse(store.state.annualreportData.investInfo);
    }
  },
  mounted() {
    this.total = this.investInfo.length;
  }
};
</script>
<style lang="scss" scoped>
</style>

