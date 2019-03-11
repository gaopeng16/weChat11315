<template>
  <div>
    <div class="court-con" v-if="fxType == 2">
      <div>案件标题：{{item.partyName}}</div>
      <div>案件类型：{{item.noticeType}}</div>
      <div>公告时间：{{item.noticeDate}}</div>
      <div>判决内容：{{item.noticeContent}}</div>
      <div>执行法院：{{item.courtName}}</div>
    </div>
    <div class="court-con" v-if="fxType == 3">
      <div>名称：{{item.companyName}}</div>
      <div>列入日期：{{item.abnormalTime}}</div>
      <div>决定机关：{{item.decOrg}}</div>
      <div>列入原因：{{item.abnormalCauses}}</div>
      <div>移除日期：{{item.removalTime}}</div>
      <div>移除原因：{{item.removalReason}}</div>
    </div>
    <div class="court-con" v-if="fxType == 4">
      <div>决定文书号：{{item.pendecno}}</div>
      <div>类型：{{item.illegacttype}}</div>
      <div>处罚内容：{{item.pentype}}</div>
      <div>决定日期：{{item.pendecissdate}}</div>
      <div>决定机关：{{item.penauth}}</div>
      <div>法人：{{item.companyName}}</div>
    </div>
    <div class="court-con" v-if="fxType == 5">
      <div>名称：{{item.companyName}}</div>
      <div>出质人：{{item.pledgor}}</div>
      <div>质权人：{{item.pledgee}}</div>
      <div>公示日期：{{item.putDate}}</div>
      <div>出质人证件号：{{item.certifNumberR}}</div>
      <div>质权人证件号：{{item.regNumber}}</div>
      <div>出质股权金额：{{item.pledgedA}}</div>
    </div>
    <div class="court-con" v-if="fxType == 6">
      <div>抵押权人：{{item.companyName}}</div>
      <div>登记机关：{{item.regDepartment}}</div>
      <div>抵押期限：{{item.term}}</div>
      <div>抵押物名称：{{item.pledgee}}</div>
      <div>抵押物详情：{{item.guades}}</div>
      <div>债权金额：{{item.amount}}</div>
      <div>抵押所有者：{{item.own}}</div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      item: {},
      fxType: 0
    };
  },
  mounted() {
    this.fxType = this.$root.$mp.query.fxType;
    this.item = store.state.detailContent;
  }
};
</script>
<style lang="scss" scoped>
.court-con {
  box-sizing: border-box;
  width: 94%;
  height: auto;
  margin-left: 3%;
  margin-top: 40rpx;
  padding: 15rpx;
  box-shadow: 0px 0px 10px #e9eaec;
  background: #ffffff;
  border-radius: 8rpx;
  div {
    padding: 6px 0;
  }
}
</style>
