<template>
  <div class="default-bg min-height100">
    <web-view :src="newsNewsDetailDataDetail.url"></web-view>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      title: "经营状况",
      subTitle: "购地信息详情",
      total: ""
    };
  },
  computed: {
    newsNewsDetailDataDetail() {
      return store.state.newsNewsDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

