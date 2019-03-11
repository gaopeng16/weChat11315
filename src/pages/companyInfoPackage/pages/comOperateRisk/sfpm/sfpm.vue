<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comOperateRisk/sfpm/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comOperateRisk/sfpm/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content"
        :key="index"
        v-for="(item,index) in data"
        @click="operateRiskJudicialSaleDetail(item)"
      >
        <div class="lh50">
          拍卖公告：
          <span class="font-click">{{item.auctionNotice?item.auctionNotice:"--"}}</span>
        </div>
        <div class="lh50">
          执行法院：
          <span class="font-click">{{item.courtExe?item.courtExe:"--"}}</span>
        </div>
        <div class="lh50">
          公告日期：
          <span class="font-click">{{item.declarationDate?item.declarationDate:"--"}}</span>
        </div>
        <div class="lh50">
          介绍：
          <span class="font-click">{{item.auctionNoticeURL?item.auctionNoticeURL:"--"}}</span>
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
      title: "经营风险",
      subTitle: "司法拍卖",
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
        .get("app/buss/companyInfo/comOperateRisk", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "judicialSale"
        })
        .then(res => {
          // console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.judicialSale;
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
    operateRiskJudicialSaleDetail(item) {
      store.commit("setOperateRiskJudicialSaleDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comOperateRisk/sfpmDetail/main"
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

