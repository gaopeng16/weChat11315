<template>
  <div>
    <div class="default-bg min-height100">
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <web-view :src="operateRiskJudicialSaleDetail.auctionNoticeURL"></web-view>
      <!--  -->
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      imgFile: config.imgFile,
      title: "经营风险",
      subTitle: "司法拍卖详情",
      total: ""
    };
  },
  computed: {
    operateRiskJudicialSaleDetail() {
      return store.state.operateRiskJudicialSaleDetailData;
    }
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
