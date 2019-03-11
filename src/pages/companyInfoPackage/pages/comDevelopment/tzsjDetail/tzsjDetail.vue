<template>
  <div>
    <!--  -->
    <div class="block-content">
      <div class="logo-name overflow-hidden">
        <div class="logo left">
          <img
            v-if="imgFile && tzsjDetailData.productIcon"
            :src="imgFile+tzsjDetailData.productIcon"
          >
          <FontImg
            v-else
            :type="4"
            :brief="tzsjDetailData.product"
            :width="70"
            :height="70"
            :lineHeight="35"
          ></FontImg>
        </div>
        <div class="name font-click left ml20 lh70 mt10">{{tzsjDetailData.product}}</div>
      </div>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">融资轮次</div>
          <div class="title">{{tzsjDetailData.turn}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">投资金额</div>
          <div class="title">{{tzsjDetailData.vaule}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">投资时间</div>
          <div class="title">{{tzsjDetailData.date}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">地区</div>
          <div class="title">{{tzsjDetailData.region}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="11">
          <div class="sub-content-light lh60">行业</div>
          <div class="title">{{tzsjDetailData.industry}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">公司名</div>
          <div class="title">{{tzsjDetailData.company?tzsjDetailData.company:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">业务范围</div>
          <div class="title">{{tzsjDetailData.business}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">投资公司</div>
          <div class="title">{{tzsjDetailData.investors}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
  </div>
</template>
<script>
import config from "@/config";
import { mapState } from "vuex";
import FontImg from "@/components/FontImg";
export default {
  components: { FontImg },
  data() {
    return {
      imgFile: config.imgFile
    };
  },
  computed: {
    ...mapState(["tzsjDetailData"])
  },
  methods: {},
  mounted() {
    console.log(this.tzsjDetailData);
  }
};
</script>

<style lang="scss" scoped>
.logo-name {
  .logo {
    img {
      width: 70rpx;
      height: 70rpx;
      margin: 10rpx 10rpx 0 10rpx;
    }
    .name {
      font-size: 30rpx;
    }
  }
}
</style>
