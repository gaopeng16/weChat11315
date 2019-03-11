<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
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
            <div class="font-click">{{baseInfo.crCode}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">注册日期</div>
            <div class="font-click">{{baseInfo.recordDate}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">注册海关</div>
            <div class="font-click">{{baseInfo.customsRegisteredAddress}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">行政区划</div>
            <div class="font-click">{{baseInfo.administrativeDivision}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">经济区划</div>
            <div class="font-click">{{baseInfo.economicDivision}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">经营类别</div>
            <div class="font-click">{{baseInfo.managementCategory}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">特殊贸易区域</div>
            <div class="font-click">{{baseInfo.specialTradeArea}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">行业种类</div>
            <div class="font-click">{{baseInfo.industryCategory}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">报关有效期</div>
            <div class="font-click">{{baseInfo.validityDate}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">海关注销标识</div>
            <div class="font-click">{{baseInfo.status}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">年报情况</div>
            <div class="font-click">{{baseInfo.annualReport}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">跨境贸易电子商务类型</div>
            <div class="font-click">{{baseInfo.types ? baseInfo.types:"--"}}</div>
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
        <div class="line"></div>creditRating
        <div :key="k" v-for="(v,k) in data.creditRating">
          <i-row>
            <i-col span="12">
              <div class="sub-content-light lh60">认定时间</div>
              <div class="font-click">{{v.identificationTime}}</div>
            </i-col>
            <i-col span="11" offset="1">
              <div class="sub-content-light lh60">信用等级</div>
              <div class="font-click">{{v.creditRating}}</div>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">认证证书编号</div>
              <div class="font-click">{{v.authenticationCode?v.authenticationCode:"--"}}</div>
            </i-col>
          </i-row>
        </div>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="title lh70">行政处罚信息</div>
          </i-col>
        </i-row>
        <div class="line"></div>
        <div :key="k" v-for="(v,k) in data.sanction">
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
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "经营状况",
      subTitle: "进出口信用",
      total: "",
      noData: false,
      data: {},
      baseInfo: {}
    };
  },
  methods: {
    init() {
      this.$http
        .get(config.companyName, {
          uri: config.importAndExportDe + this.companyName,
          pageSize: 0,
          pageNum: 1
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (Object.keys(res.data.result).length > 0) {
              this.data = res.data.result;
              this.baseInfo = this.data.baseInfo;
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

