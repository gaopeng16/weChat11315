<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-content">
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">清算组负责人</div>
            <div class="font-click">{{data.manager}}</div>
          </i-col>
        </i-row>
        <div class="line"></div>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">清算组成员</div>
            <div class="font-click">{{data.member}}</div>
          </i-col>
        </i-row>
      </div>
      <!--  -->
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
  components: { SubTitle, BlockTitle,NoData },
  data() {
    return {
      title: "经营风险",
      subTitle: "清算信息",
      total: "",
      noData: true,
      data: {}
    };
  },
  methods: {
    init() {
      this.$http
        .get(config.companyName, {
          uri: config.liquidatingDe + this.companyName,
          pageSize: 0,
          pageNum: 1
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (Object.keys(res.data.result).length > 0) {
              this.data = res.data.result;
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

