<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">标题</div>
          <div class="title">{{courtLawDetail.title}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">原告</div>
          <div class="title">{{courtLawDetail.plaintiffs}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">被告</div>
          <div class="title">{{courtLawDetail.defendants}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">法院</div>
          <div class="title">{{courtLawDetail.court}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">案号</div>
          <div class="title">{{courtLawDetail.caseno}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">案件类型</div>
          <div class="title">{{courtLawDetail.casetype}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">案由</div>
          <div class="title">{{courtLawDetail.casereason}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">文书类型</div>
          <div class="title">{{courtLawDetail.doctype}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">发布时间</div>
          <div class="title">{{courtLawDetail.submittime}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">公告内容</div>
          <div class="title" v-if="courtLawDetail.url">
            <!-- <web-view :src="courtLawDetail.url"></web-view> -->
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
      return this.courtLawDetail.pubDate
    }
  },
  mounted(){
    console.log(this.courtLawDetail)
  }
};
</script>
<style lang="scss" scoped>
</style>

