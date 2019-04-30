<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total1+total2"></SubTitle>
    <!--  -->
    <i-tabs i-class="mt20" :current="current" @change="handleChange">
      <i-tab key="tab1" title="周边风险"></i-tab>
      <i-tab key="tab2" title="预警提示"></i-tab>
    </i-tabs>
    <!--  -->
    <div v-if="current == 'tab1'" class="tab-content mt10">
      <div class="risk-box" :key="k" v-for="(v,k) in aroundRiskList">
        <div class="risk-box-title">{{v.title}}(共{{v.total}}条)</div>
        <div
          class="list-item"
          :key="key"
          v-for="(val,key) in v.list"
          @click="qxfxDetail(val.id,val.type,v.title)"
        >
          <rich-text :nodes="val.title+' ('+val.riskCount+')'"></rich-text>
        </div>
      </div>
    </div>
    <div v-if="current == 'tab2'" class="tab-content mt10">
      <div class="risk-box" :key="k" v-for="(v,k) in penaltyRiskList">
        <div class="risk-box-title">{{v.title}}(共{{v.total}}条)</div>
        <div
          class="list-item"
          :key="key"
          v-for="(val,key) in v.list"
          @click="qxfxDetail(val.id,val.type,v.title)"
        >
          <rich-text :nodes="val.title+' ('+val.riskCount+')'"></rich-text>
        </div>
      </div>
    </div>
    <div class="bottom90"></div>
    <Share></Share>
  </div>
</template>
<script>
import store from "@/store";
import { mapState } from "vuex";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, DepthSearch, Share },
  data() {
    return {
      title: "基本信息",
      subTitle: "企信风险",
      isSvip: true,
      total: "",
      current: "tab1",
      companyId: "",
      humanName: "",
      companyName: "",
      total1: 0,
      total2: 0,
      aroundRiskList: [],
      penaltyRiskList: []
    };
  },
  computed: {
    ...mapState(["companyName", "vipLevel"])
  },
  methods: {
    init() {
      this.$http
        .get(config.human, {
          uri:
            "https://open.api.tianyancha.com/services/v3/newopen/description.json?humanName=" +
            this.humanName +
            "&name=" +
            this.companyName,
          companyName: this.companyName,
          human: this.humanName,
          urlType: "humanRiskInfo"
        })
        .then(res => {
          console.log("人-->", res);
          if (res.data.reason == "ok") {
            let data = res.data.result;
            this.total1 = data[0].count;
            this.total2 = data[1].count;
            this.aroundRiskList = data[0].list;
            this.penaltyRiskList = data[1].list;
          }
        });
    },
    qxfxDetail(id, type, title) {
      if (this.vipLevel == 5 || this.vipLevel == 4) {
        this.isSvip = true;
        wx.navigateTo({
          url:
            "/pages/manRiskDetail/main?type=" +
            type +
            "&id=" +
            id +
            "&title=" +
            title
        });
      } else {
        this.isSvip = false;
      }
    },
    handleChange(detail) {
      this.current = detail.target.key;
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.humanName = this.$root.$mp.query.humanName;
    this.companyName = this.$root.$mp.query.name;
    this.init();
    this.isSvip = true;
  }
};
</script>
<style lang="scss" scoped>
.tab-content {
  .risk-box {
    width: 98%;
    margin-left: 1%;
    background: #ffffff;
    border-radius: 10rpx;
    box-shadow: 0 10rpx 0 10 #000;
    .risk-box-title {
      font-size: 30rpx;
      line-height: 80rpx;
      width: 96%;
      margin-left: 2%;
      border-bottom: solid 2px #dddee1;
      font-weight: bold;
    }
    .list-item {
      width: 92%;
      margin: 10rpx 0 10rpx 4%;
      border-bottom: solid 1px #f0f0f0;
      padding: 10rpx 0;
    }
  }
}
</style>

