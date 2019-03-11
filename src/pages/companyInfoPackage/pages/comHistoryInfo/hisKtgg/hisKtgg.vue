<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisKtgg/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisKtgg/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content"
        :key="index"
        v-for="(item,index) in data"
        @click="historyHxAnnouncementDetail(item)"
      >
        <div class="font-click bold lh70">{{item.caseReason}}</div>
        <div class="lh50">
          案号：
          <span class="font-click">{{item.caseNo}}</span>
        </div>
        <div class="lh50" :key="k" v-for="(v,k) in item.plaintiff">
          原告/上述人：
          <span class="font-click">{{v.name}}</span>
        </div>
        <div class="lh50" :key="k" v-for="(v,k) in item.defendant">
          被告/被上述人：
          <span class="font-click">{{v.name}}</span>
        </div>
        <div class="lh50">
          开庭日期：
          <span class="font-click">{{item.startDate}}</span>
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
      title: "历史信息",
      subTitle: "开庭公告",
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
        .get("app/buss/companyInfo/comHx", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "pastAnnouncement"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.pastAnnouncement.map(item => {
              item.startDate = item.startDate
                ? item.startDate.substr(0, 10)
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
    historyHxAnnouncementDetail(item) {
      store.commit("setHistoryHxAnnouncementDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comHistoryInfo/hisKtggDetail/main"
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
.state {
  width: 100rpx;
  height: 40rpx;
  line-height: 40rpx;
  border: solid 1px #279ef9;
  border-radius: 20rpx;
}
</style>

