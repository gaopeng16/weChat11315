<template>
  <div class="min-height100 gray-body">
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-team">名称</span>
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
        <span class="form-team">税号</span>
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          v-model.trim="tax"
          placeholder="15-20位数字和字母(必填)"
        >
      </i-col>
    </i-row>
    <i-row i-class="white-bg mt10">
      <i-col span="5" offset="1">
        <span class="form-team">地址</span>
      </i-col>
      <i-col span="18">
        <input class="form-team form-input" type="text" v-model.trim="comAddr" placeholder="单位地址信息">
      </i-col>
    </i-row>
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-team">电话号码</span>
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          v-model.trim="phoneNumber"
          placeholder="电话号码"
        >
      </i-col>
    </i-row>
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-team">开户银行</span>
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
        <span class="form-team">银行账户</span>
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
    <div class="ints mt10">请填写完整信息，以便开具增税发票，下次开票您只要出示上述信息即可，我们不会把您的信息用作其他用途。</div>
    <i-row i-class="mt10">
      <i-col span="22" offset="1">
        <i-button @click="addInvoice" type="success">保存</i-button>
      </i-col>
    </i-row>
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
      tax: "",
      comAddr: "",
      phoneNumber: "",
      bankName: "",
      bankAccount: "",
      addOrEditor: 1 //添加还是修改 1->添加 2->修改
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
    //添加发票抬头
    addInvoice() {
      if (this.companyName == "") {
        this.myToast("请填写单位名称");
      } else if (this.tax == "") {
        this.myToast("请填税号");
      } else {
        if (addOrEditor == 1) {
          //添加
          this.$http
            .post(config.addInvoice, {
              bankAccount: this.bankAccount,
              bankName: this.bankName,
              companyName: this.companyName,
              companyAddr: this.comAddr,
              companyPhone: this.phoneNumber,
              tax: this.tax,
              userId: this.userId
            })
            .then(res => {
              if (res.data.code == 0) {
                this.myToast(res.data.message);
              }
            });
        } else if (addOrEditor == 2) {
          //修改
          this.$http
            .post(config.updateInvoice, {
              bankAccount: this.bankAccount,
              bankName: this.bankName,
              companyName: this.companyName,
              companyAddr: this.comAddr,
              companyPhone: this.phoneNumber,
              tax: this.tax,
              userId: this.userId,
              id: this.invoiceData.id
            })
            .then(res => {
              if (res.data.code == 0) {
                this.myToast(res.data.message);
              }
            });
        }
      }
    }
  },
  computed: {
    invoiceData() {
      return store.state.invoiceData;
    },
    companyName() {
      if (this.addOrEditor == 1) {
        return "";
      } else if (this.addOrEditor == 2) {
        return this.invoiceData.companyName;
      }
    }
  },
  mounted() {
    this.addOrEditor = this.$root.$mp.query.type;
    this.getLoginInfo();
  }
};
</script>
<style lang="scss" scoped>
.form-team {
  height: 80rpx;
  line-height: 80rpx;
  text-align: left;
}
.ints {
  padding: 0 20rpx;
  font-size: 12px;
}
</style>
