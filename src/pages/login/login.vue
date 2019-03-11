<template>
  <div class="bind-body">
    <div class="text-center">
      <span @click="changeTab" class="tab" :class="{active:isActive}" span="12">验证码登录</span>
      <span @click="changeTab" class="tab" :class="{active:!isActive}" span="12">密码登录</span>
    </div>
    <div class="bind-con" v-if="isActive">
      <div class="input-line">
        <div class="phone-input">
          <i-input
            type="number"
            maxlength="11"
            @change="getPhoneNumberV"
            mode="wrapped"
            placeholder="请输入手机号"
          />
        </div>
        <div class="get-verify">
          <i-button
            type="warning"
            @click="getVerifyByPhone"
            :disabled="canGetVerify"
          >{{getVerifyText}}</i-button>
        </div>
      </div>
      <div class="input-line">
        <i-input type="text" mode="wrapped" maxlength="6" @change="getVerify" placeholder="请输入验证码"/>
      </div>
      <i-button type="warning" @click="loginByVerify">登录</i-button>
    </div>
    <div class="bind-con" v-if="!isActive">
      <div class="input-line">
        <i-input
          type="number"
          mode="wrapped"
          maxlength="11"
          @change="getPhoneNumberP"
          placeholder="请输入手机号"
        />
      </div>
      <div class="input-line">
        <i-input
          type="password"
          mode="wrapped"
          maxlength="20"
          @change="getPassword"
          placeholder="请输入密码(6~20位)"
        />
      </div>
      <i-button type="warning" @click="loginByPass" :disabled="canLoginByPassword">登录</i-button>
    </div>
    <div class="wechat-login" @click="checkBind">
      <img class="wechat-icon" v-if="imgUrl" :src="imgUrl+'img_message_wx.png'" alt>
      微信快捷登录
    </div>
    <i-modal title="提示" :visible="!isBind" @click="goBind" :actions="actions">
      <div>您还没有绑定手机号</div>
    </i-modal>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
