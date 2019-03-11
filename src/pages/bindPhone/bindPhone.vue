<template>
  <div class="bind-body">
    <!-- <NavigateBar :title="navTitle"></NavigateBar>
    <div :style="{height:navH +'px'}"></div>-->
    <div class="bind-con">
      <div class="input-line">
        <i-input
          type="number"
          mode="wrapped"
          maxlength="11"
          @change="getPhoneNumber"
          placeholder="您要绑定的手机号"
        />
      </div>
      <div class="input-line">
        <i-input
          type="password"
          mode="wrapped"
          maxlength="20"
          @change="getPassword"
          placeholder="输入您的密码"
        />
      </div>
      <!-- <div class="bind-ts content">如果您是第一次绑定手机号，我们将为您创建账号</div> -->
      <i-button type="warning" @click="bindPhone" :disabled="false">绑定已有手机号</i-button>
      <i-button type="warning" @click="goRegister">注册</i-button>
      <i-toast id="toast"/>
    </div>
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
      navTitle: "绑定手机号",
      imgUrl: config.imgUrl,
      phoneNumber: "",
      password: ""
    };
  },
  methods: {
    errorTs(con) {
      $Toast({
        content: con
      });
    },
    errorLoadingTs(con) {
      $Toast({
        content: con,
        type: "loading"
      });
    },
    getPhoneNumber(e) {
      this.phoneNumber = e.target.detail.value;
    },
    getPassword(e) {
      this.password = e.target.detail.value;
    },
    bindPhone() {
      if (this.phoneNumber === "") {
        this.errorTs("请填写手机号!");
      } else {
        if (!/^1[34578]\d{9}$/.test(this.phoneNumber)) {
          this.errorTs("请填写正确的手机号!");
        } else if (this.password.length < 6) {
          this.errorTs("密码长度至少六位!");
        } else {
          const user = wx.getStorageSync("user");
          this.$http
            .post(config.bindPhone, {
              iphone: this.phoneNumber,
              password: this.password,
              type: "wx",
              qqOrWXNum: user.openid
            })
            .then(res => {
              if (res.data.code == 0) {
                this.errorTs("绑定成功!");
                const bussUser = res.data.data.bussUser;
                const loginInfo = {
                  mobile: bussUser.mobile,
                  headPic: bussUser.headPic,
                  vipLevel: bussUser.vipLevel
                };
                wx.setStorageSync("loginInfo", loginInfo);
                wx.switchTab({
                  url: "/pages/index/main"
                });
              } else if (res.data.code == 400) {
                // 没有用户去注册
                this.errorTs(res.data.message);
                setTimeout(function() {
                  wx.navigateTo({
                    url: "/pages/login/main"
                  });
                }, 1500);
              }
            });
        }
      }
    },
    goRegister() {
      wx.navigateTo({
        url: "/pages/register/main"
      });
    }
  },
  computed: {
    navH() {
      return store.state.navHeight;
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
