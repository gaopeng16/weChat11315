<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="title">{{operateStatusBiddingDetail.title}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">采购人</div>
          <div class="title">{{operateStatusBiddingDetail.purchaser}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">发布时间</div>
          <div class="title">{{operateStatusBiddingDetail.publishTime}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">代理机构</div>
          <div class="title">{{operateStatusBiddingDetail.proxy}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">正文简介</div>
          <div
            class="title"
          >{{operateStatusBiddingDetail.intro?operateStatusBiddingDetail.intro:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">正文信息</div>
          <div class="title">
            <rich-text :nodes="operateStatusBiddingDetail.content"></rich-text>
          </div>
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
      title: "经营状况",
      subTitle: "招投标详情",
      total: ""
    };
  },
  computed: {
    operateStatusBiddingDetail() {
      return store.state.operateStatusBiddingDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

