<template>
  <div class="default-bg min-height100">
    <NoData v-if="total1+total2<=0"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total1+total2"></SubTitle>
      <!--  -->
      <i-tabs i-class="mt20" :current="current" @change="handleChange">
        <i-tab key="tab1" title="企信风险"></i-tab>
        <i-tab key="tab2" title="周边风险"></i-tab>
      </i-tabs>
      <!--  -->
      <div v-if="current == 'tab1'" class="tab-content mt10">
        <div class="risk-box">
          <div class="risk-box-title">司法风险(共{{law1}}条)</div>
          <div :key="k" v-for="(v,k) in law_list1">
            <div class="title">
              <div class="left shu"></div>
              <div class="tit-text left">
                <rich-text :nodes="v.decisionTitle"></rich-text>
              </div>
            </div>
            <div class="other-text lh50">
              案件类型：
              <span class="font-click">{{v.caseType}}</span>
            </div>
            <div class="other-text lh50">
              案件号：
              <span class="font-click">{{v.caseCode}}</span>
            </div>
            <div class="other-text lh50">
              日期：
              <span class="font-click">{{v.pubDate}}</span>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="risk-box">
          <div class="risk-box-title">司法风险(共{{notice1}}条)</div>
          <div :key="k" v-for="(v,k) in notice_list1">
            <div class="title">
              <div class="left shu"></div>
              <div class="tit-text left font-click">{{v.noticeType}}</div>
            </div>
            <div class="other-text lh50">
              法院：
              <span class="font-click">{{v.courtName}}</span>
            </div>
            <div class="other-text lh50">
              日期：
              <span class="font-click">{{v.noticeDate}}</span>
            </div>
            <div class="other-text lh50 overflow-hidden">
              <div class="left">内容：</div>
              <div class="nr left font-click">
                <rich-text :nodes="v.noticeContent"></rich-text>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <i-load-more v-if="more1"/>
        <i-load-more v-if="!more1" :loading="more1" tip="暂无数据"/>
      </div>
      <div v-if="current == 'tab2'" class="tab-content mt10">
        <div class="risk-box">
          <div class="risk-box-title">司法风险(共{{law2}}条)</div>
          <div :key="k" v-for="(v,k) in law_list2">
            <div class="title">
              <div class="left shu"></div>
              <div class="tit-text left">
                <rich-text :nodes="v.decisionTitle"></rich-text>
              </div>
            </div>
            <div class="other-text lh50">
              案件类型：
              <span class="font-click">{{v.caseType}}</span>
            </div>
            <div class="other-text lh50">
              案件号：
              <span class="font-click">{{v.caseCode}}</span>
            </div>
            <div class="other-text lh50">
              日期：
              <span class="font-click">{{v.pubDate}}</span>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="risk-box">
          <div class="risk-box-title">司法风险(共{{notice2}}条)</div>
          <div :key="k" v-for="(v,k) in notice_list2">
            <div class="title">
              <div class="left shu"></div>
              <div class="tit-text left font-click">{{v.noticeType}}</div>
            </div>
            <div class="other-text lh50">
              法院：
              <span class="font-click">{{v.courtName}}</span>
            </div>
            <div class="other-text lh50">
              日期：
              <span class="font-click">{{v.noticeDate}}</span>
            </div>
            <div class="other-text lh50 overflow-hidden">
              <div class="left">内容：</div>
              <div class="nr left font-click">
                <rich-text :nodes="v.noticeContent"></rich-text>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <i-load-more v-if="more2"/>
        <i-load-more v-if="!more2" :loading="more2" tip="暂无数据"/>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { mapState } from "vuex";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "基本信息",
      subTitle: "企信风险",
      total: "",
      current: "tab1",
      //noData: true, //没数据暂时为true,接接口后改为false

      total1: 0,
      law1: 0,
      notice1: 0,
      law_list1: [],
      notice_list1: [],
      page1: 1,
      more1: true,

      total2: 0,
      law2: 0,
      notice2: 0,
      law_list2: [],
      notice_list2: [],
      page2: 1,
      more2: true
    };
  },
  computed: {
    ...mapState(["companyId"])
  },
  methods: {
    init1(init) {
      if (init) {
        this.page1 = 1;
        this.more1 = true;
      }
      this.$http
        .get("app/search/otherRiskForApp", {
          termStr: this.companyId,
          page: this.page1,
          pageSize: config.pageSize,
          type: "me"
        })
        .then(res => {
          const result = res.data;
          result.law_list.map(item => {
            item.pubDate = item.pubDate
              ? formatTime(new Date(item.pubDate), 0)
              : "企业选择不公开";
            item.decisionTitle = item.decisionTitle
              .replace(
                /<font color='#FF0000'>/g,
                "<span style='color:#FF0000'>"
              )
              .replace(/<\/font>/g, "</span>");
            return item;
          });
          result.notice_list.map(item => {
            item.noticeDate = item.noticeDate
              ? formatTime(new Date(item.noticeDate), 0)
              : "企业选择不公开";
            item.noticeContent = item.noticeContent
              .replace(
                /<font color='#FF0000'>/g,
                "<span style='color:#FF0000'>"
              )
              .replace(/<\/font>/g, "</span>");
            return item;
          });
          if (
            (init && result.law + result.notice <= config.pageSize) ||
            (result.law_list.length + result.notice_list.length <
              config.pageSize &&
              this.page1 > 1)
          ) {
            this.more1 = false;
          }
          if (init) {
            this.law_list1 = result.law_list;
            this.notice_list1 = result.notice_list;
            wx.stopPullDownRefresh();
          } else {
            this.law_list1 = this.law_list1.concat(result.law_list);
            this.notice_list1 = this.notice_list1.concat(result.notice_list);
          }
          this.law1 = result.law;
          this.notice1 = result.notice;
          this.total1 = result.law + result.notice;
        });
    },
    init2(init) {
      if (init) {
        this.page2 = 1;
        this.more2 = true;
      }
      this.$http
        .get("app/search/otherRiskForApp", {
          termStr: this.companyId,
          page: this.page2,
          pageSize: config.pageSize,
          type: "other"
        })
        .then(res => {
          const result = res.data;
          result.law_list.map(item => {
            item.pubDate = item.pubDate
              ? formatTime(new Date(item.pubDate), 0)
              : "企业选择不公开";
            item.decisionTitle = item.decisionTitle
              .replace(
                /<font color='#FF0000'>/g,
                "<span style='color:#FF0000'>"
              )
              .replace(/<\/font>/g, "</span>");
            return item;
          });
          result.notice_list.map(item => {
            item.noticeDate = item.noticeDate
              ? formatTime(new Date(item.noticeDate), 0)
              : "企业选择不公开";
            item.noticeContent = item.noticeContent
              .replace(
                /<font color='#FF0000'>/g,
                "<span style='color:#FF0000'>"
              )
              .replace(/<\/font>/g, "</span>");
            return item;
          });
          if (
            (init && result.law + result.notice <= config.pageSize) ||
            (result.law_list.length + result.notice_list.length <
              config.pageSize &&
              this.page2 > 1)
          ) {
            this.more2 = false;
          }
          if (init) {
            this.law_list2 = result.law_list;
            this.notice_list2 = result.notice_list;
            wx.stopPullDownRefresh();
          } else {
            this.law_list2 = this.law_list2.concat(result.law_list);
            this.notice_list2 = this.notice_list2.concat(result.notice_list);
          }
          this.law2 = result.law;
          this.notice2 = result.notice;
          this.total2 = result.law + result.notice;
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
    } else if (this.current == "tab2") {
      if (!this.more2) {
        return false;
      }
      this.page2++;
      this.init2();
    }
  },
  mounted() {
    this.init1(true);
    this.init2(true);
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
      border-bottom: solid 1px #dddee1;
      font-weight: bold;
    }
    .title {
      line-height: 30rpx;
      overflow: hidden;
      margin: 20rpx 0 20rpx 20rpx;
      .shu {
        width: 2px;
        height: 30rpx;
        background: #209bf9;
        margin-right: 15rpx;
      }
      .tit-text {
        width: 670rpx;
      }
    }
    .other-text {
      margin-left: 37rpx;
      .nr {
        width: 600rpx;
      }
    }
  }
}
</style>

