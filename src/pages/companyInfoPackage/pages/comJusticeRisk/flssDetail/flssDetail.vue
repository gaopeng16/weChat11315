<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">标题</div>
          <div class="title">{{courtLawDetail.decisionTitle}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">原告</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">被告</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">法院</div>
          <div class="title">{{courtLawDetail.executiveCourt}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">案号</div>
          <div class="title">{{courtLawDetail.caseCode}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">案件类型</div>
          <div class="title">{{courtLawDetail.caseType}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">案由</div>
          <div class="title">{{courtLawDetail.caseCause}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">文书类型</div>
          <div class="title">{{courtLawDetail.contentType}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">发布时间</div>
          <div class="title">{{pubDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">公告内容</div>
          <div class="title" v-if="courtLawDetail.judgmentContent">
            <!-- <web-view :src="courtLawDetail.judgmentContent"></web-view> -->
            <rich-text :nodes="courtLawDetail.judgmentContent"></rich-text>
          </div>
          <div class="title" v-else>内容暂不公示</div>
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
      subTitle: "法律诉讼详情",
      total: ""
    };
  },
  computed: {
    courtLawDetail() {
      return store.state.courtLawDetailData;
    },
    pubDate(){
      return formatTime(new Date(this.courtLawDetail.pubDate))
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

