<template>
  <div class="cr-bg min-height100">
    <div class="order right">
      <a href="/pages/meOptions/order/main">订单</a>
    </div>
    <div class="text-center ic-report">
      <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_report.png'">
    </div>
    <div class="text-center white lh70">
      今日剩余
      <span class="red">{{vipLevel == 0 ? 0 : reportNum}}</span> 次下载机会
    </div>

    <swiper :current="currentTab" @change="changeTab" previous-margin="50px" next-margin="50px">
      <swiper-item>
        <div class="item" :class="[currentTab==0?'active':'quiet']">
          <img class="reprot-img" v-if="imgUrl" :src="imgUrl+'report_vip.png'">
          <div class="title text-center">专业版</div>
          <ul>
            <li>
              <span style="font-weight:bold">·</span> 股东信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 企业年报
            </li>
            <li>
              <span style="font-weight:bold">·</span> 基本工商信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 司法风险信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 知识产权信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 经营异常信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 企业联系方式
            </li>
            <li>
              <span style="font-weight:bold">·</span> 主要人员详细信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 注册资本组成成分
            </li>
          </ul>
          <div class="cr-btn">
            <a @click="samplePreview(1)">样本预览</a>
            <a @click="buyCreditReport(1)">购买报告</a>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="item" :class="[currentTab==1?'active':'quiet']">
          <img class="reprot-img" v-if="imgUrl" :src="imgUrl+'report_novip.png'">
          <div class="title text-center">基础版</div>
          <ul>
            <li>
              <span style="font-weight:bold">·</span> 股东信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 企业年报
            </li>
            <li>
              <span style="font-weight:bold">·</span> 基本工商信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 司法风险信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 知识产权信息
            </li>
            <li>
              <span style="font-weight:bold">·</span> 经营异常信息
            </li>
          </ul>
          <div class="cr-btn">
            <a @click="samplePreview(0)">样本预览</a>
            <a @click="buyCreditReport(0)">购买报告</a>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <i-toast id="toast"/>
    <i-modal title="提示" :visible="vipBuyReport" @ok="buyReport" @cancel="notBuyReport">
      <div>今日您的下载次数已满,是否单独购买？</div>
    </i-modal>
  </div>
</template>
<script>
import store from "@/store";
import { mapState } from "vuex";
import config from "@/config.js";
import * as utils from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      currentTab: 0,
      url: "",
      userId: "",
      vipBuyReport: false,
      reportNum: 0,
      basicReportNum: 0,
      majorReportNum: 0,
      _reportType: -1
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
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    },
    changeTab(e) {
      this.currentTab = e.mp.detail.current;
      if (this.currentTab == 0) {
        this.reportNum = this.majorReportNum;
      } else if (this.currentTab == 1) {
        this.reportNum = this.basicReportNum;
      }
    },
    // 查看下载次数GET /user/
    selectReportNum() {
      this.$http
        .get(config.host + config.reportNum, {
          userId: this.userId,
          oneId: this.companyId
        })
        .then(res => {
          if (res.data.code == 0) {
            this.basicReportNum = res.data.data.basic;
            this.reportNum = this.majorReportNum = res.data.data.major;
          }
        });
    },
    // 样本预览
    samplePreview(reportType) {
      if (reportType == 0) {
        this.url =
          config.host +
          "/pic/app/creditReport/download/basics/666/265052?app=notRecord";
      } else if (reportType == 1) {
        this.url =
          config.host +
          "/pic/app/creditReport/download/major/666/265052?app=notRecord";
      }
      utils.showLoading();
      var _this = this;
      wx.downloadFile({
        url: _this.url,
        success(res) {
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath,
            fileType: "pdf",
            success(res) {
              utils.hideLoading();
            },
            fail(res) {
              utils.hideLoading();
              self.myToast("打开失败", "error");
            }
          });
        }
      });
    },
    // 购买报告
    buyCreditReport(reportType) {
      this._reportType = reportType;
      if (!this.vipLevel) {
        wx.navigateTo({
          url: "/pages/firmOrder/main?reportType=" + reportType + "&vipBuy=0"
        });
      } else {
        if (this.reportNum == 0) {
          this.vipBuyReport = true;
        } else {
          wx.navigateTo({
            url: "/pages/firmOrder/main?reportType=" + reportType + "&vipBuy=0"
          });
        }
      }
    },
    //今日您的下载次数已满,同意单独购买
    buyReport() {
      wx.navigateTo({
        url:
          "/pages/firmOrder/main?reportType=" + this._reportType + "&vipBuy=1"
      });
      this.vipBuyReport = false;
    },
    //今日您的下载次数已满,不同意单独购买
    notBuyReport() {
      this.vipBuyReport = false;
    }
  },
  onShow() {
    this.selectReportNum();
  },
  mounted() {
    this.getLoginInfo();
  }
};
</script>
<style lang="scss" scoped>
.order {
  text-align: right;
  margin-right: 20rpx;
  color: #ffffff;
}
.ic-report {
  width: 60%;
  height: 300rpx;
  margin: 0 auto;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.cr-bg {
  background: #209bf9;
}
swiper {
  height: 770rpx;
}
.item {
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: relative;
  .reprot-img {
    position: absolute;
    left: 50rpx;
    top: 0;
    width: 50rpx;
    height: 90rpx;
  }
  .title {
    line-height: 100rpx;
    font-size: 40rpx;
  }
  ul {
    margin-left: 30%;
    line-height: 60rpx;
  }
}

.active {
  transform: none;
  transition: all 0.2s;
}
.quiet {
  transform: scale(0.8333333);
  transition: all 0.2s;
}
.cr-btn {
  width: 100%;
  position: absolute;
  bottom: 0;
  a {
    display: inline-block;
    width: 46%;
    line-height: 80rpx;
    color: #ffffff;
    background: #27aab0;
    text-align: center;
    margin: 20rpx 2%;
  }
}
</style>
