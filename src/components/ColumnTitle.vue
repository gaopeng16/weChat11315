<template>
  <div>
    <div class="title-line title">
      <span>|</span>
      {{title}}
      <div class="more" v-if="hasmore && passOnOff" @click="more">更多></div>
      <div class="more" v-if="hasmore && !passOnOff">更多></div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  props: ["title", "hasmore", "url"],
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    more() {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url: this.url
        });
      } else {
        this.$emit("moreCheckLogin", this.isLogin);
      }
    },
    checkLogin() {
      const loginInfo = wx.getStorageSync("loginInfo");
      if (!loginInfo) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    }
  },
  computed: {
    passOnOff() {
      return store.state.passOnOff;
    }
  }
};
</script>

<style lang="scss" scoped>
.title-line {
  width: 100%;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 16px;
  margin: 20rpx 0;
  span {
    display: inline-block;
    margin-right: 5rpx;
    padding-left: 20rpx;
    color: #2196f4;
  }
  .more {
    float: right;
    color: #209bf9;
    margin-right: 10rpx;
    font-size: 14px;
  }
}
</style>
