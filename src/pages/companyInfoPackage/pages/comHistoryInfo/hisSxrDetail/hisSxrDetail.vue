<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <div class="lh70 font-click">{{historyHxDishonestDetail.iname}}</div>
    </div>
    <div class="block-content">
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">组织机构代码/身份证号</div>
          <div class="title">{{historyHxDishonestDetail.cardnum}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">省份</div>
          <div class="title">{{historyHxDishonestDetail.areaname}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">法人、负责人姓名</div>
          <div class="title">{{historyHxDishonestDetail.businessentity}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">立案时间</div>
          <div class="title">{{historyHxDishonestDetail.regdate}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">发布时间</div>
          <div class="title">{{historyHxDishonestDetail.publishdate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">做出执行依据单位</div>
          <div class="title">{{historyHxDishonestDetail.gistunit}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">执行法院</div>
          <div class="title">{{historyHxDishonestDetail.courtname}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">执行依据文号</div>
          <div class="title">{{historyHxDishonestDetail.gistid}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">案号</div>
          <div class="title">{{historyHxDishonestDetail.casecode}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">法律生效文书确定的义务</div>
          <div class="title">{{historyHxDishonestDetail.duty}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">被执行人的履行情况</div>
          <div class="title">{{historyHxDishonestDetail.performance}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">失信被执行人行为具体情形</div>
          <div class="title">{{historyHxDishonestDetail.disrupttypename}}</div>
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
      subTitle: "失信人信息详情",
      total: ""
    };
  },
  computed: {
    historyHxDishonestDetail() {
      return store.state.historyHxDishonestDetailData;
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

