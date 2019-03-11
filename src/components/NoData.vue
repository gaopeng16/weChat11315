<template>
  <div class="empty-body gray-body relative">
    <div class="empty text-center absolute">
      <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
      <span>暂无信息</span>
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
.empty-body {
  width: 100%;
  height: 100vh;
  .empty {
    width: 300rpx;
    height: 370rpx;
    left: 50%;
    top: 50%;
    margin-left: -150rpx;
    margin-top: -185rpx;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
