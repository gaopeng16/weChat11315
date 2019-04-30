<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <i-tabs i-class="mt20" :current="current" @change="handleChange">
        <i-tab key="tab1" title="软件著作权"></i-tab>
        <i-tab key="tab2" title="作品著作权"></i-tab>
      </i-tabs>
      <div v-if="current == 'tab1'">
        <div class="block-shadow-content" :key="index" v-for="(item,index) in data1">
          <BlockTitle :bt="bt1" :title="item.regtime" :hasBt="true"></BlockTitle>
          <div class="lh50">
            软件全称：
            <span class="font-click">{{item.fullname}}</span>
          </div>
          <div class="lh50">
            登记号：
            <span class="font-click">{{item.regnum}}</span>
          </div>
          <div class="lh50">
            分类号：
            <span class="font-click">{{item.catnum}}</span>
          </div>
          <div class="lh50">
            版本号：
            <span class="font-click">{{item.version}}</span>
          </div>
          <div class="lh50">
            著作权人：
            <span class="font-click">{{item.authorNationality}}</span>
          </div>
          <div class="lh50">
            著作权人国籍：
            <span class="font-click">--</span>
          </div>
          <div class="lh50">
            首次发表日期
            <span class="font-click">{{item.publishtime?item.publishtime:"企业选择不公开"}}</span>
          </div>
        </div>
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
            <span class="font-click">{{item.finishTime}}</span>
          </div>
          <div class="lh50">
            首次发表日期：
            <span class="font-click">{{item.publishtime}}</span>
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
      </div>
      <!--  -->
      <i-load-more v-if="more"/>
      <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "知识产权",
      subTitle: "著作权",
      total: "",
      bt1: "登记日期",
      current: "tab1",
      data1: [], //著作权
      data2: [], //作品著作权
      companyName: "",
      noData1: false,
      noData2: false,
      page1: 1,
      page2: 1,
      more1: true,
      more2: true
    };
  },
  methods: {
    handleChange(detail) {
      this.current = detail.target.key;
    },
    //著作权
    init1(init) {
      if (init) {
        this.page1 = 1;
        this.more1 = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.copyRegDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page1
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.regtime = item.regtime
                  ? formatTime(new Date(Number(item.regtime)), 0)
                  : "--";
                item.publishtime = item.publishtime
                  ? formatTime(new Date(Number(item.publishtime)), 0)
                  : "--";
                item.eventTime = item.eventTime
                  ? formatTime(new Date(Number(item.eventTime)), 0)
                  : "--";
                return item;
              });
              if (
                (init && result.length < config.pageSize) ||
                (result.length < config.pageSize && this.page1 > 1)
              ) {
                this.more1 = false;
              }
              if (init) {
                this.data1 = result;
                wx.stopPullDownRefresh();
              } else {
                this.data1 = this.data.concat(result);
              }
              this.noData1 = false;
            } else {
              this.noData1 = true;
            }
          } else {
            this.noData1 = true;
          }
        });
    },
    //作品著作权
    init2(init) {
      if (init) {
        this.page2 = 1;
        this.more2 = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.copyRegWorksDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page2
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.createTime = item.createTime
                  ? formatTime(new Date(item.createTime), 0)
                  : "--";
                item.regtime = item.regtime
                  ? formatTime(new Date(Number(item.regtime)), 0)
                  : "--";
                item.publishtime = item.publishtime
                  ? formatTime(new Date(Number(item.publishtime)), 0)
                  : "--";
                item.finishTime = item.finishTime
                  ? formatTime(new Date(Number(item.finishTime)), 0)
                  : "--";
                return item;
              });
              if (
                (init && result.length < config.pageSize) ||
                (result.length < config.pageSize && this.page2 > 1)
              ) {
                this.more = false;
              }
              if (init) {
                this.data2 = result;
                wx.stopPullDownRefresh();
              } else {
                this.data2 = this.data.concat(result);
              }
              this.noData2 = false;
            } else {
              this.noData2 = true;
            }
          } else {
            this.noData2 = true;
          }
        });
    }
  },
  onPullDownRefresh() {
    if (this.current == "tab1") {
      this.init1(true);
    } else if (this.current == "tab2") {
      this.init2(true);
    }
  },
  onReachBottom() {
    if (this.current == "tab1") {
      if (!this.more1) {
        return false;
      }
      this.page1++;
      this.init1();
    } else if (this.current == "tab2") {
      if (!this.more2) {
        return false;
      }
      this.page2++;
      this.init2();
    }
  },
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
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

