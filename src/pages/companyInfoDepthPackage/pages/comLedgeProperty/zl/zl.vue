<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content"
        :key="index"
        v-for="(item,index) in data"
        @click="ledgePropertyPatentDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.applicationTime" :hasBt="true"></BlockTitle>
        <div class="lh50">
          专利名称：
          <span class="font-click">{{item.patentName}}</span>
        </div>
        <div class="lh50">
          申请公布号：
          <span class="font-click">{{item.pubnumber}}</span>
        </div>
        <div class="lh50">
          发明人：
          <span class="font-click">{{item.inventor}}</span>
        </div>
      </div>
      <!--  -->
      <i-load-more v-if="more"/>
      <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "知识产权",
      subTitle: "专利",
      total: "",
      bt: "申请公布日期",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    ledgePropertyPatentDetail(item) {
      store.commit("setLedgePropertyPatentDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoDepthPackage/pages/comLedgeProperty/zlDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.patentsDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.applicationTime = item.applicationTime
                  ? formatTime(new Date(Number(item.applicationTime)), 0)
                  : "--";
                item.pubDate = item.pubDate
                  ? formatTime(new Date(Number(item.pubDate)), 0)
                  : "--";
                item.applicationPublishTime = item.applicationPublishTime
                  ? formatTime(new Date(Number(item.applicationPublishTime)), 0)
                  : "--";
                return item;
              });
              if (
                (init && result.length < config.pageSize) ||
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
              this.noData = false;
            } else {
              this.noData = true;
            }
          } else {
            this.noData = true;
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
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
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

