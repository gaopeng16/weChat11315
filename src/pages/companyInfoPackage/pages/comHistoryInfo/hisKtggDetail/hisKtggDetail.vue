<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">案由</div>
          <div class="title">{{historyHxAnnouncementDetail.caseReason}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">案号</div>
          <div class="title">{{historyHxAnnouncementDetail.caseNo}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">开庭日期</div>
          <div class="title">{{historyHxAnnouncementDetail.startDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24" :key="k" v-for="(v,k) in historyHxAnnouncementDetail.plaintiff">
          <div class="sub-content-light lh60">原告/上述人：</div>
          <div class="title">{{v.name}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24" :key="k" v-for="(v,k) in historyHxAnnouncementDetail.defendant">
          <div class="sub-content-light lh60">被告/被上述人：</div>
          <div class="title">{{v.name}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">当事人</div>
          <div class="title">{{historyHxAnnouncementDetail.litigant}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">承办部门</div>
          <div class="title">--</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">审判长/主审人</div>
          <div class="title">{{historyHxAnnouncementDetail.judge}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">法院</div>
          <div class="title">{{historyHxAnnouncementDetail.court}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">法庭</div>
          <div class="title">{{historyHxAnnouncementDetail.courtroom}}</div>
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
      imgFile: config.imgFile,
      title: "历史信息",
      subTitle: "开庭公告详情",
      total: ""
    };
  },
  computed: {
    historyHxAnnouncementDetail() {
      return store.state.historyHxAnnouncementDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
.comlogo {
  width: 120rpx;
  height: 120rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.comname {
  line-height: 120rpx;
}
</style>

