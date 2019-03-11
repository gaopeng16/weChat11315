<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comOperateRisk/qsxx/main'"
      v-if="data == ''"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comOperateRisk/qsxx/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">清算组负责人</div>
            <div class="font-click">{{data.manager}}</div>
          </i-col>
        </i-row>
        <div class="line"></div>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">清算组成员</div>
            <div class="font-click">{{data.member}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="bottom90"></div>
      <Share></Share>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      title: "经营风险",
      subTitle: "清算信息",
      total: "",
      data: [],
      companyId: ""
    };
  },
  methods: {
    init(init) {
      this.$http
        .get("app/buss/companyInfo/comOperateRisk", {
          companyId: this.companyId,
          type: "liquidating"
        })
        .then(res => {
          if (res.data.code == 0) {
            this.data = res.data.data.liquidating;
          }
        });
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.init();
  }
};
</script>
<style lang="scss" scoped>
</style>

