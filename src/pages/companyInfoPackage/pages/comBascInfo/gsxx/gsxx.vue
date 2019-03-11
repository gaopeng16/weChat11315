<template>
  <div class="default-bg">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/fzjg/main'"
      v-if="Object.keys(comBasic).length <=0 && Object.keys(comBusiness).length <=0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/fzjg/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-content">
        <BlockTitle :bt="bt1" :title="comBasic.legalPerson" :hasBt="true"></BlockTitle>
        <BlockTitle
          :bt="bt2"
          :title="comBasic.registeredCapital+comBasic.registeredCapitalUnit"
          :hasBt="true"
        ></BlockTitle>
        <BlockTitle :bt="bt3" :title="comBasic.registrationDate" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt4" :title="comBasic.state" :hasBt="true"></BlockTitle>
      </div>
      <div class="block-content">
        <BlockTitle :bt="bt5" :title="comBusiness.registrationCode" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt6" :title="comBusiness.organizationCode" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt7" :title="comBusiness.taxesCode" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt8" :title="comBusiness.creditCode" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt9" :title="comBusiness.enterpriseType" :hasBt="true"></BlockTitle>
        <BlockTitle
          :bt="bt10"
          :title="comBusiness.industryName==''?'企业选择不公开':comBusiness.industryName"
          :hasBt="true"
        ></BlockTitle>
      </div>
      <div class="block-content">
        <BlockTitle :bt="bt11" :title="comBusiness.businessTerm" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt12" :title="comBusiness.approvedDate" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt13" :title="comBusiness.registrationAuthority" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt14" :title="comBasic.englishName" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt15" :title="comBusiness.registeredAddress" :hasBt="true"></BlockTitle>
        <BlockTitle :bt="bt16" :hasBt="true"></BlockTitle>
        <div class="sub-content">{{comBusiness.businessScope}}</div>
      </div>
      <div class="bottom90"></div>
      <Share></Share>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      title: "基本信息",
      subTitle: "工商信息",
      total: "",
      bt1: "法人代表",
      bt2: "注册资本",
      bt3: "注册时间",
      bt4: "经营状态",
      bt5: "工商注册号",
      bt6: "组织机构代码",
      bt7: "纳税人识别号",
      bt8: "统一信用代码",
      bt9: "企业类型",
      bt10: "行业",
      bt11: "营业期限",
      bt12: "核准日期",
      bt13: "登记机关",
      bt14: "英文名字",
      bt15: "注册地址",
      bt16: "经营范围",
      comBasic: {},
      comBusiness: {}
    };
  },
  methods: {
    init(init) {
      this.$http
        .get("app/buss/companyInfo/comHead", {
          companyId: this.companyId
        })
        .then(res => {
          console.log("gsxx", res);
          if (res.data.code == 0) {
            res.data.data.comBasic.registrationDate = res.data.data.comBasic.registrationDate.substr(
              0,
              10
            );
            this.comBasic = res.data.data.comBasic;
            res.data.data.comBusiness.approvedDate = res.data.data.comBusiness.approvedDate.substr(
              0,
              10
            );
            this.comBusiness = res.data.data.comBusiness;
          }
        });
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.init();
  }
};
</script>
<style lang="scss" scoped>
</style>

