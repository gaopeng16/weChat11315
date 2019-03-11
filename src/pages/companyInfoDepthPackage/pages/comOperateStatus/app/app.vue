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
        @click="operateStatusAppDetail(item)"
      >
        <div class="left App-logo">
          <img mode="aspectFit" :src="item.icon">
        </div>
        <div class="left App-right">
          <div class="lh50">
            <span class="title">{{item.filterName}}</span>
          </div>
          <div class="lh50">
            类型：
            <span class="font-click">{{item.classes}}</span>
          </div>
          <div class="lh50 ellipsis">
            <span class="font-click">{{item.brief}}</span>
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
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      imgFile: config.imgFile,
      title: "经营状况",
      subTitle: "产品信息",
      total: "",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    operateStatusAppDetail(item) {
      store.commit("setOperateStatusAppDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/comOperateStatus/appDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.appbkInfoDe + this.companyName,
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
  width: 160rpx;
  height: 160rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.App-right {
  margin-left: 15rpx;
  width: calc(100% - 200rpx);
}
</style>

