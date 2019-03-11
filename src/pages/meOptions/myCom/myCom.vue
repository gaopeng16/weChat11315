<template>
  <div class="min-height100 attention-body">
    <div class="deep-search" @click="goCliam">认领
      <br>企业
    </div>
    <i-tabs :current="current" @change="handleChange">
      <i-tab key="tab1" title="已认领"></i-tab>
      <i-tab key="tab2" title="审核中"></i-tab>
      <i-tab key="tab3" title="未通过"></i-tab>
    </i-tabs>
    <div v-if="current =='tab1'">
      <div v-if="hasClaim.length >0">
        <div
          class="search-item"
          :key="index"
          v-for="(item,index) in hasClaim"
          @click="companyInfo(item.id)"
        >
          <img v-if="item.logoUrl" class="company-logo" :src="item.logoUrl">
          <img v-else-if="imgUrl" class="company-logo" :src="imgUrl+'logo_n.png'">
          <div class="com-info title cname lh70">{{item.companyName}}</div>
          <div class="com-info">认领人: {{item.userName}}</div>
          <div class="com-info">注册资本: 企业选择不公开</div>
          <div class="com-info">认领日期: {{item.createTime}}</div>
        </div>
      </div>
      <div v-else>
        <div class="shegnji">
          <img v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
          <br>
          <span>暂无数据</span>
        </div>
      </div>
    </div>
    <div v-if="current =='tab2'">
      <div v-if="doClaim.length >0">
        <div
          class="search-item"
          :key="index"
          v-for="(item,index) in doClaim"
          @click="companyInfo(item.id)"
        >
          <img v-if="item.logoUrl" class="company-logo" :src="item.logoUrl">
          <img v-else-if="imgUrl" class="company-logo" :src="imgUrl+'logo_n.png'">
          <div class="com-info title cname lh70">{{item.companyName}}</div>
          <div class="com-info">认领人: {{item.userName}}</div>
          <div class="com-info">注册资本: 企业选择不公开</div>
          <div class="com-info">认领日期: {{item.createTime}}</div>
        </div>
      </div>
      <div v-else>
        <div class="shegnji">
          <img v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
          <br>
          <span>暂无数据</span>
        </div>
      </div>
    </div>
    <div v-if="current =='tab3'">
      <div v-if="noClaim.length >0">
        <div
          class="search-item"
          :key="index"
          v-for="(item,index) in noClaim"
          @click="companyInfo(item.id)"
        >
          <img v-if="item.logoUrl" class="company-logo" :src="item.logoUrl">
          <img v-else-if="imgUrl" class="company-logo" :src="imgUrl+'logo_n.png'">
          <div class="com-info title cname lh70">{{item.companyName}}</div>
          <div class="com-info">认领人: {{item.userName}}</div>
          <div class="com-info">注册资本: 企业选择不公开</div>
          <div class="com-info">认领日期: {{item.createTime}}</div>
        </div>
      </div>
      <div v-else>
        <div class="shegnji">
          <img v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
          <br>
          <span>暂无数据</span>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import config from "@/config";
import { formatTime, showLoading, hideLoading } from "@/utils";
export default {
  data() {
    return {
      imgFile: config.imgFile,
      imgUrl: config.imgUrl,
      current: "tab1",
      userId: "",
      hasClaim: [], //已认领
      noClaim: [], //未通过
      doClaim: [] //审核中
    };
  },
  methods: {
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
      this.vipLevel = loginInfo.vipLevel;
    },
    handleChange(detail) {
      this.current = detail.target.key;
    },
    getClaim(init) {
      this.$http.get(config.findUserComClaimList + this.userId).then(res => {
        if (res.data.code == 0) {
          this.hasClaim = res.data.data.filter(item => item.auditStatus == 2);
          this.noClaim = res.data.data.filter(item => item.auditStatus == 3);
          this.doClaim = res.data.data.filter(item => item.auditStatus == 1);
        }
      });
    },
    //跳转详情页
    companyInfo(companyId) {
      wx.navigateTo({
        url: "/pages/companyInfo/main?companyId=" + companyId
      });
    },
    // 去认领企业
    goClaim() {
      wx.navigateTo({
        url: "/pages/companyClaimApplication/main"
      });
    }
  },
  mounted() {
    this.getLoginInfo();
    this.getClaim(true);
  }
};
</script>
<style lang="scss" scoped>
.attention-body {
  background: #f7f7f7;
  .deep-search {
    position: fixed;
    top: 80rpx;
    right: 15rpx;
    width: 80rpx;
    height: 70rpx;
    padding-top: 10rpx;
    line-height: 30rpx;
    text-align: center;
    border-radius: 50%;
    background: #209bf9;
    color: #ffffff;
    font-size: 12px;
    z-index: 999;
  }
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
</style>
