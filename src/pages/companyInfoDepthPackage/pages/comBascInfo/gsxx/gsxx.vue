<template>
  <div class="default-bg">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <BlockTitle :bt="bt1" :title="data.legalPersonName" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt2" :title="data.regCapital" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt3" :title="data.estiblishTime" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt4" :title="data.regStatus" :hasBt="true"></BlockTitle>
    </div>
    <div class="block-content">
      <BlockTitle :bt="bt5" :title="data.regNumber" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt6" :title="data.taxNumber" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt7" :title="data.orgNumber" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt8" :title="data.creditCode" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt9" :title="data.companyOrgType" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt10" :title="data.industry" :hasBt="true"></BlockTitle>
    </div>
    <div class="block-content">
      <BlockTitle :bt="bt11" :title="data.qixian" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt12" :title="data.approvedTime" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt13" :title="data.regInstitute" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt14" :title="data.property3" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt15" :title="data.regLocation" :hasBt="true"></BlockTitle>
      <BlockTitle :bt="bt16" :hasBt="true"></BlockTitle>
      <div class="sub-content">{{data.businessScope}}</div>
    </div>
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
      data: {}
    };
  },
  methods: {
    init() {
      this.$http
        .get(config.companyName, {
          uri: config.baseinfoV3De + this.companyName,
          pageSize: 0,
          pageNum: 1
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (Object.keys(res.data.result).length > 0) {
              this.data = res.data.result;
              this.data.estiblishTime = formatTime(
                new Date(res.data.result.estiblishTime),
                0
              );
              this.data.approvedTime = formatTime(
                new Date(res.data.result.approvedTime),
                0
              );
              this.data.qixian =
                formatTime(new Date(res.data.result.fromTime), 0) +
                "--" +
                formatTime(new Date(res.data.result.toTime), 0);
              this.noData = false;
            } else {
              this.noData = true;
            }
          } else {
            this.noData = true;
          }
        });
    }
  },
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
    this.init();
  }
};
</script>
<style lang="scss" scoped>
</style>

