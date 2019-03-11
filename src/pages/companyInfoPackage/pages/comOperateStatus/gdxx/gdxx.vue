<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comOperateStatus/gdxx/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comOperateStatus/gdxx/main'"></DepthSearch>
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
          <span class="font-click">{{item.district}}</span>
        </div>
        <div class="lh50">
          成交价款(万元)：
          <span class="font-click">{{item.price}}</span>
        </div>
        <div class="lh50">
          供应方式：
          <span class="font-click">{{item.supplyMode}}</span>
        </div>
        <div class="lh50">
          土地用途：
          <span class="font-click">{{item.landUse}}</span>
        </div>
        <div class="lh50">
          供地总面积(公顷)：
          <span class="font-click">{{item.totalArea}}</span>
        </div>
        <div class="lh50">
          签订日期：
          <span class="font-click">{{item.dateOfSign}}</span>
        </div>
        <div class="lh50">
          约定动工期：
          <span class="font-click">未公开</span>
        </div>
        <div class="lh50">
          约定竣工期：
          <span class="font-click">未公开</span>
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
      title: "经营状况",
      subTitle: "购地信息",
      total: "",
      bt: "受让人"
    };
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get("app/buss/companyInfo/comOperateStatus", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "purchaseLand"
        })
        .then(res => {
          // console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.purchaseLand;
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
    operateStatusPurchaseDetail(item) {
      store.commit("setOperateStatusPurchaseDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comOperateStatus/gdxxDetail/main"
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

