<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">登记编号</div>
          <div class="title">{{historyHxEquityinfoDetail.regNumber}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">状态</div>
          <div class="title">{{historyHxEquityinfoDetail.state}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">地区</div>
          <div class="title">{{historyHxEquityinfoDetail.base?historyHxEquityinfoDetail.base:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">出质人</div>
          <div class="title">{{historyHxEquityinfoDetail.pledgorStr}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">出质人证件号码</div>
          <div class="title">{{historyHxEquityinfoDetail.certifNumber}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">出质股权数</div>
          <div class="title">{{historyHxEquityinfoDetail.equityAmount}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">质权人</div>
          <div class="title">{{historyHxEquityinfoDetail.pledgee}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">质权人证件号码</div>
          <div class="title">{{historyHxEquityinfoDetail.certifNumberR}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">股权出质登记日期</div>
          <div class="title">{{historyHxEquityinfoDetail.regDate}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
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
      title: "历史信息",
      subTitle: "股权出质详情",
      total: ""
    };
  },
  computed: {
    historyHxEquityinfoDetail() {
      return store.state.historyHxEquityinfoDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
.comlogo {
  width: 120rpx;
  height: 120rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.comname {
  line-height: 120rpx;
}
</style>

