<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content overflow-hidden"
        :key="index"
        v-for="(item,index) in data"
        @click="newsNewsDetail(item)"
      >
        <div class="left App-logo">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'news.png'">
        </div>
        <div class="left App-right">
          <div class="lh50 ellipsis">
            <span class="title">{{item.title}}</span>
          </div>
          <div class="lh50">
            来源：
            <span class="sub-content-light">{{item.website}}</span>
            <span class="sub-content-light right">{{item.time}}</span>
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
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      title: "新闻舆情",
      subTitle: "新闻",
      total: "",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    newsNewsDetail(item) {
      store.commit("setNewsNewsDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoDepthPackage/pages/comNews/xwDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.newsDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.length > 0) {
              this.total = res.data.result.length;
              const result = res.data.result;
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
.App-logo {
  width: 80rpx;
  height: 80rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.App-right {
  margin-left: 15rpx;
  width: calc(100% - 120rpx);
}
</style>

