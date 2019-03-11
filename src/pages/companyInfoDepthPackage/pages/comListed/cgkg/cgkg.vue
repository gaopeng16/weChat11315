<template>
  <div class="default-bg">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :title="item.name"></BlockTitle>
        <div class="lh50">
          参股关系：
          <span class="font-click">{{item.relationship}}</span>
        </div>
        <div class="lh50">
          参股比例：
          <span class="font-click">{{item.participationRatio}}</span>
        </div>
        <div class="lh50">
          投资金额(万元)：
          <span class="font-click">{{item.investmentAmount}}</span>
        </div>
        <div class="lh50">
          是否报表合并：
          <span class="font-click">{{item.reportMerge}}</span>
        </div>
        <div class="lh50">
          被参股公司主营业务：
          <span class="font-click">{{item.mainBusiness}}</span>
        </div>
        <div class="lh50">
          被参控公司净利润(万元)：
          <span class="font-click">{{item.profit}}</span>
        </div>
      </div>
      <i-load-more v-if="more"/>
      <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "上市信息",
      subTitle: "参股控股",
      total: "",
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
          uri: config.holdingCompanyDe + this.companyName,
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
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
    this.init(true);
  }
};
</script>

<style lang="scss" scoped>
</style>
