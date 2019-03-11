<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">决定文书号</div>
          <div class="font-click">{{historyHxPunishmentDetail.punishNumber}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">决定日期</div>
          <div class="title">{{historyHxPunishmentDetail.decisionDate}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">决定机关</div>
          <div class="title">{{historyHxPunishmentDetail.departmentName}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">违法行为类型</div>
          <div class="title">{{historyHxPunishmentDetail.type?historyHxPunishmentDetail.type:"--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">处罚内容</div>
          <div class="title">{{historyHxPunishmentDetail.content}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">公司名</div>
          <div class="title">{{historyHxPunishmentDetail.name}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">地区</div>
          <div class="title">{{historyHxPunishmentDetail.base}}</div>
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
      subTitle: "行政处罚详情",
      total: ""
    };
  },
  computed: {
    historyHxPunishmentDetail() {
      return store.state.historyHxPunishmentDetailData;
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

