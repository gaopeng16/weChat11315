<template>
  <div>
    <!-- <NavigateBar :title="navTitle"></NavigateBar>
    <div :style="{height:navH +'px'}"></div> -->
    <BriefCard
      :key="item.id"
      v-for="item in hotList"
      :newsImg="imgFile+item.imgUrl"
      :newsTitle="item.title"
      :newsTime="item.publishTime"
      :source="item.source"
      :newsId="item.id"
    ></BriefCard>
    <i-load-more v-if="more"/>
    <i-load-more v-if="!more" tip="暂无数据" />
  </div>
</template>
<script>
import config from "@/config.js";
import store from "@/store";
import { get } from "@/utils";
import BriefCard from "@/components/BriefCard";
import NavigateBar from "@/components/NavigateBar";
export default {
  components: { BriefCard, NavigateBar },
  data() {
    return {
      navTitle: "热门头条",
      imgFile: config.imgFile,
      hotList: [],
      page: 1,
      more: true
    };
  },
  computed: {
    navH() {
      return store.state.navHeight;
    }
  },
  methods: {
    async getHotList(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      const hotList = await get(config.hotListUrl, {
        pageIndex: this.page
      });
      if (hotList.records.length < 10 && this.page > 1) {
        this.more = false;
      }
      if (init) {
        this.hotList = hotList.records;
        wx.stopPullDownRefresh();
      } else {
        this.hotList = this.hotList.concat(hotList.records);
      }
    }
  },
  onPullDownRefresh() {
    this.getHotList(true);
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page++;
    this.getHotList();
  },
  mounted() {
    this.getHotList(true);
  }
};
</script>
<style lang="scss">
</style>
