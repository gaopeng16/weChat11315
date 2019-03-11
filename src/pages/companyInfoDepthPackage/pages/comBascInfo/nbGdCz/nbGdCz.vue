<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content" :key="index" v-for="(item,index) in shareholderInfo">
      <BlockTitle :bt="bt" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        股东：
        <span class="font-click">{{item.investorName}}</span>
      </div>
      <div class="lh50">
        认缴出资额(万元)：
        <span class="font-click">{{item.subscribeAmount}}</span>
      </div>
      <div class="lh50">
        认缴出资时间：
        <span class="font-click">{{item.subscribeTime}}</span>
      </div>
      <div class="lh50">
        认缴出资方式：
        <span class="font-click">{{item.subscribeType}}</span>
      </div>
      <div class="lh50">
        实缴出资额(万元)：
        <span class="font-click">{{item.paidAmount}}</span>
      </div>
      <div class="lh50">
        实缴出资时间：
        <span class="font-click">{{item.paidTime}}</span>
      </div>
      <div class="lh50">
        实缴出资方式：
        <span class="font-click">{{item.paidType}}</span>
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
      subTitle: "股东及出资信息",
      total: "",
      noTitle: "",
      bt: "股东及出资信息"
    };
  },
  computed: {
    shareholderInfo() {
      return store.state.annualreportData.shareholderList;
    }
  },
  mounted(){
    this.total = this.shareholderInfo.length;
  }
};
</script>
<style lang="scss" scoped>
</style>

