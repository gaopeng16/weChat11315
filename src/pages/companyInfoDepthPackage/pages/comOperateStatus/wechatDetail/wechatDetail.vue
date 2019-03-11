<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <div class="left wechat-logo">
        <img mode="aspectFit" :src="operateStatusWechatDetail.titleImgURL">
      </div>
      <div class="left wechat-right">
        <div class="lh50">
          <span class="font-click">{{operateStatusWechatDetail.title}}</span>
        </div>
        <div class="lh50">
          微信号:
          <span class="font-click">{{operateStatusWechatDetail.publicNum}}</span>
        </div>
        <div class="lh50">
          功能介绍：
          <span class="sub-content">{{operateStatusWechatDetail.recommend}}</span>
        </div>
      </div>
      <div class="clearboth text-center">
        <img class="ewm" :src="operateStatusWechatDetail.codeImg">
        <div>扫描二维码关注</div>
      </div>
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
      title: "经营状况",
      subTitle: "微信公众号详情",
      total: ""
    };
  },
  computed: {
    operateStatusWechatDetail() {
      return store.state.operateStatusWechatDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
.wechat-logo {
  width: 160rpx;
  height: 160rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.wechat-right {
  margin-left: 15rpx;
  width: calc(100% - 200rpx);
}
.ewm {
  width: 200rpx;
  height: 200rpx;
}
</style>

