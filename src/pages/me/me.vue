<template>
  <div>
    <div class="me-header" v-if="imgUrl" :style="{background:'url('+ imgUrl +'my_bg.png)'}">
      <div class="avatar" @click="goLogin">
        <img class="isVip" v-if="imgUrl && loginInfo.isVip" :src="imgUrl+'my_ic_vip_vip.png'">
        <img class="avatar-img" v-if="loginInfo.headPic" :src="loginInfo.headPic">
      </div>
      <div class="username">{{loginInfo.username}}</div>
      <div v-if="loginInfo.isVip" class="text-center white">到期时间：{{expireDate}}</div>
      <div v-if="passOnOff" class="vip-pay" @click="goOnBuy">
        <div class="left vip-icon">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'my_vip.png'">
        </div>
        <span class="left font-click">{{loginInfo.isVip?'续费':'购买'}}</span>
      </div>
    </div>
    <i-row i-class="user-top-group">
      <i-col span="6">
        <div @click="sign">
          <img v-if="imgUrl" mode="aspectFit" :src="imgUrl+'my_message.png'">
          <br>
          <span>签到</span>
        </div>
      </i-col>
      <i-col span="6">
        <img v-if="imgUrl" mode="aspectFit" :src="imgUrl+'ic_jinbi.png'">
        <br>
        <span>{{score}}</span>
      </i-col>
      <i-col span="6">
        <div @click="attention">
          <img v-if="imgUrl" mode="aspectFit" :src="imgUrl+'my_gz.png'">
          <br>
          <span>我的关注</span>
        </div>
      </i-col>
      <i-col span="6">
        <div @click="order">
          <img v-if="imgUrl" mode="aspectFit" :src="imgUrl+'my_dd.png'">
          <br>
          <span>我的订单</span>
        </div>
      </i-col>
    </i-row>
    <ul class="user-detail-list">
      <li v-if="passOnOff" class="user-detail-list-line" @click="inviteAward">
        <img class="new" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_new.png'">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'my_invite.png'">
        </div>
        <div class="list-name red">邀请赢奖</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
      <li v-if="passOnOff" class="user-detail-list-line" @click="vipPrivilege">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'my_viptq.png'">
        </div>
        <div class="list-name">{{isLogin?(loginInfo.isVip?'会员特权':'成为VIP会员'):"成为会员"}}</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
      <li v-if="passOnOff" class="user-detail-list-line">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'set_fx.png'">
        </div>
        <div class="list-name">
          <button class="share-btn" open-type="share" plain="true">分享给好友</button>
        </div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
    </ul>
    <ul class="user-detail-list">
      <li class="user-detail-list-line" @click="myCom">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'mygong.png'">
        </div>
        <div class="list-name">我的公司</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
      <li v-if="passOnOff" class="user-detail-list-line" @click="privilege">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'my_tq.png'">
        </div>
        <div class="list-name">我的特权</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
      <li class="user-detail-list-line" @click="invoice">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_myfp.png'">
        </div>
        <div class="list-name">我的发票</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
    </ul>
    <ul class="user-detail-list">
      <li class="user-detail-list-line" @click="balance">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_5.png'">
        </div>
        <div class="list-name">我的余额</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
      <li class="user-detail-list-line" @click="authentication">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_mycard.png'">
        </div>
        <div class="list-name">实名认证</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
        <div class="right" style="font-size:12px;" :style="{color:authStateColor}">{{authState}}</div>
      </li>
    </ul>
    <ul class="user-detail-list user-detail-list-last">
      <li class="user-detail-list-line" @click="goSetting">
        <div class="list-img">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'my_set.png'">
        </div>
        <div class="list-name">设置中心</div>
        <div class="list-arrow">
          <i-icon type="enter"></i-icon>
        </div>
      </li>
    </ul>
    <div style="height:30rpx;"></div>
    <i-toast id="toast"/>
    <i-modal title="提示" :visible="loginInOther" @ok="goLogin" @cancel="noLogin">
      <div>账号已在其他设备登录，您被强制下线！</div>
    </i-modal>
  </div>
