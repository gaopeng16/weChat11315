<template>
  <div class="default-bg min-h100vh">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comListed/fhqk/main'"
      v-if="data.length <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comListed/fhqk/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content"
        :key="index"
        v-for="(item,index) in data"
        @click="fhqkDetails(item)"
      >
        <BlockTitle :bt="bt" :title="item.boardDate" :hasBt="true"></BlockTitle>
        <div class="lh50">
          分红方案说明：
          <span class="font-click">{{item.bonusScheme}}</span>
        </div>
        <div class="lh50">
          方案进度：
          <span class="font-click">{{item.progress}}</span>
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
      subTitle: "分红情况",
      total: "",
      bt: "董事会日期",
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
        .get("app/buss/companyInfo/comStock", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "bonusInfo"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.bonusInfo.map(item => {
              item.boardDate = item.boardDate
                ? item.boardDate.substr(0, 10)
                : "--";
              item.shareholderDate = item.shareholderDate
                ? item.shareholderDate.substr(0, 10)
                : "--";
              item.implementationDate = item.implementationDate
                ? item.implementationDate.substr(0, 10)
                : "--";
              item.stockDate = item.stockDate
                ? item.stockDate.substr(0, 10)
                : "--";
              item.acuxiDate = item.acuxiDate
                ? item.acuxiDate.substr(0, 10)
                : "--";
              item.dividendDate = item.dividendDate
                ? item.dividendDate.substr(0, 10)
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
    },
    fhqkDetails(item) {
      store.commit("setFhqkDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comListed/fhqkDetail/main"
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
</style>

