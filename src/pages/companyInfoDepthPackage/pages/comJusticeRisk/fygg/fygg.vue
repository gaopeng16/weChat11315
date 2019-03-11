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
        @click="courtNoticeDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.party1?item.party1:'--'" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt2" :title="item.party2?item.party2:'--'" :hasBt="true"></BlockTitle>
        <div class="lh50">
          公告类型：
          <span class="sub-content-light">{{item.bltntype?item.bltntype:'--'}}</span>
        </div>
        <div class="lh50">
          法院：
          <span class="sub-content-light">{{item.courtcode}}</span>
        </div>
        <div class="lh50">
          公告时间：
          <span class="sub-content-light">{{item.publishdate}}</span>
        </div>
        <div class="lh50">
          公告内容：
          <span class="sub-content-light">{{item.content}}</span>
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
      title: "司法风险",
      subTitle: "法院公告",
      total: "",
      bt: "原告",
      bt2: "被告",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    courtNoticeDetail(item) {
      store.commit("setCourtNoticeDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/comJusticeRisk/fyggDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.courtAnnouncementDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items;
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
                console.log("-->", this.data);
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
</style>

