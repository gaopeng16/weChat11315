<template>
  <div>
    <div class="brief-card-container" @click="goDetail">
      <div class="avatar">
        <img class="img" :src="newsImg">
      </div>
      <div class="detail">
        <div class="title">{{title}}</div>
        <div class="time">
          {{time}}
          <span v-if="source" class="font-click">{{source}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["newsImg", "newsTitle", "newsTime", "source", "newsId"],
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    goDetail() {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/newsDetail/main?newsId=" + this.newsId
        });
      } else {
        this.$emit("briefCardCheckLogin", this.isLogin);
      }
    },
    checkLogin() {
      const loginInfo = wx.getStorageSync("loginInfo");
      if (!loginInfo) {
        this.isLogin = false;
        console.log("未登录");
      } else {
        this.isLogin = true;
        console.log("已登录");
      }
    }
  },
  computed: {
    title() {
      if (this.newsTitle.length > 30) {
        return this.newsTitle.substr(0, 32) + "...";
      } else {
        return this.newsTitle;
      }
    },
    time() {
      return this.newsTime.substr(0, 10);
    }
  }
};
</script>
<style lang="scss" scoped>
.brief-card-container {
  width: calc(94% - 36px);
  margin-left: 36px;
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 3px 5px 0px #dddddd;
  min-height: 150rpx;
  position: relative;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: -15px;
    margin-top: 5px;
    float: left;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    width: calc(100% - 40px);
    float: left;
    margin-left: 10px;
    .title {
      font-size: 16px;
      line-height: 40rpx;
      padding-top: 10px;
    }
    .time {
      position: absolute;
      bottom: 5px;
      left: 36px;
      color: #999;
      font-size: 12px;
      span {
        display: inline-block;
        font-size: 12px;
        line-height: 18px;
        padding: 0 5px;
        border: solid 1px #2196f4;
        border-radius: 9px;
      }
    }
  }
}
</style>
