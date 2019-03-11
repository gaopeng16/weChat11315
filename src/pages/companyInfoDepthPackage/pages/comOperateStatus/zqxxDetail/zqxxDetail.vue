<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">债券名称</div>
          <div class="title">{{operateStatusBondDetail.bondName}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">债劵代码</div>
          <div class="title">{{operateStatusBondDetail.bondNum}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">发行人</div>
          <div class="title">{{operateStatusBondDetail.publisherName}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">债劵类型</div>
          <div class="title">{{operateStatusBondDetail.bondType}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">债券发行日</div>
          <div class="title">{{operateStatusBondDetail.publishTime}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">债券到期日</div>
          <div class="title">{{operateStatusBondDetail.publishExpireTime}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">债券期限</div>
          <div class="title">--</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">上市交易日</div>
          <div class="title">{{operateStatusBondDetail.bondTradeTime}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">计息方式</div>
          <div class="title">{{operateStatusBondDetail.calInterestType}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">债券摘牌日</div>
          <div class="title">{{operateStatusBondDetail.bondStopTime}}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">信用评级机构</div>
          <div class="title">{{operateStatusBondDetail.creditRatingGov}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">债项评级</div>
          <div class="title">{{operateStatusBondDetail.debtRating}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">面值</div>
          <div class="title">{{operateStatusBondDetail.faceValue}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">参考利率</div>
          <div class="title">{{operateStatusBondDetail.refInterestRate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">票面利率</div>
          <div class="title">{{operateStatusBondDetail.faceInterestRate}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">实际发行量（亿）</div>
          <div class="title">{{operateStatusBondDetail.faceInterestRate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">计划发行量（亿）</div>
          <div class="title">{{operateStatusBondDetail.realIssuedQuantity}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">发行价格（元）</div>
          <div class="title">{{operateStatusBondDetail.issuedPrice}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">利差</div>
          <div class="title">{{operateStatusBondDetail.interestDiff}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">付息频率</div>
          <div class="title">{{operateStatusBondDetail.payInterestHZ}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">债券起息日</div>
          <div class="title">{{operateStatusBondDetail.startCalInterestTime}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">行权类型</div>
          <div class="title">{{operateStatusBondDetail.exeRightType}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">行权日期</div>
          <div class="title">{{operateStatusBondDetail.exeRightTime}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">托管机构</div>
          <div class="title">{{operateStatusBondDetail.escrowAgent}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">流通范围</div>
          <div class="title">{{operateStatusBondDetail.flowRange}}</div>
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
      title: "经营状况",
      subTitle: "债券信息详情",
      total: ""
    };
  },
  computed: {
    operateStatusBondDetail() {
      return store.state.operateStatusBondDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

