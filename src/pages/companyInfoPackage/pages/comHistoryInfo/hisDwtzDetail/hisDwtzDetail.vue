<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <div>
        <div>
          <div class="left comlogo">
            <img mode="aspectFit" v-if="imgFile" :src="imgFile+historyHxInvestDetail.logo">
          </div>
          <div class="font-click left ml15 comname">{{historyHxInvestDetail.name}}</div>
        </div>
      </div>
      <div class="clearboth"></div>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">简称</div>
          <div class="title">{{historyHxInvestDetail.alias}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">省份简称</div>
          <div class="title">{{historyHxInvestDetail.base}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">公司类型</div>
          <div class="title">{{historyHxInvestDetail.orgType}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">统一社会信用代码</div>
          <div class="title">{{historyHxInvestDetail.creditCode}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">经营状态</div>
          <div class="title">{{historyHxInvestDetail.regStatus}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">评分</div>
          <div class="title">{{historyHxInvestDetail.pencertileScore}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">成立日期</div>
          <div class="title">{{historyHxInvestDetail.estiblishTime}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">法人</div>
          <div class="title">{{historyHxInvestDetail.legalPersonName}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">金额</div>
          <div class="title">{{historyHxInvestDetail.amount}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">占比</div>
          <div class="title">{{historyHxInvestDetail.percent}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">行业</div>
          <div class="title">{{historyHxInvestDetail.category}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">注册资本</div>
          <div class="title">{{historyHxInvestDetail.regCapital}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">经营范围</div>
          <div class="title">{{historyHxInvestDetail.business_scope}}</div>
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
      subTitle: "对外投资详情",
      total: ""
    };
  },
  computed: {
    historyHxInvestDetail() {
      return store.state.historyHxInvestDetailData;
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
.comname{
  line-height: 120rpx;
}
</style>

