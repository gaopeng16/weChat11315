<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/rzls/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/rzls/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :bt="bt" :title="item.financeDate" :hasBt="true"></BlockTitle>
        <div class="lh50">
          轮次：
          <span class="sub-content-light">{{item.financeturn ? item.financeturn : '企业选择不公开'}}</span>
        </div>
        <div class="lh50">
          估值：
          <span class="sub-content-light">{{item.valuation ? item.valuation : '企业选择不公开'}}</span>
        </div>
        <div class="lh50">
          金额：
          <span class="sub-content-light">{{item.financeValue ? item.financeValue : '企业选择不公开'}}</span>
        </div>
        <div class="lh50">
          比例：
          <span class="sub-content-light">{{item.proportion ? item.proportion : '企业选择不公开'}}</span>
        </div>
        <div class="lh50">
          投资方
          <span class="sub-content-light">{{item.investors ? item.investors : '企业选择不公开'}}</span>
        </div>
        <div class="lh50">
          新闻来源：
          <span class="sub-content-light">{{item.newsSource ? item.newsSource : '企业选择不公开'}}</span>
        </div>
      </div>
      <!--  -->
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
      title: "企业发展",
      subTitle: "融资历史",
      total: "",
      bt: "时间",
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
        .get("app/buss/companyInfo/comDevelopment", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "financingHistory"
        })
        .then(res => {
          //console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.financingHistory.map(item => {
              item.financeDate = item.financeDate
                ? item.financeDate.substr(0, 10)
                : "--";
              return item;
            });
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

