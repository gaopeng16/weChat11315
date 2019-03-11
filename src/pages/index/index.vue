<template>
  <div>
    <!-- <NavigateBar :title="navTitle" :isTabBar="true"></NavigateBar>
    <div :style="{height:navHeight +'px'}"></div>-->
    <!-- <div class="notice">
      <i-notice-bar
        icon="systemprompt"
        closable
        loop
        speed="1500"
      ></i-notice-bar>
    </div> -->
    <div class="home-banner">
      <img class="com-title" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'home_ic_top_01.png'">
      <img
        @click="goSearch(1)"
        class="search-img"
        mode="aspectFit"
        v-if="imgUrl"
        :src="imgUrl+'home_ic_top_02.png'"
      >
      <img class="com-title-des" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'home_ic_top_03.png'">
    </div>
    <div class="search-group">
      <i-row>
        <i-col span="8" i-class="col-text-center">
          <a @click="goSearch(2)">
            <img class="home_ic" mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_ic_01.png'">
            <div>查公司</div>
          </a>
        </i-col>
        <i-col span="8" i-class="col-text-center">
          <a @click="goSearch(3)">
            <img class="home_ic" mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_ic_02.png'">
            <div>查老板</div>
          </a>
        </i-col>
        <i-col span="8" i-class="col-text-center">
          <a @click="goSearch(4)">
            <img class="home_ic" mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_ic_03.png'">
            <div>查关系</div>
          </a>
        </i-col>
      </i-row>
    </div>
    <div class="hot-container">
      <swiper
        class="banner-swiper"
        indicator-dots="true"
        indicator-color="rgba(255,255,255,.3)"
        indicator-active-color="#ffffff"
        autoplay="true"
        duration="800"
        interval="2000"
        circular="true"
      >
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner01.png'">
        </swiper-item>
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner02.png'">
        </swiper-item>
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner03.png'">
        </swiper-item>
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner04.png'">
        </swiper-item>
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner05.png'">
        </swiper-item>
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner06.png'">
        </swiper-item>
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner07.png'">
        </swiper-item>
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner08.png'">
        </swiper-item>
        <swiper-item>
          <img mode="widthFix" v-if="imgUrl" :src="imgUrl+'home_banner09.png'">
        </swiper-item>
      </swiper>
      <div class="hot-line">
        <i-row>
          <i-col span="4" offset="1" i-class="hot-line-left">
            <img
              class="ic_redian_ioc"
              mode="widthFix"
              v-if="imgUrl"
              :src="imgUrl+'ic_redian_ioc.png'"
            >
            <img class="ic_redian" mode="widthFix" v-if="imgUrl" :src="imgUrl+'ic_redian.png'">
            <span class="font-red">:</span>
          </i-col>
          <i-col span="19" i-class="hot-line-right">
            <div class="hot-swiper">
              <swiper
                autoplay="true"
                duration="500"
                interval="2000"
                circular="true"
                vertical="true"
              >
                <swiper-item :key="item.id" v-for="item in hotList">
                  <a class="font-click" @click="goHotList">{{item.title}}</a>
                </swiper-item>
              </swiper>
            </div>
          </i-col>
        </i-row>
      </div>
    </div>
    <div class="guess-like">
      <!-- <ColumnTitle :title="guessTitle"></ColumnTitle> -->
      <div class="hotsearch">
        <div class="hotsearch-title">
          <div class="bg-line left-line left"></div>
          <div class="title left blod">猜你喜欢</div>
          <div class="bg-line right-line left"></div>
        </div>
      </div>
      <div class="filter-type">
        <div class="type-item" @click="searchTrademark">
          <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'home_ic5_01.png'">
        </div>
        <div class="type-item" @click="searchPatent">
          <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'home_ic5_02.png'">
        </div>
        <div class="type-item" @click="searchDishonesty">
          <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'home_ic5_03.png'">
        </div>
        <div class="type-item" @click="searchCourtLawByPage">
          <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'home_ic5_04.png'">
        </div>
        <div class="type-item" @click="searchCopyright">
          <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'home_ic5_05.png'">
        </div>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="hotsearch">
      <div class="hotsearch-title">
        <div class="bg-line left-line left"></div>
        <div class="title left blod">热门搜索</div>
        <div class="bg-line right-line left"></div>
      </div>
      <div class="hotsearch-list">
        <div
          class="hotsearch-block"
          :key="k"
          v-for="(v,k) in hotBotArr"
          @click="goCompanyInfo(v.companyId)"
        >
          <div class="hotsearch-logo left ml15">
            <img v-if="imgFile && v.logoUrl" :src="imgFile+v.logoUrl">
            <FontImg
              v-else
              :type="4"
              :brief="v.companyName"
              :width="80"
              :height="80"
              :lineHeight="40"
            ></FontImg>
          </div>
          <div class="hotsearch-info left ml15">
            <div class="hotsearch-name title">{{v.companyName}}</div>
            <div class="hotsearch-name sub-content-light">
              法定代表人：
              <span class="title">{{v.legalPerson}}</span>
            </div>
            <div class="hotsearch-name sub-content-light">
              注册资本：
              <span class="title">{{v.registeredCapital}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新闻 -->
    <!-- <div class="credit-news" v-if="passOnOff">
      <ColumnTitle
        :title="creditNewsTitle"
        :hasmore="true"
        :url="creditNewsListUrl"
        @moreCheckLogin="moreCheckLogin"
      ></ColumnTitle>
      <BriefCard
        :key="item.id"
        v-for="item in creditNewsList"
        :newsImg="imgFile+item.imgUrl"
        :newsTitle="item.title"
        :newsTime="item.publishTime"
        :source="item.source"
        :newsId="item.id"
        @briefCardCheckLogin="briefCardCheckLogin"
      ></BriefCard>
    </div>-->
    <!-- 邀请赢奖 -->
    <div class="invitation">
      <a href="/pages/meOptions/inviteAward/main">
        <img mode="aspectFix" v-if="imgUrl" :src="imgUrl+'ic_home_invitation.png'">
      </a>
    </div>
    <i-modal title="提示" :visible="!isLogin" @ok="goLogin" @cancel="noLogin">
      <div>请先登录</div>
    </i-modal>
  </div>
</template>
<script>
import config from "@/config";
import { mapState, mapMutations } from "vuex";
import { SET_PASS_ON_OFF } from "@/store/mutation-types";
import ColumnTitle from "@/components/ColumnTitle";
import BriefCard from "@/components/BriefCard";
import NavigateBar from "@/components/NavigateBar";
import FontImg from "@/components/FontImg";
export default {
  components: { ColumnTitle, BriefCard, NavigateBar, FontImg },
  data() {
    return {
      navTitle: "首页",
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      guessTitle: "猜你喜欢",
      creditNewsTitle: "征信新闻",
      hotList: [],
      creditNewsList: [],
      creditNewsListUrl: "/pages/creditNewsList/main",
      hotBotArr: [], // 热搜
      isLogin: true
    };
  },
  computed: {
    ...mapState(["navHeight", "passOnOff"])
  },
  methods: {
    ...mapMutations({
      setPassOnOff: SET_PASS_ON_OFF
    }),
    //初始化
    getSetting() {
      this.getHotList();
      //this.getcreditNewsList();
    },
    // 检查是否授权
    getPromission() {
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
            this.checkLogin();
          } else {
            wx.redirectTo({
              url: "/pages/accredit/main"
            });
          }
        }
      });
    },
    //跳转到热点列表页
    goHotList() {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/hotList/main"
        });
      } else {
        this.isLogin = false;
      }
    },
    //获取热点列表
    getHotList() {
      this.$http.get(config.hotListUrl, { pageIndex: 1 }).then(res => {
        if (res.data.code == 0) {
          this.hotList = res.data.data.records;
          wx.stopPullDownRefresh();
        }
      });
    },
    //获取zhengxinxinwen列表
    getcreditNewsList() {
      this.$http.get(config.creditNewsListUrl, { pageIndex: 1 }).then(res => {
        if (res.data.code == 0) {
          this.creditNewsList = res.data.data.records;
          wx.stopPullDownRefresh();
        }
      });
    },
    // 热搜
    getHotBot() {
      this.hotBotArr = [];
      this.$http.get(config.hotBotUrl, { num: 20 }).then(res => {
        if (res.data.code == 0) {
          this.hotBotArr = res.data.data;
        }
      });
    },
    //跳转公司详情页
    goCompanyInfo(companyId) {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url:
            "/pages/companyInfoPackage/pages/companyInfo/main?companyId=" +
            companyId
        });
      } else {
        this.isLogin = false;
      }
    },
    //普通搜索
    goSearch(type) {
      this.checkLogin();
      if (this.isLogin) {
        this.globalData.searchType = type;
        wx.switchTab({
          url: "/pages/search/main"
        });
      } else {
        this.isLogin = false;
      }
    },
    //查商标
    searchTrademark() {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/searchTrademark/main"
        });
      } else {
        this.isLogin = false;
      }
    },
    //查专利
    searchPatent() {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/searchPatent/main"
        });
      } else {
        this.isLogin = false;
      }
    },
    //查失信
    searchDishonesty() {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/searchDishonesty/main"
        });
      } else {
        this.isLogin = false;
      }
    },
    //查裁判文书
    searchCourtLawByPage() {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/searchCourtLawByPage/main"
        });
      } else {
        this.isLogin = false;
      }
    },
    //查著作权
    searchCopyright() {
      this.checkLogin();
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/searchCopyright/main"
        });
      } else {
        this.isLogin = false;
      }
    },
    //跳转登录页
    goLogin() {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    },
    //不同意登录
    noLogin() {
      this.isLogin = true;
    },
    //检查登录状态
    checkLogin() {
      this.isLogin = true;
      const loginInfo = wx.getStorageSync("loginInfo");
      if (!loginInfo) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    //点击更多检查登录状态
    moreCheckLogin(isLogin) {
      this.isLogin = isLogin;
    },
    //点击查看详情时判断是否登录
    briefCardCheckLogin(isLogin) {
      this.isLogin = isLogin;
    },
    // 通过版本号的对比，判断是否显示
    getPassOnOff() {
      this.$http
        .get("app/buss/androidAppVersion/detailForMP", {
          version: config.version
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data == "true") {
              this.setPassOnOff(true);
            } else if (res.data.data == "false") {
              this.setPassOnOff(false);
            }
          }
        });
    }
  },
  mounted() {
    this.getSetting();
    this.getPassOnOff();
    this.getHotBot();
  },
  onShareAppMessage: function() {
    return {
      title: "我发现一款给力的信用调查小程序，超好用！棒棒哒！",
      path: "/pages/index/main"
    };
  },
  onPullDownRefresh() {
    this.getHotList();
    //this.getcreditNewsList();
    this.getHotBot();
    this.getPassOnOff();
  },
  onShow() {
    this.getPromission();
  }
};
</script>
<style lang="scss">
body {
  background: #f2f2f2;
}
.home-banner {
  width: 100%;
  height: 359rpx;
  background: linear-gradient(#2197f2, #0bdbfd);
  .com-title {
    width: 86%;
    height: 70rpx;
    margin-left: 7%;
    margin-top: 30rpx;
  }
  .search-img {
    width: 90%;
    height: 78rpx;
    margin-left: 5%;
    margin-top: 12rpx;
  }
  .com-title-des {
    width: 76%;
    height: 53rpx;
    margin-left: 12%;
    margin-top: 12rpx;
  }
}
.search-group {
  width: 96%;
  margin-left: 2%;
  margin-top: -40rpx;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 3px 5px 0px #dddddd;
  padding: 20rpx 0;
  .col-text-center {
    text-align: center;
    .home_ic {
      width: 80rpx;
    }
  }
}
.hot-container {
  margin-top: 20rpx;
  background: #ffffff;
  .banner-swiper {
    height: 150rpx;
    img {
      width: 100%;
    }
  }
  .hot-line {
    height: 60rpx;
    line-height: 60rpx;
    .ic_redian_ioc {
      width: 30rpx;
      vertical-align: middle;
    }
    .ic_redian {
      width: 60rpx;
      vertical-align: middle;
    }
    .hot-line-right {
      height: 60rpx;
      overflow: hidden;
      .hot-swiper {
        swiper {
          height: 60rpx;
        }
        swiper-item {
          height: 60rpx;
        }
      }
    }
  }
}
.guess-like {
  .hotsearch {
    margin-top: 0;
    padding: 0;
  }
  width: 96%;
  margin-left: 2%;
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 3px 5px 0px #dddddd;
  padding: 10rpx 0;
  .filter-type {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    text-overflow: ellipsis;
    .type-item {
      display: inline-block;
      width: calc(25% - 20rpx);
      height: auto;
      margin: 0 10rpx;
      .typeimg {
        width: 100%;
      }
    }
  }
}
.hotsearch {
  background: #ffffff;
  margin-top: 20rpx;
  padding-bottom: 30rpx;
  .hotsearch-title {
    width: 80%;
    margin-left: 10%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    .title {
      width: 30%;
    }
    .bg-line {
      width: 35%;
      height: 1px;
      margin-top: 40rpx;
    }
    .left-line {
      background: linear-gradient(to right, #fafafa, #b5b5b5);
    }
    .right-line {
      background: linear-gradient(to right, #b5b5b5, #fafafa);
    }
  }
  .hotsearch-list {
    .hotsearch-block {
      width: 90%;
      height: 120rpx;
      padding: 30rpx 0;
      margin: 10rpx 5%;
      border-radius: 8rpx;
      box-shadow: 0 0 10rpx 5rpx #f0f0f0;
      .hotsearch-logo {
        img {
          width: 80rpx;
          height: 80rpx;
          margin-top: 10rpx;
          margin-left: 10rpx;
          border-radius: 5rpx;
          overflow: hidden;
        }
      }
    }
    .hotsearch-info {
      width: calc(100% - 150rpx);
      line-height: 40rpx;
      .hotsearch-name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.credit-news {
  width: 96%;
  margin-left: 2%;
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 3px 5px 0px #dddddd;
  padding: 10rpx 0;
  .i-card-header-thumb {
    border-radius: 50%;
  }
}
.invitation {
  position: fixed;
  bottom: 50rpx;
  right: 50rpx;
  width: 120rpx;
  height: 120rpx;
  animation: bounce-in 2s infinite;
  a {
    display: block;
    width: 120rpx;
    height: 120rpx;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>

