<template>
  <div class="default-bg">
    <NoData v-if="noData"></NoData>
    <div v-else>
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
            :type="item.type==1?4:1"
            :brief="item.type==1?(item.alias?item.alias:item.name):item.name"
            :width="60"
            :height="60"
            :lineHeight="item.type==1?30:60"
          ></FontImg>
        </div>
        <div class="gd-info left">
          <div class="gd-name overflow-hidden">
            <div class="font-click gdname left">
              <span class="left" :class="[index == 0?'big-gdname':'']">{{item.name}}</span>
              <span class="big-gd" v-if="index == 0">大股东</span>
            </div>
            <div class="origin-deep right">{{item.toco?"他有"+item.toco+"家公司":""}}</div>
          </div>
          <div class="gdinfo">
            <div class="info-left left">
              <span class="sub-content-light">认缴出资额</span>
              <br>
              <span class="title">{{item.capital[0].amomon}}</span>
            </div>
            <div class="gdinfo-line left"></div>
            <div class="info-right left">
              <span class="sub-content-light">认缴时间</span>
              <br>
              <span class="title">{{item.capital[0].time?item.capital[0].time:'--'}}</span>
            </div>
          </div>
          <div class="gdinfo">
            <div class="info-left left">
              <span class="sub-content-light">持股比例</span>
              <br>
              <span class="rede">{{item.capital[0].percent}}</span>
            </div>
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
import { mapState } from "vuex";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import FontImg from "@/components/FontImg";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData, FontImg },
  data() {
    return {
      title: "基本信息",
      subTitle: "股东信息",
      total: "",
      bt: "股东",
      data: [],
      noData: false,
      page: 1,
      more: true
    };
  },
  computed: {
    ...mapState(["companyName"])
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.holderDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items;
              if (
                (init && result.length < config.pageSize) ||
                (result.length < config.pageSize && this.page > 1)
              ) {
                this.more = false;
              }
              if (init) {
                this.data = result;
                this.data.capitalAmomon;
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
    },
    // 跳转到个人或者详情
    goManInfoOrCompanyInfo(item) {
      if (item.type === 2) {
        this.goManInfo(item.name);
      } else if (item.type === 1) {
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
  mounted() {
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

