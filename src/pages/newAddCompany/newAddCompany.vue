<template>
  <div>
    <div class="tab-select">
      <i-tabs :current="current" @change="handleChange">
        <i-tab key="tab1" title="最新认领公司"></i-tab>
        <i-tab key="tab2" title="最新注册公司"></i-tab>
      </i-tabs>
    </div>
    <div class="tab-box tab1" v-if="current == 'tab1'">
      <div
        class="search-item"
        :key="index"
        v-for="(item,index) in newAddCom"
        @click="companyInfo(item.id)"
      >
        <img v-if="imgUrl && item.logoUrl" class="company-logo" :src="imgUrl+item.logoUrl ">
        <img v-else class="company-logo" :src="imgUrl+'logo_n.png'">
        <div class="com-info title cname">{{item.companyName}}</div>
        <div class="com-info">认领时间：: {{item.createTime}}</div>
      </div>
      <i-load-more tip="到底啦!" :loading="noLoading"/>
      <div class="no-data" v-if="!newAddCom">
        <img :src="imgUrl+'ic_empty.png'">
        <br>
        <span>暂无数据</span>
      </div>
    </div>
    <div class="tab-box tab2" v-if="current == 'tab2'">
      <div class="search-item" :key="index" v-for="(item,index) in newRegist">
        <img v-if="imgUrl && item.logoUrl" class="company-logo" :src="imgUrl+item.logoUrl ">
        <img v-else class="company-logo" :src="imgUrl+'logo_n.png'">
        <div class="com-info title cname">{{item.companyName}}</div>
        <div class="com-info">法人代表:{{item.legalPerson}}</div>
        <div class="com-info">注册资本: {{item.registeredCapital+item.registeredCapitalUnit}}</div>
        <div class="com-info">成立日期: {{item.registrationDate}}</div>
      </div>
      <i-load-more tip="到底啦!" :loading="noLoading"/>
      <div class="no-data" v-if="!newRegist">
        <img :src="imgUrl+'ic_empty.png'">
        <br>
        <span>暂无数据</span>
      </div>
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
      current: "tab1",
      newAddCom: [],
      newRegist: [],
      isResNewRegist: false,
      noLoading: false
    };
  },
  methods: {
    myToast(con, type) {
      $Toast({
        content: con,
        type: type
      });
    },
    //跳转详情页
    companyInfo(companyId) {
      wx.navigateTo({
        url: "/pages/companyInfo/main?companyId=" + companyId
      });
    },
    handleChange(e) {
      this.current = e.mp.detail.key;
      if (this.current == "tab2") {
        if (!this.isResNewRegist) {
          showLoading();
          this.$http.get(config.newRegist).then(res => {
            hideLoading();
            this.noLoading2 = true;
            console.log("123", res);
            if (res.data.code == 0) {
              this.newRegist = res.data.data.map(item => {
                if (item.companyName.length > 14) {
                  item.companyName = item.companyName.substr(0, 14) + "...";
                }
                if (item.registrationDate) {
                  item.registrationDate = item.registrationDate.substr(0, 10);
                } else {
                  item.registrationDate = "-";
                }
                return item;
              });
            }
          });
          this.isResNewRegist = true;
        }
      }
    },
    findNewCom() {
      showLoading();
      this.$http.get(config.findNewCom).then(res => {
        hideLoading();
        this.noLoading1 = true;
        if (res.data.code == 0) {
          this.newAddCom = res.data.data.map(item => {
            if (item.companyName.length > 14) {
              item.companyName = item.companyName.substr(0, 14) + "...";
            }
            if (item.createTime) {
              item.createTime = item.createTime.substr(0, 10);
            } else {
              item.createTime = "-";
            }
            return item;
          });
        }
      });
    }
  },
  mounted() {
    this.findNewCom();
  }
};
</script>
<style lang="scss" scoped>
.tab-select {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.tab-box {
  margin-top: 50px;
}
.search-item {
  position: relative;
  width: 90%;
  height: auto;
  margin-left: 8%;
  margin-top: 40rpx;
  padding: 10rpx 0 15rpx 0;
  box-shadow: 0px 0px 8px #e9eaec;
  background: #ffffff;
  border-radius: 8rpx;
  .com-info {
    color: #80848f;
    height: auto;
    margin-left: 110rpx;
    margin-top: 5rpx;
    margin-bottom: 5rpx;
    font-size: 12px;
    overflow: hidden;
  }
  .cname {
    font-size: 14px;
    color: #1c2438;
    padding: 10rpx 0;
    font-weight: bold;
  }
  .company-logo {
    position: absolute;
    top: -20rpx;
    left: -5%;
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
    overflow: hidden;
  }
}
.no-data {
  text-align: center;
  img {
    width: 300rpx;
    height: 300rpx;
    margin-top: 200rpx;
  }
}
</style>
