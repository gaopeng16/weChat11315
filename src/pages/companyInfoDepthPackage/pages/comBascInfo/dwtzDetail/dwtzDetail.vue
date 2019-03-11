<template>
  <div>
    <!--  -->
    <div class="block-content">
      <h3 class="title fs26 blod lh70 font-click">{{dwtzDetailData.name}}</h3>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">简称</div>
          <div class="title">{{dwtzDetailData.alias ? dwtzDetailData.alias : "--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">省份简称</div>
          <div class="title">{{dwtzDetailData.base ? dwtzDetailData.base : "--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">公司类型</div>
          <div class="title">{{dwtzDetailData.orgType ? dwtzDetailData.orgType : "--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">统一社会信用代码</div>
          <div class="title">{{dwtzDetailData.creditCode ? dwtzDetailData.creditCode : "--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">经营状态</div>
          <div class="title">{{dwtzDetailData.regStatus ? dwtzDetailData.regStatus : "--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">评分</div>
          <div
            class="title"
          >{{(dwtzDetailData.pencertileScore && dwtzDetailData.pencertileScore != 0) ? dwtzDetailData.pencertileScore/100 : "--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">成立日期</div>
          <div
            class="title"
          >{{dwtzDetailData.estiblishTime ? dwtzDetailData.estiblishTime : "--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">法人</div>
          <div
            class="title"
          >{{dwtzDetailData.legalPersonName ? dwtzDetailData.legalPersonName : "--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">金额</div>
          <div class="title">{{dwtzDetailData.amount ? dwtzDetailData.amount : "--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">占比</div>
          <div
            class="title"
          >{{dwtzDetailData.percent ? dwtzDetailData.percent : "--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">行业</div>
          <div class="title">{{dwtzDetailData.category ? dwtzDetailData.category : "--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">注册资本</div>
          <div
            class="title"
          >{{dwtzDetailData.regCapital ? dwtzDetailData.regCapital : "--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">经营范围</div>
          <div
            class="title"
          >{{dwtzDetailData.business_scope ? dwtzDetailData.business_scope : "--"}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
  </div>
</template>
<script>
import store from "@/store";
export default {
  computed: {
    dwtzDetailData() {
      return store.state.dwtzDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
