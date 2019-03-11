<template>
  <div>
    <div class="default-bg min-height100">
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content overflow-hidden relative">
        <div class="round absolute">{{developmentCompetitionDetail.round}}</div>
        <div class="core-term-face left">
          <div class="logo-box">
            <img mode="aspectFit" :src="developmentCompetitionDetail.icon">
          </div>
        </div>
        <div class="core-term-right left">
          <div class="title lh70 font-click blod">{{developmentCompetitionDetail.jingpinProduct}}</div>
          <div class="lh50 sub-content">
            业务：
            <span class="title">{{developmentCompetitionDetail.yewu}}</span>
          </div>
          <div class="lh50 sub-content">
            成立日期：
            <span class="title">{{developmentCompetitionDetail.date}}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="lh50 sub-content">
          关联公司：
          <span class="title font-click">{{developmentCompetitionDetail.companyName}}</span>
        </div>
        <div class="lh50 sub-content">
          行业：
          <span
            class="title font-click"
          >{{developmentCompetitionDetail.hangye?developmentCompetitionDetail.hangye:"未公开"}}</span>
        </div>
        <div class="lh50 sub-content">
          地区：
          <span class="title font-click">{{developmentCompetitionDetail.location}}</span>
        </div>
        <div class="lh50 sub-content">
          估值：
          <span
            class="title font-click"
          >{{developmentCompetitionDetail.vaule?developmentCompetitionDetail.vaule:"未公开"}}</span>
        </div>
        <div class="lh50 sub-content">
          投资时间：
          <span class="title font-click">{{developmentCompetitionDetail.setupDate}}</span>
        </div>
      </div>
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
      title: "企业发展",
      subTitle: "竞品信息详情",
      total: ""
    };
  },
  computed: {
    developmentCompetitionDetail() {
      return store.state.developmentCompetitionDetailData;
    }
  },
  mounted(){
    console.log(this.developmentCompetitionDetail)
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
