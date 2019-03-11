<template>
  <div>
    <div class="order-list">
      <div class="order-list-item">
        <div class="oli-title blod">信用报告--专业版</div>
        <div class="oli-content overflow-hidden">
          <div class="left">报告目标</div>
          <div class="right">北京百度网讯科技有限公司</div>
        </div>
        <div class="line"></div>
        <div class="oli-type overflow-hidden">
          <div class="left">报告格式</div>
          <div class="right">PDF</div>
        </div>
      </div>
    </div>
    <div class="order-firm">
      <div class="left">
        金额:
        <span class="red">{{price}}</span>
      </div>
      <div class="right" @click="goPayOrDownload">{{vipLevel==0?'去支付':'确定'}}</div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config";
import { mapState } from "vuex";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      reportType: -1,
      price: 0,
      price0: 0,
      price1: 0,
      userId: "",
      openId: "",
      vipBuy: 0
    };
  },
  computed: {
    ...mapState(["vipLevel", "companyId"])
  },
  methods: {
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
    setPrice() {
      if (this.vipLevel > 0 && this.vipBuy == 0) {
        this.price = "免费";
      } else {
        var pId = "";
        if (this.reportType == 0) {
          pId = "4001"; // 基础版价格
          this.price = this.price0;
        } else if (this.reportType == 1) {
          pId = "4002"; // 专业版价格
          this.price = this.price1;
        }
        this.$http.get(config.getProductByCode + pId).then(res => {
          if (res.data.code == 0) {
            this.price = res.data.data.result[0].actualPrice / 100 + "RMB";
          }
        });
      }
    },
    // 会员去下载，非会员支付下载
    goPayOrDownload() {
      if (this.vipLevel == 0 || this.vipBuy == 1) {
        this.toPay();
      } else {
        var pId = "";
        switch (this.reportType) {
          case 0:
            pId = "4001";
            break;
          case 1:
            pId = "4002";
            break;
        }
        this.$http
          .post("https://spay.pic11315.com/mobile/freeDownload", {
            userId: this.userId,
            companyId: this.companyId,
            productId: pId
          })
          .then(res => {
            if (res.data.code == 0) {
              // 去下载
              wx.navigateTo({
                url:
                  "/pages/buyCreditReportOk/main?reportType=" + this.reportType
              });
            }
          });
      }
    },
    // 去支付
    toPay() {
      let param = {};
      if (this.reportType == 0) {
        param = {
          userId: this.userId,
          openid: this.openId,
          productId: "4001"
        };
      } else {
        param = {
          userId: this.userId,
          openid: this.openId,
          productId: "4002"
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
                  self.myToast("支付成功！", "success");
                  wx.navigateTo({
                    url:
                      "/pages/buyCreditReportOk/main?reportType=" +
                      self.reportType
                  });
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
    }
  },
  mounted() {
    this.reportType = this.$root.$mp.query.reportType;
    this.vipBuy = this.$root.$mp.query.vipBuy;
    this.getLoginInfo();
    this.setPrice();
  }
};
</script>
<style lang="scss" scoped>
.order-list {
  width: 100%;
  height: calc(100vh - 100rpx);
  overflow-y: auto;
  .order-list-item {
    width: 96%;
    margin: 15rpx 2%;
    box-shadow: 0 0 10rpx 6rpx #e4e4e4;
    border-radius: 8rpx;
    .oli-title {
      display: inline-block;
      height: 30rpx;
      line-height: 30rpx;
      border-left: solid 2px #209bf9;
      text-indent: 30rpx;
      font-size: 30xrpx;
      margin-left: 30rpx;
      margin-top: 30rpx;
    }
    .oli-content,
    .oli-type {
      box-sizing: border-box;
      padding: 30rpx;
    }
  }
}
.order-firm {
  box-sizing: border-box;
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  border-top: solid 1px #dddee1;
  .left {
    text-indent: 30rpx;
  }
  .right {
    width: 200rpx;
    text-align: center;
    color: #ffffff;
    background: #209bf9;
  }
}
</style>

