<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comOperateRisk/gqcz/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comOperateRisk/gqcz/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :bt="bt" :title="item.regNumber" :hasBt="true"></BlockTitle>
        <div class="lh50">
          质权人：
          <span class="font-click">{{item.pledgee}}</span>
        </div>
        <div class="lh50">
          公示日期：
          <span class="font-click">{{item.putDate}}</span>
        </div>
        <div class="lh50">
          登记日期：
          <span class="font-click">{{item.regDate}}</span>
        </div>
        <div class="lh50">
          出质人：
          <span class="font-click">{{item.pledgor}}</span>
        </div>
        <div class="lh50">
          出质人证件号码：
          <span class="font-click">{{item.certifNumberR}}</span>
        </div>
        <div class="lh50">
          质权人证件号码：
          <span class="font-click">{{item.certifNumber}}</span>
        </div>
        <div class="lh50">
          出质股权数额：
          <span class="font-click">{{item.pledgedA}}万股</span>
        </div>
        <div class="lh50">
          赎回原因：
          <span class="font-click">暂无</span>
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
      title: "经营风险",
      subTitle: "股权出质",
      total: "",
      bt: "登记编号",
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
        .get("app/buss/companyInfo/comOperateRisk", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "equityInfo"
        })
        .then(res => {
          console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.equityInfo.map(item => {
              item.putDate = item.pubDate ? item.putDate.substr(0, 10) : "--";
              item.regDate = item.regDate ? item.regDate.substr(0, 10) : "--";
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
</style>

