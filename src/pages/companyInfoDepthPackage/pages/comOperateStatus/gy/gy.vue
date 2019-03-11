<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div
      class="block-shadow-content"
      :key="index"
      v-for="(item,index) in developmentGoodsSupply"
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
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      title: "经营状况",
      subTitle: "供应",
      total: "",
      bt: "产品名称"
    };
  },
  methods: {
    developmentGoodsSupplyDetail(item) {
      store.commit("setDevelopmentGoodsSupplyDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comOperateStatus/gyDetail/main"
      });
    }
  },
  computed: {
    developmentGoodsSupply() {
      return store.state.companyDetailsData.development.goodsSupply;
    }
  },
  mounted() {
    this.total = this.developmentGoodsSupply.length;
  }
};
</script>
<style lang="scss" scoped>
</style>

