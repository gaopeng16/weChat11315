<template>
  <div>
    <!-- <NavigateBar :title="navTitle"></NavigateBar>
    <div :style="{height:navH +'px'}"></div>-->
    <ul class="user-detail-list">
      <a href="/pages/meOptions/settingResetPassword/main">
        <li class="user-detail-list-line">
          <div class="list-img">
            <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'set_pwd.png'">
          </div>
          <div class="list-name">重置登录密码</div>
          <div class="list-arrow">
            <i-icon type="enter"></i-icon>
          </div>
        </li>
      </a>
    </ul>
    <ul class="user-detail-list">
      <a href="/pages/meOptions/settingReplaceMobile/main">
        <li class="user-detail-list-line">
          <div class="list-img">
            <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'set_sj.png'">
          </div>
          <div class="list-name">更换手机号</div>
          <div class="list-arrow">
            <i-icon type="enter"></i-icon>
          </div>
        </li>
      </a>
      <a href="/pages/meOptions/settingBindEmail/main">
        <li class="user-detail-list-line">
          <div class="list-img">
            <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'set_yx.png'">
          </div>
          <div class="list-name">绑定邮箱</div>
          <div class="list-arrow">
            <i-icon type="enter"></i-icon>
          </div>
        </li>
      </a>
    </ul>
    <ul class="user-detail-list user-detail-list-last">
      <a href="/pages/meOptions/settingAboutUs/main">
        <li class="user-detail-list-line">
          <div class="list-img">
            <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'set_me.png'">
          </div>
          <div class="list-name">关于我们</div>
          <div class="list-arrow">
            <i-icon type="enter"></i-icon>
          </div>
        </li>
      </a>
      <a href="/pages/meOptions/settingContact/main">
        <li class="user-detail-list-line">
          <div class="list-img">
            <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'set_call.png'">
          </div>
          <div class="list-name">联系方式</div>
          <div class="list-arrow">
            <i-icon type="enter"></i-icon>
          </div>
        </li>
      </a>
    </ul>
    <ul class="user-detail-list">
      <!-- <li class="user-detail-list-line">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'set_qc.png'">
        </div>
        <div class="list-name">清空缓存</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
      -->
      <a href="/pages/meOptions/settingVersion/main">
      <li class="user-detail-list-line">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'set_gx.png'">
        </div>
        <div class="list-name">版本检测</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
      </a>
    </ul>
    <i-button type="primary" @click="logout">退出登录</i-button>
  </div>
</template>
<script>
import config from "@/config";
import store from "@/store";
import NavigateBar from "@/components/NavigateBar";
export default {
  components: { NavigateBar },
  data() {
    return {
      navTitle: "设置中心",
      imgUrl: config.imgUrl,
      isLogin: false
    };
  },
  methods: {
    logout() {
      wx.removeStorageSync("vuex");
      wx.removeStorageSync("loginInfo");
      wx.switchTab({
        url: "/pages/index/main"
      });
    }
  },
  computed: {
    navH() {
      return store.state.navHeight;
    }
  }
};
</script>
<style lang="scss">
.user-detail-list-last {
  margin-bottom: 20px;
}
.user-detail-list {
  width: 96%;
  margin-left: 2%;
  overflow: hidden;
  box-shadow: 0px 0px 5px #dddddd;
  border-radius: 6px;
  background: #ffffff;
  margin-top: 30rpx;
  .user-detail-list-line {
    position: relative;
    height: 80rpx;
    line-height: 80rpx;
    margin: 10rpx 0;
    .list-img {
      float: left;
      width: 50rpx;
      height: 50rpx;
      margin: 0 10px;
      img {
        height: 50rpx;
        max-width: 100%;
        vertical-align: middle;
      }
    }
    .list-name {
      float: left;
    }
    .list-arrow {
      float: right;
      margin-right: 5px;
    }
    .new {
      position: absolute;
      width: 80rpx;
      height: 80rpx;
      left: 0;
      top: 0;
    }
  }
}
</style>
