<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/zzq/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/zzq/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <i-tabs i-class="mt20" :current="current" @change="handleChange">
        <i-tab key="tab1" title="软件著作权"></i-tab>
        <i-tab key="tab2" title="作品著作权"></i-tab>
      </i-tabs>
      <div v-if="current == 'tab1'">
        <div class="block-shadow-content" :key="index" v-for="(item,index) in data1">
          <BlockTitle :bt="bt1" :title="item.registrationDate" :hasBt="true"></BlockTitle>
          <div class="lh50">
            软件全程：
            <span class="font-click">{{item.softwareAbbreviation}}</span>
          </div>
          <div class="lh50">
            登记号：
            <span class="font-click">{{item.registrationCode}}</span>
          </div>
          <div class="lh50">
            分类号：
            <span class="font-click">{{item.classificationCode}}</span>
          </div>
          <div class="lh50">
            版本号：
            <span class="font-click">{{item.version}}</span>
          </div>
          <div class="lh50">
            著作权人：
            <span class="font-click">{{item.copyrightOwner}}</span>
          </div>
          <div class="lh50">
            著作权人国籍：
            <span class="font-click">{{item.copyrightOwnerNationality}}</span>
          </div>
          <div class="lh50">
            首次发表日期
            <span
              class="font-click"
            >{{item.firstPublicationDate?item.firstPublicationDate:"企业选择不公开"}}</span>
          </div>
        </div>
        <i-load-more v-if="more1"/>
        <i-load-more v-if="!more1 && page1>1" :loading="more1" tip="暂无数据"/>
      </div>
      <div v-if="current == 'tab2'">
        <div class="block-shadow-content" :key="index" v-for="(item,index) in data2">
          <div class="lh50">
            <span class="font-click">{{item.fullname}}</span>
          </div>
          <div class="lh50">
            登记号：
            <span class="font-click">{{item.regnum}}</span>
          </div>
          <div class="lh50">
            作品类别：
            <span class="font-click">{{item.type}}</span>
          </div>
          <div class="lh50">
            创作完成日期：
            <span class="font-click">{{item.publishtime}}</span>
          </div>
          <div class="lh50">
            首次发表日期：
            <span class="font-click">{{item.finishTime}}</span>
          </div>
          <div class="lh50">
            登记日期：
            <span class="font-click">{{item.regtime}}</span>
          </div>
          <div class="lh50">
            著作权人：
            <span class="font-click">--</span>
          </div>
        </div>
        <i-load-more v-if="more2"/>
        <i-load-more v-if="!more2 && page2>1" :loading="more2" tip="暂无数据"/>
      </div>
      <!--  -->
      <div class="bottom90"></div>
      <Share></Share>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      title: "知识产权",
      subTitle: "专利",
      total: "",
      bt1: "登记日期",
      current: "tab1",
      data1: [],
      data2: [],
      companyId: "",
      page1: 1,
      page2: 1,
      more1: true,
      more2: true
    };
  },
  methods: {
    init1(init) {
      if (init) {
        this.page1 = 1;
        this.more1 = true;
      }
      this.$http
        .get("app/buss/companyInfo/comLedgeProperty", {
          companyId: this.companyId,
          pageNum: this.page1,
          pageSize: config.pageSize,
          type: "copyReg"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.copyReg.map(item => {
              item.registrationDate = item.registrationDate
                ? item.registrationDate.substr(0, 10)
                : "--";
              return item;
            });
            if (
              (init && this.total <= config.pageSize) ||
              (result.length < config.pageSize && this.page1 > 1)
            ) {
              this.more1 = false;
            }
            if (init) {
              this.data1 = result;
              wx.stopPullDownRefresh();
            } else {
              this.data1 = this.data1.concat(result);
            }
          }
        });
    },
    init2(init) {
      if (init) {
        this.page2 = 1;
        this.more2 = true;
      }
      this.$http
        .get("app/buss/companyInfo/comLedgeProperty", {
          companyId: this.companyId,
          pageNum: this.page2,
          pageSize: config.pageSize,
          type: "copyRegWorks"
        })
        .then(res => {
          // console.log("res-->", res);
          if (res.data.code == 0) {
            const result = res.data.data.copyRegWorks;
            if (
              (init && this.total <= config.pageSize) ||
              (result.length < config.pageSize && this.page2 > 1)
            ) {
              this.more2 = false;
            }
            if (init) {
              this.data2 = result;
              wx.stopPullDownRefresh();
            } else {
              this.data2 = this.data2.concat(result);
            }
          }
        });
    },
    handleChange(detail) {
      this.current = detail.target.key;
    }
  },
  onPullDownRefresh() {
    this.init1(true);
    this.init2(true);
  },
  onReachBottom() {
    if (this.current == "tab1") {
      if (!this.more1) {
        return false;
      }
      this.page1++;
      this.init1();
    } else {
      if (!this.more2) {
        return false;
      }
      this.page2++;
      this.init2();
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.total = this.$root.$mp.query.total;
    this.init1(true);
    this.init2(true);
  }
};
</script>
<style lang="scss" scoped>
.trademarkImageUrl {
  width: 300rpx;
  height: 200rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

