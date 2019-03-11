<template>
  <div class="search-body">
    <!-- <NavigateBar :title="navTitle" :isTabBar="true"></NavigateBar>
    <div :style="{height:navH +'px'}"></div>-->
    <div class="search-group">
      <i-row>
        <i-col span="19">
          <input v-model="keyWord" class="search-input" type="text" :placeholder="placeholder">
        </i-col>
        <i-col span="5">
          <i-button i-class="my-search-btn" type="warning" @click="goSearch(true)">搜索</i-button>
        </i-col>
      </i-row>
    </div>
    <!-- 联想搜索 -->
    <div v-if="!isGoSearch && keyWord" class="preview">
      <a
        @click="fastSearch(item.companyName)"
        :key="index"
        v-for="(item,index) in relatedSearchArr"
      >{{item.companyName}}</a>
    </div>
    <!-- 热门搜索&最近搜索 -->
    <div v-if="!keyWord" class="emptyKeyword hot-recent">
      <div class="hot-bot">
        <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'search_r.png'">
        <span>热门搜索</span>
      </div>
      <div class="hot-bot-list">
        <span :key="index" v-for="(item,index) in hotBotArr" @click="fastSearch(item)">{{item}}</span>
      </div>
      <div v-if="recentSearch.length">
        <div class="hot-bot">
          <img v-if="imgUrl" :src="imgUrl+'search_z.png'">
          <span>最近搜索</span>
        </div>
        <div class="recent-search-list">
          <div :key="index" v-for="(item,index) in recentSearch" @click="fastSearch(item)">{{item}}</div>
        </div>
        <div class="clear-recent-search" @click="clearRecentSearch">
          <img v-if="imgUrl" :src="imgUrl+'search.png'"> 清空最近搜索
        </div>
      </div>
    </div>
    <!-- 搜索到的结果页 -->
    <div v-if="isGoSearch" class="search-result">
      <div class="search-total">
        搜索到
        <span>{{total}}</span> 家公司
      </div>
      <div v-if="(fxType == 1)">
        <div
          class="search-item-fx"
          :key="index"
          v-for="(item,index) in searchList"
          @click="_showjudgmentContent(item.judgmentContent)"
        >
          <div class="sname">{{item.decisionTitle}}</div>
          <div class="gg-con">公告时间：{{item.pubDate}}</div>
          <div class="gg-con">执行法院：{{item.executiveCourt}}</div>
          <div class="gg-tag">{{item.caseType}}</div>
        </div>
      </div>
      <div v-if="(fxType == 2)">
        <div
          class="search-item-fx"
          :key="index"
          v-for="(item,index) in searchList"
          @click="_showCourtAnnounce(item,2)"
        >
          <div class="sname">{{item.partyName}}</div>
          <div class="gg-con">公告时间：{{item.noticeType}}</div>
          <div class="gg-con">执行法院：{{item.courtName}}</div>
          <div class="gg-tag">{{item.noticeType}}</div>
        </div>
      </div>
      <div v-if="(fxType == 3)">
        <div
          class="search-item-fx"
          :key="index"
          v-for="(item,index) in searchList"
          @click="_showCourtAnnounce(item,3)"
        >
          <div class="sname">{{item.companyName}}</div>
          <div class="gg-con">列入原因：{{item.abnormalCauses}}</div>
          <div class="gg-con">列入日期：{{item.abnormalTime}}</div>
          <div class="gg-tag">{{item.businessRiskType}}</div>
        </div>
      </div>
      <div v-if="(fxType == 4)">
        <div
          class="search-item-fx"
          :key="index"
          v-for="(item,index) in searchList"
          @click="_showCourtAnnounce(item,4)"
        >
          <div class="sname">{{item.companyName}}</div>
          <div class="gg-con">决定日期{{item.pendecissdate}}</div>
          <div class="gg-con">类型：{{item.illegacttype}}</div>
          <div class="gg-tag">{{item.businessRiskType}}</div>
        </div>
      </div>
      <div v-if="(fxType == 5)">
        <div
          class="search-item-fx"
          :key="index"
          v-for="(item,index) in searchList"
          @click="_showCourtAnnounce(item,5)"
        >
          <div class="sname">{{item.companyName}}</div>
          <div class="gg-con">公示日期{{item.regDate}}</div>
          <div class="gg-con">出质人：{{item.pledgor}}</div>
          <div class="gg-tag">{{item.businessRiskType}}</div>
        </div>
      </div>
      <div v-if="(fxType == 6)">
        <div
          class="search-item-fx"
          :key="index"
          v-for="(item,index) in searchList"
          @click="_showCourtAnnounce(item,6)"
        >
          <div class="sname">{{item.companyName}}</div>
          <div class="gg-con">抵押期限：{{item.term}}</div>
          <div class="gg-con">登记机关：{{item.pledgee}}</div>
          <div class="gg-tag">{{item.businessRiskType}}</div>
        </div>
      </div>
    </div>
    <!-- 没有搜索到数据显示的部分 -->
    <div class="no-search-result" v-if="!hasData">
      <img class="nodata-img" v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
      <br>
      <span>暂无数据</span>
    </div>
    <!-- 搜索的状态 -->
    <i-load-more
      i-class="footer-ts"
      v-if="isGoSearch && !more && footerTs"
      tip="暂无数据"
      :loading="false"
    />
    <i-load-more i-class="footer-ts" v-if="isGoSearch && more && footerTs"/>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import * as utils from "@/utils";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      actions: [{ name: "确定", color: "#2d8cf0" }],
      keyWord: "", //搜索的关键词
      placeholder: "请输入企业名称、人名、产品名或其他关键字",
      isGoSearch: false, //是否去搜索
      isClickFastSearch: false, //是否点击热搜、最近搜索快捷搜素
      searchUrl: "", //搜索接口路由
      hasData: true, //是否搜索到了数据，如果没有，显示暂无数据的图片和文字
      more: true, //(在显示底部数据加载状态的情况下)显示加载状态还是暂无数据
      footerTs: true, //控制是否显示底部数据加载状态
      searchType: 1, //搜索类型，从其他页面点击过来 带过来的参数可以判断是什么条件的搜索
      hotBotArr: [], //热搜数组(最多显示10条)
      page: 1, //默认搜索第一页
      total: 0, //搜索到的总条数
      searchList: [], //搜索到的数据数组
      recentSearch: [], //最近搜索的数组
      relatedSearchArr: [], //联想查询的数组
      fxType: ""
    };
  },
  computed: {
    navH() {
      return store.state.navHeight;
    }
  },
  methods: {
    myToast(con) {
      $Toast({
        content: con
      });
    },
    //跳转详情页
    companyInfo(companyId) {
      wx.navigateTo({
        url: "/pages/companyInfo/main?companyId=" + companyId
      });
    },
    //点击想要搜素的目标，将点击的目标值填入搜索框
    fastSearch(companyName) {
      this.keyWord = companyName;
      this.isClickFastSearch = true;
      this.goSearch(true);
    },
    //获取到热搜
    getHotBot() {
      this.$http.get(config.hotBotUrl, { num: 20 }).then(res => {
        if (res.data.code == 0) {
          const data = res.data.data;
          data.forEach(item => {
            this.hotBotArr.push(item.hotSpot);
          });
          this.hotBotArr = Array.from(new Set(this.hotBotArr));
        }
      });
    },
    // 去搜索
    goSearch(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      const _this = this;
      if (this.keyWord === "") {
        this.myToast("请输入要搜索的内容");
      } else {
        //设置最近搜索
        this.recentSearch.unshift(this.keyWord);
        this.recentSearch = Array.from(new Set(this.recentSearch));
        if (this.recentSearch.length > 10) {
          this.recentSearch = this.recentSearch.slice(0, 10);
        }
        // new Set()数组去重
        this._setRecentSearch(this.recentSearch);
        utils.showLoading();
        this.$http
          .get(this.searchUrl, {
            termStr: this.keyWord,
            pageSize: config.pageSize,
            page: this.page
          })
          .then(res => {
            utils.hideLoading();
            this.isGoSearch = true;
            if (res.data.code == 0) {
              this.total = res.data.data.counts;
              if (res.data.data.counts > 0) {
                this.footerTs = res.data.data.counts < 10 ? false : true;
                this.hasData = true;
                let searchList = [];
                if (this.fxType == 1) {
                  //法律诉讼
                  searchList = res.data.data.laws.map(function(item) {
                    if (item.pubDate) {
                      item.pubDate = utils.formatTime(
                        new Date(item.pubDate),
                        0
                      );
                    }
                    return item;
                  });
                } else if (this.fxType == 2) {
                  //法院公告
                  searchList = res.data.data.notices.map(function(item) {
                    if (item.noticeDate) {
                      item.noticeDate = utils.formatTime(
                        new Date(item.noticeDate),
                        0
                      );
                    }
                    return item;
                  });
                } else if (this.fxType == 3) {
                  //经营异常
                  searchList = res.data.data.abnormal.map(function(item) {
                    if (item.abnormalTime && item.abnormalTime != "暂无") {
                      item.abnormalTime = utils.formatTime(
                        new Date(item.abnormalTime),
                        0
                      );
                    } else {
                      item.abnormalTime = "企业选择不公开";
                    }
                    if (item.removalTime && item.removalTime != "暂无") {
                      item.removalTime = utils.formatTime(
                        new Date(item.removalTime),
                        0
                      );
                    } else {
                      item.removalTime = "企业选择不公开";
                    }
                    if (!item.removalReason) {
                      item.removalReason = "企业选择不公开";
                    }
                    return item;
                  });
                } else if (this.fxType == 4) {
                  //行政处罚
                  searchList = res.data.data.penalty.map(function(item) {
                    if (item.pendecissdate) {
                      item.pendecissdate = utils.formatTime(
                        new Date(item.pendecissdate),
                        0
                      );
                    } else {
                      item.pendecissdate = "企业选择不公开";
                    }
                    if (item.pubdate) {
                      item.pubdate = utils.formatTime(
                        new Date(item.pubdate),
                        0
                      );
                    } else {
                      item.pubdate = "企业选择不公开";
                    }
                    return item;
                  });
                } else if (this.fxType == 5) {
                  //股权出质
                  searchList = res.data.data.equity.map(function(item) {
                    if (item.putDate) {
                      item.putDate = utils.formatTime(
                        new Date(item.putDate),
                        0
                      );
                    } else {
                      item.putDate = "企业选择不公开";
                    }
                    if (item.regDate) {
                      item.regDate = utils.formatTime(
                        new Date(item.regDate),
                        0
                      );
                    } else {
                      item.regDate = "企业选择不公开";
                    }
                    if (!item.pledgedA) {
                      item.pledgedA = "--";
                    }
                    if (!item.certifNumberR) {
                      item.certifNumberR = "企业选择不公开";
                    }
                    return item;
                  });
                } else if (this.fxType == 6) {
                  //动产抵押
                  searchList = res.data.data.mortgage.map(function(item) {
                    if (item.regDate) {
                      item.regDate = utils.formatTime(
                        new Date(item.regDate),
                        0
                      );
                    } else {
                      item.regDate = "企业选择不公开";
                    }
                    if (!item.term) {
                      item.term = "企业选择不公开";
                    }
                    return item;
                  });
                }
                console.log("searchList", searchList);
                if (searchList.length < 10 && this.page > 1) {
                  //如果最后一页不够10条，证明没有数据可加载了
                  this.more = false;
                }
                if (init) {
                  this.searchList = searchList;
                } else {
                  this.searchList = this.searchList.concat(searchList);
                }
              } else {
                this.searchList = {};
                this.hasData = false;
                this.footerTs = false;
                this.more = false;
              }
            }
          });
      }
    },
    //获取联想搜索
    relatedSearch() {
      this.$http
        .get(config.relatedSearch, { termStr: this.keyWord })
        .then(res => {
          if (res.data.code == 0) {
            this.relatedSearchArr = res.data.data;
          }
        });
    },
    // 清空最近搜索
    clearRecentSearch() {
      this.recentSearch = [];
      wx.removeStorageSync("recentSearch");
    },
    //获取最近搜索
    _getRecentSearch() {
      this.recentSearch = wx.getStorageSync("recentSearch") || [];
    },
    //添加最近搜索
    _setRecentSearch(keyword) {
      this.recentSearch.unshift(this.keyWord);
      // new Set()数组去重
      this.recentSearch = Array.from(new Set(this.recentSearch));
      if (this.recentSearch.length > 10) {
        this.recentSearch = this.recentSearch.slice(0, 10);
      }
      wx.setStorageSync("recentSearch", this.recentSearch);
    },
    //显示裁判文书详情
    _showjudgmentContent(judgmentContent) {
      store.commit("setJudgmentContent", judgmentContent);
      wx.navigateTo({
        url: "/pages/judgmentContent/main"
      });
    },
    //显示法院公告详情
    _showCourtAnnounce(courtAnnounce, fxType) {
      store.commit("setDetailContent", courtAnnounce);
      wx.navigateTo({
        url: "/pages/courtAnnounce/main?fxType=" + fxType
      });
    },
    setSearchType() {
      switch (this.$root.$mp.query.fx) {
        case "法律诉讼":
          this.searchUrl = config.courtLawByPageSearch;
          this.fxType = 1;
          break;
        case "法院公告":
          this.searchUrl = config.courtNoticeByPage;
          this.fxType = 2;
          break;
        case "经营异常":
          this.searchUrl = config.abnormalSearch;
          this.fxType = 3;
          break;
          行政处罚;
        case "行政处罚":
          this.searchUrl = config.penaltySearch;
          this.fxType = 4;
          break;
        case "股权出质":
          this.searchUrl = config.equitySearch;
          this.fxType = 5;
          break;
        case "动产抵押":
          this.searchUrl = config.mortgageSearch;
          this.fxType = 6;
          break;
      }
    }
  },
  //滑到底部加载下一页
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page++;
    this.goSearch();
  },
  mounted() {
    this.keyWord = "";
    this.getHotBot();
    this._getRecentSearch();
    this.setSearchType();
    wx.setNavigationBarTitle({
      title: this.$root.$mp.query.fx
    });
  },
  watch: {
    keyWord: function(val, oldVal) {
      this.relatedSearch();
      this.hasData = true;
      if (!this.isClickFastSearch) {
        this.isGoSearch = false;
      } else {
        this.isGoSearch = true;
        this.isClickFastSearch = false;
      }
    }
  }
};
</script>
<style lang="scss">
.search-body {
  .search-group {
    overflow: hidden;
    height: 60px;
    .search-input {
      height: 38px;
      line-height: 38px;
      margin: 10px 0px 10px 10px;
      padding: 0 5px 0 10px;
      background-color: #fff;
      font-size: 12px;
      border: solid 1px #dddee1;
      border-radius: 10rpx;
    }
    .my-search-btn {
      height: 40px;
      line-height: 40px;
      margin: 10px;
      border-radius: 10rpx;
    }
  }
  .preview {
    width: 96%;
    margin-left: 2%;
    a {
      display: block;
      line-height: 80rpx;
      border-bottom: 1px solid #dddee1;
      text-indent: 10rpx;
      color: #80848f;
    }
  }
  .hot-recent {
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    .hot-bot {
      height: 40rpx;
      margin-left: 20rpx;
      vertical-align: middel;
      img {
        float: left;
        width: 40rpx;
        height: 40rpx;
      }
      span {
        float: left;
        height: 40rpx;
        line-height: 40rpx;
        margin-left: 10rpx;
        color: #80848f;
      }
    }
    .hot-bot-list {
      width: 90%;
      margin: 15rpx 5% 20rpx 5%;
      span {
        display: inline-block;
        margin: 8rpx;
        padding: 5rpx 8rpx;
        color: 495060;
        border: solid 1px #495060;
        border-radius: 8rpx;
      }
    }
    .recent-search-list {
      margin-top: 20rpx;
      div {
        width: 90%;
        line-height: 60rpx;
        margin-left: 5%;
        border-bottom: #dddee1 solid 1px;
        text-indent: 20rpx;
      }
    }
    .clear-recent-search {
      margin-top: 50rpx;
      text-align: center;
      line-height: 36rpx;
      color: #bbbec4;
      img {
        width: 36rpx;
        height: 36rpx;
        vertical-align: middle;
      }
    }
  }
  .search-result {
    .advanced-search-box {
      position: relative;
      .advanced-search {
        box-sizing: border-box;
        line-height: 30px;
        padding-bottom: 5px;
        border-bottom: 1px solid #dddee1;
      }
    }
    .search-total {
      padding-left: 10rpx;
      line-height: 60rpx;
      background: #f5f2f4;
      span {
        color: red;
      }
    }
    .search-item-fx {
      position: relative;
      box-sizing: border-box;
      width: 94%;
      height: auto;
      margin-left: 3%;
      margin-top: 40rpx;
      padding: 5rpx 15rpx 15rpx 15rpx;
      box-shadow: 0px 0px 8px #e9eaec;
      background: #ffffff;
      border-radius: 8rpx;
      .sname {
        font-weight: blod;
        color: #1c2438;
        line-height: 70rpx;
      }
      .gg-tag {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 10rpx;
        color: #80848f;
        border: solid 1px #209bf9;
        border-radius: 22rpx;
        font-size: 12px;
      }
    }
  }
  .no-search-result {
    text-align: center;
    color: #bbbec4;
    .nodata-img {
      width: 300rpx;
      height: 300rpx;
      margin-top: 200rpx;
    }
  }
  .footer-ts {
    margin-bottom: 20rpx;
  }
  .search-relation {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: #ffffff;
    text-align: center;
    overflow: hidden;
    img {
      width: 200rpx;
      height: 200rpx;
      margin-top: calc(50vh - 80rpx);
    }
    span {
      color: #209bf9;
      font-size: 16px;
    }
  }
}
</style>
