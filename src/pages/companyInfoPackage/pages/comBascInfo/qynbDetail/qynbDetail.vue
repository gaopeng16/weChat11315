<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt1" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        统一信用代码：
        <span class="font-click">{{basicInfo.regno}}</span>
      </div>
      <div class="lh50">
        企业联系电话：
        <span class="font-click">{{basicInfo.tel}}</span>
      </div>
      <div class="lh50">
        企业经营状态：
        <span class="font-click">{{basicInfo.busst}}</span>
      </div>
      <div class="lh50">
        电子邮箱：
        <span class="font-click">{{basicInfo.email}}</span>
      </div>
      <div class="lh50">
        企业通信地址：
        <span class="font-click">{{basicInfo.addr}}</span>
      </div>
      <div class="lh50">
        企业名称：
        <span class="font-click">{{basicInfo.entname}}</span>
      </div>
      <div class="lh50">
        邮政编码：
        <span class="font-click">{{basicInfo.postalcode}}</span>
      </div>
      <div class="lh50">
        从业人数：
        <span class="font-click">{{basicInfo.empnum?basicInfo.empnum:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        是否有网站或网店：
        <span class="font-click">{{isHasWeb}}</span>
      </div>
      <div class>
        企业是否有投资信息
        <br>或购买其他公司股权：
        <span class="font-click">{{basicInfo.isdwtzs?basicInfo.isdwtzs:"企业选择不公开"}}</span>
      </div>
      <div class>
        有限责任公司本年度
        <br>是否发生股权转让：
        <span class="font-click">{{isEquityChangeInfo}}</span>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt2" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        资产总额：
        <span class="font-click">{{enterpriseAssetInfo.assgro}}</span>
      </div>
      <div class="lh50">
        营业总收入中主营业务收入：
        <span
          class="font-click"
        >{{enterpriseAssetInfo.maibusinc?enterpriseAssetInfo.maibusinc:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        所有者权益合计：
        <span
          class="font-click"
        >{{enterpriseAssetInfo.totequ?enterpriseAssetInfo.totequ:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        净利润：
        <span
          class="font-click"
        >{{enterpriseAssetInfo.netinc?enterpriseAssetInfo.netinc:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        销售总额：
        <span
          class="font-click"
        >{{enterpriseAssetInfo.vendinc?enterpriseAssetInfo.vendinc:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        纳税总额：
        <span
          class="font-click"
        >{{enterpriseAssetInfo.ratgro?enterpriseAssetInfo.ratgro:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        利润总额：
        <span
          class="font-click"
        >{{enterpriseAssetInfo.progro?enterpriseAssetInfo.progro:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        负债总额：
        <span
          class="font-click"
        >{{enterpriseAssetInfo.liagro?enterpriseAssetInfo.liagro:"企业选择不公开"}}</span>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content relative">
      <BlockTitle :bt="bt3" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        股东：
        <span class="font-click">{{shareholderInfo.inv}}</span>
      </div>
      <div class="lh50">
        认缴出资额(万元)：
        <span class="font-click">{{shareholderInfo.lisubconam}}</span>
      </div>
      <div class="lh50">
        认缴出资时间：
        <span class="font-click">{{shareholderInfo.subcondate}}</span>
      </div>
      <div class="lh50">
        认缴出资方式：
        <span class="font-click">{{acconcurrency}}</span>
      </div>
      <div class="lh50">
        实缴出资额(万元)：
        <span class="font-click">{{shareholderInfo.liacconam}}</span>
      </div>
      <div class="lh50">
        实缴出资时间：
        <span class="font-click">{{shareholderInfo.accondate}}</span>
      </div>
      <div class="lh50">
        实缴出资方式：
        <span class="font-click">{{subconcurrency}}</span>
      </div>
      <div class="more absolute">
        <a href="/pages/companyInfoPackage/pages/comBascInfo/nbGdCz/main">更多》</a>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content relative" v-if="equityChangeInfo.length>0">
      <BlockTitle :bt="bt7" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        股东：
        <span class="font-click">{{equityChangeInfo[0].inv?equityChangeInfo[0].inv:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        变更前股权比例：
        <span class="font-click">{{equityChangeInfo[0].transamprpre?equityChangeInfo[0].transamprpre:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        变更后股权比例：
        <span class="font-click">{{equityChangeInfo[0].transampraf?equityChangeInfo[0].transampraf:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        股权变更日期：
        <span class="font-click">{{equityChangeInfo[0].altdate?equityChangeInfo[0].altdate:"企业选择不公开"}}</span>
      </div>
      <div class="more absolute">
        <a href="/pages/companyInfoPackage/pages/comBascInfo/nbGqbg/main">更多》</a>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content" v-if="changeInfo">
      <BlockTitle :bt="bt4" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        修改事项：
        <span class="font-click">{{changeInfo.altfield?changeInfo.altfield:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        修改前：
        <span class="font-click">{{changeInfo.altbefore?changeInfo.altbefore:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        修改后：
        <span class="font-click">{{changeInfo.altafter?changeInfo.altafter:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        修改日期：
        <span class="font-click">{{changeInfo.altdate?changeInfo.altdate:"企业选择不公开"}}</span>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content relative" v-if="hasInvestInfo">
      <BlockTitle :bt="bt5" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        对外投资企业名称：
        <span class="font-click">{{investInfoObj.entname}}</span>
      </div>
      <div class="lh50">
        注册号/统一信用代码：
        <span class="font-click">{{investInfoObj.regno}}</span>
      </div>
      <div class="more absolute">
        <a href="/pages/companyInfoPackage/pages/comBascInfo/nbDwtz/main">更多》</a>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content relative">
      <BlockTitle :bt="bt6" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        城镇职工基本养老保险：
        <span class="font-click">{{sbxx.endowmentInsurance}}</span>
      </div>
      <div class="lh50">
        职工基本医疗保险：
        <span class="font-click">{{sbxx.medicalInsurance}}</span>
      </div>
      <div class="lh50">
        生育保险：
        <span class="font-click">{{sbxx.maternityInsurance}}</span>
      </div>
      <div class="lh50">
        失业保险：
        <span class="font-click">{{sbxx.unemploymentInsurance}}</span>
      </div>
      <div class="lh50">
        工伤保险：
        <span class="font-click">{{sbxx.employmentInjuryInsurance}}</span>
      </div>
      <div class="more absolute">
        <a href="/pages/companyInfoPackage/pages/comBascInfo/nbSbxx/main">更多》</a>
      </div>
    </div>
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
      title: "基本信息",
      subTitle: "年报详情",
      total: "",
      noTitle: "",
      bt1: "企业基本信息",
      bt2: "企业资产状况信息",
      bt3: "股东及出资信息",
      bt4: "修改信息",
      bt5: "对外投资信息",
      bt6: "社保信息",
      bt7: "股权变更信息",
      basicInfo: {},
      changeInfo: {}, //修改信息
      enterpriseAssetInfo: {}, //企业资产状况信息
      equityChangeInfo:[], // 股权变更信息
      sbxx: {}, //社保信息
      shareholderInfo: {},
      websiteInfo: {}, //
      investInfo: [], //对外投资
      investInfoObj: {},
      isHasWeb: "", //是否有网站或网店：
      isHasTzxx: "", //企业是否有投资信息或购买其他公司股权
      hasInvestInfo: false,
      isEquityChangeInfo: "否",
      rjcz: [
        "",
        "货币",
        "实物",
        "知识产权",
        "债权",
        "",
        "土地使用权",
        "股权",
        "",
        "其他"
      ],
      acconcurrency: "", //认缴出资方式
      subconcurrency: "" //实缴出资方式
    };
  },
  methods: {
    setData() {
      this.basicInfo = JSON.parse(this.basicInfoAnnualreport.basicInfo);
      this.changeInfo =
        JSON.parse(this.basicInfoAnnualreport.changeInfo)[0] == undefined
          ? []
          : JSON.parse(this.basicInfoAnnualreport.changeInfo)[0];
      this.enterpriseAssetInfo = JSON.parse(
        this.basicInfoAnnualreport.enterpriseAssetInfo
      );
      this.sbxx =
        this.basicInfoAnnualreport.sbxx == ""
          ? {}
          : JSON.parse(this.basicInfoAnnualreport.sbxx);
      this.shareholderInfo = JSON.parse(
        this.basicInfoAnnualreport.shareholderInfo
      )[0];
      this.equityChangeInfo = JSON.parse(this.basicInfoAnnualreport.equityChangeInfo);
      this.acconcurrency = this.rjcz[Number(this.shareholderInfo.acconform)];
      this.subconcurrency = this.rjcz[Number(this.shareholderInfo.subconform)];
      this.websiteInfo = JSON.parse(this.basicInfoAnnualreport.websiteInfo);
      this.investInfo = JSON.parse(this.basicInfoAnnualreport.investInfo);
      this.investInfoObj = this.investInfo[0];
      this.subTitle = this.basicInfoAnnualreport.year + "年报详情";
    }
  },
  computed: {
    basicInfoAnnualreport() {
      return store.state.annualreportData;
    }
  },
  mounted() {
    if (JSON.parse(this.basicInfoAnnualreport.equityChangeInfo).length > 0) {
      this.isEquityChangeInfo = "是";
    } else {
      this.isEquityChangeInfo = "否";
    }
    this.setData();
    this.hasInvestInfo = this.investInfo.length > 0 ? true : false;
    this.isHasWeb =
      this.websiteInfo.length > 0
        ? this.websiteInfo[0].domain
        : "企业选择不公开";
    this.isHasTzxx = this.changeInfo > 0 ? "是" : "否";
  }
};
</script>
<style lang="scss" scoped>
.more {
  top: 20rpx;
  right: 20rpx;
}
</style>

