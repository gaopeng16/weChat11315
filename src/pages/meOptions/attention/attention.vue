<template>
  <div class="min-height100 attention-body">
    <i-tabs :current="current" @change="handleChange">
      <i-tab key="tab1" title="全部"></i-tab>
      <i-tab key="tab2" title="分组"></i-tab>
    </i-tabs>
    <div v-if="current =='tab1'">
      <div
        class="search-item"
        :key="index"
        v-for="(item,index) in attentionArr"
        @click="companyInfo(item.id)"
      >
        <img class="company-logo" :src="imgFile+item.logoUrl">
        <div class="com-info title cname lh70">{{item.companyName}}</div>
        <div class="com-info">关注日期: {{item.createTime}}</div>
      </div>
    </div>
    <div v-if="current =='tab2'">
      <div class="shegnji">
        <img v-if="imgUrl" :src="imgUrl+'ic_upgrade.png'">
        <br>
        <span>功能正在升级中</span>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  data() {
    return {
      imgFile: config.imgFile,
      imgUrl: config.imgUrl,
      current: "tab1",
      userId: "",
      attentionArr: []
    };
  },
  methods: {
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    },
    handleChange(detail) {
      this.current = detail.target.key;
    },
    getAttention() {
      this.$http
        .get(config.getFollowByUserId, { userId: this.userId })
        .then(res => {
          if (res.data.code == 0) {
            this.attentionArr = res.data.data.data;
          }
        });
    }
  },
  mounted() {
    this.getLoginInfo();
    this.getAttention();
  }
};
</script>
<style lang="scss" scoped>
.attention-body {
  background: #f7f7f7;
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
  padding-bottom: 20rpx;
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
