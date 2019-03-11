<template>
  <div class="min-height100 sign-body">
    <div>
      <div class="sing_bg_top2">
        <img class="sing_bg_top2_img" v-if="imgUrl" :src="imgUrl+'sing_bg_top2.png'">
        <div class="sing_bg_yun">
          <img class="sing_bg_yun_img" v-if="imgUrl" :src="imgUrl+'sing_bg_yun.png'">
        </div>
        <div class="sign-icon" @click="goSign">
          <img v-if="imgUrl && !isSign" :src="imgUrl+'sign_btn_n.png'">
          <img v-if="imgUrl && isSign" :src="imgUrl+'sign_btn_p.png'">
        </div>
        <div class="sign-rules" @click="_showRules">
          <img mode="aspectFit" v-if="imgUrl" :src="imgUrl+'sign_rule.png'">
        </div>
        <div class="coin text-center">
          <i-row>
            <i-col span="4">
              <span class="font-click">+5</span>
            </i-col>
            <i-col span="4">
              <span class="font-click">+10</span>
            </i-col>
            <i-col span="4">
              <span class="font-click">+15</span>
            </i-col>
            <i-col span="4">
              <span class="font-click">+20</span>
            </i-col>
            <i-col span="4">
              <span class="font-click">+25</span>
            </i-col>
            <i-col span="4">
              <span class="font-click">+30</span>
            </i-col>
          </i-row>
          <div class="coin-progress">
            <div class="progress progress1" v-if="daysNum <= 1"></div>
            <div class="progress progress2" v-if="daysNum == 2"></div>
            <div class="progress progress3" v-if="daysNum == 3"></div>
            <div class="progress progress4" v-if="daysNum == 4"></div>
            <div class="progress progress5" v-if="daysNum == 5"></div>
            <div class="progress progress6" v-if="daysNum >= 6"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="sign-list">
      <img class="sign-list-bg" v-if="imgUrl" :src="imgUrl+'sign_day.png'">
      <div class="days">
        <div class="num left blod" :key="k" v-for="(v,k) in daysArr">{{v}}</div>
      </div>
      <div class="ranking">
        <div class="ranking-line ranking-line-title text-center blod">
          <i-row>
            <i-col span="7">排名</i-col>
            <i-col span="10">用户名</i-col>
            <i-col span="7">天数</i-col>
          </i-row>
        </div>
        <div class="ranking-line text-center" :key="k" v-for="(v,k) in signinListArr">
          <i-row>
            <i-col span="5">
              <img class="star" v-if="imgUrl" :src="imgUrl+'sign_ranking_'+(k+1)+'.png'" alt>
            </i-col>
            <i-col span="14">{{v.phone}}</i-col>
            <i-col span="5">{{v.days}}</i-col>
          </i-row>
        </div>
      </div>
    </div>
    <div class="rules-con" v-if="showRules" @click="_hideRules">
      <img class="rules-img" v-if="imgUrl" :src="imgUrl+'sign_rule_bg.png'">
    </div>
    <div class="lh70 text-center" style="color:#ffffff;">本活动最终解释权归太平洋征信所有</div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config";
