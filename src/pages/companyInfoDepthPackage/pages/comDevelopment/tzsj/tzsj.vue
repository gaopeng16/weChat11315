<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="search-new-item" :key="index" v-for="(item,index) in data">
        <div class="logo-name overflow-hidden">
          <div class="logo left" v-if="item.icon">
            <img mode="widthFix" :src="item.icon">
          </div>
          <FontImg v-else :type="4" :brief="item.product" :width="70" :height="70" :lineHeight="35"></FontImg>
          <div class="name font-click left ml20 lh70 mt10">{{item.product}}</div>
        </div>
        <div class="item-info-box">
          <div class="item-info sub-content-light left">融资轮次:
            <br>
            <span class="title">{{item.lunci}}</span>
          </div>
          <div class="div-line left"></div>
          <div class="item-info sub-content-light left">投资金额:
            <br>
            <span class="title">{{item.money}}</span>
          </div>
          <div class="div-line left"></div>
          <div class="item-info sub-content-light left">投资时间:
            <br>
            <span class="title">{{item.tzdate}}</span>
          </div>
        </div>
        <div>
          <div class="line"></div>
          <div class="item-bot">
            <img class="left" v-if="imgUrl" :src="imgUrl+'gou.png'">
            <span class="left ml15">参股公司:</span>
            <div class="left ml15 font-click investors">{{item.organization_name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <i-load-more v-if="more"/>
      <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import FontImg from "@/components/FontImg";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData, FontImg },
  data() {
    return {
      title: "企业发展",
      subTitle: "投资事件",
      total: "",
      bt: "时间",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.findTzanliDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.tzdate = item.tzdate
                  ? formatTime(new Date(item.tzdate)).substr(0, 10)
                  : "--";
                return item;
              });
              if (
                (init && result.length < config.pageSize) ||
                (result.length < config.pageSize && this.page > 1)
              ) {
                this.more = false;
              }
              if (init) {
                this.data = result;
                wx.stopPullDownRefresh();
              } else {
                this.data = this.data.concat(result);
              }
              this.noData = false;
            } else {
              this.noData = true;
            }
          } else {
            this.noData = true;
          }
        });
    }
  },
  onPullDownRefresh() {
    this.init(true);
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page++;
    this.init();
  },
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
    this.init(true);
  }
};
</script>
<style lang="scss" scoped>
.search-new-item {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background: #ffffff;
  overflow: hidden;
  margin-top: 20rpx;
  padding: 20rpx;
  .logo-name {
    .logo {
      width: 70rpx;
      height: 70rpx;
      margin: 10rpx 10rpx 0 10rpx;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .name {
        font-size: 30rpx;
      }
    }
  }
  .item-info-box {
    overflow: hidden;
    margin: 20rpx 0;
    .item-info {
      width: 33%;
      line-height: 40rpx;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .div-line {
      width: 1px;
      height: 40rpx;
      margin-top: 20rpx;
      background: #dddee1;
    }
  }
  .item-bot {
    padding-top: 15rpx;
    line-height: 36rpx;
    img {
      width: 36rpx;
      height: 36rpx;
    }
    .investors {
      width: 70%;
    }
  }
}
</style>

