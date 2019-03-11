<template>
  <div>
    <div class="block-title">
      <span class="line"></span>
      <span v-if="hasBt">{{bt}} : </span>
      <span class="font-click">{{title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["bt", "title", "hasBt"]
};
</script>
<style lang="scss" scoped>
.block-title {
  margin: 15rpx 0 15rpx 0;
  line-height: 30rpx;
  .line {
    float:left;
    width: 2px;
    height: 26rpx;
    margin-right: 10rpx;
    background: #209bf9;
  }
}
</style>
