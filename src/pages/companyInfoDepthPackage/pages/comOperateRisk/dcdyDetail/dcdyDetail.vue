<template>
  <div>
    <div class="default-bg min-height100">
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-content">
        <h3 class="title fs26 blod lh70">登记信息</h3>
        <div class="line"></div>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">登记编号</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.regNum ? operateRiskMortgageDetail.baseInfo.regNum : "--"}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">登记日期</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.regDate ? operateRiskMortgageDetail.baseInfo.regDate : "--"}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">登记机关</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.regDepartment ? operateRiskMortgageDetail.baseInfo.regDepartment : "--"}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">被担保债权种类</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.type ? operateRiskMortgageDetail.baseInfo.type : "--"}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">债务人履行债务的期限</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.term ? operateRiskMortgageDetail.baseInfo.term : "--"}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">被担保债权数额</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.amount ? operateRiskMortgageDetail.baseInfo.amount : "--"}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">担保范围</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.scope ? operateRiskMortgageDetail.baseInfo.scope : "--"}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">省份</div>
            <div class="title">{{operateRiskMortgageDetail.baseInfo.base}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">状态</div>
            <div class="title">{{operateRiskMortgageDetail.baseInfo.status == '1' ? '有效': "无效"}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">公示日期</div>
            <div class="title">{{operateRiskMortgageDetail.baseInfo.publishDate}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">备注</div>
            <div class="title">{{operateRiskMortgageDetail.baseInfo.remark}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <h3 class="title fs26 blod lh70">抵押权人概况</h3>
        <div class="line"></div>
        <div :key="k" v-for="(v,k) in operateRiskMortgageDetail.peopleInfo">
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">抵押权人名称</div>
              <div class="title">{{v.peopleName ? v.peopleName : "--"}}</div>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">抵押权人证照/证件类型</div>
              <div class="title">{{v.licenseNum ? v.licenseNum : "--"}}</div>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">证照/证件号码</div>
              <div class="title">{{v.liceseType ? v.liceseType : "--"}}</div>
            </i-col>
          </i-row>
        </div>
      </div>
      <!--  -->
      <div class="block-content">
        <h3 class="title fs26 blod lh70">被担保债权概况</h3>
        <div class="line"></div>
        <i-row>
          <i-col span="12">
            <div class="sub-content-light lh60">概况种类</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.type ? operateRiskMortgageDetail.baseInfo.type : "--"}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">概况数额</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.overviewAmount ? operateRiskMortgageDetail.baseInfo.overviewAmount : "--"}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">债务人履行债务的期限</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.term ? operateRiskMortgageDetail.baseInfo.term : "--"}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">担保范围</div>
            <div
              class="title"
            >{{operateRiskMortgageDetail.baseInfo.scope ? operateRiskMortgageDetail.baseInfo.scope : "--"}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">备注</div>
            <div class="title">{{operateRiskMortgageDetail.baseInfo.remark}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <h3 class="title fs26 blod lh70">抵押物概况</h3>
        <div class="line"></div>
        <h3 class="title fs26 text-center blod lh70">{{"--"}}</h3>
        <div :key="k" v-for="(v,k) in operateRiskMortgageDetail.pawnInfoList">
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">所有权归属</div>
              <div class="title">{{v.ownership ? v.ownership : "--"}}</div>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">数量、质量、状况、所在地等情况</div>
              <div class="title">{{v.detail ? v.detail : "--"}}</div>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="24">
              <div class="sub-content-light lh60">备注</div>
              <div class="title">{{v.remark}}</div>
            </i-col>
          </i-row>
        </div>
      </div>
      <!--  -->
    </div>
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
      title: "经营风险",
      subTitle: "动产抵押详情",
      total: ""
    };
  },
  computed: {
    operateRiskMortgageDetail() {
      return store.state.operateRiskMortgageDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
.round {
  right: 15rpx;
  top: 15rpx;
  padding: 5rpx 10rpx;
  border: solid 1px #73ccc0;
  color: #73ccc0;
  border-radius: 5rpx;
}
.core-term-face {
  width: 120rpx;
  height: auto;
  .logo-box {
    display: inline-block;
    width: 120rpx;
    height: 120rpx;
    margin-top: 20rpx;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.core-term-right {
  width: calc(100% - 140rpx);
  margin-left: 10rpx;
  .position {
    overflow: hidden;
    margin-bottom: 20rpx;
    div {
      padding: 5rpx 10rpx;
      margin: 0 15rpx 0 0;
      color: #ffffff;
    }
  }
}
</style>
