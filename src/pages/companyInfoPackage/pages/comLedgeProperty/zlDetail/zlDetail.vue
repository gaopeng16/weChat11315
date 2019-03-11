<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">专利名称</div>
          <div class="title">{{ledgePropertyPatentDetail.patentName}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">申请公布日期</div>
          <div class="title">{{ledgePropertyPatentDetail.applicationPubDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">申请公布号</div>
          <div class="title">{{ledgePropertyPatentDetail.applicationPublishCode}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">申请号</div>
          <div class="title">{{ledgePropertyPatentDetail.applicationCode}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">分类号</div>
          <div class="title">{{ledgePropertyPatentDetail.classificationCode}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">专利类型</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">地址</div>
          <div class="title">{{ledgePropertyPatentDetail.address}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">发明人</div>
          <div class="title">{{ledgePropertyPatentDetail.inventor}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">申请人</div>
          <div class="title">{{ledgePropertyPatentDetail.applicant}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">申请日期</div>
          <div class="title">{{ledgePropertyPatentDetail.applicationDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">代理机构</div>
          <div class="title">{{ledgePropertyPatentDetail.agency}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">代理人</div>
          <div
            class="title"
          >{{ledgePropertyPatentDetail.agent?ledgePropertyPatentDetail.agent:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">摘要</div>
          <div class="title">{{ledgePropertyPatentDetail.remark}}</div>
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
      title: "知识产权",
      subTitle: "专利详情",
      total: ""
    };
  },
  computed: {
    ledgePropertyPatentDetail() {
      return store.state.ledgePropertyPatentDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

