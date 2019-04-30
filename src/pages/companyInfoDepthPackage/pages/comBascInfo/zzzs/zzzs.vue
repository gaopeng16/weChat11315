<template>
  <div class="default-bg">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data" @click="zzzsDetails(item)">
        <BlockTitle :bt="bt" :title="item.certificateName" :hasBt="true"></BlockTitle>
        <div class="lh50">
          证书编号：
          <span>{{item.certNo}}</span>
        </div>
        <div class="lh50">
          发证日期：
          <span>{{item.startDate}}</span>
        </div>
        <div class="lh50">
          截止日期：
          <span>{{item.endDate}}</span>
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
import { mapState } from "vuex";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "基本信息",
      subTitle: "资质证书",
      total: "",
      bt: "证书类型",
      data: [],
      noData: false,
      page: 1,
      more: true
    };
  },
  computed: {
    ...mapState(["companyName"])
  },
  methods: {
    zzzsDetails(item) {
      store.commit("setZzzsDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoDepthPackage/pages/comBascInfo/zzzsDetail/main"
      });
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.certificateDe + this.companyName,
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
    this.init(true);
  }
};
</script>
<style lang="scss" scoped>
</style>

