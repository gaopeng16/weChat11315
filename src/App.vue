<script>
import store from "@/store/index";
import config from "@/config.js";
import { clearTimeout } from "timers";
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    console.log("app created and cache logs by setStorageSync");
  },
  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        //导航高度
        store.commit("navHeight", res.statusBarHeight + 46);
      },
      fail(err) {
        console.log(err);
      }
    });
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate();
                  // 每次更新 新版本都需要重新登录一下吗
                  wx.removeStorageSync("vuex");
                  wx.removeStorageSync("loginInfo");
                }
              }
            });
          });
          updateManager.onUpdateFailed(function() {
            wx.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
            });
          });
        }
      });
    } else {
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      });
    }
  },
  onShow() {
    this.$http
      .get("app/buss/androidAppVersion/detailForMP", {
        version: config.version
      })
      .then(res => {
        if (res.data.code == 0) {
          if (res.data.data == "true") {
            store.commit("setPassOnOff", true);
          } else if (res.data.data == "false") {
            store.commit("setPassOnOff", false);
          }
        }
      });
  }
};
</script>
<style  lang="scss">
body {
  font-size: 14px;
  color: #495060;
}
/* .notice {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
} */
.no-scroll-body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.gray-body {
  background: #f0f0f0;
}
.content {
  color: #495060;
}
.sub-content {
  color: #80848f;
}
.sub-content-light {
  color: #bbbec4;
}
.fixed {
  position: fixed;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.overflow-hidden {
  overflow: hidden !important;
}
.min-h100vh {
  min-height: 100vh;
}
.title {
  color: #1c2438;
}
.error {
  color: #ed3f14;
}
.white {
  color: #ffffff;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.left {
  float: left;
}
.right {
  float: right;
}
.text-center {
  text-align: center;
}
.font-red {
  color: red;
}
.font-click {
  color: #2196f4;
}
.hidden {
  overflow: hidden;
}
.no-scroll {
  overflow: hidden !important;
}
.white {
  color: white;
}
.red {
  color: red;
}
.origin {
  color: #ffa500;
}
.origin-deep {
  color: #fc5c25;
}
.white-bg {
  background: #ffffff;
}
.default-bg {
  background: #f0f0f0;
}
.min-height100 {
  min-height: 100vh;
}
.blod {
  font-weight: bold;
}
.fs26 {
  font-size: 26rpx;
}
.fs30 {
  font-size: 30rpx;
}
.lh70 {
  line-height: 70rpx;
}
.lh60 {
  line-height: 60rpx;
}
.lh50 {
  line-height: 50rpx;
}
.lh40 {
  line-height: 40rpx;
}
.lh30 {
  line-height: 30rpx;
}
.mtb10 {
  margin: 10rpx 0;
}
.mtb15 {
  margin: 15rpx 0;
}
.mtb20 {
  margin: 20rpx 0;
}
.mtb25 {
  margin: 25rpx 0;
}
.mt10 {
  margin-top: 10rpx;
}
.mt15 {
  margin-top: 15rpx;
}
.mt20 {
  margin-top: 20rpx;
}
.mr20 {
  margin-right: 20rpx;
}
.ml10 {
  margin-left: 10rpx;
}
.ml15 {
  margin-left: 15rpx;
}
.ml20 {
  margin-left: 20rpx;
}
.mb15 {
  margin-bottom: 15rpx;
}
.mr15 {
  margin-right: 15rpx;
}
.clearboth {
  clear: both;
}
.block-shadow-content {
  width: calc(94% - 40rpx);
  height: auto;
  margin-left: 3%;
  margin-top: 15rpx;
  padding: 10rpx 20rpx;
  background: #ffffff;
  border-radius: 10rpx;
  box-shadow: 0 0 10rpx 10rpx 10rpx #bbbec4;
}
.block-content-100 {
  width: 100%;
  height: auto;
  margin-top: 15rpx;
  padding: 10rpx 0rpx;
  background: #ffffff;
}
.block-content {
  width: calc(100% - 40rpx);
  height: auto;
  margin-top: 15rpx;
  padding: 10rpx 20rpx;
  background: #ffffff;
}
.line {
  width: 100%;
  height: 1px;
  background: #dddee1;
  clear: both;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bottom90 {
  width: 100%;
  height: 90rpx;
}
</style>