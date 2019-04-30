<template>
  <div>
    <div class="default-bg min-height100">
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content overflow-hidden">
        <div class="core-term-face left">
          <img v-if="developmentHxtdDetail.icon" :src="developmentHxtdDetail.icon">
          <img v-else-if="imgUrl" :src="imgUrl+'logo_n.png'">
        </div>
        <div class="core-term-right left">
          <div class="title lh70 font-click blod">{{developmentHxtdDetail.name}}</div>
          <div class="position left" :key="k" v-for="(v,k) in developmentHxtdDetail.title">
            <div v-if="k==0" class="red">{{v}}</div>
            <div v-if="k==1" class="green">{{v}}</div>
            <div v-if="k==2" class="blue">{{v}}</div>
          </div>
          <div class="sub-content clearboth">{{developmentHxtdDetail.desc}}</div>
        </div>
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
      title: "企业发展(深度查询)",
      subTitle: "核心团队详情",
      total: ""
    };
  },
  computed: {
    developmentHxtdDetail() {
      return store.state.developmentHxtdDetailData;
    }
  },
  mounted() {
    console.log(this.developmentHxtdDetail);
  }
};
</script>
<style lang="scss" scoped>
.core-term-face {
  width: 80rpx;
  height: auto;
  img {
    display: inline-block;
    width: 80rpx;
    height: 80rpx;
    margin-top: 20rpx;
    border-radius: 50%;
  }
}
.core-term-right {
  width: calc(100% - 100rpx);
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
.red {
  background: #ff0000;
}
.green {
  background: #4fbfb0;
}
.blue {
  background: #209bf9;
}
</style>
