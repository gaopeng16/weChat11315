<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/zyry/main'"
      v-if="data.length <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/zyry/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <div class="lh70 overflow-hidden" @click="goManInfo(item.name)">
          <LastName :headUrl="item.headUrl" :isImgFile="1" :lastname="item.lastname"></LastName>
          <span class="man-name font-click left">{{item.name}}</span>
          <span class="sub-content-light left">{{item.position}}</span>
          <span class="origin-deep right" v-if="item.toco == ''">他的企业>></span>
          <span class="origin-deep right" v-else>他有{{item.toco}}家企业>></span>
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
import LastName from "@/components/LastName";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: {
    SubTitle,
    BlockTitle,
    LastName,
    ToDepthSearch,
    DepthSearch,
    Share
  },
  data() {
    return {
      title: "基本信息",
      subTitle: "主要人员",
      total: "",
      bt: "证书类型",
      imgUrl: config.imgUrl,
      data: [],
      companyId: "",
      companyName: "",
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
        .get("app/buss/companyInfo/comBasic", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "mainPerson"
        })
        .then(res => {
          console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.mainPerson.map(item => {
              item.lastname = item.name.substr(0, 1);
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
    // 跳转到人物详情页
    goManInfo(name) {
      wx.navigateTo({
        url:
          "/pages/manInfo/main?humanName=" +
          name +
          "&companyName=" +
          this.companyName
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
    this.companyId = this.$root.$mp.query.companyId;
    this.companyName = this.$root.$mp.query.companyName;
    this.total = this.$root.$mp.query.total;
    this.init(true);
  },
  onShareAppMessage: function(res) {
    return {
      title: this.$store.state.companyName
    };
  }
};
</script>
<style lang="scss" scoped>
.man-name {
  display: inline-block;
  width: 120rpx;
  margin: 0 50rpx 0 20rpx;
}
.bgcolor0 {
  color: #c69684;
}
</style>

