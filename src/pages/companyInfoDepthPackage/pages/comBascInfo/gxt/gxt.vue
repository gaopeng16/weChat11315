<template>
  <div class="default-bg">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <web-view :src="src"></web-view>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import { clearTimeout } from "timers";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      host: config.host,
      title: "基本信息",
      subTitle: "关系图",
      total: "",
      src: ""
    };
  },
  methods: {
    _isHaveRelationshipTycData() {
      this.$http
        .post(config.isHaveRelationshipTycDataJSON, {
          companyId: this.companyId
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this.src =
                this.host + "/test.html#/show?ids=" + this.companyId + "&app=app";
            } else {
              this.src =
                this.host + "/company/diagram_iframe.html?id=" + this.companyId;
            }
          }
        });
    }
  },
  computed: {
    companyId() {
      return store.state.companyDetailsData.basicInfo.basic.id;
    }
  },
  mounted() {
    this._isHaveRelationshipTycData();
  }
};
</script>
<style lang="scss" scoped>
</style>

