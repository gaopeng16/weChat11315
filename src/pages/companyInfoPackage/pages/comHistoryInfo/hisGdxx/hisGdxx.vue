<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisGdxx/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisGdxx/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <div>
          <ManFace v-if="item.logo" :imgSrc="item.logo"></ManFace>
          <LastName v-else :lastname="item.name"></LastName>
          <div class="lh70 font-click ml15 left">{{item.name}}</div>
        </div>
        <div class="clearboth"></div>
        <div class="lh50">
          认缴出资：
          <span class="font-click">{{item.capital[0].amomon}}</span>
        </div>
        <div class="lh50">
          认缴时间：
          <span class="font-click">{{item.capital[0].time}}</span>
        </div>
        <div class="lh50">
          持股比例：
          <span class="font-click">{{item.percent}}</span>
        </div>
        <div class="lh50">
          拥有公司数量：
          <span class="font-click">{{item.toco}}</span>
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
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import LastName from "@/components/LastName";
import ManFace from "@/components/ManFace";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: {
    SubTitle,
    BlockTitle,
    LastName,
    ManFace,
    ToDepthSearch,
    DepthSearch,
    Share
  },
  data() {
    return {
      title: "历史信息",
      subTitle: "股东信息",
      total: "",
      data: [],
      companyId: "",
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
        .get("app/buss/companyInfo/comHx", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "pastHolder"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.pastHolder.map(item => {
              item.capital[0].time = item.capital[0].time
                ? item.capital[0].time.substr(0, 10)
                : "--";
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
.trademarkImageUrl {
  width: 300rpx;
  height: 200rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

