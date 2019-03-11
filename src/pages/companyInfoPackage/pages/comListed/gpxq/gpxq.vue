<template>
  <div class="default-bg min-height100">
    <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comListed/gpxq/main'"></DepthSearch>
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <div class="block-shadow-content">
      <div class="lh70 fs30">
        <span class="font-click">{{shortName}}({{code}})</span>
        <div class="change" :class="[ !pm ? 'limit-up-down-red':'limit-up-down-green']">
          <span v-if="!pm">↑</span>
          <span v-else>↓</span>
          <span>{{currentPrice}}</span>
          <span class="little">{{limitUpDownPrice}}</span>
          <span>({{limitUpDownPercent}})</span>
        </div>
      </div>
      <div class="lh50">
        更新时间：
        <span class="title">{{updateTime}}</span>
      </div>
      <div class="lh50">
        总市值：
        <span class="title">{{aggregateMarketValue}}</span>
      </div>
      <div class="lh50">
        市净率：
        <span class="title">{{netRatio}}</span>
      </div>
      <div class="lh50">
        流通市值：
        <span class="title">{{circulatedMarketValue}}</span>
      </div>
      <div class="lh50">
        市盈率：
        <span class="title">{{tim}}</span>
      </div>
      <div class="lh50">
        成交额：
        <span class="title">{{dealMoney}}</span>
      </div>
      <div class="lh50">
        成交量：
        <span class="title">{{dealNum}}</span>
      </div>
      <div class="lh50">
        涨停：
        <span class="title">{{limitUp}}</span>
      </div>
      <div class="lh50">
        跌停：
        <span class="title">{{limitDown}}</span>
      </div>
    </div>

    <div class="bottom90"></div>
    <Share></Share>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, DepthSearch, Share },
  data() {
    return {
      title: "上市信息",
      subTitle: "股票详情",
      total: "",
      companyId: "",
      code: "", // 代码
      updateTime: "", // 更新时间
      aggregateMarketValue: "", // 总市值
      netRatio: "", // 市净率
      circulatedMarketValue: "", // 流通市值
      tim: "", // 市盈率
      dealMoney: "", // 成交额
      dealNum: "", // 成交量
      limitUp: "", // 涨停
      limitDown: "", // 跌停
      currentPrice: "", // 当前价格
      limitUpDownPrice: "", //涨跌价格
      limitUpDownPercent: "", //涨跌%
      pm: false, // 正负,
      shortName: ""
    };
  },
  methods: {
    getStockMarket() {
      this.$http
        .post(config.getStockMarket, { companyId: this.companyId })
        .then(res => {
          if (res.data.code == 0) {
            const data = res.data.data;
            this.code = data.代码;
            this.updateTime = data.时间;
            this.aggregateMarketValue = data.总市值;
            this.netRatio = data.市净率;
            this.circulatedMarketValue = data.流通市值;
            this.tim = data.市盈率;
            this.dealMoney = data.成交额;
            this.dealNum = data.成交量;
            this.limitUp = data.涨停价;
            this.limitDown = data.跌停价;
            this.currentPrice = data.当前价格;
            this.limitUpDownPrice = data.涨跌;
            this.limitUpDownPercent = data["涨跌幅"] ? data["涨跌幅"] : "--";
            this.pm = this.limitUpDownPrice.startsWith("-");
          }
        });
    },
    comHead() {
      this.$http
        .get("app/buss/companyInfo/comHead", {
          companyId: this.companyId
        })
        .then(res => {
          if (res.data.code == 0) {
            this.shortName = res.data.data.comBasic.shortName;
          }
        });
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.getStockMarket();
    this.comHead();
  }
};
</script>
<style lang="scss" scoped>
.change {
  float: right;
  .little {
    font-size: 12px;
    margin-left: 15rpx;
  }
}
.limit-up-down-red {
  color: #ff0000;
}
.limit-up-down-green {
  color: #00ff00;
}
</style>
