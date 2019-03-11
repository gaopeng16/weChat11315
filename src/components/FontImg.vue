<template>
  <div>
    <div
      class="item-logo item-logo-hh left text-center blod"
      :class="[type == 1 ? 'font1':'font4']"
      :style="{background:bgColor,width:width+'rpx',height:height+'rpx',lineHeight:lineHeight+'rpx'}"
    >
      <img mode="aspectFit" v-if="logoUrl && logoUrl!=undefined" :src="logoUrl" @error="imgErr">
      <span v-else>{{br}}</span>
    </div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  props: ["type", "logoUrl", "brief", "width", "height", "lineHeight"],
  data() {
    return {
      imgUrl: config.imgUrl,
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
      br: ""
    };
  },
  methods: {
    imgErr(e) {
      if (e.type == "error") {
        this.logoUrl = this.imgUrl + "default.jpg";
      }
    }
  },
  mounted() {
    this.br = this.brief.substr(0, 4);
    this.bgColor = this.colorArr[
      Math.floor(Math.random() * this.colorArr.length)
    ];
  }
};
</script>
<style lang="scss" scoped>
.item-logo {
  margin: 10rpx 10rpx 0 10rpx;
  border-radius: 5rpx;
  color: #ffffff;
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.font4 {
  color: #ffffff;
  white-space: normal;
}
.font1 {
  color: #ffffff;
  font-size: 40rpx;
}
.item-logo-hh {
  background: #5ccdf2;
}
.item-logo-djg {
  background: #84aff0;
}
</style>
