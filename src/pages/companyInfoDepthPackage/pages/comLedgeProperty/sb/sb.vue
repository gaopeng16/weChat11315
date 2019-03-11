<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-shadow-content" :key="index" v-for="(item,index) in data">
        <BlockTitle :bt="bt" :title="item.appDate" :hasBt="true"></BlockTitle>
        <div class="lh50">
          商标名称：
          <span class="font-click">{{item.tmName}}</span>
        </div>
        <div class="lh50">
          注册号：
          <span class="font-click">{{item.regNo}}</span>
        </div>
        <div class="lh50">
          类别：
          <span class="font-click">{{item.intCls}}</span>
        </div>
        <div class="lh50">
          状态：
          <span class="font-click">{{item.category}}</span>
        </div>
        <div class="lh50">
          申请人：
          <span class="font-click">{{item.applicantCn?item.applicantCn:"企业选择不公开"}}</span>
        </div>
        <div class="lh50">商标图片</div>
        <div class="lh50 text-center">
          <div class="trademarkImageUrl">
            <img mode="aspectFit" :src="item.tmPic">
          </div>
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
      title: "知识产权",
      subTitle: "商标",
      total: "",
      bt: "申请日期",
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
          uri: config.tmDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.appDate = item.appDate
                  ? formatTime(new Date(Number(item.appDate)))
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
.trademarkImageUrl {
  width: 300rpx;
  height: 200rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

