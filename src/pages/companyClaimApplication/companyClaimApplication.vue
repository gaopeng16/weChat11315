<template>
  <div class="bg-body">
    <div class="firendly-reminder sub-content">完善身份信息，为您提供精准服务</div>
    <i-row i-class="white-bg">
      <i-col span="5" offset="1">
        <span class="form-team form-label red">*</span>企业全称
      </i-col>
      <i-col span="18">
        <input
          class="form-team form-input"
          type="text"
          v-model.trim="companyName"
          placeholder="请输入企业全称"
        >
      </i-col>
    </i-row>
    <div v-if="isClickListItem && companyName">
      <i-row i-class="white-bg mt10">
        <i-col span="5" offset="1">
          <span class="form-team form-label red">*</span>企业法人
        </i-col>
        <i-col span="18">
          <input
            class="form-team form-input"
            type="text"
            v-model.trim="userName"
            placeholder="请输入法人姓名"
          >
        </i-col>
      </i-row>
      <i-row i-class="white-bg">
        <i-col span="5" offset="1">
          <span class="form-team form-label red">*</span>手机号
        </i-col>
        <i-col span="18">
          <input
            class="form-team form-input"
            type="number"
            maxlength="11"
            v-model.trim="phoneNumber"
            placeholder="请输入手机号码"
          >
        </i-col>
      </i-row>
      <i-row i-class="white-bg">
        <i-col span="5" offset="1">
          <span class="form-team form-label red">*</span>邮箱
        </i-col>
        <i-col span="10">
          <input
            class="form-team form-input"
            type="email"
            v-model.trim="email"
            placeholder="如abc@163.com"
          >
        </i-col>
      </i-row>
      <i-row i-class="white-bg mt10">
        <i-col span="5" offset="1">
          <span class="form-team form-label red">*</span>营业执照
        </i-col>
        <i-col span="18">
          <div class="yyzz-img">
            <img mode="aspectFit" v-if="imgUrl" :src="yyzzImg" @click="chooseImage(1)">
          </div>
        </i-col>
      </i-row>
      <div class="upimg-ts">
        <p>仅支持jpg、jpeg、png</p>
        <p>营业执照中信息必须与工商信息一致</p>
        <p>法定代表人身份证姓名必须与企业法定代表人姓名一致</p>
        <p>上传图片必须为实物图，并且露出四个角</p>
      </div>
      <i-row i-class="white-bg mt10">
        <i-col span="5" offset="1">
          <span class="form-team form-label red">*</span>身份证
        </i-col>
        <i-col span="18">
          <div class="idcard-img">
            <img mode="aspectFit" v-if="imgUrl" :src="idCardF" @click="chooseImage(2)">
          </div>
          <div class="idcard-img">
            <img mode="aspectFit" v-if="imgUrl" :src="idCardR" @click="chooseImage(3)">
          </div>
        </i-col>
      </i-row>
      <i-row i-class="white-bg mt10">
        <i-col span="5" offset="1">
          <span class="form-team form-label red">*</span>验证码
        </i-col>
        <i-col span="10">
          <input
            class="form-team form-yzm-input"
            type="text"
            v-model.trim="verifyCode"
            placeholder="验证码"
          >
        </i-col>
        <i-col span="8">
          <div class="verify-box" style="display:inline" @click="getVerify">
            <rich-text :nodes="imgVerifyCode"></rich-text>
          </div>
        </i-col>
      </i-row>
      <div class="service-agreement">
        <div class="left">
          <input v-model="checked" @click="isCheck" :checked="checked" type="checkbox">我已阅读并同意
        </div>
        <a class="font-click left" href="/pages/serviceAgreement/main">《认领服务协议》</a>
      </div>
      <i-button type="primary" @click="submit">提交审核</i-button>
    </div>
    <div class="match-result" v-if="!isClickListItem && companyName">
      <div
        :key="index"
        v-for="(item,index) in matchGroup"
        @click="selectCom(item.id,item.companyName)"
      >{{item.companyName}}</div>
      <div v-if="noMatch" class="text-center">没有搜索到结果...</div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
