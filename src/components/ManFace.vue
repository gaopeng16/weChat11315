<template>
  <div>
    <div class="man-face left">
      <img mode="aspectFit" v-if="imgFile" :src="imgFile+imgSrc">
    </div>
  </div>
</template>
<script>
import config from "@/config.js";
export default {
  props: ["imgSrc"],
  data() {
    return {
      imgFile: config.imgFile
    };
  }
};
</script>
<style lang="scss" scoped>
.man-face {
  width: 70rpx;
  height: 70rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
