<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/wzba/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/wzba/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :bt="bt" :title="item.auditDate" :hasBt="true"></BlockTitle>
        <div class="lh50">
          网站名称：
          <span class="font-click">{{item.siteName}}</span>
        </div>
        <div class="lh50">
          网站首页：
          <span class="font-click">{{item.siteHome}}</span>
        </div>
        <div class="lh50">
          许可证：
          <span class="font-click">{{item.recordNumber}}</span>
        </div>
        <div class="lh50">
          公司性质：
          <span class="font-click">{{item.unitProperty}}</span>
        </div>
        <div class="lh50">
          域名：
          <span class="font-click">{{item.domain}}</span>
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
      title: "知识产权",
      subTitle: "网站备案",
      total: "",
      bt: "审核时间",
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
        .get("app/buss/companyInfo/comLedgeProperty", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "websiteApprove"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.websiteApprove;
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
.trademarkImageUrl {
  width: 300rpx;
  height: 200rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

