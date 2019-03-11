<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comOperateStatus/wechat/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comOperateStatus/wechat/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content overflow-hidden"
        :key="index"
        v-for="(item,index) in data"
        @click="operateStatusWechatDetail(item)"
      >
        <div class="left wechat-logo">
          <img mode="aspectFit" v-if="imgFile" :src="imgFile+item.wechatLogo">
        </div>
        <div class="left wechat-right">
          <div class="lh50">
            <span class="font-click">{{item.wechatName}}</span>
          </div>
          <div class="lh50">
            微信号：
            <span class="font-click">{{item.wechatCode}}</span>
          </div>
          <div class="lh50 ellipsis">
            功能介绍：
            <span class="font-click">{{item.description}}</span>
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
      subTitle: "微信公众号",
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
          type: "publicWeChat"
        })
        .then(res => {
          // console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.publicWeChat;
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
    operateStatusWechatDetail(item) {
      store.commit("setOperateStatusWechatDetailData", item);
      wx.navigateTo({
        url:
          "/pages/companyInfoPackage/pages/comOperateStatus/wechatDetail/main"
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

