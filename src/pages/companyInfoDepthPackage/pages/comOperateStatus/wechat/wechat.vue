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
        @click="operateStatusWechatDetail(item)"
      >
        <div class="left wechat-logo">
          <img mode="aspectFit" :src="item.titleImgURL">
        </div>
        <div class="left wechat-right">
          <div class="lh50">
            <span class="font-click">{{item.title}}</span>
          </div>
          <div class="lh50">
            微信号：
            <span class="font-click">{{item.publicNum}}</span>
          </div>
          <div class="lh50 ellipsis">
            功能介绍：
            <span class="font-click">{{item.recommend}}</span>
          </div>
        </div>
      </div>
      <!--  -->
      <i-load-more v-if="more"/>v
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
      subTitle: "微信公众号",
      total: "",
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    operateStatusWechatDetail(item) {
      store.commit("setOperateStatusWechatDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/comOperateStatus/wechatDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.publicWeChatDe + this.companyName,
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
.wechat-logo {
  width: 160rpx;
  height: 160rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.wechat-right {
  margin-left: 15rpx;
  width: calc(100% - 200rpx);
}
</style>

