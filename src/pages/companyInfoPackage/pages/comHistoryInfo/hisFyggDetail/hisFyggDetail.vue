<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content">
      <div class="sub-content-light">关联企业</div>
      <div class="font-click" :key="k" v-for="(v,k) in historyHxCourtDetail.companyList">{{v.name}}</div>
    </div>
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">当事人</div>
          <div class="title">{{historyHxCourtDetail.party2}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">上述方</div>
          <div class="title">{{historyHxCourtDetail.party1}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">公告类型</div>
          <div class="title">{{historyHxCourtDetail.bltntypename}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">案件号</div>
          <div class="title">{{historyHxCourtDetail.caseno?historyHxCourtDetail.caseno:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">刊登版面</div>
          <div
            class="title"
          >{{historyHxCourtDetail.publishpage?historyHxCourtDetail.publishpage:"--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">刊登日期</div>
          <div class="title">{{historyHxCourtDetail.publishdate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">公告号</div>
          <div class="title">{{historyHxCourtDetail.bltnno?historyHxCourtDetail.bltnno:"--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">公告状态号</div>
          <div class="title">{{historyHxCourtDetail.bltnstate?historyHxCourtDetail.bltnstate:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">法院</div>
          <div class="title">{{historyHxCourtDetail.courtcode}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">处理等级</div>
          <div class="title">{{historyHxCourtDetail.dealgrade?historyHxCourtDetail.dealgrade:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">法官</div>
          <div class="title">{{historyHxCourtDetail.doctype?historyHxCourtDetail.doctype:"--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">法官电话</div>
          <div class="title">{{historyHxCourtDetail.judgephone}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">手机号</div>
          <div class="title">{{historyHxCourtDetail.mobilephone}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">省份</div>
          <div class="title">{{historyHxCourtDetail.province?historyHxCourtDetail.province:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">原因</div>
          <div class="title">{{historyHxCourtDetail.reason?historyHxCourtDetail.reason:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">公告内容</div>
          <div class="title">{{historyHxCourtDetail.content}}</div>
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
    historyHxCourtDetail() {
      return store.state.historyHxCourtDetailData;
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