import { mapMutations } from "vuex";
import { SET_VIPLEVEL, SET_SIGN } from "@/store/mutation-types";
import NavigateBar from "@/components/NavigateBar";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  components: { NavigateBar },
  data() {
    return {
      navTitle: "登录",
      imgUrl: config.imgUrl,
      phoneNumberV: "",
      phoneNumberP: "",
      password: "",
      verify: "",
      isBind: true,
      isActive: true,
      getVerifyText: "获取验证码",
      canGetVerify: true,
      canLoginByPassword: true,
      actions: [
        {
          name: "现在绑定",
          color: "#ed3f14"
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      setVipLevel: SET_VIPLEVEL,
      setSign: SET_SIGN
    }),
    myToast(con) {
      $Toast({
        content: con
      });
    },
    getPhoneNumberV(e) {
      this.phoneNumberV = e.target.detail.value;
      if (this.phoneNumberV.length == 11) {
        this.canGetVerify = false;
      } else {
        this.canGetVerify = true;
      }
    },
    getVerify(e) {
      this.verify = e.target.detail.value;
    },
    getPhoneNumberP(e) {
      this.phoneNumberP = e.target.detail.value;
    },
    getPassword(e) {
      this.password = e.target.detail.value;
      if (this.phoneNumberP === "") {
        this.myToast("请填写手机号!");
      } else {
        if (!/^1[34578]\d{9}$/.test(this.phoneNumberP)) {
          this.myToast("手机号不合法!");
        } else {
          if (this.password.length >= 6) {
            this.canLoginByPassword = false;
          } else {
            this.canLoginByPassword = true;
          }
        }
      }
    },
    changeTab() {
      this.isActive = !this.isActive;
    },
    getVerifyByPhone() {
      if (this.canGetVerify) {
        return;
      }
      if (this.phoneNumberV === "") {
        this.myToast("请填写手机号!");
      } else {
        if (!/^1[34578]\d{9}$/.test(this.phoneNumberV)) {
          this.myToast("手机号不合法!");
        } else {
          this.$http
            .post(config.getVerify, {
              iphone: this.phoneNumberV,
              type: "verification_code"
            })
            .then(res => {
              if (res.data.code == 0) {
                this.canGetVerify = true;
                let second = 60;
                let timer = setInterval(() => {
                  second -= 1;
                  this.getVerifyText = second + "s";
                  if (second == 0) {
                    clearInterval(timer);
                    this.getVerifyText = "获取验证码";
                    this.canGetVerify = false;
                  }
                }, 1000);
                this.myToast("已发送");
              } else {
                this.myToast(res.data.message);
              }
            });
        }
      }
    },
    loginByVerify() {
      let _this = this;
      this.$http
        .post(config.loginByVerify, {
          iphone: this.phoneNumberV,
          verificationCode: this.verify
        })
        .then(res => {
          if (res.data.code == 0) {
            const bussUser = res.data.data.bussUser;
            const loginInfo = {
              userId: bussUser.id,
              mobile: bussUser.mobile,
              headPic: bussUser.headPic,
              vipLevel: bussUser.vipLevel,
              expireDate: bussUser.expireDate
            };
            wx.setStorageSync("loginInfo", loginInfo);
            _this.setVipLevel(loginInfo.vipLevel);
            _this.setSign(res.data.data.sign);
            wx.switchTab({
              url: "/pages/index/main"
            });
          } else {
            this.myToast(res.data.message);
          }
        });
    },
    loginByPass() {
      let _this = this;
      this.$http
        .post(config.loginByPass, {
          iphone: this.phoneNumberP,
          password: this.password
        })
        .then(res => {
          if (res.data.code == 0) {
            const bussUser = res.data.data.bussUser;
            const loginInfo = {
              userId: bussUser.id,
              mobile: bussUser.mobile,
              headPic: bussUser.headPic,
              vipLevel: bussUser.vipLevel,
              expireDate: bussUser.expireDate
            };
            wx.setStorageSync("loginInfo", loginInfo);
            _this.setVipLevel(loginInfo.vipLevel);
            _this.setSign(res.data.data.sign);
            wx.switchTab({
              url: "/pages/index/main"
            });
          } else {
            this.myToast(res.data.message);
          }
        });
    },
    loginByWeChat() {
      console.log("已经绑定，直接登录");
    },
    goBind() {
      wx.navigateTo({
        url: "/pages/bindPhone/main"
      });
    },
    checkBind() {
      let _this = this;
      //只有微信登录时，才判断微信是否绑定手机号
      const user = wx.getStorageSync("user");
      if (user) {
        this.$http
          .post(config.checkBindPhone, { type: "wx", qqOrWxNum: user.openid })
          .then(res => {
            if (res.data.code == 0) {
              this.isBind = true;
              const bussUser = res.data.data.bussUser;
              const loginInfo = {
                userId: bussUser.id,
                mobile: bussUser.mobile,
                headPic: bussUser.headPic,
                vipLevel: bussUser.vipLevel,
                expireDate: bussUser.expireDate
              };
              wx.setStorageSync("loginInfo", loginInfo);
              _this.setVipLevel(loginInfo.vipLevel);
              _this.setSign(res.data.data.sign);
              wx.switchTab({
                url: "/pages/index/main"
              });
            } else {
              this.isBind = false;
            }
          });
      } else {
        wx.navigateTo({
          url: "/pages/accredit/main"
        });
      }
    }
  },
  onShow() {
    this.isBind = true;
  }
};
</script>
<style lang="scss" scoped>
.bind-body {
  height: 100vh;
  background: #f5f2f4;
  color: #ffffff;

  .text-center {
    width: 60%;
    overflow: hidden;
    margin-left: 20%;
    padding-top: 100rpx;
    .tab {
      width: 50%;
      height: 40rpx;
      line-height: 40rpx;
      display: block;
      float: left;
      color: #ff9900;
      border-radius: 2px;
    }
    .active {
      background: #ff9900;
      color: #ffffff;
    }
  }
  .bind-con {
    margin-top: 20rpx;
    .input-line {
      overflow: hidden;
    }
    .phone-input {
      width: 70%;
      float: left;
    }
    .get-verify {
      width: 30%;
      float: right;
    }
    .bind-ts {
      text-align: center;
      margin-bottom: 40rpx;
      font-size: 12px;
    }
  }
  .wechat-login {
    color: #209bf9;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    margin-right: 30rpx;
    margin-top: 30rpx;
    .wechat-icon {
      width: 100rpx;
      height: 100rpx;
      vertical-align: middle;
    }
  }
}
</style>
