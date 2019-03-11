<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comOperateStatus/jckxy/main'"
      v-if="Object.keys(data).length <=0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comOperateStatus/jckxy/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="lh70">注册信息</div>
          </i-col>
        </i-row>
        <div class="line"></div>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">海关注册编码</div>
            <div class="font-click">{{data.regNumber}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">注册日期</div>
            <div class="font-click">{{data.regDate}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">注册海关</div>
            <div class="font-click">{{data.regCustoms}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">行政区划</div>
            <div class="font-click">{{data.region}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">经济区划</div>
            <div class="font-click">{{data.economicRegion}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">经营类别</div>
            <div class="font-click">{{data.managementCategory}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">特殊贸易区域</div>
            <div class="font-click">{{data.specialTradeArea}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">行业种类</div>
            <div class="font-click">{{data.industry}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">报关有效期</div>
            <div class="font-click">{{data.validity}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">海关注销标识</div>
            <div class="font-click">{{data.cancelMark}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">年报情况</div>
            <div class="font-click">{{data.annualReport}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">跨境贸易电子商务类型</div>
            <div class="font-click">{{data.ecommercetypes?data.ecommercetypes:"--"}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="title lh70">信用等级</div>
          </i-col>
        </i-row>
        <div class="line"></div>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">认定时间</div>
            <div class="font-click">{{data.validity}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">信用等级</div>
            <div class="font-click">{{data.creditLv}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">认证证书编号</div>
            <div class="font-click">{{data.creditCertificateCode?data.creditCertificateCode:"--"}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="title lh70">行政处罚信息</div>
          </i-col>
        </i-row>
        <div class="line"></div>
        <div :key="k" v-for="(v,k) in data.ciecsmList">
          <i-row>
            <i-col span="12">
              <div class="sub-content-light lh60">处罚日期</div>
              <div class="font-click">{{v.penaltyDate}}</div>
            </i-col>
            <i-col span="11" offset="1">
              <div class="sub-content-light lh60">案件性质</div>
              <div class="font-click">{{v.natureOfCase?v.natureOfCase:"--"}}</div>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">行政处罚决定书编号</div>
              <div class="font-click">{{v.decisionNumber}}</div>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">当事人</div>
              <div class="font-click">{{v.party}}</div>
            </i-col>
          </i-row>
          <div class="line"></div>
        </div>
      </div>
      <!--  -->
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
      title: "经营状况",
      subTitle: "进出口信用",
      total: "",
      data: [],
      companyId: ""
    };
  },
  methods: {
    init(init) {
      this.$http
        .get("app/buss/companyInfo/comOperateStatus", {
          companyId: this.companyId,
          type: "importAndExport"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.importAndExport;
            result.regDate = result.regDate.substr(0, 10);
            result.validity = result.validity.substr(0, 10);
            this.data = result;
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

