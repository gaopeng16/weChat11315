<template>
  <div class="default-bg">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comListed/ssgg/main'"
      v-if="data.length <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comListed/ssgg/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :bt="bt" :title="item.title" :hasBt="true"></BlockTitle>
        <div class="lh50">
          日期：
          <span class="font-click">{{item.date}}</span>
        </div>
        <div class="lh50">
          股票名：
          <span class="font-click">{{item.stockName}}</span>
        </div>
        <div class="lh50">
          股票代码：
          <span class="font-click">{{item.stockcode}}</span>
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
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      title: "上市信息",
      subTitle: "上市公告",
      total: "",
      bt: "上市公告",
      data: [],
      companyId: "",
      noData: false,
      page: 1,
      more: true,
      isFirstPage: false
    };
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get("app/buss/companyInfo/comStock", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "announcement"
        })
        .then(res => {
          if (res.data.code == 0) {
            if (this.total > 0) {
              const result = res.data.data.announcement.map(item => {
                item.date = item.date ? item.date.substr(0, 10) : "--";
                return item;
              });
              if (
                (init && this.total < config.pageSize) ||
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
    this.init();
  }
};
</script>
<style lang="scss" scoped>
</style>

