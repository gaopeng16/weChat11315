<template>
  <div>
    <div class="receipt-box relative" @click="addInvoice" style="width:90%;margin:20rpx 5%">
      <img v-if="imgUrl" :src="imgUrl+'card_bg_invoice.png'">
      <div class="lh70 absolute add-icon blod white">
        <i-icon size="40" type="add"/>
      </div>
    </div>
    <div class="line"></div>
    <div :key="k" v-for="(v,k) in invoices">
      <i-swipeout operateWidth="160">
        <div slot="content" class="receipt-box relative">
          <img v-if="imgUrl" :src="imgUrl+'card_bg_invoice.png'">
          <div class="lh70 absolute qxc blod white">企信查</div>
          <div class="invoice-info white absolute">
            <div class="com-name">{{v.companyName}}</div>
            <div class="bankaccount">{{v.bankAccount}}</div>
          </div>
        </div>
        <div slot="button" class="button-group overflow-hidden">
          <div class="left swipeout-demo-button editor" style="width:80px" @click="editInvoice(v)">
            <i-icon size="32" type="editor"/>
          </div>
          <div
            class="left swipeout-demo-button delete"
            style="width:80px"
            @click="deleteInvoice(v.id,k)"
          >
            <i-icon size="32" type="delete_fill"/>
          </div>
        </div>
      </i-swipeout>
    </div>
    <i-message id="message"/>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config";
import store from "@/store";
const { $Toast } = require("../../../../static/iview/base/index");
const { $Message } = require("../../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      userId: "",
      invoices: []
    };
  },
  methods: {
    myToast(con) {
      $Toast({
        content: con
      });
    },
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    },
    // 我的发票
    getInvoiceByUserId() {
      this.$http
        .get(config.getInvoiceByUserId, { userId: this.userId })
        .then(res => {
          if (res.data.code == 0) {
            this.invoices = res.data.data.data.map(item => {
              item.companyName = item.companyName
                ? item.companyName
                : "企业选择不公开";
              item.bankAccount = item.bankAccount
                ? "**** **** ****" + item.bankAccount.substr(-4)
                : "企业选择不公开";
              return item;
            });
          }
        });
    },
    // 添加发票抬头
    addInvoice() {
      wx.navigateTo({
        url: "/pages/meOptions/addInvoice/main?type=1"
      });
    },
    // 修改发票抬头
    editInvoice(item) {
      store.commit("setInvoiceData", item);
      wx.navigateTo({
        url: "/pages/meOptions/addInvoice/main?type=2"
      });
    },
    // 删除发票抬头
    deleteInvoice(id, k) {
      this.$http.post(config.deleteInvoice, { id, id }).then(res => {
        if (res.data.code == 0) {
          this.invoices.splice(k, 1);
          this.myToast("删除成功！");
        }
      });
    }
  },
  mounted() {
    this.getLoginInfo();
    this.getInvoiceByUserId();
  }
};
</script>
<style lang="scss" scoped>
.receipt-box {
  width: 100%;
  height: 200rpx;
  .add-icon {
    width: 100%;
    text-align: center;
    left: 0;
    top: 60rpx;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .qxc {
    top: 20rpx;
    left: 20rpx;
  }
  .invoice-info {
    text-align: right;
    right: 10rpx;
    bottom: 20rpx;
  }
}
.button-group {
  .swipeout-demo-button {
    height: 200rpx;
    line-height: 200rpx;
    margin-top: 30rpx;
    text-align: center;
    color: #ffffff;
  }
  .delete {
    background: red;
  }
  .editor {
    background: #2d8cf0;
  }
}
</style>
