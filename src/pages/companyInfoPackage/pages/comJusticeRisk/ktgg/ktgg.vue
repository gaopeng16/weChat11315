<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/ktgg/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/ktgg/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content"
        :key="index"
        v-for="(item,index) in data"
        @click="courtSessionDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.execCourtName" :hasBt="true"></BlockTitle>
        <div class="lh50">
          原告/上诉人：
          <span class="sub-content-light">{{item.plaintiff}}</span>
        </div>
        <div class="lh50">
          被告/被上诉人：
          <span class="sub-content-light">{{item.defendant}}</span>
        </div>
        <div class="lh50">
          开庭日期：
          <span class="sub-content-light">{{item.startDate}}</span>
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
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      title: "司法风险",
      subTitle: "开庭公告",
      total: "",
      bt: "案由",
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
        .get("app/buss/companyInfo/comJusticeRisk", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "ktAnnouncement"
        })
        .then(res => {
          //console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.ktAnnouncement;
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
    courtSessionDetail(item) {
      store.commit("setCourtSessionDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comJusticeRisk/ktggDetail/main"
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

