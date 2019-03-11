<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :bt="bt" :title="item.punishNumber" :hasBt="true"></BlockTitle>
        <div class="lh50">
          处罚机关：
          <span class="font-click">{{item.departmentName}}</span>
        </div>
        <div class="lh50">
          处罚决定日期：
          <span class="font-click">{{item.decisionDate}}</span>
        </div>
        <div class="lh50">
          发布日期：
          <span class="font-click">{{item.publishDate}}</span>
        </div>
        <div class="lh50">
          违法行为类型：
          <span class="font-click">{{item.type}}</span>
        </div>
        <div class="lh50">
          处罚内容：
          <span class="font-click">{{item.content}}</span>
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
      subTitle: "经营异常",
      total: "",
      bt: "处罚文书号",
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
          uri: config.punishmentInfoDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.decisionDate = item.decisionDate
                  ? formatTime(new Date(Number(item.decisionDate)))
                  : "--";
                item.publishDate = item.publishDate
                  ? formatTime(new Date(Number(item.publishDate)))
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

