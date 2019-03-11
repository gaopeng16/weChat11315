<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/jpxx/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/jpxx/main'"></DepthSearch>
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
            <img v-if="imgFile" mode="aspectFit" :src="imgFile+item.productLogo">
          </div>
        </div>
        <div class="core-term-right left">
          <div class="title lh70 font-click blod">{{item.jingpinProduct}}</div>
          <div class="lh50 sub-content">
            业务：
            <span class="title">{{item.business}}</span>
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
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      title: "企业发展",
      subTitle: "竞品信息",
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
        .get("app/buss/companyInfo/comDevelopment", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "findJingpin"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.findJingpin.map(item => {
              item.setupDate = item.setupDate
                ? item.setupDate.substr(0, 10)
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
    developmentCompetitionDetail(item) {
      store.commit("setDevelopmentCompetitionDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comDevelopment/jpxxDetail/main"
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

