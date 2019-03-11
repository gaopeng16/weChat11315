<template>
  <div>
    <div class="label lh70">身份证信息(必填)</div>
    <div>
      <input class="form-team" type="text" v-model.trim="userName" placeholder="请输入真实姓名">
    </div>
    <div class="line"></div>
    <div>
      <input
        class="form-team"
        type="text"
        v-model.trim="idNumber"
        placeholder="请输入您的身份证号(我们将进行加密处理)"
      >
    </div>
    <div class="label lh70">手持身份证正反面照片(必填)</div>
    <div class="idcard-img">
      <img mode="aspectFit" v-if="imgUrl" :src="idCardF" @click="chooseImage(1)">
    </div>
    <div class="idcard-img">
      <img mode="aspectFit" v-if="imgUrl" :src="idCardR" @click="chooseImage(2)">
    </div>
    <div class="text-center lh70 font-click">温馨提示：一经实名认证不可更改</div>
    <i-button @click="auth" type="primary">立即认证</i-button>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
import { showLoading, hideLoading } from "@/utils";
import { setTimeout } from "timers";
const { $Toast } = require("../../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      userId: "",
      userName: "",
      idNumber: "",
      idCardF: config.imgUrl + "idcard_w.jpg",
      idCardR: config.imgUrl + "idcardfan_w.jpg",
      frontImg: "",
      backImg: ""
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
    chooseImage(type) {
      const that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          showLoading();
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
                that.frontImg = data.data;
                that.idCardF = config.imgFile + data.data;
              } else if (type == 2) {
                that.backImg = data.data;
                that.idCardR = config.imgFile + data.data;
              }
              that.myToast("上传成功", "success");
            }
          }
        }
      });
    },
    // 认证提交
    auth() {
      const params = {
        userId: this.userId,
        userName: this.userName,
        idNumber: this.idNumber,
        frontImg: this.frontImg,
        backImg: this.backImg
      };
      this.$http.post(config.newAuth, params).then(res => {
        if (res.data.code == 0) {
          if (res.data.data.error_code == 1) {
            this.myToast(res.data.data.message, "error");
          } else {
            this.myToast(res.data.data.message, "success");
            setTimeout(function() {
              wx.switchTab({
                url: "/pages/me/main"
              });
            }, 2000);
          }
        }
      });
    }
  },
  mounted() {
    this.getLoginInfo();
  }
};
</script>
<style lang="scss" scoped>
.label {
  background: #f7f7f7;
  color: #209bf9;
  text-indent: 20rpx;
}
.form-team {
  height: 80rpx;
  line-height: 80rpx;
  text-align: left;
  margin-left: 20rpx;
}
.idcard-img {
  width: 400rpx;
  height: 300rpx;
  margin: 30rpx auto;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