</template>
<script>
import config from "@/config";
import store from "@/store";
import { mapState } from "vuex";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      userId: "",
      isLogin: false,
      expireDate: "", // vip到期时间
      authState: "未认证",
      authStateColor: "#9B9B9B",
      userInfo: {
        nickName: "",
        avatarUrl: +"ic_head_default.png"
      },
      vipLevel: 0,
      loginInfo: {
        username: "未登录",
        headPic: config.imgUrl + "ic_head_default.png",
        isVip: 0
      },
      loginInOther: false
    };
  },
  methods: {
    myToast(con) {
      $Toast({
        content: con
      });
    },
    goLogin() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/login/main"
        });
      }
    },
    getUserInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      if (loginInfo) {
        this.loginInfo.username = loginInfo.mobile;
        this.loginInfo.isVip = loginInfo.vipLevel;
        this.vipLevel = loginInfo.vipLevel;
        this.loginInfo.headPic = loginInfo.headPic
          ? config.imgFile + loginInfo.headPic
          : config.imgUrl + "ic_head_default.png";
        this.expireDate = loginInfo.expireDate.substr(0, 10);
        this.isLogin = true;
        this.userId = loginInfo.userId;
      } else {
        this.loginInfo.username = "未登录";
        this.loginInfo.headPic = config.imgUrl + "ic_head_default.png";
        this.loginInfo.isVip = 0;
        this.isLogin = false;
      }
      this.isLoginInOther();
      /* const userInfo = JSON.parse(wx.getStorageSync("userInfo"))
      if(userInfo){
        this.userInfo = {
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      } */
    },
    // 签到
    sign() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/sign/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 续费
    goOnBuy() {
      if (this.vipLevel == 1 || this.vipLevel == 0) {
        wx.navigateTo({
          url: "/pages/meOptions/buyVip/main"
        });
      } else if (this.vipLevel == 4) {
        wx.navigateTo({
          url: "/pages/meOptions/buyComVip/main"
        });
      } else if (this.vipLevel == 5) {
        wx.navigateTo({
          url: "/pages/meOptions/buySvip/main"
        });
      }
    },
    // 我的关注
    attention() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/attention/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 我的订单
    order() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/order/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 我的公司
    myCom() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/myCom/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 我的公司
    myCom() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/myCom/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 我的特权
    privilege() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/privilege/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 我的发票
    invoice() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/invoice/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 我的余额
    balance() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/balance/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 实名认证
    authentication() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/authentication/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 邀请赢奖
    inviteAward() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/inviteAward/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 会员特权
    vipPrivilege() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/vipPrivilege/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    //设置
    goSetting() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "/pages/meOptions/setting/main"
        });
      } else {
        this.myToast("请先登录");
      }
    },
    // 是否实名认证
    _hasAuth() {
      this.$http.post(config.hasAuth, { userId: this.userId }).then(res => {
        if (res.data.code == 0) {
          //1、未认证 2、审核中 3、认证通过 4、认证未通过
          if (res.data.data == 1) {
            this.authState = "未认证";
            this.authStateColor = "#9B9B9B";
          } else if (res.data.data == 2) {
            this.authState = "审核中";
            this.authStateColor = "#209bf9";
          } else if (res.data.data == 3) {
            this.authState = "认证通过";
            this.authStateColor = "green";
          } else if (res.data.data == 4) {
            this.authState = "认证未通过";
            this.authStateColor = "red";
          }
        }
      });
    },
    //不同意登录
    noLogin() {
      this.loginInOther = false;
    },
    // 检查是否异地登录
    isLoginInOther() {
      this.loginInOther = false;
      if (this.isLogin) {
        this.$http
          .post(config.host + config.loginState, {
            userId: this.userId
          })
          .then(res => {
            if (res.data.code == 0) {
              if (this.token != res.data.data.token) {
                wx.removeStorageSync("vuex");
                wx.removeStorageSync("loginInfo");
                this.loginInOther = true;
              } else {
                this.loginInOther = false;
              }
            }
          });
      }
    }
  },
  computed: {
    ...mapState(["token"]),
    passOnOff() {
      return store.state.passOnOff;
    },
    score() {
      return store.state.sign.score;
    }
  },
  mounted() {
    this._hasAuth();
  },
  onShareAppMessage: function() {
    return {
      title: "我发现一款给力的信用调查小程序，超好用！棒棒哒！",
      path: "/pages/index/main"
    };
  },
  onShow() {
    this.getUserInfo();
  }
};
</script>
<style lang="scss">
.me-header {
  width: 100%;
  height: 350rpx;
  .avatar {
    position: relative;
    width: 140rpx;
    height: auto;
    margin: 0 auto;
    text-align: center;
    .avatar-img {
      margin-top: 56rpx;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
    }
    .isVip {
      position: absolute;
      width: 30rpx;
      height: 30rpx;
      right: 5rpx;
      bottom: 20rpx;
    }
    .bind-phone-btn {
      width: 140rpx;
      margin: 0 auto;
      height: 18px;
      line-height: 18px;
      border-radius: 3px;
      border: 1px #ffffff solid;
      text-align: center;
      font-size: 12px;
      color: #ffffff;
    }
  }
  .username {
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
  }
  .vip-pay {
    position: absolute;
    right: 0;
    top: 200rpx;
    width: 120rpx;
    height: 50rpx;
    line-height: 50rpx;
    border-top-left-radius: 25rpx;
    border-bottom-left-radius: 25rpx;
    background: #ffffff;
    .vip-icon {
      width: 40rpx;
      height: 30rpx;
      margin-top: 8rpx;
      margin-left: 15rpx;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
.user-top-group {
  width: 96%;
  margin-left: 2%;
  margin-top: -40rpx;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 3px 5px 0px #dddddd;
  padding: 20rpx 0;
  text-align: center;
  img {
    width: 50rpx;
    height: 50rpx;
  }
}
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
      button {
        width: 597rpx;
        height: 80rpx;
        line-height: 80rpx;
        overflow: hidden;
        font-size: 28rpx;
        padding: 0;
        text-align: left;
        border: none;
      }
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
