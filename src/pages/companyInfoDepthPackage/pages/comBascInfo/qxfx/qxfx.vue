<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/qxfx/main'"
      v-if="total1+total2 <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comBascInfo/qxfx/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total1+total2+total3"></SubTitle>
      <!--  -->
      <i-tabs i-class="mt20" :current="current" @change="handleChange">
        <i-tab key="tab1" title="企信风险"></i-tab>
        <i-tab key="tab2" title="周边风险"></i-tab>
        <i-tab key="tab3" title="预警提醒"></i-tab>
      </i-tabs>
      <!--  -->
      <div v-if="current == 'tab1'" class="tab-content mt10">
        <div class="risk-box" :key="k" v-for="(v,k) in selfRiskList">
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
      <div v-if="current == 'tab3'" class="tab-content mt10">
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
      <i-modal title="提示" :visible="!isSvip" @ok="goBuySvip" @cancel="cancel">
        <div>SVIP专享，前去购买</div>
      </i-modal>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { mapState } from "vuex";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      title: "基本信息",
      subTitle: "企信风险",
      isSvip: true,
      total: "",
      current: "tab1",
      companyId: "",
      total1: 0,
      total2: 0,
      total3: 0,
      selfRiskList: [],
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
        .get(config.companyName, {
          uri: config.riskInfo + this.companyName,
          comName: this.companyName,
          urlType: "fx",
          pageSize: 0,
          pageNum: 1
        })
        .then(res => {
          console.log("qxfx-->", res);
          if (res.data.reason == "ok") {
            for (var i = 0; i < res.data.result.length; i++) {
              const data = res.data.result[i];
              if (data.name == "自身风险") {
                this.total1 = data.count;
                this.selfRiskList = data.list;
              } else if (data.name == "周边风险") {
                this.total2 = data.count;
                this.aroundRiskList = data.list;
              } else if (data.name == "预警提醒") {
                this.total3 = data.count;
                this.penaltyRiskList = data.list;
              }
            }
          }
        });
    },
    qxfxDetail(id, type, title) {
      if (this.vipLevel == 5 || this.vipLevel == 4) {
        this.isSvip = true;
        wx.navigateTo({
          url:
            "/pages/companyInfoDepthPackage/pages/comBascInfo/qxfxDetail/main?type=" +
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
    },
    // 去购买svip
    goBuySvip() {
      wx.navigateTo({
        url: "/pages/meOptions/vipPrivilege/main"
      });
    },
    // 不去购买svip
    cancel() {
      this.isSvip = true;
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.init();
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

