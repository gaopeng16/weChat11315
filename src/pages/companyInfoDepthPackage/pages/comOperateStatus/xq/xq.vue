<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div
      class="block-shadow-content"
      :key="index"
      v-for="(item,index) in developmentGoodsDemand"
      @click="developmentGoodsDemandDetail(item)"
    >
      <BlockTitle :bt="bt" :title="item.name" :hasBt="true"></BlockTitle>
      <div class="lh50 red">
        采购类型：
        <span class="red">{{item.type}}</span>
      </div>
      <div class="lh50">
        询价日期：
        <span class="font-click">{{item.start_time}}</span>
      </div>
      <div class="lh50">
        报价截止日期：
        <span class="font-click">{{item.end_time}}</span>
      </div>
      <div class="lh50">
        期望日期：
        <span class="font-click">{{item.expect_time}}</span>
      </div>
    </div>
    <!--  -->
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
      title: "经营状况",
      subTitle: "需求",
      total: "",
      bt: "需求名称"
    };
  },
  methods: {
    developmentGoodsDemandDetail(item) {
      store.commit("setDevelopmentGoodsDemandDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoDepthPackage/pages/comOperateStatus/xqDetail/main"
      });
    }
  },
  computed: {
    developmentGoodsDemand() {
      return store.state.companyDetailsData.development.goodsDemand;
    }
  },
  mounted() {
    this.total = this.developmentGoodsDemand.length;
  }
};
</script>
<style lang="scss" scoped>
</style>

