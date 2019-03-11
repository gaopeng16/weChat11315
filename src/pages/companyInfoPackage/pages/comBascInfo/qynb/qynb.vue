<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/qynb/main'"
      v-if="data.length <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/qynb/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content hidden lh70"
        :key="index"
        v-for="(item,index) in data"
        @click="annualreportDetail(item)"
      >
        <div class="left year">{{item.year}}年度</div>
        <i-icon i-class="right mt15" size="24" type="enter"/>
      </div>
      <!--  -->
      <i-load-more v-if="more"/>
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
      title: "基本信息",
      subTitle: "企业年报",
      total: "",
      data: [],
      companyId: "",
      page: 1,
      more: true
    };
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get("app/buss/companyInfo/comBasic", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "annualReport"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.annualReport;
            if (
              (init && this.total <= config.pageSize) ||
              (result.length < config.pageSize && this.page > 1)
            ) {
              this.more = false;
            }
            if (init) {
              this.data = result;
              wx.stopPullDownRefresh();
            } else {
              this.data = this.data.concat(result);
            }
          }
        });
    },
    annualreportDetail(item) {
      store.commit("setAnnualreportData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comBascInfo/qynbDetail/main"
      });
    }
  },
  onPullDownRefresh() {
    this.init(true);
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page++;
    this.init();
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.total = this.$root.$mp.query.total;
    this.init(true);
  }
};
</script>
<style lang="scss" scoped>
.year {
  border-left: 2px solid #209bf9;
  text-indent: 20rpx;
}
</style>

