<template>
  <div>
    <div class="relation-input-con">
      <div class="relation-input left">
        <div class="overflow-hidden">
          <span class="sub-content-light left">从</span>
          <input class="left" type="text" placeholder="添加第一个公司或老板">
        </div>
        <div class="overflow-hidden">
          <span class="sub-content-light left">到</span>
          <input class="left no-bor" type="text" placeholder="添加第二个公司或老板">
        </div>
      </div>
      <div class="relation-btn right">
        <div @click="findRrelations">
          <i-icon type="search"/>查关系
        </div>
      </div>
    </div>
    <div class="shadow-box"></div>
    <div v-if="!noData" class="shili">
      <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'relationship.jpg'">
    </div>
    <div v-if="noData" class="empty-body relative">
      <div class="empty text-center absolute">
        <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'ic_upgrade.png'">
        <span class="font-click">功能正在升级中...</span>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config.js";
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      noData: false
    };
  },
  methods: {
    findRrelations() {
      this.noData = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.relation-input-con {
  width: 100%;
  height: 160rpx;
  box-shadow: 0rpx 10rpx 10rpx #e1e1e1;
  .relation-input {
    width: 76%;
    .overflow-hidden {
      span {
        width: 10%;
        text-align: center;
        line-height: 80rpx;
      }
      input {
        width: 90%;
        height: 80rpx;
        border-bottom: solid 1px #e1e1e1;
      }
      input.no-bor {
        border-bottom: none;
      }
    }
  }
  .relation-btn {
    width: 20%;
    margin-left: 2%;
    margin-right: 2%;
    div {
      height: 60rpx;
      line-height: 60rpx;
      width: 100%;
      text-align: center;
      color: #ffffff;
      background: #209bf9;
      border-radius: 5rpx;
      margin-top: 50rpx;
    }
  }
}
.shadow-box {
  height: 20rpx;
}
.shili {
  width: 100%;
  img {
    width: 100%;
  }
}
.empty-body {
  width: 100%;
  height: 800rpx;
  .empty {
    width: 300rpx;
    height: 370rpx;
    left: 50%;
    top: 50%;
    margin-left: -150rpx;
    margin-top: -185rpx;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>

