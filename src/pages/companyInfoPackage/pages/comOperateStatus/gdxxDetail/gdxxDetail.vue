<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">受托人</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">受让人</div>
          <div class="title">{{operateStatusPurchaseDetail.assignee}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">行政区</div>
          <div class="title">{{operateStatusPurchaseDetail.district}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">电子监管号</div>
          <div class="title">{{operateStatusPurchaseDetail.eleNumber}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">成交价款(万元)</div>
          <div class="title">{{operateStatusPurchaseDetail.price}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">签订日期</div>
          <div class="title">{{operateStatusPurchaseDetail.dateOfSign}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">供地总面积(公顷)</div>
          <div class="title">{{operateStatusPurchaseDetail.totalArea}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">宗地位置</div>
          <div class="title">{{operateStatusPurchaseDetail.parcelLocation}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">上级公司</div>
          <div class="title">{{operateStatusPurchaseDetail.superiorCompany}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">土地用途</div>
          <div class="title">{{operateStatusPurchaseDetail.landUse}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">供应方式</div>
          <div class="title">{{operateStatusPurchaseDetail.supplyMode}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">最小容积率</div>
          <div class="title">{{operateStatusPurchaseDetail.minRate}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">最大容积率</div>
          <div class="title">{{operateStatusPurchaseDetail.maxRate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">约定动工时间</div>
          <div class="title">--</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">约定竣工时间</div>
          <div class="title">--</div>
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
      subTitle: "购地信息详情",
      total: ""
    };
  },
  computed: {
    operateStatusPurchaseDetail() {
      return store.state.operateStatusPurchaseDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

