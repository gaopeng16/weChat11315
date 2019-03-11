<template>
  <div class="default-bg">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comListed/qyjj/main'"
      v-if="Object.keys(data).length <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comListed/qyjj/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-content">
        <h3 class="title fs26 blod lh70">{{data.companyName}}</h3>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">英文名称</div>
            <div class="title">{{data.englishName}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">曾用名</div>
            <div class="title">--</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">所属行业</div>
            <div class="title">{{data.industry}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">主营业务</div>
            <div class="title">{{data.mainBusiness}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">股票名</div>
            <div class="title">{{data.stockname}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">股票编号</div>
            <div class="title">{{data.stockcode}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">董事长</div>
            <div class="font-click">{{data.chairmanName}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">董秘</div>
            <div class="font-click">{{data.secretaries}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">法定代表人</div>
            <div class="font-click">{{data.legal}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">总经理</div>
            <div class="font-click">{{data.generalManagerName}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">注册资本</div>
            <div class="title">{{data.registeredCapital}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">员工人数</div>
            <div class="title">{{data.employeesNum}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">注册地址</div>
            <div class="title">{{data.registeredAdd}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">省份</div>
            <div class="title">{{data.area}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">公司电话</div>
            <div class="title">{{data.tel}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">公司传真</div>
            <div class="title">{{data.fax}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">公司网址</div>
            <div class="title">{{data.website}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">邮政编码</div>
            <div class="title">{{data.ziPCode}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">控制股东</div>
            <div class="title">{{data.controllingShareholder}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">实际控制人</div>
            <div class="title">{{data.actualController}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">最终控制人</div>
            <div class="title">{{data.finalController}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">公司介绍</div>
            <div class="title">{{data.introduction}}</div>
          </i-col>
        </i-row>
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
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      title: "上市信息",
      subTitle: "公司简介",
      total: "",
      data: [],
      companyId: ""
    };
  },
  methods: {
    init() {
      this.$http
        .get("app/buss/companyInfo/comStock", {
          companyId: this.companyId,
          type: "companyInfo"
        })
        .then(res => {
          if (res.data.code == 0) {
            this.data = res.data.data.companyInfo;
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