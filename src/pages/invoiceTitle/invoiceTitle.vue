<template>
  <div class="invoice-body">
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-label">名称</span>
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          v-model.trim="companyName"
          placeholder="单位名称(必填)"
        >
      </i-col>
    </i-row>
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-label">税号</span>
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          v-model.trim="taxNum"
          placeholder="12-20位数字和字母(必填)"
        >
      </i-col>
    </i-row>
    <i-row i-class="white-bg mt10">
      <i-col span="5" offset="1">
        <span class="form-label">地址</span>
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          v-model.trim="companyAddr"
          placeholder="单位地址信息"
        >
      </i-col>
    </i-row>
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-label">电话号码</span>
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          maxlength="11"
          v-model.trim="companyPhone"
          placeholder="电话号码"
        >
      </i-col>
    </i-row>
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-label">开户银行</span>
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          v-model.trim="bankName"
          placeholder="开户银行名称"
        >
      </i-col>
    </i-row>
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-label">银行账户</span>
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          v-model.trim="bankAccount"
          placeholder="银行账户号码"
        >
      </i-col>
    </i-row>
    <div class="invoice-ts">请填写完整信息，以便开具增值税发票，下次开票您只要出示上诉信息即可，我们不会把您的信息作用其他用途。</div>
    <i-button type="primary" @click="save">保存</i-button>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      userId: "",
      companyName: "",
      taxNum: "",
      companyAddr: "",
      companyPhone: "",
      bankName: "",
      bankAccount: ""
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
    checkParam() {
      if (this.companyName == "") {
        this.myToast("请填写公司名称", "warning");
        return false;
      } else if (this.taxNum == "") {
        this.myToast("请填写税号", "warning");
        return false;
      } /* else if (this.companyAddr == "") {
        this.myToast("请填公司地址", "warning");
        return;
      } else if (this.companyPhone == "") {
        this.myToast("请填公司电话", "warning");
        return;
      } else if (this.bankName == "") {
        this.myToast("请填银行名称", "warning");
        return;
      } else if (this.bankAccount == "") {
        this.myToast("请填银行账号", "warning");
        return;
      } */
    },
    save() {
      const data = {
        userId: this.userId,
        companyName: this.companyName,
        taxNum: this.taxNum,
        companyAddr: this.companyAddr,
        companyPhone: this.companyPhone,
        bankName: this.bankName,
        bankAccount: this.bankAccount
      };
      if (this.companyName == "") {
        this.myToast("请填写公司名称", "warning");
        return false;
      } else if (this.taxNum == "") {
        this.myToast("请填写税号", "warning");
        return false;
      } else {
        this.$http.post(config.addInvoice, data).then(res => {
          if (res.data.code == 0) {
            this.myToast("添加成功!", "success");
          }
        });
      }
    }
  },
  mounted() {
    this.getLoginInfo();
  }
};
</script>
<style lang="scss" scoped>
.invoice-body {
  min-height: 100vh;
  background: #e5e4e4;
  .form-team,
  .form-label {
    height: 80rpx;
    line-height: 80rpx;
    text-align: left;
  }
  .invoice-ts {
    padding: 20rpx;
    font-size: 12px;
  }
}
</style>
