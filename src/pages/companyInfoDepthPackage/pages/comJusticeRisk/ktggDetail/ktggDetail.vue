<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content">
      <BlockTitle :bt="bt" :title="courtSessionDetail.caseReason" :hasBt="true"></BlockTitle>
      <div class="lh50">
        案号：
        <span class="sub-content-light">{{courtSessionDetail.caseNo}}</span>
      </div>
      <div class="lh50">
        原告/上诉人：
        <span
          class="sub-content-light"
          :key="k"
          v-for="(v,k) in courtSessionDetail.plaintiff"
        >{{v.name}}</span>
      </div>
      <div class="lh50">
        被告/被上诉人：
        <span class="sub-content-light">
          <span :key="k" v-for="(v,k) in courtSessionDetail.defendant">{{v.name}}、</span>
        </span>
      </div>
      <div class="lh50">
        开庭日期：
        <span class="sub-content-light">{{courtSessionDetail.startDate}}</span>
      </div>
      <div class="lh50">
        承办部门：
        <span class="sub-content-light">{{courtSessionDetail.contractors}}</span>
      </div>
      <div class="lh50">
        审判长/主审人：
        <span class="sub-content-light">{{courtSessionDetail.judge}}</span>
      </div>
      <div class="lh50">
        法院：
        <span class="sub-content-light">{{courtSessionDetail.court}}</span>
      </div>
      <div class="lh50">
        法庭：
        <span class="sub-content-light">{{courtSessionDetail.courtroom}}</span>
      </div>
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
      total: "",
      bt: "案由"
    };
  },
  computed: {
    courtSessionDetail() {
      return store.state.courtSessionDetailData;
    },
    noticeDate() {
      return formatTime(new Date(this.courtSessionDetail.noticeDate));
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

