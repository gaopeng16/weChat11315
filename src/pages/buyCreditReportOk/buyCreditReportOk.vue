<template>
  <div class="gray-body min-h100vh">
    <div class="top">
      <img v-if="imgUrl" :src="imgUrl+'ic_duihao.png'" alt>
      <div class="buy-ok">购买成功</div>
      <div class="producting" v-if="precent == 100">报告生产完成!</div>
      <div class="producting" v-else>正在生产报告{{precent}}%</div>
    </div>
    <div class="safe-tx">
      <div class="blod">安全提醒</div>
      <p>付款成功后，企信查不会以任何理由要求您提供银行卡信息或支付额外费用，请谨防钓鱼链接或诈骗电话。</p>
    </div>
    <div @click="lookOrder" class="bc-btn look-order">查看订单</div>
    <a @click="backInfo" class="bc-btn back-info title">返回公司详情</a>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config";
import { mapState } from "vuex";
import { setTimeout } from "timers";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      reportType: -1,
      precent: 0,
      userId: ""
    };
  },
  computed: {
    ...mapState(["companyId"])
  },
  methods: {
    myToast(con, type) {
      $Toast({
        content: con,
        type: type
      });
    },
    init() {
      let _this = this;
      setTimeout(function() {
        _this.precent = 50;
      }, 500);
      setTimeout(function() {
        _this.precent = 99;
      }, 900);
      setTimeout(function() {
        _this.downLoad();
      }, 1000);
    },
    downLoad() {
      if (this.reportType == 0) {
        this.url =
          config.host +
          "/pic/app/creditReport/download/basics/" +
          this.userId +
          "/" +
          this.companyId +
          "?app=notRecord";
      } else if (this.reportType == 1) {
        this.url =
          config.host +
          "/pic/app/creditReport/download/major/" +
          this.userId +
          "/" +
          this.companyId +
          "?app=notRecord";
      }
      var _this = this;
      wx.downloadFile({
        url: _this.url,
        success(res) {
          _this.precent = 100;
          _this.myToast("报告生成完成");
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath,
            fileType: "pdf",
            success(res) {},
            fail(res) {
              _this.myToast("打开失败", "error");
            }
          });
        }
      });
    },
    //查看订单
    lookOrder() {
      if (this.precent == 100) {
        wx.navigateTo({
          url: "/pages/meOptions/order/main"
        });
      } else {
        this.myToast("报告生产中", "warning");
      }
    },
    // 返回详情页
    backInfo() {
      if (this.precent == 100) {
        wx.navigateTo({
          url:
            "/pages/companyInfoPackage/pages/companyInfo/main?companyId" +
            this.companyId
        });
      } else {
        this.myToast("报告生产中", "warning");
      }
    }
  },
  mounted() {
    this.reportType = this.$root.$mp.query.reportType;
    this.userId = wx.getStorageSync("loginInfo").userId;
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 360rpx;
  background: #209bf9;
  color: #ffffff;
  text-align: center;
  img {
    width: 140rpx;
    height: 140rpx;
    margin-top: 50rpx;
  }
  .buy-ok {
    font-size: 40rpx;
    margin-top: 10rpx;
  }
  .producting {
    font-size: 12px;
    margin-top: 20rpx;
  }
}
.safe-tx {
  background: #fff;
  padding: 20rpx;
  div {
    padding: 20rpx 0;
  }
}
.bc-btn {
  display: block;
  width: 80%;
  height: 80rpx;
  line-height: 80rpx;
  margin-left: 10%;
  text-align: center;
  border-radius: 10rpx;
}
.look-order {
  margin-top: 200rpx;
  background: #209bf9;
  color: #ffffff;
}
.back-info {
  margin-top: 30rpx;
  background: #ffffff;
}
</style>

