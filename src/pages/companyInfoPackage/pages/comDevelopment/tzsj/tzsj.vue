<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/tzsj/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/tzsj/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="search-new-item"
        :key="index"
        v-for="(item,index) in data"
        @click="tzsjDetails(item)"
      >
        <div class="logo-name overflow-hidden">
          <div class="logo left">
            <FontImg
              :logoUrl="item.logo"
              :type="4"
              :brief="item.product"
              :width="70"
              :height="70"
              :lineHeight="35"
            ></FontImg>
          </div>
          <div class="name font-click left ml20 lh70 mt10">{{item.product}}</div>
        </div>
        <div class="item-info-box">
          <div class="item-info sub-content-light left">融资轮次:
            <br>
            <span class="title">{{item.turn}}</span>
          </div>
          <div class="div-line left"></div>
          <div class="item-info sub-content-light left">投资金额:
            <br>
            <span class="title">{{item.vaule}}</span>
          </div>
          <div class="div-line left"></div>
          <div class="item-info sub-content-light left">投资时间:
            <br>
            <span class="title">{{item.date}}</span>
          </div>
        </div>
        <div>
          <div class="line"></div>
          <div class="item-bot">
            <img class="left" v-if="imgUrl" :src="imgUrl+'gou.png'">
            <span class="left ml15">参股公司:</span>
            <div class="investors left ml15 font-click">{{item.investors}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <i-load-more v-if="more"/>
      <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
      <div class="bottom90"></div>
      <Share></Share>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { mapMutations } from "vuex";
import { SET_TZSJ_DETAIL_DATA } from "@/store/mutation-types";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import FontImg from "@/components/FontImg";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: {
    SubTitle,
    BlockTitle,
    ToDepthSearch,
    DepthSearch,
    FontImg,
    Share
  },
  data() {
    return {
      imgUrl: config.imgUrl,
      title: "企业发展",
      subTitle: "投资事件",
      total: "",
      bt: "时间",
      data: [],
      companyId: "",
      page: 1,
      more: true
    };
  },
  methods: {
    ...mapMutations({
      setTzsjDetailData: SET_TZSJ_DETAIL_DATA
    }),
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get("app/buss/companyInfo/comDevelopment", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "investments"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.investments.map(item => {
              item.date = item.date ? item.date.substr(0, 10) : "--";
              return item;
            });
            if (
              (init && this.total <= config.pageSize) ||
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
          }
        });
    },
    tzsjDetails(item) {
      console.log("item", item);
      this.setTzsjDetailData(item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comDevelopment/tzsjDetail/main"
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
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.total = this.$root.$mp.query.total;
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
      img {
        width: 70rpx;
        height: 70rpx;
        margin: 10rpx 10rpx 0 10rpx;
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

