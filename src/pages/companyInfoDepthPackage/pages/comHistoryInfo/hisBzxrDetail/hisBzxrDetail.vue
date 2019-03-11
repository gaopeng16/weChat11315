<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">被执行人</div>
          <div class="font-click">{{historyHxZhixingDetail.pname}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">身份证号/组织机构代码</div>
          <div class="title">{{historyHxZhixingDetail.partyCardNum}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">执行标的</div>
          <div class="title">{{historyHxZhixingDetail.execMoney}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">执行法院</div>
          <div class="title">{{historyHxZhixingDetail.execCourtName}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">立案时间</div>
          <div class="title">{{historyHxZhixingDetail.caseCreateTime}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">案号</div>
          <div class="title">{{historyHxZhixingDetail.caseCode}}</div>
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
      subTitle: "被执行人详情",
      total: ""
    };
  },
  computed: {
    historyHxZhixingDetail() {
      return store.state.historyHxZhixingDetailData;
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

