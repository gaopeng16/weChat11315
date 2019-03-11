<template>
  <div class="default-bg">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-content">
        <h3 class="title fs26 blod lh70">{{companyName}}</h3>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">英文名称</div>
            <div class="title">{{data.engName}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">曾用名</div>
            <div class="title">{{data.histroyName}}</div>
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
            <div class="font-click">{{data.secretariesName}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">法定代表人</div>
            <div class="font-click">{{data.legalName}}</div>
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
            <div class="title">{{data.address}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">省份</div>
            <div class="title">{{data.area}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">公司电话</div>
            <div class="title">{{data.mobile}}</div>
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
            <div class="title">{{data.postalcode}}</div>
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
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, NoData },
  data() {
    return {
      title: "上市信息",
      subTitle: "公司简介",
      total: "",
      noData: false,
      companyName: "",
      data: {}
    };
  },
  methods: {
    init() {
      this.$http
        .get(config.companyName, {
          uri: config.companyInfoDe + this.companyName,
          pageSize: 0,
          pageNum: 1
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (Object.keys(res.data).length > 0) {
              this.data = res.data.result;
              this.data.chairmanName = res.data.result.chairman.name;
              this.data.secretariesName = res.data.result.secretaries.name;
              this.data.legalName = res.data.result.legal.name;
              this.data.generalManagerName =
                res.data.result.generalManager.name;
              this.noData = false;
            } else {
              this.noData = true;
            }
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

