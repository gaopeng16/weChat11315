<template>
  <div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">董事会日期</div>
          <div class="title">{{fhqkDetailData.boardDate}}</div>
        </i-col>
        <i-col span="11" offset="2">
          <div class="sub-content-light lh60">股东大会日期</div>
          <div class="title">{{fhqkDetailData.shareholderDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">董实施日期</div>
          <div class="title">{{fhqkDetailData.implementationDate}}</div>
        </i-col>
        <i-col span="11" offset="2">
          <div class="sub-content-light lh60">分红方案说明</div>
          <div class="title">{{fhqkDetailData.bonusScheme}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">A股股权登记日</div>
          <div class="title">{{fhqkDetailData.stockDate}}</div>
        </i-col>
        <i-col span="11" offset="2">
          <div class="sub-content-light lh60">A股除权除息日</div>
          <div class="title">{{fhqkDetailData.acuxiDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">A股派息日</div>
          <div class="title">{{fhqkDetailData.dividendDate}}</div>
        </i-col>
        <i-col span="11" offset="2">
          <div class="sub-content-light lh60">方案进度</div>
          <div class="title">{{fhqkDetailData.progress}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">股利支付率(%)</div>
          <div class="title">{{fhqkDetailData.payment}}</div>
        </i-col>
        <i-col span="11" offset="2">
          <div class="sub-content-light lh60">分红率(%)</div>
          <div class="title">{{fhqkDetailData.dividendRate}}</div>
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
    fhqkDetailData() {
      return store.state.fhqkDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
