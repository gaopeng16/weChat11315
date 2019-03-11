<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comOperateStatus/app/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comOperateStatus/app/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content overflow-hidden"
        :key="index"
        v-for="(item,index) in data"
        @click="operateStatusAppDetail(item)"
      >
        <div class="left App-logo">
          <img mode="aspectFit" v-if="imgFile" :src="imgFile+item.produceLogo">
        </div>
        <div class="left App-right">
          <div class="lh50">
            <span class="title">{{item.productName}}</span>
          </div>
          <div class="lh50">
            类型：
            <span class="font-click">{{item.productType}}</span>
          </div>
          <div class="lh50 ellipsis">
            <span class="font-click">{{item.describe}}</span>
          </div>
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
      imgFile: config.imgFile,
      title: "经营状况",
      subTitle: "产品信息",
      total: "",
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
        .get("app/buss/companyInfo/comOperateStatus", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "appbkInfo"
        })
        .then(res => {
          // console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.appbkInfo;
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
    operateStatusAppDetail(item) {
      store.commit("setOperateStatusAppDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comOperateStatus/appDetail/main"
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

