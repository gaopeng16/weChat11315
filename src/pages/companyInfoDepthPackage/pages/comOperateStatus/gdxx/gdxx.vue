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
        @click="operateStatusPurchaseDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.assignee" :hasBt="true"></BlockTitle>
        <div class="lh50">
          行政区：
          <span class="font-click">{{item.adminRegion}}</span>
        </div>
        <div class="lh50">
          成交价款(万元)：
          <span class="font-click">{{item.dealPrice}}</span>
        </div>
        <div class="lh50">
          供应方式：
          <span class="font-click">{{item.supplyWay}}</span>
        </div>
        <div class="lh50">
          土地用途：
          <span class="font-click">{{item.purpose}}</span>
        </div>
        <div class="lh50">
          供地总面积(公顷)：
          <span class="font-click">{{item.totalArea}}</span>
        </div>
        <div class="lh50">
          签订日期：
          <span class="font-click">{{item.signedDate}}</span>
        </div>
        <div class="lh50">
          约定动工期：
          <span class="font-click">{{item.startTime}}</span>
        </div>
        <div class="lh50">
          约定竣工期：
          <span class="font-click">{{item.endTime}}</span>
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
      title: "经营状况",
      subTitle: "购地信息",
      total: "",
      bt: "受让人",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    operateStatusPurchaseDetail(item) {
      store.commit("setOperateStatusPurchaseDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/comOperateStatus/gdxxDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.purchaseLandDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.signedDate = item.signedDate
                  ? formatTime(new Date(item.signedDate))
                  : "--";
                item.startTime = item.startTime
                  ? formatTime(new Date(item.startTime))
                  : "--";
                item.endTime = item.endTime
                  ? formatTime(new Date(item.endTime))
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
</style>

