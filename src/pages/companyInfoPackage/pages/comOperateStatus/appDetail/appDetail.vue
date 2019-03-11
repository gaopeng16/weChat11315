<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <div class="left App-logo">
        <img mode="aspectFit" v-if="imgFile" :src="imgFile+operateStatusAppDetail.produceLogo">
      </div>
      <div class="left App-right">
        <div class="lh50">
          <span class="font-click">{{operateStatusAppDetail.productName}}</span>
        </div>
        <div class="lh50 sub-content-light">
          全名:
          <span class="title">{{operateStatusAppDetail.productAbbreviation}}</span>
        </div>
        <div class="lh50 sub-content-light">
          类型：
          <span class="title">{{operateStatusAppDetail.field}}</span>
        </div>
        <div class="lh50 sub-content-light">
          分类：
          <span class="title">{{operateStatusAppDetail.productType}}</span>
        </div>
      </div>
      <div class="clearboth sub-content-light">
        <rich-text :nodes="operateStatusAppDetail.describe"></rich-text>
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
      subTitle: "产品信息详情",
      total: ""
    };
  },
  computed: {
    operateStatusAppDetail() {
      return store.state.operateStatusAppDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
.App-logo {
  width: 160rpx;
  height: 160rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.App-right {
  margin-left: 15rpx;
  width: calc(100% - 200rpx);
}
.ewm {
  width: 200rpx;
  height: 200rpx;
}
</style>

