<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :bt="bt" :title="item.regNumber" :hasBt="true"></BlockTitle>
        <div class="lh50">
          质权人：
          <span class="font-click">{{item.pledgee}}</span>
        </div>
        <div class="lh50">
          公示日期：
          <span class="font-click">{{item.putDate}}</span>
        </div>
        <div class="lh50">
          登记日期：
          <span class="font-click">{{item.regDate}}</span>
        </div>
        <div class="lh50">
          出质人：
          <span class="font-click">{{item.pledgor}}</span>
        </div>
        <div class="lh50">
          出质人证件号码：
          <span class="font-click">{{item.certifNumber}}</span>
        </div>
        <div class="lh50">
          质权人证件号码：
          <span class="font-click">{{item.certifNumberR}}</span>
        </div>
        <div class="lh50">
          出质股权数额：
          <span class="font-click">{{item.equityAmount}}万股</span>
        </div>
        <div class="lh50">
          赎回原因：
          <span class="font-click">暂无</span>
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
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "经营风险",
      subTitle: "股权出质",
      total: "",
      bt: "登记编号",
      data: [],
      companyName: "",
      noData: false,
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
        .get(config.companyName, {
          uri: config.equityInfoDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.putDate = item.putDate
                  ? formatTime(new Date(item.putDate))
                  : "--";
                item.regDate = item.regDate
                  ? formatTime(new Date(item.regDate))
                  : "--";
                return item;
              });
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
                console.log("-->", this.data);
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
    this.companyName = this.$root.$mp.query.companyName;
    this.init(true);
  }
};
</script>
<style lang="scss" scoped>
</style>

