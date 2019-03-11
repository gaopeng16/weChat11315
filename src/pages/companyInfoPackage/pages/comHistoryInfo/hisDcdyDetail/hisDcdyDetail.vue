<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <div class="lh70 title">登记信息</div>
      <div class="line"></div>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">登记编号</div>
          <div class="title">{{historyHxBaseInfoDetail.regNum}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">登记日期</div>
          <div class="title">{{historyHxBaseInfoDetail.regDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">登记机关</div>
          <div class="title">{{historyHxBaseInfoDetail.regDepartment}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">被担保债权种类</div>
          <div class="title">{{historyHxBaseInfoDetail.type}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">被担保债权数额</div>
          <div class="title">{{historyHxBaseInfoDetail.amount}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">债务人履行债务的期限</div>
          <div
            class="title"
          >{{historyHxBaseInfoDetail.overviewTerm?historyHxBaseInfoDetail.overviewTerm:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">担保范围</div>
          <div class="title">{{historyHxBaseInfoDetail.scope}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">省份</div>
          <div class="title">{{historyHxBaseInfoDetail.base}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">状态</div>
          <div class="title">{{historyHxBaseInfoDetail.status}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">公示日期</div>
          <div class="title">{{historyHxBaseInfoDetail.publishDate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">备注</div>
          <div class="title">{{historyHxBaseInfoDetail.remark?historyHxBaseInfoDetail.remark:"--"}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
    <div class="block-content">
      <div class="lh70 title">被担保债权概况</div>
      <div class="line"></div>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">概况种类</div>
          <div class="title">{{historyHxBaseInfoDetail.type}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">概况数额</div>
          <div class="title">{{historyHxBaseInfoDetail.amount}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">债务人履行的期限</div>
          <div
            class="title"
          >{{historyHxBaseInfoDetail.overviewTerm?historyHxBaseInfoDetail.overviewTerm:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">担保范围</div>
          <div class="title">{{historyHxBaseInfoDetail.scope}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">备注</div>
          <div class="title">{{historyHxBaseInfoDetail.remark?historyHxBaseInfoDetail.remark:"--"}}</div>
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
      subTitle: "动产抵押详情",
      total: ""
    };
  },
  computed: {
    historyHxBaseInfoDetail() {
      return store.state.historyHxBaseInfoDetailData;
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

