<template>
  <div>
    <BriefCard
      :key="item.id"
      v-for="item in creditNewsList"
      :newsImg="imgFile+item.imgUrl"
      :newsTitle="item.title"
      :newsTime="item.publishTime"
      :source="item.source"
      :newsId="item.id"
    ></BriefCard>
    <i-load-more v-if="more"/>
    <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
  </div>
</template>
<script>
import { get } from "@/utils";
import store from "@/store";
import config from "@/config.js";
import BriefCard from "@/components/BriefCard";
import NavigateBar from "@/components/NavigateBar";

export default {
  components: { BriefCard, NavigateBar },
  data() {
    return {
      navTitle: "征信新闻",
      imgFile: config.imgFile,
      creditNewsList: [],
      page: 1,
      more: true
    };
  },
  methods: {
    async getCreditNewsList(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      const creditNewsList = await get(config.creditNewsListUrl, {
        pageIndex: this.page
      });
      if (creditNewsList.records < 10 && this.page > 1) {
        this.more = false;
      }
      if (init) {
        this.creditNewsList = creditNewsList.records;
        wx.stopPullDownRefresh();
      } else {
        this.creditNewsList = this.creditNewsList.concat(
          creditNewsList.records
        );
      }
    }
  },
  onPullDownRefresh() {
    this.getCreditNewsList(true);
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page++;
    this.getCreditNewsList();
  },
  mounted() {
    this.getCreditNewsList(true);
  }
};
</script>
<style lang="scss">
</style>
