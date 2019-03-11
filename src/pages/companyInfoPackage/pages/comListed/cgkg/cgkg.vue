<template>
  <div class="default-bg">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comListed/cgkg/main'"
      v-if="data.length <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comListed/cgkg/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :title="item.name"></BlockTitle>
        <div class="lh50">
          参股关系：
          <span class="font-click">{{item.relationship}}</span>
        </div>
        <div class="lh50">
          参股比例：
          <span class="font-click">{{item.participationRatio}}</span>
        </div>
        <div class="lh50">
          投资金额(万元)：
          <span class="font-click">{{item.investmentAmount}}</span>
        </div>
        <div class="lh50">
          是否报表合并：
          <span class="font-click">{{item.reportMerge}}</span>
        </div>
        <div class="lh50">
          被参股公司主营业务：
          <span class="font-click">{{item.mainBusiness}}</span>
        </div>
        <div class="lh50">
          被参控公司净利润(万元)：
          <span class="font-click">{{item.profit}}</span>
        </div>
      </div>
      <i-load-more v-if="more"/>
      <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
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
      title: "上市信息",
      subTitle: "参股控股",
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
        .get("app/buss/companyInfo/comStock", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "holdingCompany"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.holdingCompany;
            if (
              (init && this.total < config.pageSize) ||
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
</style>
