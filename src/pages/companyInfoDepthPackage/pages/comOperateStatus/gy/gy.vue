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
        @click="developmentGoodsSupplyDetail(item)"
      >
        <BlockTitle :bt="bt" :title="item.name" :hasBt="true"></BlockTitle>
        <div class="lh50">
          品牌：
          <span class="font-click">{{item.brand?item.brand:"--"}}</span>
        </div>
        <div class="lh50">
          供货总量：
          <span class="font-click">{{item.supply_nums?item.supply_nums:"--"}}</span>
        </div>
        <div class="lh50">
          单位：
          <span class="font-click">{{item.unit?item.unit:"--"}}</span>
        </div>
        <div class="lh50">
          有效期：
          <span class="font-click">{{item.expiry_date?item.expiry_date:"--"}}</span>
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
      title: "经营状况",
      subTitle: "供应",
      total: "",
      bt: "产品名称",
      data: [],
      companyId: "",
      page: 1,
      more: true,
      noData: false
    };
  },
  computed: {
    ...mapState(["companyId"])
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
          type: "supply"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.supply;
            this.total = result.length;
            if (result.length > 0) {
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
              this.noData = false;
            } else {
              this.noData = true;
            }
          } else {
            this.noData = true;
          }
        });
    },
    developmentGoodsSupplyDetail(item) {
      store.commit("setDevelopmentGoodsSupplyDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comOperateStatus/gyDetail/main"
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

