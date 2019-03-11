<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content" :key="index" v-for="(item,index) in equityChangeInfoList">
      <BlockTitle :bt="bt" :title="item.investorName?item.investorName:'企业选择不公开'" :hasBt="true"></BlockTitle>
      <div class="lh50">
        变更前股权比例：
        <span class="font-click">{{item.ratioBefore?item.ratioBefore:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        变更后股权比例：
        <span class="font-click">{{item.ratioAfter?item.ratioAfter:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        股权变更日期：
        <span class="font-click">{{item.changeTime?item.changeTime:"企业选择不公开"}}</span>
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
    equityChangeInfoList() {
      return store.state.annualreportData.equityChangeInfoList;
    }
  },
  mounted() {
    this.total = this.equityChangeInfoList.length;
  }
};
</script>
<style lang="scss" scoped>
</style>

