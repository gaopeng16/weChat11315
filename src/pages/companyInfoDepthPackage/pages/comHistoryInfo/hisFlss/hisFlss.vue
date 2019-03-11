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
        @click="historyHxLawsuitDetail(item)"
      >
        <div class="font-click bold lh70 ellipsis">{{item.title}}</div>
        <div class="lh50">
          案件类型：
          <span class="font-click">{{item.casetype}}</span>
        </div>
        <div class="lh50">
          案号：
          <span class="font-click">{{item.caseno}}</span>
        </div>
        <div class="lh50">
          案由：
          <span class="font-click">{{item.casereason?item.casereason:"--"}}</span>
        </div>
        <div class="lh50">
          发布日期：
          <span class="font-click">{{item.submittime}}</span>
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
      title: "历史信息",
      subTitle: "法律诉讼",
      total: "",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    historyHxLawsuitDetail(item) {
      store.commit("setHistoryHxLawsuitDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisFlssDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.hisLawsuitDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.submittime = item.submittime
                  ? formatTime(new Date(Number(item.submittime)), 0)
                  : "--";
                item.connList = item.connList.map(v => {
                  v = v.replace(/<[^>]*>/g, "");
                  return v;
                });
                item.defendants = item.defendants.replace(/<[^>]*>/g, "");
                return item;
              });
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
.state {
  width: 100rpx;
  height: 40rpx;
  line-height: 40rpx;
  border: solid 1px #279ef9;
  border-radius: 20rpx;
}
</style>

