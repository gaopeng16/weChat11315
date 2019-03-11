<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content">
      <div class="sub-content-light">关联企业</div>
      <div class="lh70 font-click" :key="k" v-for="(v,k) in historyHxLawsuitDetail.connList">{{v}}</div>
    </div>
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">原告</div>
          <div class="title">{{historyHxLawsuitDetail.plaintiffs}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">被告</div>
          <div class="title">{{historyHxLawsuitDetail.defendants?historyHxLawsuitDetail.defendants:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">法院</div>
          <div class="title">{{historyHxLawsuitDetail.court}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">案号</div>
          <div class="title">{{historyHxLawsuitDetail.caseno}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">案件类型</div>
          <div class="title">{{historyHxLawsuitDetail.casetype}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">案由</div>
          <div class="title">{{historyHxLawsuitDetail.casereason}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">第三人</div>
          <div class="title">{{historyHxLawsuitDetail.thirdParties?historyHxLawsuitDetail.thirdParties:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">文书类型</div>
          <div class="title">{{historyHxLawsuitDetail.doctype}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">发布时间</div>
          <div class="title">{{historyHxLawsuitDetail.submittime}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">公告内容</div>
          <div class="title">内容暂不公示</div>
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
      subTitle: "法律诉讼详情",
      total: ""
    };
  },
  computed: {
    historyHxLawsuitDetail() {
      return store.state.historyHxLawsuitDetailData;
    }
  },
  mounted(){
    console.log(this.historyHxLawsuitDetail)
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

