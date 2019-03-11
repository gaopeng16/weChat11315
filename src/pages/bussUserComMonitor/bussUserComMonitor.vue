<template>
  <div>
    <i-tabs :current="current" @change="handleChange">
      <i-tab key="tab1" title="监控企业"></i-tab>
      <i-tab key="tab2" title="动态"></i-tab>
    </i-tabs>
    <div class="tab1" v-if="current == 'tab1'">
      <div
        class="brief-card-container"
        @click="goDetail"
        :key="index"
        v-for="(item,index) in monitorArr"
      >
        <div class="avatar">
          <img v-if="imgUrl && item.logoUrl" class="img" :src="imgUrl+item.logoUrl ">
          <img v-else class="img" :src="imgUrl+'logo_n.png'">
        </div>
        <div class="detail">
          <div class="title">{{item.companyName}}</div>
          <div class="time">{{item.createTime}}</div>
        </div>
      </div>
      <div class="no-data" v-if="!noM">
        <img :src="imgUrl+'ic_empty.png'">
        <br>
        <span>暂无数据</span>
      </div>
    </div>
    <div class="tab2" v-if="current == 'tab2'">
      <div class="no-data" v-if="!false">
        <img :src="imgUrl+'ic_empty.png'">
        <br>
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config.js";
export default {
  data() {
    return {
      current: "tab1",
      imgUrl: config.imgUrl,
      userId: "",
      monitorArr: [], //监控数据
      noM: false, //没有监控数据
      noDyn: false //没有动态数据
    };
  },
  methods: {
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    },
    handleChange(e) {
      this.current = e.mp.detail.key;
    },
    getMonitor() {
      this.$http
        .get(config.bussUserComMonitor, { userId: this.userId })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data.count > 0) {
              this.noM = true;
              this.monitorArr = res.data.data.data;
            } else {
              this.noM = false;
              console.log("暂无数据");
            }
          }
        });
    }
  },
  mounted() {
    this.getLoginInfo();
    this.getMonitor();
  }
};
</script>
<style lang="scss" scoped>
.brief-card-container {
  width: calc(94% - 36px);
  margin-left: 36px;
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 3px 5px 0px #dddddd;
  min-height: 130rpx;
  position: relative;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: -15px;
    margin-top: 5px;
    float: left;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    width: calc(100% - 40px);
    float: left;
    margin-left: 10px;
    .title {
      font-size: 16px;
      line-height: 40rpx;
      padding-top: 10px;
    }
    .time {
      position: absolute;
      bottom: 5px;
      left: 36px;
      color: #999;
      font-size: 12px;
    }
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
