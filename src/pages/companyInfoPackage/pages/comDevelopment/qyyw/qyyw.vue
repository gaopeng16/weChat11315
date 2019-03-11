<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/qyyw/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/qyyw/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content overflow-hidden" :key="index" v-for="(item,index) in data">
        <div class="core-term-face left">
          <div class="logo-box">
            <img mode="aspectFit" :src="imgFile+item.productLogo">
          </div>
        </div>
        <div class="core-term-right left">
          <div class="title lh70 font-click blod">{{item.productName}}</div>
          <div class="lh50 sub-content">
            类型：
            <span class="title">{{item.productType?item.productType:"--"}}</span>
          </div>
          <div class="lh50 sub-content">
            行业：
            <span class="title">{{item.hangye}}</span>
          </div>
          <div class="lh50 sub-content">
            上线时间：
            <span class="title">{{item.setupDate}}</span>
          </div>
          <div class="lh50 sub-content">
            公司名：
            <span class="title">{{item.companyName}}</span>
          </div>
          <div class="lh50 sub-content">
            描述：
            <span class="title">{{item.yewu}}</span>
          </div>
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
      subTitle: "企业业务",
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
          type: "getProductInfo"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.getProductInfo;
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
.red {
  background: #ff0000;
}
.green {
  background: #4fbfb0;
}
.blue {
  background: #209bf9;
}
</style>

