<template>
  <div class="default-bg">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comListed/fxxg/main'"
      v-if="Object.keys(data).length <=0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comListed/fxxg/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <div class="block-content">
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">成立日期</div>
            <div class="title">{{data.issueDate}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">上市日期</div>
            <div class="title">{{data.listingDate}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">预计募资</div>
            <div class="title">{{data.expectedToRaise}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">实际募资</div>
            <div class="title">{{data.raisedFunds}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">发行数量</div>
            <div class="title">{{data.issueNumber}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">发行价格</div>
            <div class="title">{{data.rmBPrice}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">发行市盈率</div>
            <div class="title">{{data.ratio}}</div>
          </i-col>
          <i-col span="11" offset="1">
            <div class="sub-content-light lh60">发行中签率</div>
            <div class="title">{{data.rate}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">首日开盘价</div>
            <div class="title">{{data.openingPrice}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">主承销商</div>
            <div class="title font-click">{{data.mainUnderwriter}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">上市保荐人</div>
            <div class="title font-click">{{data.listingSponsor}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">历史沿革</div>
            <div class="title">{{data.history}}</div>
          </i-col>
        </i-row>
      </div>
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
      title: "上市信息",
      subTitle: "发行相关",
      total: "",
      data: [],
      companyId: "",
      noData: false,
      page: 1
    };
  },
  methods: {
    init(init) {
      this.$http
        .get("app/buss/companyInfo/comStock", {
          companyId: this.companyId,
          type: "issueRelated"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.issueRelated;
            if (Object.keys(result).length > 0) {
              result.issueDate = result.issueDate.substr(0, 10);
              result.listingDate = result.listingDate.substr(0, 10);
              this.data = result;
              this.noData = false;
            } else {
              this.noData = true;
            }
          }
        });
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.init();
  }
};
</script>

<style lang="scss" scoped>
</style>
