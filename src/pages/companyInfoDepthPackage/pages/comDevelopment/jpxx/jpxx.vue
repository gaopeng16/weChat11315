<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content overflow-hidden relative"
        :key="index"
        v-for="(item,index) in data"
        @click="developmentCompetitionDetail(item)"
      >
        <div class="round absolute">{{item.round}}</div>
        <div class="core-term-face left">
          <div class="logo-box">
            <img mode="aspectFit" :src="item.icon">
          </div>
        </div>
        <div class="core-term-right left">
          <div class="title lh70 font-click blod">{{item.jingpinProduct}}</div>
          <div class="lh50 sub-content">
            业务：
            <span class="title">{{item.yewu}}</span>
          </div>
          <div class="lh50 sub-content">
            成立日期：
            <span class="title">{{item.setupDate}}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="lh50 sub-content">
          关联公司：
          <span class="title font-click">{{item.companyName}}</span>
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
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      title: "企业发展",
      subTitle: "竞品信息",
      total: "",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    developmentCompetitionDetail(item) {
      store.commit("setDevelopmentCompetitionDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/comDevelopment/jpxxDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.findJingpinDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.setupDate = item.setupDate
                  ? formatTime(new Date(item.setupDate), 0)
                  : "--";
                item.date = item.date
                  ? formatTime(new Date(item.date), 0)
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
.round {
  right: 15rpx;
  top: 15rpx;
  padding: 5rpx 10rpx;
  border: solid 1px #73ccc0;
  color: #73ccc0;
  border-radius: 5rpx;
}
.core-term-face {
  width: 120rpx;
  height: auto;
  .logo-box {
    display: inline-block;
    width: 120rpx;
    height: 120rpx;
    margin-top: 20rpx;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.core-term-right {
  width: calc(100% - 140rpx);
  margin-left: 10rpx;
  .position {
    overflow: hidden;
    margin-bottom: 20rpx;
    div {
      padding: 5rpx 10rpx;
      margin: 0 15rpx 0 0;
      color: #ffffff;
    }
  }
}
</style>

