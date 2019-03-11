<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content" :key="index" v-for="(item,index) in equityChangeInfo">
      <BlockTitle :bt="bt" :title="item.inv?item.inv:'企业选择不公开'" :hasBt="true"></BlockTitle>
      <div class="lh50">
        变更前股权比例：
        <span class="font-click">{{item.transamprpre?item.transamprpre:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        变更后股权比例：
        <span class="font-click">{{item.transampraf?item.transampraf:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        股权变更日期：
        <span class="font-click">{{item.altdate?item.altdate:"企业选择不公开"}}</span>
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
      subTitle: "股权变更信息",
      total: "",
      noTitle: "",
      bt: "股东"
    };
  },
  computed: {
    equityChangeInfo() {
      return JSON.parse(store.state.annualreportData.equityChangeInfo);
    }
  },
  mounted() {
    this.total = this.equityChangeInfo.length;
  }
};
</script>
<style lang="scss" scoped>
</style>

