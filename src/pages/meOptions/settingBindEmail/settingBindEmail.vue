<template>
  <div class="bind-body">
    <div class="bind-con">
      <div class="input-line">
        <div class="phone-input">
          <i-input
            type="email"
            maxlength="40"
            @change="getEmail"
            mode="wrapped"
            placeholder="请输邮箱地址"
          />
        </div>
        <div class="get-verify">
          <i-button
            type="warning"
            @click="getVerifyByEmial"
            :disabled="canGetVerify"
          >{{getVerifyText}}</i-button>
        </div>
      </div>
      <div class="input-line">
        <i-input type="text" mode="wrapped" maxlength="6" @change="getVerify" placeholder="请输入验证码"/>
      </div>
      <i-button type="warning" @click="bindEmail" :disabled="canClick">确认绑定</i-button>
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
      userId: "",
      email: "",
      verify: "",
      getVerifyText: "获取验证码",
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
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    },
    getEmail(e) {
      this.email = e.target.detail.value;
    },
    getVerify(e) {
      this.verify = e.target.detail.value;
      if (this.verify.length == 6) {
        this.canClick = false;
      } else {
        this.canClick = true;
      }
    },
    getVerifyByEmial() {
      if (this.canGetVerify) {
        return;
      }
      if (this.email === "") {
        this.myToast("请填邮箱地址!", "warning");
      } else {
        this.$http
          .post(config.mailVerificationCode, {
            mailAddress: this.email,
            sendType: "verification_code"
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
              this.email = "";
            } else {
              this.myToast(res.data.message);
            }
          });
      }
    },
    bindEmail() {
      this.$http
        .post(config.bindEmail, {
          userId: this.userId,
          verificationCode: this.verify,
          bingingEmailAddress: this.email
        })
        .then(res => {
          if (res.data.code == 0) {
            this.myToast(res.data.message, "success");
            setTimeout(function() {
              wx.switchTab({
                url: "/pages/me/main"
              });
            }, 1000);
          } else {
            this.myToast(res.data.message, "error");
          }
        });
    }
  },
  mounted() {
    this.getLoginInfo();
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
