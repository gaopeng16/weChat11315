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
        @click="operateStatusBondDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.createTime" :hasBt="true"></BlockTitle>
        <div class="lh50">
          债券名称：
          <span class="font-click">{{item.bondName}}</span>
        </div>
        <div class="lh50">
          债券代码：
          <span class="font-click">{{item.bondNum}}</span>
        </div>
        <div class="lh50">
          债券类型：
          <span class="font-click">{{item.bondType}}</span>
        </div>
        <div class="lh50">
          债项评级：
          <span class="font-click">{{item.debtRating}}</span>
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
      subTitle: "债券信息",
      total: "",
      bt: "发行日期",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    operateStatusBondDetail(item) {
      store.commit("setOperateStatusBondDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/comOperateStatus/zqxxDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.bondDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.createTime = item.createTime
                  ? formatTime(new Date(item.createTime), 0)
                  : "--";
                item.publishExpireTime = item.publishExpireTime
                  ? formatTime(new Date(item.publishExpireTime), 0)
                  : "--";
                item.publishTime = item.publishTime
                  ? formatTime(new Date(item.publishTime), 0)
                  : "--";
                item.startCalInterestTime = item.startCalInterestTime
                  ? formatTime(new Date(item.startCalInterestTime), 0)
                  : "--";
                item.updateTime = item.updateTime
                  ? formatTime(new Date(item.updateTime), 0)
                  : "--";
                item.bondTradeTime = item.bondTradeTime
                  ? formatTime(new Date(item.bondTradeTime), 0)
                  : "--";
                item.bondStopTime = item.bondStopTime
                  ? formatTime(new Date(item.bondStopTime), 0)
                  : "--";
                item.exeRightTime = item.exeRightTime
                  ? formatTime(new Date(item.exeRightTime), 0)
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

