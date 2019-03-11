<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">产品名称</div>
          <div class="title">{{developmentGoodsSupplyDetail.name}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">品牌</div>
          <div class="title">{{developmentGoodsSupplyDetail.brand}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">关键字</div>
          <div class="title">{{developmentGoodsSupplyDetail.key_word}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">价格</div>
          <div class="title">{{developmentGoodsSupplyDetail.price}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">单位</div>
          <div class="title">{{developmentGoodsSupplyDetail.unit}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">供货数量</div>
          <div class="title">{{developmentGoodsSupplyDetail.supply_nums}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">起订数量</div>
          <div class="title">{{developmentGoodsSupplyDetail.limit_nums}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">有效期</div>
          <div class="title">{{developmentGoodsSupplyDetail.expiry_date}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">描述</div>
          <div class="title">{{developmentGoodsSupplyDetail.memo}}</div>
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
      subTitle: "供应详情",
      total: ""
    };
  },
  computed: {
    developmentGoodsSupplyDetail() {
      return store.state.developmentGoodsSupplyDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

