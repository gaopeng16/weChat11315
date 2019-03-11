<template>
  <div>
    <div class="sub-title">{{title}} / {{subTitle}} {{total ? '('+total+')':'' }}</div>
  </div>
</template>
<script>
export default {
  props: ["title", "subTitle", "total"]
};
</script>
<style lang="scss" scoped>
.sub-title {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background:#ffffff;
  color:#209bf9;
  text-indent: 20rpx;
}
</style>

