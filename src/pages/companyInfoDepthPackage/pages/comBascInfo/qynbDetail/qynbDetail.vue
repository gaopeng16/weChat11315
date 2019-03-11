<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt1" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">统一信用代码：
        <span class="font-click">{{basicInfo.creditCode}}</span>
      </div>
      <div class="lh50">企业联系电话：
        <span class="font-click">{{basicInfo.phoneNumber}}</span>
      </div>
      <div class="lh50">企业经营状态：
        <span class="font-click">{{basicInfo.manageState}}</span>
      </div>
      <div class="lh50">电子邮箱：
        <span class="font-click">{{basicInfo.email}}</span>
      </div>
      <div class="lh50">企业通信地址：
        <span class="font-click">{{basicInfo.postalAddress}}</span>
      </div>
      <div class="lh50">企业名称：
        <span class="font-click">{{basicInfo.companyName}}</span>
      </div>
      <div class="lh50">邮政编码：
        <span class="font-click">{{basicInfo.postcode}}</span>
      </div>
      <div class="lh50">从业人数：
        <span class="font-click">{{basicInfo.employeeNum}}</span>
      </div>
      <div class="lh50">是否有网站或网店：
        <span class="font-click">{{isHasWeb}}</span>
      </div>
      <div class>企业是否有投资信息
        <br>或购买其他公司股权：
        <span class="font-click">{{isdwtzs}}</span>
      </div>
      <div class>有限责任公司本年度
        <br>是否发生股权转让：
        <span class="font-click">{{womempnum}}</span>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt2" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">资产总额：
        <span class="font-click">{{basicInfo.totalAssets}}</span>
      </div>
      <div class="lh50">营业总收入中主营业务收入：
        <span class="font-click">{{basicInfo.primeBusProfit}}</span>
      </div>
      <div class="lh50">所有者权益合计：
        <span class="font-click">{{basicInfo.totalEquity}}</span>
      </div>
      <div class="lh50">净利润：
        <span class="font-click">{{basicInfo.retainedProfit}}</span>
      </div>
      <div class="lh50">销售总额：
        <span class="font-click">{{basicInfo.totalSales}}</span>
      </div>
      <div class="lh50">纳税总额：
        <span class="font-click">{{basicInfo.totalTax}}</span>
      </div>
      <div class="lh50">利润总额：
        <span class="font-click">{{basicInfo.totalProfit}}</span>
      </div>
      <div class="lh50">负债总额：
        <span class="font-click">{{basicInfo.totalLiability}}</span>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content relative">
      <BlockTitle :bt="bt3" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">股东：
        <span class="font-click">{{shareholderInfo.investorName}}</span>
      </div>
      <div class="lh50">认缴出资额(万元)：
        <span class="font-click">{{shareholderInfo.subscribeAmount}}</span>
      </div>
      <div class="lh50">认缴出资时间：
        <span class="font-click">{{shareholderInfo.subscribeTime}}</span>
      </div>
      <div class="lh50">认缴出资方式：
        <span class="font-click">{{shareholderInfo.subscribeType}}</span>
      </div>
      <div class="lh50">实缴出资额(万元)：
        <span class="font-click">{{shareholderInfo.paidAmount}}</span>
      </div>
      <div class="lh50">实缴出资时间：
        <span class="font-click">{{shareholderInfo.paidTime}}</span>
      </div>
      <div class="lh50">实缴出资方式：
        <span class="font-click">{{shareholderInfo.paidType}}</span>
      </div>
      <div class="more absolute">
        <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/nbGdCz/main">更多》</a>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content relative" v-if="equityChangeInfoList.length>0">
      <BlockTitle :bt="bt7" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        股东：
        <span class="font-click">{{equityChangeInfoList[0].investorName?equityChangeInfoList[0].investorName:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        变更前股权比例：
        <span class="font-click">{{equityChangeInfoList[0].ratioBefore?equityChangeInfoList[0].ratioBefore:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        变更后股权比例：
        <span class="font-click">{{equityChangeInfoList[0].ratioAfter?equityChangeInfoList[0].ratioAfter:"企业选择不公开"}}</span>
      </div>
      <div class="lh50">
        股权变更日期：
        <span class="font-click">{{equityChangeInfoList[0].changeTime?equityChangeInfoList[0].changeTime:"企业选择不公开"}}</span>
      </div>
      <div class="more absolute">
        <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/nbGqbg/main">更多》</a>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt4" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">修改事项：
        <span class="font-click">{{changeRecordList.changeItem}}</span>
      </div>
      <div class="lh50">修改前：
        <span class="font-click">{{changeRecordList.contentBefore}}</span>
      </div>
      <div class="lh50">修改后：
        <span class="font-click">{{changeRecordList.contentAfter}}</span>
      </div>
      <div class="lh50">修改日期：
        <span class="font-click">{{changeRecordList.changeTime}}</span>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content relative" v-if="hasInvestInfo">
      <BlockTitle :bt="bt5" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">对外投资企业名称：
        <span class="font-click">{{outboundInvestmentList.outcompanyName}}</span>
      </div>
      <div class="lh50">注册号/统一信用代码：
        <span class="font-click">{{outboundInvestmentList.creditCode}}</span>
      </div>
      <div class="more absolute">
        <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/nbDwtz/main">更多》</a>
      </div>
    </div>
    <!--  -->
    <div class="block-shadow-content relative" v-if="isShowSbxx">
      <BlockTitle :bt="bt6" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">城镇职工基本养老保险：
        <span class="font-click">{{sbxx.endowmentInsurance}}</span>
      </div>
      <div class="lh50">职工基本医疗保险：
        <span class="font-click">{{sbxx.medicalInsurance}}</span>
      </div>
      <div class="lh50">生育保险：
        <span class="font-click">{{sbxx.maternityInsurance}}</span>
      </div>
      <div class="lh50">失业保险：
        <span class="font-click">{{sbxx.unemploymentInsurance}}</span>
      </div>
      <div class="lh50">工伤保险：
        <span class="font-click">{{sbxx.employmentInjuryInsurance}}</span>
      </div>
      <div class="more absolute">
        <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/nbSbxx/main">更多》</a>
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
      changeRecordList: {}, //修改信息
      sbxx: {}, //社保信息
      equityChangeInfoList:[], // 股权变更信息
      shareholderInfo: {},
      webInfoList: {}, //
      investInfo: [], //对外投资
      outboundInvestmentList: {},
      isHasWeb: "", //是否有网站或网店：
      isdwtzs: "", //是否有对外投资信息
      womempnum: "", //是否发生股权转让：
      isHasTzxx: "", //企业是否有投资信息或购买其他公司股权
      hasInvestInfo: false,
      isShowSbxx: true
    };
  },
  methods: {
    setData() {
      this.equityChangeInfoList = this.basicInfoAnnualreport.equityChangeInfoList;
      this.basicInfo = this.basicInfoAnnualreport.baseInfo;
      this.changeRecordList =
        this.basicInfoAnnualreport.changeRecordList[0] == undefined
          ? []
          : this.basicInfoAnnualreport.changeRecordList[0];
      this.sbxx =
        this.basicInfoAnnualreport.reportSocialSecurityInfo == undefined
          ? {}
          : this.basicInfoAnnualreport.reportSocialSecurityInfo;
      this.shareholderInfo = this.basicInfoAnnualreport.shareholderList[0];
      this.webInfoList = this.basicInfoAnnualreport.webInfoList;
      this.investInfo = this.basicInfoAnnualreport.outboundInvestmentList;
      this.outboundInvestmentList = this.investInfo[0];
      this.equityChangeInfoList = this.basicInfoAnnualreport.equityChangeInfoList;
      this.subTitle = this.basicInfo.reportYear + "年报详情";
    }
  },
  computed: {
    basicInfoAnnualreport() {
      return store.state.annualreportData;
    }
  },
  mounted() {
    this.setData();
    this.hasInvestInfo = this.investInfo.length > 0 ? true : false;
    this.isHasWeb =
      this.webInfoList.length > 0
        ? this.webInfoList[0].website
        : "企业选择不公开";
    this.isdwtzs = this.investInfo.length > 0 ? "是" : "暂无";
    this.womempnum = this.equityChangeInfoList.length > 0 ? "是" : "暂无";
    this.isHasTzxx = this.changeRecordList > 0 ? "是" : "否";
    this.isShowSbxx = Object.keys(this.sbxx).length > 0 ? true : false;
  }
};
</script>
<style lang="scss" scoped>
.more {
  top: 20rpx;
  right: 20rpx;
}
</style>

