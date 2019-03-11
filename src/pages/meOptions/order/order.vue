<template>
  <div class="min-height100 attention-body">
    <i-tabs :current="current" @change="handleChange">
      <i-tab key="tab1" title="已支付"></i-tab>
      <i-tab key="tab2" title="其他"></i-tab>
    </i-tabs>
    <div v-if="current =='tab1'">
      <div v-if="hasOrderArr.length > 0">
        <div class="block-shadow-content" :key="index" v-for="(item,index) in hasOrderArr">
          <div class="lh70 font-click">
            {{item.subject?item.subject:''}}
            <span class="right red">{{item.status}}</span>
          </div>
          <div class="line"></div>
          <div class="lh50" v-if="item.companyName">
            <span class="title">公司名称：</span>
            {{item.companyName}}
          </div>
          <div class="lh50 overflow-hidden">
            <div class="left">
              <span class="title">订单编号：</span>
              {{item.orderid}}
            </div>
            <div class="right red">￥{{item.price}}</div>
          </div>
          <div class="lh50">
            <span class="title">购买时间：</span>
            {{item.createTime}}
          </div>
          <div v-if="item.type == '4001' || item.type == '4002'">
            <div class="line"></div>
            <div
              class="lh50 font-click text-center"
              @click="lookReport(item.type,item.companyId)"
            >查看报告</div>
          </div>
        </div>
      </div>
      <div class="shegnji" v-else>
        <img v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
        <br>
        <span>暂无数据</span>
      </div>
    </div>
    <div v-if="current =='tab2'">
      <div v-if="otherOrderArr.length > 0">
        <div class="block-shadow-content" :key="index" v-for="(item,index) in otherOrderArr">
          <div class="lh70 font-click">
            {{item.subject}}
            <span class="right red">{{item.status === '已下单'? '待支付':item.status}}</span>
          </div>
          <div class="line"></div>
          <div class="lh50" v-if="item.companyName">
            <span class="title">公司名称：</span>
            {{item.companyName}}
          </div>
          <div class="lh50 overflow-hidden">
            <div class="left">
              <span class="title">订单编号：</span>
              {{item.orderid}}
            </div>
            <div class="right red">￥{{item.price}}</div>
          </div>
          <div class="lh50">
            <span class="title">购买时间：</span>
            {{item.createTime}}
          </div>
          <div class="line"></div>
          <div
            v-if="item.status === '已下单' || item.status === '未支付'"
            class="lh50 font-click text-center"
            @click="toPay(item.type)"
          >去支付</div>
          <!-- <div class="lh50 font-click text-center">查看信用报告</div> -->
        </div>
      </div>
      <div class="shegnji" v-else>
        <img v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
        <br>
        <span>暂无数据</span>
      </div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config";
import { formatTime, showLoading, hideLoading } from "@/utils";
const { $Toast } = require("../../../../static/iview/base/index");
export default {
  data() {
    return {
      imgFile: config.imgFile,
      imgUrl: config.imgUrl,
      current: "tab1",
      userId: "",
      openId: "",
      orderArr: [],
      hasOrderArr: [],
      otherOrderArr: [],
      page: 1,
      more: true
    };
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
    handleChange(detail) {
      this.current = detail.target.key;
    },
    // 获取订单
    getOrder(init) {
      showLoading();
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.queryUserOrder, { userId: this.userId, page: this.page })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data.records < 10 && this.page > 1) {
              this.more = false;
            }
            const records = res.data.data.records.map(item => {
              item.price = parseFloat(item.price / 100);
              if (item.status === 1) {
                item.status = "未支付";
              } else if (item.status === 2) {
                item.status = "支付成功";
              } else if (item.status === 3) {
                item.status = "订单完成";
              } else if (item.status === 4) {
                item.status = "已下单";
              } else if (item.status === 5) {
                item.status = "订单关闭";
              }
              item.createTime = item.createTime
                ? formatTime(new Date(item.createTime))
                : "--";
              return item;
            });
            if (init) {
              this.orderArr = records;
              this.hasOrderArr = this.orderArr.filter(item => {
                return item.status === "支付成功";
              });
              this.otherOrderArr = this.orderArr.filter(item => {
                return item.status !== "支付成功";
              });
              wx.stopPullDownRefresh();
            } else {
              this.orderArr = this.orderArr.concat(records);
              this.hasOrderArr = this.orderArr.filter(item => {
                return item.status === "支付成功";
              });
              this.otherOrderArr = this.orderArr.filter(item => {
                return item.status !== "支付成功";
              });
            }
          }
          hideLoading();
        });
    },
    // 去支付
    toPay(productId) {
      let param = {
        userId: this.userId,
        openid: this.openId,
        productId: productId
      };
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
                  self.getOrder(true);
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
    // 查看信用报告
    lookReport(productId, companyId) {
      if (productId == "4001") {
        this.url =
          config.host +
          "/pic/app/creditReport/download/basics/" +
          this.userId +
          "/" +
          companyId +
          "?app=notRecord";
      } else if (productId == "4002") {
        this.url =
          config.host +
          "/pic/app/creditReport/download/major/" +
          this.userId +
          "/" +
          companyId +
          "?app=notRecord";
      }
      var _this = this;
      showLoading("请稍等...");
      wx.downloadFile({
        url: _this.url,
        success(res) {
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath,
            fileType: "pdf",
            success(res) {
              hideLoading();
            },
            fail(res) {
              hideLoading();
              _this.myToast("打开失败", "error");
            }
          });
        }
      });
    }
  },
  onPullDownRefresh() {
    this.getOrder(true);
  },
  onReachBottom() {
    if (this.more) {
      return false;
    }
    this.page++;
    this.getOrder();
  },
  mounted() {
    this.getLoginInfo();
    this.getOrder(true);
  }
};
</script>
<style lang="scss" scoped>
.attention-body {
  background: #f7f7f7;
}
.shegnji {
  width: 200rpx;
  height: 200rpx;
  text-align: center;
  margin: 200rpx auto 0 auto;
  img {
    width: 130rpx;
    height: 130rpx;
  }
}
</style>
