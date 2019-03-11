<template>
  <div>
    <div class="balance-num relative">
      <a href="/pages/meOptions/txgz/main">
        <div class="txgz">
          <img v-if="imgUrl" :src="imgUrl+'txgz.png'">
        </div>
      </a>
      <img v-if="imgUrl" :src="imgUrl+'tx_top.png'">
      <div class="balance text-center white absolute">
        <span>{{balance}}</span>
        <br>我的现金余额
      </div>
    </div>
    <div class="mingxi">
      <i-row i-class="text-center lh70">
        <a href="/pages/meOptions/yjmx/main">
          <i-col span="12">
            <i-icon size="24" type="shop_fill"/>赢奖明细
          </i-col>
        </a>
        <a href="/pages/meOptions/txmx/main">
          <i-col span="12">
            <i-icon size="24" type="financial_fill"/>提现明细
          </i-col>
        </a>
      </i-row>
    </div>
    <div style="height:100rpx"></div>
    <i-button @click="draw" type="primary">提 现</i-button>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config";
import { setTimeout } from "timers";
const { $Toast } = require("../../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      userId: "",
      hasAuth: false,
      balance: 0
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
    // 提现
    draw() {
      this._hasAuth();
    },
    // 是否实名认证
    _hasAuth() {
      this.$http.post(config.hasAuth, { userId: this.userId }).then(res => {
        if (res.data.code == 0) {
          if (res.data.data == 3) {
            this.myToast("你要提现吗？", "warning");
          } else {
            this.myToast("请先实名认证!", "warning");
            setTimeout(function() {
              wx.navigateTo({
                url: "/pages/meOptions/authentication/main"
              });
            }, 1000);
          }
        }
      });
    },
    // 获取余额
    getBalance() {
      this.$http
        .get("https://spay.pic11315.com/userAccount/accountMoney", {
          userId: this.userId
        })
        .then(res => {
          if (res.data.code == 0) {
            this.balance = res.data.data.money / 100;
          }
        });
    }
  },
  mounted() {
    this.getBalance();
    this.getLoginInfo();
  }
};
</script>
<style lang="scss" scoped>
.txgz {
  width: 50rpx;
  height: 50rpx;
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  img {
    width: 50rpx;
    height: 50rpx;
  }
}
.balance-num {
  width: 100%;
  height: 300rpx;
  img {
    width: 100%;
    height: 100%;
  }
  .balance {
    width: 100%;
    left: 0;
    top: 70rpx;
    span {
      font-size: 90rpx;
    }
  }
}
.mingxi {
  background: #e8f4fe;
}
</style>

