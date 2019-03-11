<template>
  <div>
    <!-- <NavigateBar :title="navTitle" :isTabBar="true"></NavigateBar>
    <div :style="{height:navH +'px'}"></div>-->
    <div class="category-column">
      <ColumnTitle :title="qxcTitle"></ColumnTitle>
      <i-row>
        <i-col i-class="text-center" span="6">
          <div @click="goSearch(5)">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_01_01.png'">
            </div>
            <div>企业名称</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6">
          <div @click="goSearch(6)">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_01_02.png'">
            </div>
            <div>股东高管</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6">
          <div @click="goSearch(7)">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_01_03.png'">
            </div>
            <div>经营范围</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6">
          <div @click="searchPhone">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_01_04.png'">
            </div>
            <div>找电话</div>
          </div>
        </i-col>
      </i-row>
    </div>
    <div class="category-column">
      <ColumnTitle :title="rmfuTitle"></ColumnTitle>
      <i-row>
        <i-col i-class="text-center" span="6">
          <div @click="searchHottestServices('征信新闻')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_02_01.png'">
            </div>
            <div>征信新闻</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6" v-if="passOnOff">
          <div @click="searchHottestServices('政策法规')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_02_02.png'">
            </div>
            <div>政策法规</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6">
          <div @click="searchHottestServices('行业展示')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_02_03.png'">
            </div>
            <div>行业展示</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6" v-if="passOnOff">
          <div @click="searchHottestServices('媒体热评')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_02_04.png'">
            </div>
            <div>媒体热评</div>
          </div>
        </i-col>
      </i-row>
    </div>
    <div class="category-column">
      <ColumnTitle :title="sffxTitle"></ColumnTitle>
      <i-row>
        <i-col i-class="text-center" span="6">
          <div @click="searchBusinessRisk('法律诉讼')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_03_01.png'">
            </div>
            <div>法律诉讼</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6">
          <div @click="searchBusinessRisk('法院公告')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'class_03_02.png'">
            </div>
            <div>法院公告</div>
          </div>
        </i-col>
      </i-row>
    </div>
    <div class="category-column">
      <ColumnTitle :title="jyfxTitle"></ColumnTitle>
      <i-row>
        <i-col i-class="text-center" span="6">
          <div @click="searchBusinessRisk('经营异常')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_1.png'">
            </div>
            <div>经营异常</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6">
          <div @click="searchBusinessRisk('行政处罚')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_2.png'">
            </div>
            <div>行政处罚</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6">
          <div @click="searchBusinessRisk('股权出质')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_3.png'">
            </div>
            <div>股权出质</div>
          </div>
        </i-col>
        <i-col i-class="text-center" span="6">
          <div @click="searchBusinessRisk('动产抵押')">
            <div class="category-img">
              <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_4.png'">
            </div>
            <div>动产抵押</div>
          </div>
        </i-col>
      </i-row>
    </div>
    <i-toast id="toast"/>
  </div>
</template>

<script>
import config from "@/config.js";
import { mapState } from "vuex";
import ColumnTitle from "@/components/ColumnTitle";
import NavigateBar from "@/components/NavigateBar";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  components: { ColumnTitle, NavigateBar },
  data() {
    return {
      navTitle: "全部分类",
      qxcTitle: "企信查",
      rmfuTitle: "热门服务",
      sffxTitle: "司法风险",
      jyfxTitle: "经营风险",
      imgUrl: config.imgUrl,
      isLogin: false
    };
  },
  computed: {
    ...mapState(["passOnOff"])
  },
  methods: {
    myToast(con, type) {
      $Toast({
        content: con,
        type: type
      });
    },
    //判断登录状态
    checkLogin() {
      const loginInfo = wx.getStorageSync("loginInfo");
      if (!loginInfo) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    //跳转登录页
    goLogin() {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    },
    //普通搜索
    goSearch(type) {
      if (!this.isLogin) {
        this.myToast("请先登录!", "warning");
      } else {
        this.globalData.searchType = type;
        wx.switchTab({
          url: "/pages/search/main"
        });
      }
    },
    //找电话
    searchPhone() {
      if (!this.isLogin) {
        this.myToast("请先登录!", "warning");
      } else {
        wx.navigateTo({
          url: "/pages/searchPhone/main"
        });
      }
    },
    // 热门服务
    searchHottestServices(title) {
      if (!this.isLogin) {
        this.myToast("请先登录!", "warning");
      } else {
        wx.navigateTo({
          url: "/pages/searchHottestServices/main?hotTitle=" + title
        });
      }
    },
    // 司法风险-经营异常
    searchBusinessRisk(title) {
      if (!this.isLogin) {
        this.myToast("请先登录!", "warning");
      } else {
        wx.navigateTo({
          url: "/pages/searchBusinessRisk/main?fx=" + title
        });
      }
    }
  },
  mounted() {
    this.checkLogin();
  }
};
</script>
<style lang="scss">
.category-column {
  width: 96%;
  margin-left: 2%;
  overflow: hidden;
  box-shadow: 0px 0px 5px #dddddd;
  border-radius: 6px;
  background: #ffffff;
  margin-top: 30rpx;
  padding-bottom: 30rpx;
  .category-img {
    width: 70rpx;
    height: 70rpx;
    margin: 0 auto 10rpx auto;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
