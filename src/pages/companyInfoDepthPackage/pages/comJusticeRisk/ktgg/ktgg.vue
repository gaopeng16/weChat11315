<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content"
        :key="index"
        v-for="(item,index) in data"
        @click="courtSessionDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.caseReason" :hasBt="true"></BlockTitle>
        <div class="lh50">
          原告/上诉人：
          <span class="sub-content-light" :key="k" v-for="(v,k) in item.plaintiff">{{v.name}}</span>
        </div>
        <div class="lh50">
          被告/被上诉人：
          <span
            class="sub-content-light"
            :key="k"
            v-for="(v,k) in item.defendant"
          >{{v.name}}</span>
        </div>
        <div class="lh50">
          开庭日期：
          <span class="sub-content-light">{{item.startDate}}</span>
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
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "司法风险",
      subTitle: "开庭公告",
      total: "",
      bt: "案由",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    courtSessionDetail(item) {
      store.commit("setCourtSessionDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/comJusticeRisk/ktggDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.ktannouncementDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.startDate = formatTime(
                  new Date(Number(item.startDate)),
                  0
                );
                return item;
              });
              console.log(result);
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
                console.log("-->", this.data);
              }
              this.noData = false;
            } else {
              this.noData = true;
            }
          } else {
            this.noData = true;
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

