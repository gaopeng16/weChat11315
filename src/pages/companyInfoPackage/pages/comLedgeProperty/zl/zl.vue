<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/zl/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/zl/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content"
        :key="index"
        v-for="(item,index) in data"
        @click="ledgePropertyPatentDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.applicationPubDate" :hasBt="true"></BlockTitle>
        <div class="lh50">
          软件全称：
          <span class="font-click">{{item.patentName}}</span>
        </div>
        <div class="lh50">
          申请公布号：
          <span class="font-click">{{item.applicationPublishCode}}</span>
        </div>
        <div class="lh50">
          发明人：
          <span class="font-click">{{item.inventor}}</span>
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
      subTitle: "专利",
      total: "",
      bt: "申请公布日期",
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
          type: "patents"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.patents.map(item => {
              item.applicationPubDate = item.applicationPubDate
                ? item.applicationPubDate.substr(0, 10)
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
    ledgePropertyPatentDetail(item) {
      store.commit("setLedgePropertyPatentDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comLedgeProperty/zlDetail/main"
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