import { showLoading, hideLoading } from "@/utils";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      matchGroup: [],
      noMatch: true,
      showMatchResult: false, //显示模糊查询列表
      isClickListItem: false, //是否点击了模糊查询列表项
      onOff: false, //由于点击模糊查询的列表项，将值填入input的时候，还会触发一边watch，因此加一个开关，
      checked: true,
      verifyCodeUrl: "", //验证码路径
      userId: "",
      userName: "",
      companyName: "",
      companyId: "",
      phoneNumber: "",
      email: "",
      yyzzImg: config.imgUrl + "yyzz_w.jpg",
      idCardF: config.imgUrl + "idcard_w.jpg",
      idCardR: config.imgUrl + "idcardfan_w.jpg",
      yzImg: "",
      frontImg: "",
      backImg: "",
      verifyCode: "",
      verifyStr: "",
      imgVerifyCode: ""
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
    matchSearch() {
      this.$http
        .get(config.matchCompanyName, { termStr: this.companyName })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data.length > 0) {
              this.noMatch = false;
              this.matchGroup = res.data.data;
            } else {
              this.noMatch = true;
              this.matchGroup = [];
            }
          }
        });
    },
    //点击想要搜素的目标，将点击的目标值填入搜索框
    selectCom(id, companyName) {
      this.companyId = id;
      this.companyName = companyName;
      this.isClickListItem = true;
      this.onOff = true;
    },
    chooseImage(type) {
      const that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          that.upImg(tempFilePaths[0], type);
        }
      });
    },
    //上传图片到图片服务器
    upImg(tempFilePath, type) {
      const that = this;
      wx.uploadFile({
        url: config.upImgUrl,
        filePath: tempFilePath,
        name: "file_data",
        header: { "content-Type": "application/x-www-form-urlencoded" },
        success: function(res) {
          if (res.statusCode == 200) {
            hideLoading();
            var data = JSON.parse(res.data);
            if (data.code == 0) {
              if (type == 1) {
                that.yzImg = data.data;
                that.yyzzImg = config.imgFile + data.data;
              } else if (type == 2) {
                that.frontImg = data.data;
                that.idCardF = config.imgFile + data.data;
              } else if (type == 3) {
                that.backImg = data.data;
                that.idCardR = config.imgFile + data.data;
              }
              that.myToast("上传成功", "success");
            }
          }
        }
      });
    },
    getVerify() {
      const ran = Math.random();
      this.imgVerifyCode =
        '<img mode="aspeciFit" src="' +
        config.host +
        "/pic/app/down/buss/kaptcha/?userId=" +
        this.userId +
        "&ran=" +
        ran +
        '">';
    },
    // 数据重置
    resetData() {
      this.userName = "";
      this.companyName = "";
      this.companyId = "";
      this.phoneNumber = "";
      this.email = "";
      this.yyzzImg = config.imgUrl + "yyzz_w.jpg";
      this.idCardF = config.imgUrl + "idcard_w.jpg";
      this.idCardR = config.imgUrl + "idcardfan_w.jpg";
      this.verifyCode = "";
      this.verifyStr = "";
      this.checked = true;
    },
    isCheck() {
      this.checked = !this.checked;
    },
    submit() {
      const param = {
        companyId: this.companyId,
        userId: this.userId,
        mobileNumber: this.phoneNumber,
        email: this.email,
        userKaptcha: this.verifyCode,
        userName: this.userName,
        companyName: this.companyName,
        imgUrl: this.yzImg,
        fanrenUrl: this.frontImg + ";" + this.backImg
      };

      if (param.userName == "") {
        this.myToast("请输入企业法人", "warning");
        return;
      } else if (param.mobileNumber == "") {
        this.myToast("请输入手机号", "warning");
        return;
      } else if (param.email == "") {
        this.myToast("请输入邮箱", "warning");
        return;
      } else if (param.imgUrl == config.imgUrl + "yyzz_w.jpg") {
        this.myToast("请上传营业执照", "warning");
        return;
      } else if (this.idCardF == config.imgUrl + "idcard_w.jpg") {
        this.myToast("请上身份证正面照", "warning");
        return;
      } else if (this.idCardR == config.imgUrl + "idcardfan_w.jpg") {
        this.myToast("请上身份证反面照", "warning");
        return;
      } else if (param.userKaptcha == "") {
        this.myToast("请输入验证码", "warning");
        return;
      } else if (!this.checked) {
        this.myToast("请同意认领服务协议", "warning");
        return;
      } else {
        this.$http.get(config.exitClaim + this.companyId).then(res => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this.myToast("该公司已经被认领！", "warning");
              this.resetData();
              return;
            }
          }
        });
        this.$http.post(config.companyClaimApplication, param).then(res => {
          console.log("su", res);
          if (res.data.code == 0) {
            this.myToast("等待审核...", "success");
            this.resetData();
          } else {
            this.myToast(res.data.message, "error");
          }
        });
      }
    },
    getCompanyName() {
      this.companyName = this.$root.$mp.query.companyName || "";
      if (this.companyName != "") {
        this.isClickListItem = true;
        this.onOff = true;
      }
    }
  },
  mounted() {
    this.getCompanyName();
    this.getLoginInfo();
    this.getVerify();
  },
  watch: {
    companyName: function(val, oldVal) {
      this.matchSearch();
      if (!this.onOff) {
        //input的值发生变化，只要不是通过点击模糊列表项改变的，就会显示出模糊列表
        this.isClickListItem = false;
      } else {
        this.onOff = false; //如果是点击模糊列表项填入的值，虽然触发了watch，但是不让this.isClickListItem的值变为false,这样才能使得模糊列表能够隐藏
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.bg-body {
  position: relative;
  min-height: 100vh;
  background: #e5e4e4;
  .match-result {
    position: absolute;
    left: 0;
    top: 150rpx;
    z-index: 2;
    width: 100vw;
    min-height: calc(100vh - 150rpx);
    background: #ffffff;
    div {
      line-height: 80rpx;
      text-indent: 15rpx;
      border-bottom: solid 1px #dddee1;
    }
  }
  .firendly-reminder {
    line-height: 70rpx;
    text-indent: 20rpx;
  }
  .form-team {
    height: 80rpx;
    line-height: 80rpx;
    text-align: left;
  }
  .yyzz-img {
    float: left;
    width: 200rpx;
    height: 200rpx;
    padding: 20rpx;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .idcard-img {
    float: left;
    width: 30%;
    height: 200rpx;
    padding: 20rpx;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .upimg-ts {
    background: #f7f7f7;
    padding: 15rpx;
    line-height: 40rpx;
    font-size: 12px;
  }
  .verify-box {
    float: left;
    width: 150rpx;
    height: 80rpx;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .service-agreement {
    box-sizing: border-box;
    padding-left: 20rpx;
    line-height: 80rpx;
    height: 80rpx;
  }
}
</style>
