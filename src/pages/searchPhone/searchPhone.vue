<template>
  <div class="search-body">
    <!-- <NavigateBar :title="navTitle" :isTabBar="true"></NavigateBar>
    <div :style="{height:navH +'px'}"></div>-->
    <div class="search-group">
      <i-row>
        <i-col span="19">
          <input v-model="keyWord" class="search-input" type="text" placeholder="请输入著作权名、登记号或公司名称">
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
      <div
        class="search-item"
        :key="index"
        v-for="(item,index) in searchList"
        @click="companyInfo(item.id)"
      >
        <img class="company-logo" :src="item.logoUrl">
        <div class="com-info title cname">{{item.companyName}}</div>
        <div class="com-info">
          <span class="left">电话: {{item.contactWay}}</span>
        </div>
        <div class="com-info">注册资本: {{item.registeredCapital+item.registeredCapitalUnit}}</div>
        <div class="com-info">成立日期: {{item.registrationDate}}</div>
        <div
          class="grade"
          :class="[(item.State == '吊销' || item.State == '注销')  ? 'grade-gray' : '']"
        >{{item.creditScore}}</div>
        <div
          class="state"
          :class="[(item.State == '吊销' || item.State == '注销')  ? 'state-red' : '']"
          v-if="item.State"
        >{{item.State}}</div>
      </div>
    </div>
    <!-- 没有搜索到数据显示的部分 -->
    <div class="no-search-result" v-if="!hasData">
      <img class="nodata-img" v-if="imgUrl" :src="imgUrl+'ic_empty.png'">
      <br>
      <span>暂无数据</span>
    </div>
    <!-- 功能正在升级 -->
    <div class="search-relation" v-if="upgrade">
      <img v-if="imgUrl" :src="imgUrl+'ic_upgrade.png'">
      <br>
      <span>功能正在升级中</span>
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
import NavigateBar from "@/components/NavigateBar";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  components: { NavigateBar },
  data() {
    return {
      navTitle: "搜索", //自定义顶部导航的标题(如果没有使用自定义导航请忽略)
      navHeight: 0, //由于自定义导航定位，body内容会被导航盖住(如果没有使用自定义导航请忽略)
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      keyWord: "", //搜索的关键词
      isGoSearch: false, //是否去搜索
      isClickFastSearch: false, //是否点击热搜、最近搜索快捷搜素
      hasData: true, //是否搜索到了数据，如果没有，显示暂无数据的图片和文字
      more: true, //(在显示底部数据加载状态的情况下)显示加载状态还是暂无数据
      footerTs: true, //控制是否显示底部数据加载状态
      searchType: "", //搜索类型，从其他页面点击过来 带过来的参数可以判断是什么条件的搜索
      hotBotArr: [], //热搜数组(最多显示10条)
      page: 1, //默认搜索第一页
      total: 0, //搜索到的总条数
      searchList: [], //搜索到的数据数组
      recentSearch: [], //最近搜索的数组
      relatedSearchArr: [] //联想查询的数组
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
          .get(config.contactWaySearch, {
            term: this.keyWord,
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
                const searchList = res.data.data.companyInfos.map(function(
                  item
                ) {
                  if (item.registrationDate) {
                    item.registrationDate = utils.formatTime(
                      new Date(item.registrationDate),
                      0
                    );
                  }
                  if (item.contactWay == "") {
                    item.contactWay = "企业选择不公开";
                  }
                  item.logoUrl =
                    item.logoUrl == ""
                      ? _this.imgUrl + "logo_n.png"
                      : _this.imgFile + item.logoUrl;
                  return item;
                });
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
    _setRecentSearch(recentSearch) {
      wx.setStorageSync("recentSearch", recentSearch);
    },
    //全部父级行业
    setIndustryParent() {
      for (let key in industry.industry[0]) {
        this.industryParent.push(key);
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
      height: 40px;
      line-height: 40px;
      margin: 10px 0px 10px 10px;
      padding: 0 5px 0 10px;
      background-color: #fff;
      font-size: 12px;
      border: solid 1px #dddee1;
      border-radius: 10rpx;
    }
    .my-search-btn{
      height:39px;
      line-height:39px;
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
    .search-total {
      padding-left: 10rpx;
      line-height: 60rpx;
      background: #f5f2f4;
      span {
        color: red;
      }
    }
    .search-item {
      position: relative;
      width: 90%;
      height: auto;
      margin-left: 8%;
      margin-top: 40rpx;
      padding: 10rpx 0 15rpx 0;
      box-shadow: 0px 0px 8px #e9eaec;
      background: #ffffff;
      border-radius: 8rpx;
      .com-info {
        color: #80848f;
        height: auto;
        margin-left: 110rpx;
        margin-top: 5rpx;
        margin-bottom: 5rpx;
        font-size: 12px;
        overflow: hidden;
      }
      .cname {
        font-size: 14px;
        color: #1c2438;
        padding: 10rpx 0;
        font-weight: bold;
      }
      .company-logo {
        position: absolute;
        top: -20rpx;
        left: -5%;
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
        overflow: hidden;
      }
      .grade {
        position: absolute;
        right: 40rpx;
        bottom: 25rpx;
        width: 60rpx;
        height: 60rpx;
        border: 2px solid #209bf9;
        border-radius: 50%;
        text-align: center;
        line-height: 60rpx;
      }
      .grade-gray {
        border: 2px solid #797979;
        color: #797979;
      }
      .state {
        position: absolute;
        right: 35rpx;
        top: 10rpx;
        width: 80rpx;
        height: 30rpx;
        border: 1px solid #209bf9;
        border-radius: 15rpx;
        text-align: center;
        line-height: 30rpx;
        color: #209bf9;
        font-size: 12px;
      }
      .state-red {
        border: 1px solid #ff0000;
        color: #ff0000;
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
