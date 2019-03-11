<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">组织机构代码/身份证号</div>
          <div class="title">--</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">省份</div>
          <div class="title">{{courtDishonestyDetail.areaName}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">立案时间</div>
          <div class="title">{{courtDishonestyDetail.regDate}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">发布时间</div>
          <div class="title">{{publishDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">做出执行依据单位</div>
          <div class="title">{{courtDishonestyDetail.gistUnit}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">执行法院</div>
          <div class="title">{{courtDishonestyDetail.courtName}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">执行依据文号</div>
          <div class="title">{{courtDishonestyDetail.gistId}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">案号</div>
          <div class="title">{{courtDishonestyDetail.caseCode}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">法律生效文书确定的义务</div>
          <div class="title">{{courtDishonestyDetail.duty}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">被执行人的履行情况</div>
          <div class="title">{{courtDishonestyDetail.performance}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">失信被执行人行为具体情形</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
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
      title: "司法风险",
      subTitle: "失信详情",
      total: ""
    };
  },
  computed: {
    courtDishonestyDetail() {
      return store.state.courtDishonestyDetailData;
    },
    publishDate() {
      return this.courtDishonestyDetail.publishDate?this.courtDishonestyDetail.publishDate.substr(0, 10):"--";
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

