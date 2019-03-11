<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt1" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">城镇职工基本养老保险：<span class="font-click">{{sbxx.endowmentInsurance}}</span></div>
      <div class="lh50">职工基本医疗保险：<span class="font-click">{{sbxx.medicalInsurance}}</span></div>
      <div class="lh50">生育保险：<span class="font-click">{{sbxx.maternityInsurance}}</span></div>
      <div class="lh50">失业保险：<span class="font-click">{{sbxx.unemploymentInsurance}}</span></div>
      <div class="lh50">工伤保险：<span class="font-click">{{sbxx.employmentInjuryInsurance}}</span></div>
    </div>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt2" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">参加城镇职工基本养老保险缴费基础：<span class="font-click">{{sbxx.endowmentInsuranceBase}}</span></div>
      <div class="lh50">参加失业保险险缴费基础：<span class="font-click">{{sbxx.unemploymentInsuranceBase}}</span></div>
      <div class="lh50">参加职工基本医疗保险险缴费基础：<span class="font-click">{{sbxx.medicalInsuranceBase}}</span></div>
      <div class="lh50">参加工伤保险险缴费基础：<span class="font-click">{{sbxx.employmentInsuranceBase}}</span></div>
      <div class="lh50">参加生育保险险缴费基础：<span class="font-click">{{sbxx.maternityInsuranceBase}}</span></div>
    </div>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt3" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">参加城镇职工基本养老保险本期实际缴费金额：<span class="font-click">{{sbxx.endowmentInsurancePayAmount}}</span></div>
      <div class="lh50">参加失业保险本期实际缴费金额：<span class="font-click">{{sbxx.unemploymentInsurancePayAmount}}</span></div>
      <div class="lh50">参加职工基本医疗保险本期实际缴费金额：<span class="font-click">{{sbxx.medicalInsurancePayAmount}}</span></div>
      <div class="lh50">参加工伤保险本期实际缴费金额：<span class="font-click">{{sbxx.employmentInjuryInsurancePayAmount}}</span></div>
      <div class="lh50">参加生育保险本期实际缴费金额：<span class="font-click">{{sbxx.maternityInsurancePayAmount}}</span></div>
    </div>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt4" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">单位参加城镇职工基本养老保险累积欠缴金额：<span class="font-click">{{sbxx.endowmentInsuranceOweAmount}}</span></div>
      <div class="lh50">单位参加失业保险累积欠缴金额：<span class="font-click">{{sbxx.unemploymentInsuranceOweAmount}}</span></div>
      <div class="lh50">单位参加职工基本医疗保险累积欠缴金额：<span class="font-click">{{sbxx.medicalInsuranceOweAmount}}</span></div>
      <div class="lh50">单位参加工伤保险累积欠缴金额：<span class="font-click">{{sbxx.employmentInjuryInsuranceOweAmount}}</span></div>
      <div class="lh50">单位参加生育保险累积欠缴金额：<span class="font-click">{{sbxx.maternityInsuranceOweAmount}}</span></div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      title: "企业年报",
      subTitle: "社保信息",
      total: "",
      noTitle: "",
      bt1: "社保缴费人数",
      bt2: "单位缴纳基数",
      bt3: "本期实际缴纳金额",
      bt4: "单位累计欠费金额",
    };
  },
  computed: {
    sbxx() {
      return store.state.annualreportData.reportSocialSecurityInfo;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

