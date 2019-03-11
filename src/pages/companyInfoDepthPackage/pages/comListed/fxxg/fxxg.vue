<template>
  <div class="default-bg">
    <NoData v-if="noData"></NoData>
    <div v-else>
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
            <div class="title">{{data.actualRaised}}</div>
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
            <div class="title">{{data.issuePrice}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="11">
            <div class="sub-content-light lh60">发行市盈率</div>
            <div class="title">{{data.ipoRatio}}</div>
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
            <div class="title font-click">{{data.mainUnderwriterName}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">上市保荐人</div>
            <div class="title font-click">{{data.listingSponsorName}}</div>
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
    </div>
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
      title: "上市信息",
      subTitle: "发行相关",
      total: "",
      data: [],
      companyName: "",
      noData: false
    };
  },
  methods: {
    init() {
      this.$http
        .get(config.companyName, {
          uri: config.issueRelatedDe + this.companyName,
          pageSize: 0,
          pageNum: 1
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (Object.keys(res.data.result).length > 0) {
              this.data = res.data.result;
              this.data.mainUnderwriterName =
                res.data.result.mainUnderwriter.name;
              this.data.listingSponsorName =
                res.data.result.listingSponsor.name;
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
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
    this.init();
  }
};
</script>

<style lang="scss" scoped>
</style>
