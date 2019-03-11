<template>
  <div class="bind-body">
    <div class="bind-con">
      <div class="input-line">
        <div class="phone-input">
          <i-input
            type="number"
            maxlength="11"
            @change="getPhoneNumber"
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
          @change="getPassword"
          placeholder="请输入密码(6~20位)"
        />
      </div>
      <i-button type="warning" @click="register">注册</i-button>
    </div>
    <div class="right font-click">
      <web-view src="https://www.pic11315.com/login_service.html">《用户协议》</web-view>
    </div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
import store from "@/store";
import NavigateBar from "@/components/NavigateBar";
import { setTimeout } from "timers";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  components: { NavigateBar },
  data() {
    return {
      navTitle: "登录",
      imgUrl: config.imgUrl,
      phoneNumber: "",
      password: "",
      verify: "",
      getVerifyText: "获取验证码",
      canGetVerify: true
    };
  },
  methods: {
    myToast(con) {
      $Toast({
        content: con
      });
    },
    getPhoneNumber(e) {
      this.phoneNumber = e.target.detail.value;
      if (this.phoneNumber.length == 11) {
        this.canGetVerify = false;
      } else {
        this.canGetVerify = true;
      }
    },
    getVerify(e) {
      this.verify = e.target.detail.value;
    },
    getPassword(e) {
      this.password = e.target.detail.value;
    },
    getVerifyByPhone() {
      if (this.canGetVerify) {
        return;
      }
      if (this.phoneNumber === "") {
        this.myToast("请填写手机号!");
      } else {
        if (!/^1[34578]\d{9}$/.test(this.phoneNumber)) {
          this.myToast("手机号不合法!");
        } else {
          this.$http
            .post(config.getVerify, {
              iphone: this.phoneNumber,
              type: "verification_code"
            })
            .then(res => {
              //console.log("获取验证码", res);
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
    register() {
      this.$http
        .post(config.register, {
          iphone: this.phoneNumber,
          userVerificationCode: this.verify,
          password: this.password,
          repassword: this.password
        })
        .then(res => {
          if (res.data.code == 0) {
            this.myToast("注册成功!");
            setTimeout(function() {
              wx.navigateTo({
                url: "/pages/login/main"
              });
            }, 1000);
          } else {
            this.myToast(res.data.message);
          }
        });
    }
  }
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
