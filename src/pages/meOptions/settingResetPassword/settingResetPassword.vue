<template>
  <div class="bind-body">
    <div class="bind-con">
      <div class="input-line">
        <div class="phone-input">
          <i-input
            type="number"
            maxlength="11"
            @change="getphoneNumber"
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
      <div class="input-line">
        <i-input
          type="password"
          mode="wrapped"
          maxlength="6"
          @change="getPass"
          placeholder="请输入密码"
        />
      </div>
      <i-button type="warning" @click="resetPass" :disabled="canClick">重置</i-button>
    </div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
import store from "@/store";
import NavigateBar from "@/components/NavigateBar";
import { setTimeout } from "timers";
const { $Toast } = require("../../../../static/iview/base/index");
export default {
  components: { NavigateBar },
  data() {
    return {
      imgUrl: config.imgUrl,
      phoneNumber: "",
      password: "",
      verify: "",
      getVerifyText: "获取验证码",
      canGetVerify: true,
      canClick: true
    };
  },
  methods: {
    myToast(con, type) {
      $Toast({
        content: con,
        type: type
      });
    },
    getphoneNumber(e) {
      this.phoneNumber = e.target.detail.value;
      if (this.phoneNumber.length == 11) {
        this.canGetVerify = false;
      } else {
        this.canGetVerify = true;
      }
    },
    getVerify(e) {
      this.verify = e.target.detail.value;
      if (this.verify.length == 6) {
        this.canClick = false;
      } else {
        this.canClick = true;
      }
    },
    getPass(e) {
      this.password = e.target.detail.value;
    },
    getVerifyByPhone() {
      if (this.canGetVerify) {
        return;
      }
      if (this.phoneNumber === "") {
        this.myToast("请填写手机号!", "warning");
      } else {
        if (!/^1[34578]\d{9}$/.test(this.phoneNumber)) {
          this.myToast("手机号不合法!", "warning");
        } else {
          this.$http
            .post(config.getVerify, {
              iphone: this.phoneNumber,
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
                this.myToast("已发送", "success");
                this.phoneNumber = "";
              } else {
                this.myToast(res.data.message);
              }
            });
        }
      }
    },
    resetPass() {
      this.$http
        .post(config.changePasswd, {
          mobile: this.phoneNumber,
          userVerificationCode: this.verify,
          newPasswd: this.password
        })
        .then(res => {
          if (res.data.code == 0) {
            this.myToast(res.data.message, "success");
            wx.removeStorageSync("sign");
            wx.removeStorageSync("loginInfo");
            setTimeout(function() {
              wx.redirectTo({
                url: "/pages/login/main"
              });
            }, 1000);
          } else {
            this.myToast(res.data.message, "error");
          }
        });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.bind-body {
  height: 100vh;
  background: #f5f2f4;
  color: #ffffff;
  .bind-con {
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
}
</style>
