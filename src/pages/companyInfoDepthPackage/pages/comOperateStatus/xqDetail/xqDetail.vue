<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">需求名称</div>
          <div class="title">{{developmentGoodsDemandDetail.name}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">采购类型</div>
          <div class="title">{{developmentGoodsDemandDetail.type}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">要求</div>
          <div class="title">{{developmentGoodsDemandDetail.requirement}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">询价时间</div>
          <div class="title">{{developmentGoodsDemandDetail.start_time}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">报价截止</div>
          <div class="title">{{developmentGoodsDemandDetail.end_time}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">期望时间</div>
          <div class="title">{{developmentGoodsDemandDetail.expect_time}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">需求明细</div>
          <div class="title">{{developmentGoodsDemandDetail.requirement}}</div>
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
      subTitle: "需求详情",
      total: ""
    };
  },
  computed: {
    developmentGoodsDemandDetail() {
      return store.state.developmentGoodsDemandDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

