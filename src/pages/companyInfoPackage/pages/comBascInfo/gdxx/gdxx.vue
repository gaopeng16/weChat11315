<template>
  <div class="default-bg">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/gdxx/main'"
      v-if="data.length <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/gdxx/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-content-100 overflow-hidden"
        :key="index"
        v-for="(item,index) in data"
        @click="goManInfoOrCompanyInfo(item)"
      >
        <div class="gd-logo left">
          <FontImg
            :type="item.type==2?4:1"
            :brief="item.type==2?item.shareholderName:item.lastName"
            :width="60"
            :height="60"
            :lineHeight="item.type==2?30:60"
          ></FontImg>
        </div>
        <div class="gd-info left">
          <div class="gd-name overflow-hidden">
            <div class="font-click gdname left">
              <span class="left" :class="[index == 0?'big-gdname':'']">{{item.shareholderName}}</span>
              <span class="big-gd" v-if="index == 0">大股东</span>
            </div>
            <div class="origin-deep right">{{item.toco?"他有"+item.toco+"家公司":""}}</div>
          </div>
          <div class="gdinfo">
            <div class="info-left left">
              <span class="sub-content-light">认缴出资额</span>
              <br>
              <span class="title">{{item.subscribedCapital+item.capitalUnit}}</span>
            </div>
            <div class="gdinfo-line left"></div>
            <div class="info-right left">
              <span class="sub-content-light">认缴时间</span>
              <br>
              <span class="title">{{item.capitalTime}}</span>
            </div>
          </div>
          <div class="gdinfo">
            <div class="info-left left">
              <span class="sub-content-light">持股比例</span>
              <br>
              <span class="rede">{{item.investmentRatio}}</span>
            </div>
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
import { mapState } from "vuex";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import FontImg from "@/components/FontImg";
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
      title: "基本信息",
      subTitle: "股东信息",
      total: "",
      bt: "股东",
      data: [],
      companyId: "",
      page: 1,
      more: true
    };
  },
  methods: {
    ...mapState(["companyName"]),
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get("app/buss/companyInfo/comBasic", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "holder"
        })
        .then(res => {
          if (res.data.code == 0) {
            console.log("---", res);
            const result = res.data.data.holder.map(item => {
              item.capitalTime = item.capitalTime
                ? item.capitalTime.substr(0, 10)
                : "--";
              if (item.type == 1) {
                item.lastName = item.shareholderName.substr(0, 1);
              }
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
    // 跳转到个人或者详情
    goManInfoOrCompanyInfo(item) {
      if (item.type === 1) {
        this.goManInfo(item.shareholderName);
      } else if (item.type === 2) {
        //this.companyInfo(item.id);
      }
    },
    // 跳转到人物详情页
    goManInfo(name) {
      wx.navigateTo({
        url:
          "/pages/manInfo/main?humanName=" +
          name +
          "&companyName=" +
          this.companyName
      });
    },
    //跳转详情页
    companyInfo(companyId) {
      wx.navigateTo({
        url:
          "/pages/companyInfoPackage/pages/companyInfo/main?companyId=" +
          companyId
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
.gd-info {
  width: calc(100% - 100rpx);
  .gd-name {
    margin-top: 10rpx;
    line-height: 60rpx;
    .gdname {
      width: 70%;
      .left {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .big-gdname {
      max-width: 78%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .big-gd {
      float: left;
      width: auto;
      background: red;
      margin-top: 18rpx;
      padding: 0rpx 10rpx;
      line-height: 25rpx;
      font-size: 10px;
      color: #ffffff;
      border-top-left-radius: 8rpx;
      border-bottom-right-radius: 8rpx;
    }
  }
  .gdinfo {
    height: 80rpx;
    line-height: 40rpx;
    margin-top: 10rpx;
    .info-left {
      width: 50%;
    }
    .info-right {
      box-sizing: border-box;
      width: calc(50% - 1px);
      padding-left: 20rpx;
    }
    .gdinfo-line {
      width: 1px;
      height: 50rpx;
      margin-top: 15rpx;
      background: #dddee1;
    }
  }
}
</style>

