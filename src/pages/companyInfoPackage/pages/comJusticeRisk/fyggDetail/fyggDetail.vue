<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">当事人</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">上诉方</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">公告类型</div>
          <div class="title">{{courtNoticeDetail.noticeType}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">案件号</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">刊登版面</div>
          <div class="title">--</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">刊登日期</div>
          <div class="title">{{noticeDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">公告号</div>
          <div class="title">--</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">公告状态</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">法院</div>
          <div class="title">{{courtNoticeDetail.courtName}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">处理等级</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">法官</div>
          <div class="title">--</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">法官电话</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">手机号</div>
          <div class="title">--</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">省份</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">原因</div>
          <div class="title">--</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">公告内容</div>
          <div class="title">{{courtNoticeDetail.noticeContent}}</div>
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
    courtNoticeDetail() {
      return store.state.courtNoticeDetailData;
    },
    noticeDate(){
      return formatTime(new Date(this.courtNoticeDetail.noticeDate))
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

