<template>
  <div>
    <div class="shegnji" v-if="noData">
      <img v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
      <br>
      <span>暂无数据</span>
    </div>
    <div v-else>
      <div class="orderList">
        <div class="item" :key="k" v-for="(v,k) in orderList">
          <div class="time">{{v.createTime}}</div>
          <div class="name">
            <div class="left sub-content-light">{{v.subject}}</div>
            <div class="right red">{{v.money}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config";
import { formatTime } from "@/utils";
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      userId: "",
      orderList: [],
      noData: true
    };
  },
  methods: {
    getUserInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      if (loginInfo) {
        this.userId = loginInfo.userId;
      }
    },
    getOrderList() {
      this.$http
        .get(config.hostPay + "/payWithdrawals/orderList", {
          userId: this.userId
        })
        .then(res => {
          if (res.data.code == 0) {
            this.orderList = res.data.data.map(item => {
              item.createTime = item.createTime
                ? formatTime(new Date(item.createTime)).substr(0, 10)
                : "--";
              item.money =
                item.money > 0
                  ? "+" + (item.money / 100).toFixed(2)
                  : "-" + (item.money / 100).toFixed(2);
              return item;
            });
            if (this.orderList == 0) {
              this.noData = true;
            } else {
              this.noData = false;
            }
          }
        });
    }
  },
  mounted() {
    this.getUserInfo();
    this.getOrderList();
  }
};
</script>
<style lang="scss" scoped>
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
.orderList {
  width: 96%;
  margin-left: 2%;
  .item {
    height: 80rpx;
    padding: 8rpx;
    border-bottom: solid 1px #dddee1;
    .name,
    .time {
      line-height: 40rpx;
    }
  }
}
</style>

