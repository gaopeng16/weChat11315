<template>
  <div>
    <div class="navbar" :style="{height:navH+'px'}">
      <img
        @click="navBack"
        class="back"
        v-if="imgUrl && !isTabBar"
        :src="imgUrl+'back_white_arrow.png'"
      >
      <div v-if="title" class="navbar-title">{{title}}</div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
export default {
  props: ["title", "isTabBar"],
  data() {
    return {
      navHeight: 0,
      imgUrl: config.imgUrl
    };
  },
  computed: {
    navH() {
      return store.state.navHeight;
    }
  },
  methods: {
    navBack() {
      wx.navigateBack({
        delta: 1
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  overflow: hidden;
  background: #209bf9;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .navbar-title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    font-size: 34rpx;
    z-index: 1;
  }
  .back {
    width: 12px;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px 15px;
    z-index: 2;
  }
}
</style>