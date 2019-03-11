<template>
  <div>
    <div class="jc-content">
      <web-view v-if="isLink" :src="judgmentContent"></web-view>
      <rich-text v-else type="text" :nodes="judgmentContent"></rich-text>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      judgmentContent: "",
      isLink: false
    };
  },
  methods: {
    setJudgmentContent() {
      const jc = store.state.judgmentContent;
      if (jc.startsWith("http")) {
        this.isLink = true;
      } else {
        this.isLink = false;
      }
      this.judgmentContent = jc;
    }
  },
  mounted() {
    this.setJudgmentContent();
  }
};
</script>
<style lang="scss">
.jc-content {
  padding: 20rpx;
}
</style>
