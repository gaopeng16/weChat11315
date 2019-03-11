<template>
  <div>
    <div>
      <div class="logo">
        <img class="logo-img" v-if="imgUrl" :src="imgUrl+'tab1_selected.png'">
      </div>
      <div class="need content">需要使用你的微信昵称和头像</div>
      <div class="credit-btn">
        <button
          v-if="canIUse"
          class="btn"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="bindGetuserinfo"
        >点击授权</button>
        <div v-else class="need content">请升级微信版本</div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config.js";
import store from "@/store";
import { showModal } from "@/utils";
import NavigateBar from "@/components/NavigateBar";
export default {
  components: { NavigateBar },
  data() {
    return {
      navTitle: "企信查",
      imgUrl: config.imgUrl,
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      user: {},
      userInfo: {}
    };
  },
  methods: {
    bindGetuserinfo(e) {
      let _this = this;
      if (
        (!_this.user.openid ||
          (_this.user.expires_in || Date.now()) < Date.now() + 600) &&
        !_this.userInfo.nickName
      ) {
        wx.login({
          success: function(res) {
            if (res.code) {
              if (e.mp.detail.rawData) {
                _this.userInfo = e.mp.detail.rawData;
                wx.setStorageSync("userInfo", _this.userInfo);
              }
              wx.request({
                url: config.host + config.openId,
                data: { jsCode: res.code },
                method: "GET",
                success: function(res) {
                  console.log('8989',res)
                  _this.user.openid = res.data.openid;
                  _this.user.expires_in = new Date() + res.data.expires_in;
                  wx.setStorageSync("user", _this.user);
                }
              });
              wx.switchTab({
                url: "/pages/index/main"
              });
            } else {
              console.log("获取用户登录态失败！" + res.errMsg);
            }
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  .logo-img {
    display: block;
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    overflow: hidden;
    margin: 200rpx auto 0 auto;
  }
}
.need {
  text-align: center;
  font-size: 12px;
  line-height: 30px;
}
.credit-btn {
  width: 60%;
  position: absolute;
  bottom: 200rpx;
  left: 20%;
  .btn {
    width: 100%;
    background: #209bf9;
    color: #ffffff;
  }
}
</style>
