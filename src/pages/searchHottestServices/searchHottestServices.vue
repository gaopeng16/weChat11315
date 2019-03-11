<template>
  <div>
    <div v-if="!isHyzs">
      <BriefCard
        :key="item.id"
        v-for="item in searchList"
        :newsImg="imgFile+item.imgUrl"
        :newsTitle="item.title"
        :newsTime="item.publishTime"
        :source="item.source"
        :newsId="item.id"
      ></BriefCard>
    </div>
    <web-view v-if="isHyzs && passOnOff" :src="hyzsLink"></web-view>
    <!-- 搜索的状态 -->
    <i-load-more i-class="footer-ts" v-if="!more" tip="暂无数据" :loading="false"/>
    <i-load-more i-class="footer-ts" v-if="more"/>
  </div>
</template>
<script>
import config from "@/config";
import store from "@/store";
import BriefCard from "@/components/BriefCard";
import { clearTimeout } from "timers";
export default {
  components: { BriefCard },
  data() {
    return {
      imgFile: config.imgFile,
      navigationBarTitle: "",
      url: "",
      page: 1,
      searchList: [],
      more: true,
      isHyzs: false, //是否是行业展示
      hyzsLink: ""
    };
  },
  methods: {
    init() {
      this.page = 1;
      this.searchList = [];
      this.more = true;
      this.footerTs = true;
      this.hyzsLink = "";
    },
    getSearchList(init) {
      if (this.url == "") {
        return;
      }
      this.$http.get(this.url, { pageIndex: this.page }).then(res => {
        if (res.data.code == 0) {
          const searchList = res.data.data.records;
          if (searchList.length < 10 && this.page > 1) {
            //如果最后一页不够10条，证明没有数据可加载了
            this.more = false;
            this.footerTs = true;
          }
          if (init) {
            this.searchList = searchList;
          } else {
            this.searchList = this.searchList.concat(searchList);
          }
        } else {
          this.searchList = [];
          this.more = false;
        }
      });
    },
    setUrlByParm() {
      switch (this.$root.$mp.query.hotTitle) {
        case "征信新闻":
          this.url = config.creditNewsListUrl;
          this.isHyzs = false;
          break;
        case "政策法规":
          this.url = config.acfgSearch;
          this.isHyzs = false;
          break;
        case "行业展示":
          this.hyzsLink = config.hyzsSearch;
          this.url = "";
          this.isHyzs = true;
          break;
        case "媒体热评":
          this.url = config.mtrpSearch;
          this.isHyzs = false;
          break;
      }
    }
  },
  computed: {
    passOnOff() {
      return store.state.passOnOff;
    }
  },
  onReachBottom() {
    if (!this.isHyzs) {
      if (!this.more) {
        return false;
      }
      this.page++;
      this.getSearchList();
    }
  },
  mounted() {
    this.init();
    this.setUrlByParm();
    this.getSearchList(true);
    wx.setNavigationBarTitle({
      title: this.$root.$mp.query.hotTitle
    });
  }
};
</script>
<style lang="scss">
</style>
