<template>
  <div>
    <div class="logo text-center">
      <img v-if="imgUrl" :src="imgUrl+'app_logo.png'">
      <span>企信查</span>
    </div>
    <div
      class="about title"
    >“企信查”APP是太平洋征信自主开发的信用调查应用软件，从政府监管信息、法律经营风险，股权产权舆情等各大维度50多个层面深度挖掘、分析、解读企业背景关系和信用状况，进行风险预警，并形成专业客观的信用报告，为政府监管、商业经营、生活消费、求职规划提供可靠地决策参考依据，可大幅降低商业银行、网络金融、融资担保、小额信贷等行业的经营风险，是“给力的商业调查助手”。</div>
    <div class="copy text-center title">
      <span class="sub-content-light">Copyright © 2016-2017</span>
      <br>太平洋绿盾国际征信有限公司
    </div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  data() {
    return {
      imgUrl: config.imgUrl
    };
  }
};
</script>
<style lang="scss" scoped>
.logo {
  width: 120rpx;
  height: 170rpx;
  margin: 50rpx auto 30rpx auto;
  line-height: 50rpx;
  img {
    width: 120rpx;
    height: 120rpx;
  }
}
.about {
  padding: 20rpx;
}
.copy {
  margin-top: 50rpx;
}
</style>
