<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comOperateRisk/xzcf/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comOperateRisk/xzcf/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :bt="bt" :title="item.pendecno" :hasBt="true"></BlockTitle>
        <div class="lh50">
          处罚机关：
          <span class="font-click">{{item.penauth}}</span>
        </div>
        <div class="lh50">
          处罚决定日期：
          <span class="font-click">{{item.pendecissdate}}</span>
        </div>
        <div class="lh50">
          发布日期：
          <span class="font-click">{{item.pubdate}}</span>
        </div>
        <div class="lh50">
          违法行为类型：
          <span class="font-click">{{item.illegacttype}}</span>
        </div>
        <div class="lh50">
          处罚内容：
          <span class="font-click">{{item.pentype}}</span>
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
      subTitle: "经营异常",
      total: "",
      bt: "处罚文书号",
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
          type: "punishmentInfo"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.punishmentInfo.map(item => {
              item.pendecissdate = item.pendecissdate
                ? item.pendecissdate.substr(0, 10)
                : "--";
              item.pubdate = item.pubdate ? item.pubdate.substr(0, 10) : "--";

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

