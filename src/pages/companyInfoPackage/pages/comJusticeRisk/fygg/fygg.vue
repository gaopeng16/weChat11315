<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/fygg/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/fygg/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content"
        :key="index"
        v-for="(item,index) in data"
        @click="courtNoticeDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.partyName?item.partyName:'暂无'" :hasBt="true"></BlockTitle>
        <div class="lh50">
          公告类型：
          <span class="sub-content-light">{{item.noticeType}}</span>
        </div>
        <div class="lh50">
          法院：
          <span class="sub-content-light">{{item.courtName}}</span>
        </div>
        <div class="lh50">
          公告时间：
          <span class="sub-content-light">{{item.noticeDate}}</span>
        </div>
        <div class="lh50">
          公告内容：
          <span class="sub-content-light">{{item.noticeContent}}</span>
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
      subTitle: "法院公告",
      total: "",
      bt: "当事人",
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
          type: "courtAnnouncement"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.notices.map(item => {
              item.noticeDate = item.noticeDate
                ? formatTime(new Date(item.noticeDate), 0)
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
    },
    courtNoticeDetail(item) {
      store.commit("setCourtNoticeDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comJusticeRisk/fyggDetail/main"
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

