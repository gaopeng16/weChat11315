<template>
  <div>
    <web-view :src="url"></web-view>
  </div>
</template>
<script>
import config from "@/config.js";
import { _get } from "@/utils";
export default {
  data() {
    return {
      url: ""
    };
  },
  mounted() {
    this.url = config.host + config.newsUrl + this.$root.$mp.query.newsId;
  }
};
</script>
