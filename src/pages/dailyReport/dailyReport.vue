<template>
  <div>
    <div class="tab-total">
      共
      <span class="red">{{dailyReportData.num}}</span>条监控动态
    </div>
    <div class="daily-report">
      <div
        class="list"
        :key="k"
        v-for="(v,k) in dailyReportData.comInfoList"
        @click="monitorDetail(v)"
      >
        <div class="item">
          <div class="name title">{{v.companyName}}</div>
          <div style="text-indent: 24rpx;">
            共
            <span class="red">{{v.totalNum}}</span> 条动态
          </div>
          <div class="info sub-content-light red">
            <span :key="k1" v-for="(v1,k1) in v.comInfors">
              <span v-if="k1 <= 2">&nbsp;{{v1.typeName}}{{v1.num}}条</span>
            </span>
            <span v-if="v.comInfors.length > 2">...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["dailyReportData"])
  },
  methods: {
    monitorDetail(data) {
      wx.navigateTo({
        url:
          "/pages/monitorDetail/main?companyName=" +
          data.companyName +
          "&companyId=" +
          data.companyId
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.red {
  color: #ff0000;
}
.tab-total {
  background: #f2f2f2;
  text-indent: 20rpx;
  line-height: 80rpx;
  .allread {
    float: right;
    margin-right: 10rpx;
    color: #4383da;
  }
}
.daily-report {
  padding: 10px;
  .head {
    overflow: hidden;
    line-height: 60rpx;
    .title {
      float: left;
      width: 150rpx;
      text-align: center;
      background: #209bf9;
      color: #ffffff;
      border-top-left-radius: 22rpx;
      border-bottom-right-radius: 22rpx;
    }
    .date {
      float: left;
      margin-left: 20rpx;
    }
    .state {
      float: right;
    }
  }
  .item {
    text-indent: 12rpx;
    margin: 10rpx 0;
    padding-bottom: 10rpx;
    border-bottom: dotted 1px #bbbec4;
    .name {
      height: 46rpx;
      line-height: 46rpx;
      vertical-align: middle;
      overflow: hidden;
    }
    .name::before {
      content: "";
      display: block;
      width: 8rpx;
      height: 8rpx;
      margin-top: 21rpx;
      border-radius: 50%;
      background: #495060;
      margin-right: 8rpx;
      float: left;
    }
    .info {
      text-indent: 16rpx;
      font-size: 26rpx;
    }
  }
}
</style>

