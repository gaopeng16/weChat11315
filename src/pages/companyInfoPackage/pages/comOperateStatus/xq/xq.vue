<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div
      class="block-shadow-content"
      :key="index"
      v-for="(item,index) in data"
      @click="developmentGoodsDemandDetail(item)"
    >
      <BlockTitle :bt="bt" :title="item.name" :hasBt="true"></BlockTitle>
      <div class="lh50 red">
        采购类型：
        <span class="red">{{item.type}}</span>
      </div>
      <div class="lh50">
        询价日期：
        <span class="font-click">{{item.start_time}}</span>
      </div>
      <div class="lh50">
        报价截止日期：
        <span class="font-click">{{item.end_time}}</span>
      </div>
      <div class="lh50">
        期望日期：
        <span class="font-click">{{item.expect_time}}</span>
      </div>
    </div>
    <!--  -->
    <i-load-more v-if="more"/>
    <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
    <div class="bottom90"></div>
    <Share></Share>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, Share },
  data() {
    return {
      title: "经营状况",
      subTitle: "需求",
      total: "",
      bt: "需求名称",
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
          type: "demand"
        })
        .then(res => {
          // console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.demand;
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
    developmentGoodsDemandDetail(item) {
      store.commit("setDevelopmentGoodsDemandDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comOperateStatus/xqDetail/main"
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

