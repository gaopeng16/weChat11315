<template>
  <div>
    <div
      class="man-icon left text-center bold"
      :style="{background:bgColor,width:w+'rpx',height:h+'rpx',lineHeight:lh+'rpx',fontSize:fs+'rpx'}"
    >
      <img
        :style="{width:w+'rpx',height:h+'rpx'}"
        v-if="imgFile && isImgFile==1 && headUrl"
        :src="imgFile+headUrl"
      >
      <img :style="{width:w+'rpx',height:h+'rpx'}" v-else-if="headUrl" :src="headUrl">
      <span v-else>{{lastname}}</span>
    </div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  props: [
    "headUrl",
    "lastname",
    "width",
    "height",
    "lineHeight",
    "fontSize",
    "isImgFile"
  ],
  data() {
    return {
      imgFile: config.imgFile,
      colorArr: [
        "#C69684",
        "#5ACFF7",
        "#73DB73",
        "#5ACFF7",
        "#D696EF",
        "#84B2F7"
      ],
      bgColor: "",
      w: "70",
      h: "70",
      lh: "70",
      fs: "40"
    };
  },
  mounted() {
    this.lastname = this.lastname.substr(0, 1);
    this.w = this.width || this.w;
    this.h = this.height || this.h;
    this.lh = this.lineHeight || this.lh;
    this.fs = this.fontSize || this.fs;
    this.bgColor = this.colorArr[
      Math.floor(Math.random() * this.colorArr.length)
    ];
  }
};
</script>
<style lang="scss" scoped>
.man-icon {
  display: inline-block;
  border-radius: 5rpx;
  color: #ffffff;
}
</style>
