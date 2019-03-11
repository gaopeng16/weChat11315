<template>
  <div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24" :key="k" v-for="(v,k) in zzzsDetailData.detail">
          <div class="sub-content-light lh60">{{v.title}}</div>
          <div class="title">{{v.content?v.content:'企业选择不公开'}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
  </div>
</template>
<script>
import store from "@/store";
export default {
  computed: {
    zzzsDetailData() {
      return store.state.zzzsDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
