<template>
  <div class="min-height100 vip-body">
    <div class="banner">
      <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'bg_zsz.png'">
    </div>
    <div class="block-shadow-content">
      <div class="block-title title blod">
        <span class="span-line left"></span>
        <span class="left">会员套餐</span>
      </div>
      <div
        :class="[k == choosePriceIndex ? 'choose-bg':'']"
        :key="k"
        v-for="(v,k) in priceArr"
        @click="choosePrice(v.actualPrice,v.code,k)"
      >
        <div class="line"></div>
        <div class="money relative">
          <div class="m1 left">
            <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_vip2.png'">
          </div>
          <div class="m2 left title ml20">{{v.name}}</div>
          <div class="m3 right blod red ml20">{{v.actualPrice}}元</div>
          <div class="m4 right sub-content-light">{{v.price}}元</div>
          <img
            class="ic_tuijian absolute"
            v-if="imgUrl && v.code == '2003'"
            :src="imgUrl+'ic_tuijian.png'"
          >
        </div>
      </div>
    </div>
    <div class="block-shadow-content">
      <div class="block-title title blod">
        <span class="span-line left"></span>
        <span class="left">填写邀请码</span>
        <div class="invite-code left ml20">
          <input
            type="text"
            v-model.trim="inviteCode"
            maxlength="6"
            :placeholder="'使用邀请码立减'+invitePrice+'元'"
          >
        </div>
      </div>
    </div>
    <div class="lh70">&nbsp;&nbsp;&nbsp;说明：填写邀请码将减免{{invitePrice}}元</div>
    <div style="height:100rpx"></div>
    <div class="gopay">
      <div class="pay-money left">
        <div class="left je">金额</div>
        <div class="money-num ml20 left red">￥{{payMoney}} 元</div>
      </div>
      <div class="pay-btn right white text-center" @click="toPay">去支付</div>
    </div>
    <div class="congratulations" v-if="paid" @click="hideCongratulations">
      <img v-if="imgUrl" :src="imgUrl+'dialog_pay_qy.png'">
    </div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config";
import { mapMutations } from "vuex";
import { SET_VIPLEVEL } from "@/store/mutation-types";
const { $Toast } = require("../../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      userId: "",
      openId: "",
      invitePrice: 0,
      payStyle: 1, // 支付方式，1->支付宝 2->微信
      inviteCode: "",
      priceArr: [],
      payMoney: 0,
      discount: 1,
      productId: "2003",
      choosePriceIndex: 0,
      paid: false
    };
  },
  methods: {
    ...mapMutations({
      setVipLevel: SET_VIPLEVEL
    }),
    myToast(con, type) {
      $Toast({
        content: con,
        type: type
      });
    },
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      const user = wx.getStorageSync("user");
      this.userId = loginInfo.userId;
      this.openId = user.openid;
    },
    chooseAliPay() {
      this.payStyle = 1;
    },
    chooseWeChat() {
      this.payStyle = 2;
    },
    // 去支付
    toPay() {
      let param = {};
      if (!this.inviteCode == "") {
        param = {
          userId: this.userId,
          openid: this.openId,
          productId: this.productId
        };
      } else {
        param = {
          userId: this.userId,
          openid: this.openId,
          productId: this.productId,
          invitationCode: this.inviteCode
        };
      }
      const self = this;
      this.$http
        .post("https://spay.pic11315.com/mobile/mpPay", param)
        .then(res => {
          if (res.status == 200) {
            const result = res.data;
            wx.requestPayment({
              timeStamp: result.time_stamp,
              nonceStr: result.nonce_str,
              package: "prepay_id=" + result.prepay_id,
              signType: "MD5",
              paySign: result.sign,
              success(res) {
                if (res.errMsg == "requestPayment:ok") {
                  self.setVipLevel(4);
                  self.paid = true;
                }
              },
              fail(res) {
                if (res.errMsg == "requestPayment:fail cancel") {
                  self.myToast("你已取消支付！", "warning");
                } else {
                  self.myToast(res.errMsg, "error");
                }
              }
            });
          }
        });
    },
    // 隐藏支付成功提醒
    hideCongratulations() {
      this.paid = false;
    },
    // 获取价格
    getProductByCode() {
      this.$http.get(config.appGetEnterpriseVIP).then(res => {
        this.discount = res.data.data.sale;
        if (res.data.code == 0) {
          this.priceArr = res.data.data.list
            .map(item => {
              item.actualPrice = Number(item.actualPrice) / 100;
              item.price = Number(item.price) / 100;
              return item;
            })
            .reverse();
        }
      });
    },
    // 检查验证码是否可用以及获取 需要支付所显示的额价格
    checkYzmAndShowPrice(yz) {
      var param = {};
      if (this.inviteCode != "") {
        param = {
          userId: this.userId,
          type: this.productId,
          invitationCode: this.inviteCode
        };
      } else {
        param = {
          userId: this.userId,
          type: this.productId
        };
      }
      this.$http
        .get(config.host + "/app/buss/user/payablePrice", param)
        .then(res => {
          if (yz) {
            if (res.data.data.flag == 0) {
              this.myToast("验证码可用", "success");
            } else {
              this.myToast(res.data.data.message, "warning");
            }
          }
          if (res.data.code == 0) {
            this.payMoney = res.data.data.price;
          }
        });
    },
    choosePrice(actualPrice, productId, k) {
      this.productId = productId;
      this.choosePriceIndex = k;
      this.checkYzmAndShowPrice();
    }
  },
  mounted() {
    this.getLoginInfo();
    this.getProductByCode();
    this.checkYzmAndShowPrice();
  },
  watch: {
    inviteCode: function(val, oldVal) {
      this.checkYzmAndShowPrice(true);
    }
  }
};
</script>
<style lang="scss" scoped>
.vip-body {
  background: #f0f0f0;
  .banner {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .block-title {
    padding: 20rpx 0;
    line-height: 30rpx;
    overflow: hidden;
    .span-line {
      width: 2px;
      height: 30rpx;
      background: #209bf9;
      margin: 0 20rpx;
    }
    .invite-code {
      width: 300rpx;
      height: 50rpx;
      line-height: 50rpx;
      border: solid 1px #209bf9;
      margin-top: -10rpx;
      border-radius: 6rpx;
      padding-left: 10rpx;
      input {
        width: 270rpx;
      }
    }
    .switch {
      margin-top: -10rpx;
    }
  }
  .money {
    overflow: hidden;
    line-height: 80rpx;
    padding: 20rpx 0;
    .m1 {
      width: 120rpx;
      height: 80rpx;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .m3 {
      font-size: 40rpx;
    }
    .m4 {
      text-decoration: line-through;
    }
    .ic_tuijian {
      width: 80rpx;
      height: 80rpx;
      left: 0;
      top: 0;
    }
    .raido {
      width: 40rpx;
      height: 40rpx;
      margin-top: 6rpx;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
.choose-bg {
  background: #b2deff;
}
.gopay {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 80rpx;
  line-height: 80rpx;
  .pay-money {
    width: calc(100% - 200rpx);
    overflow: hidden;
    background: #fff;
    .je {
      width: 80rpx;
      text-align: right;
    }
    .money-num {
      font-size: 30rpx;
    }
  }
  .pay-btn {
    width: 200rpx;
    color: #ffffff;
    background: #209bf9;
  }
}
.congratulations {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  line-height: 100vh;
  img {
    width: 350rpx;
    height: 350rpx;
  }
}
</style>