import store from "@/store";
import { formatTime, showLoading, hideLoading } from "@/utils";
const { $Toast } = require("../../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      userId: "",
      isSign: false,
      showRules: false,
      signinListArr: [],
      daysArr: [],
      daysNum: 0,
      score: 0
    };
  },
  methods: {
    myToast(con) {
      $Toast({
        content: con
      });
    },
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    },
    // 获取签到信息
    getSignInfo() {
      this.daysNum = this.signInfo.signDays;
      this.signDays = this.signInfo.signDays
        ? (this.signInfo.signDays + "").padStart(3, "0")
        : "000";
      this.daysArr = this.signDays.split("");
    },
    //判断是否签到
    signinState() {
      this.$http.post(config.signinState, { userId: this.userId }).then(res => {
        if (res.data.code == 0) {
          if (res.data.data.signSuccess == 1) {
            this.isSign = true;
          }
        }
      });
    },
    // 签到
    goSign() {
      if (this.isSign) {
        this.myToast("已经签到完成!");
        return;
      }
      this.$http
        .post(config.continueSignin, { userId: this.userId })
        .then(res => {
          if (res.data.code == 0) {
            this.myToast("签到成功!");
            var addScore = 1;
            switch (this.daysNum) {
              case 0:
                this.score = 5;
                break;
              case 1:
                this.score = 5;
                break;
              case 2:
                this.score = 10;
                break;
              case 3:
                this.score = 15;
                break;
              case 4:
                this.score = 20;
                break;
              case 5:
                this.score = 25;
                break;
              case 6:
                this.score = 30;
                break;
              default:
                this.score = 30;
            }
            this.daysNum += 1;
            this.signDays = (this.daysNum + "").padStart(3, "0");
            this.daysArr = this.signDays.split("");
            console.log(this.signInfo.score, this.score);
            store.commit("setSign", {
              score: this.signInfo.score + this.score,
              signDays: this.daysNum
            });
            this.isSign = true;
          }
        });
    },
    // 显示签到规则
    _showRules() {
      this.showRules = true;
    },
    // 隐藏签到规则
    _hideRules(e) {
      console.log(e);
      this.showRules = false;
    },
    // 排行榜
    getSigninList() {
      this.$http.post(config.signinList).then(res => {
        if (res.data.code == 0) {
          this.signinListArr = res.data.data.map(v => {
            v.phone = v.phone.substr(0, 3) + "****" + v.phone.substr(7, 4);
            return v;
          });
        }
      });
    }
  },
  computed: {
    signInfo() {
      return store.state.sign;
    }
  },
  mounted() {
    this.getLoginInfo();
    this.getSignInfo();
    this.signinState();
    this.getSigninList();
  }
};
</script>
<style lang="scss" scoped>
.sign-body {
  background: #209bf9;
  .sing_bg_top2 {
    position: relative;
    width: 100%;
    height: 400rpx;
    .sing_bg_top2_img {
      width: 100%;
      height: 100%;
    }
    .sing_bg_yun {
      position: absolute;
      left: 0;
      bottom: -100rpx;
      width: 100%;
      height: 240rpx;
      .sing_bg_yun_img {
        width: 100%;
        max-height: 100%;
      }
    }
    .sign-icon {
      position: absolute;
      width: 180rpx;
      height: 180rpx;
      top: 50%;
      left: 50%;
      margin-top: -90rpx;
      margin-left: -90rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .sign-rules {
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      width: 145rpx;
      height: 85rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .coin {
      width: 100%;
      position: absolute;
      bottom: -20rpx;
      left: 0;
      z-index: 2;
      .coin-progress {
        width: 90%;
        height: 30rpx;
        margin-left: 5%;
        background: #1466a7;
        border: solid 10rpx #2196f4;
        border-radius: 25rpx;
        .progress {
          height: 50rpx;
          margin-top: -10rpx;
          margin-left: -10rpx;
          background: linear-gradient(#e4ffca, #a6ff52);
          border-radius: 25rpx;
        }
        .progress1 {
          width: 50rpx;
        }
        .progress2 {
          width: 25%;
        }
        .progress3 {
          width: 43%;
        }
        .progress4 {
          width: 60%;
        }
        .progress5 {
          width: 80%;
        }
        .progress6 {
          width: 103%;
        }
      }
    }
  }
}
.sign-list {
  position: relative;
  width: 90%;
  margin-left: 5%;
  height: 1000rpx;
  margin-top: 100rpx;
  .sign-list-bg {
    width: 100%;
    height: 100%;
  }
  .days {
    position: absolute;
    left: 166rpx;
    top: 83rpx;
    width: 337rpx;
    height: 150rpx;
    .num {
      width: 70rpx;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      margin: 20rpx 20rpx;
      border: solid 1px #209bf9;
      border-radius: 10rpx;
      font-size: 80rpx;
    }
  }
  .ranking {
    position: absolute;
    left: 0;
    top: 358rpx;
    width: 98%;
    height: 632rpx;
    .ranking-line-title {
      width: 100% !important;
      border-radius: 0rpx !important;
      margin-left: 0 !important;
    }
    .ranking-line {
      width: 90%;
      margin-left: 5%;
      height: 70rpx;
      line-height: 70rpx;
      background: #d0eff1;
      margin-bottom: 35rpx;
      border-radius: 10rpx;
      color: #a0713b;
      .star {
        display: inline-block;
        width: 50rpx;
        height: 51rpx;
        margin-top: 10rpx;
      }
    }
  }
}
.rules-con {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  .rules-img {
    width: 500rpx;
    height: 500rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250rpx;
    margin-top: -250rpx;
  }
}
</style>
