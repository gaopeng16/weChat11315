<template>
  <div>
    <div class="man-top">
      <div class="man-name">
        <LastName
          v-if="!headUrl"
          :lastname="humanName"
          :width="100"
          :height="100"
          :lineHeight="100"
          fontSize="60"
        ></LastName>
        <div v-else class="head-img left">
          <img :src="headUrl">
        </div>
        <div class="left ml20 bold human-name">{{humanName}}</div>
      </div>
      <div class="description">
        {{subDescription}}
        <span
          @click="showMoreDescription"
          class="look-more font-click text-center"
        >查看更多∧</span>
      </div>
    </div>
    <div class="mengban" v-if="lookMore">
      <div class="con relative">
        <div class="con-name">
          <LastName v-if="!headUrl" :lastname="lastname"></LastName>
          <div v-else class="head-img-more left">
            <img :src="headUrl">
          </div>
          <div class="left lh70 ml20 blod">{{humanName}}</div>
        </div>
        <div class="close absolute" @click="hideMoreDescription">
          <i-icon size="20" type="close"/>
        </div>
        <div class="all-des">{{description}}</div>
      </div>
    </div>
    <div class="currentScroll-box" :class="fixedClass">
      <i-tabs :current="currentScroll" scroll @change="handleChangeScroll">
        <i-tab key="tab1" :title="'作为法人('+legalList.length+')'"></i-tab>
        <i-tab key="tab2" :title="'作为股东('+holderList.length+')'"></i-tab>
        <i-tab key="tab3" :title="'作为高管('+officeList.length+')'"></i-tab>
        <i-tab key="tab4" :title="'所有企业('+allCompanys.length+')'"></i-tab>
        <i-tab key="tab5" :title="'合作伙伴('+partners.length+')'"></i-tab>
      </i-tabs>
    </div>
    <div class="currentScroll-container">
      <!-- 法人 -->
      <div v-if="currentScroll === 'tab1'">
        <div class="search-item" :key="index" v-for="(item,index) in legalList">
          <div class="left ml20">
            <FontImg
              :brief="item.name"
              :logoUrl="item.logo"
              :width="70"
              :height="70"
              :lineHeight="35"
            ></FontImg>
          </div>
          <div class="com-info title cname lh70">{{item.name}}</div>
          <div class="com-info">
            法人代表:
            <span
              class="font-click"
              @click="goManInfo(item.legalPersonName)"
            >{{item.legalPersonName}}</span>
          </div>
          <div class="com-info">
            注册资本:
            <span class="title">{{item.regCapital}}</span>
          </div>
          <div class="com-info">
            省份地区:
            <span class="title">{{item.base}}</span>
          </div>
          <div class="com-info">
            成立日期:
            <span class="title">{{item.estiblishTime}}</span>
          </div>
          <div
            class="state"
            :class="[(item.regStatus == '吊销' || item.regStatus == '注销')  ? 'state-red' : '']"
            v-if="item.regStatus"
          >{{item.regStatus}}</div>
          <div class="clearboth line mt20"></div>
          <div class="lh70 position" v-if="item.other">
            <img class="ml20 left" v-if="imgUrl" :src="imgUrl+'tab2_normal.png'">
            <span class="left lh50 ml20">{{item.other}}</span>
          </div>
        </div>
      </div>
      <!-- 股东 -->
      <div v-if="currentScroll === 'tab2'">
        <div class="search-item" :key="index" v-for="(item,index) in holderList">
          <div class="left ml20">
            <FontImg
              :brief="item.name"
              :logoUrl="item.logo"
              :width="70"
              :height="70"
              :lineHeight="35"
            ></FontImg>
          </div>
          <div class="com-info title cname lh70">{{item.name}}</div>
          <div class="com-info">
            法人代表:
            <span
              class="font-click"
              @click="goManInfo(item.legalPersonName)"
            >{{item.legalPersonName}}</span>
          </div>
          <div class="com-info">
            注册资本:
            <span class="title">{{item.regCapital}}</span>
          </div>
          <div class="com-info">
            省份地区:
            <span class="title">{{item.base}}</span>
          </div>
          <div class="com-info">
            成立日期:
            <span class="title">{{item.estiblishTime}}</span>
          </div>
          <div
            class="state"
            :class="[(item.regStatus == '吊销' || item.regStatus == '注销')  ? 'state-red' : '']"
            v-if="item.regStatus"
          >{{item.regStatus}}</div>
          <div class="clearboth line mt20"></div>
          <div class="lh70 position" v-if="item.other">
            <img class="ml20 left" v-if="imgUrl" :src="imgUrl+'tab2_normal.png'">
            <span class="left lh50 ml20">{{item.other}}</span>
          </div>
        </div>
      </div>
      <!-- 高管 -->
      <div v-if="currentScroll === 'tab3'">
        <div class="search-item" :key="index" v-for="(item,index) in officeList">
          <div class="left ml20">
            <FontImg
              :brief="item.name"
              :logoUrl="item.logo"
              :width="70"
              :height="70"
              :lineHeight="35"
            ></FontImg>
          </div>
          <div class="com-info title cname lh70">{{item.name}}</div>
          <div class="com-info">
            法人代表:
            <span
              class="font-click"
              @click="goManInfo(item.legalPersonName)"
            >{{item.legalPersonName}}</span>
          </div>
          <div class="com-info">
            注册资本:
            <span class="title">{{item.regCapital}}</span>
          </div>
          <div class="com-info">
            省份地区:
            <span class="title">{{item.base}}</span>
          </div>
          <div class="com-info">
            成立日期:
            <span class="title">{{item.estiblishTime}}</span>
          </div>
          <div
            class="state"
            :class="[(item.regStatus == '吊销' || item.regStatus == '注销')  ? 'state-red' : '']"
            v-if="item.regStatus"
          >{{item.regStatus}}</div>
          <div class="clearboth line mt20"></div>
          <div class="lh70 position" v-if="item.other">
            <img class="ml20 left" v-if="imgUrl" :src="imgUrl+'tab2_normal.png'">
            <span class="left lh50 ml20">{{item.other}}</span>
          </div>
        </div>
      </div>
      <!-- 所有企业 -->
      <div v-if="currentScroll === 'tab4'">
        <div class="search-item" :key="index" v-for="(item,index) in allCompanys">
          <div class="left ml20">
            <FontImg :brief="item.name" :width="70" :height="70" :lineHeight="35"></FontImg>
          </div>
          <div class="com-info title cname lh70">{{item.name}}</div>
          <div class="com-info">
            法人代表:
            <span class="title">{{item.legalName}}</span>
          </div>
          <div class="com-info">
            注册资本:
            <span class="title">{{item.regCapital}}</span>
          </div>
          <div class="com-info">
            成立日期:
            <span class="title">{{item.estiblishTime}}</span>
          </div>
          <div
            class="state"
            :class="[(item.regStatus == '吊销' || item.regStatus == '注销')  ? 'state-red' : '']"
            v-if="item.regStatus"
          >{{item.regStatus}}</div>
          <div class="clearboth line mt20"></div>
          <div class="lh70 position" v-if="item.other">
            <img class="ml20 left" v-if="imgUrl" :src="imgUrl+'tab2_normal.png'">
            <span class="left lh50 ml20">{{item.other}}</span>
          </div>
        </div>
      </div>
      <!-- 合作伙伴 -->
      <div v-if="currentScroll === 'tab5'">
        <div
          class="partners"
          :key="index"
          v-for="(item,index) in partners"
          @click="goManInfo(item.name)"
        >
          <div class="left ml20">
            <LastName :lastname="item.name" :headUrl="item.headUrl"></LastName>
          </div>
          <span class="left ml20 lh70 title blod">{{item.name}}</span>
          <span class="right origin-deep mr20">他有{{item.companyNum}}家公司</span>
          <div class="partner-com clearboth" :key="k" v-for="(v,k) in item.office">{{v.companyName}}</div>
          <div class="line mt20"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config";
import { formatTime } from "@/utils";
import tycAreaCode from "@/utils/tycAreaCode.js";
import LastName from "@/components/LastName";
import FontImg from "@/components/FontImg";
export default {
  components: { LastName, FontImg },
  data() {
    return {
      imgFile: config.imgFile,
      imgUrl: config.imgUrl,
      humanName: "",
      lastname: "",
      companyName: "",
      headUrl: "",
      subDescription: "", //人物简介-截取
      description: "", //人物简介
      lookMore: false,
      currentScroll: "tab1",
      fixedClass: "",
      allCompanys: [], // 所有企业
      partners: [], // 合作伙伴
      holderList: [], // 股东
      legalList: [], //法人
      officeList: [] //高管
    };
  },
  methods: {
    //人物简介
    getDescription() {
      this.$http
        .get(config.human, {
          uri:
            "https://open.api.tianyancha.com/services/v3/newopen/description.json?humanName=" +
            this.humanName +
            "&name=" +
            this.companyName,
          companyName: this.companyName,
          human: this.humanName,
          urlType: "description"
        })
        .then(res => {
          if (res.data.state === "ok") {
            const headUrl = res.data.data.headUrl;
            this.$http
              .post(config.typImg, { imgUrl: headUrl, imgId: new Date() })
              .then(res => {
                if (res.data.code == 0) {
                  this.headUrl = res.data.data.newImgUrl;
                }
              });
            this.description = res.data.data.introduction;
            this.subDescription =
              this.description.length > 70
                ? this.description.substr(0, 70)
                : this.description;
          }
        });
    },
    //人员商业角色
    getRoles() {
      this.$http
        .get(config.human, {
          uri:
            "https://open.api.tianyancha.com/services/v3/newopen/allCompanys.json?humanName=" +
            this.humanName +
            "&name=" +
            this.companyName,
          companyName: this.companyName,
          human: this.humanName,
          urlType: "roles"
        })
        .then(res => {
          if (res.data.reason === "ok") {
            console.log("角色", res);
            this.holderList = res.data.result.holderList.map(item => {
              item.estiblishTime = item.estiblishTime
                ? formatTime(new Date(item.estiblishTime), 0)
                : "-";
              item.regStatus = item.regStatus.substr(0, 2);
              item.base = tycAreaCode[item.base];
              item.other = "";
              for (let val of res.data.result.officeList) {
                if (val.name == item.name) {
                  item.other =
                    "TA是股东(" + item.percent + "),同时任职" + val.type;
                }
              }
              if (item.other.length == 0) {
                item.other = "TA是股东(" + item.percent + ")";
              }
              return item;
            });
            this.legalList = res.data.result.legalList.map(item => {
              item.estiblishTime = item.estiblishTime
                ? formatTime(new Date(item.estiblishTime), 0)
                : "-";
              item.regStatus = item.regStatus.substr(0, 2);
              item.base = tycAreaCode[item.base];
              item.other = "";
              for (let val of res.data.result.holderList) {
                if (val.name == item.name) {
                  item.other = "TA是股东(" + val.percent + ")";
                }
              }
              for (let val of res.data.result.officeList) {
                if (val.name == item.name) {
                  if (item.other.length == 0) {
                    item.other = item.other = "TA任职" + val.type;
                  } else {
                    item.other = item.other + ",同时任职" + val.type;
                  }
                }
              }
              return item;
            });
            this.officeList = res.data.result.officeList.map(item => {
              item.estiblishTime = item.estiblishTime
                ? formatTime(new Date(item.estiblishTime), 0)
                : "-";
              item.regStatus = item.regStatus.substr(0, 2);
              item.base = tycAreaCode[item.base];
              item.other = "";
              for (let val of res.data.result.holderList) {
                if (val.name == item.name) {
                  item.other =
                    "TA是股东(" + val.percent + "),同时任职" + item.type;
                }
              }
              if (item.other.length == 0) {
                item.other = "TA任职" + item.type;
              }
              return item;
            });
            this.getAllCompanys();
          }
        });
    },
    // 所有企业
    getAllCompanys() {
      this.$http
        .get(config.human, {
          uri:
            "https://open.api.tianyancha.com/services/v3/newopen/allCompanys.json?humanName=" +
            this.humanName +
            "&name=" +
            this.companyName,
          companyName: this.companyName,
          human: this.humanName,
          urlType: "allCompanies"
        })
        .then(res => {
          if (res.data.state === "ok") {
            this.allCompanys = res.data.data.map(item => {
              item.regStatus = item.regStatus
                ? item.regStatus.substr(0, 2)
                : "--";
              item.estiblishTime = formatTime(
                new Date(item.estiblishTime),
                "0"
              );
              if (item.type.includes("法人")) {
                item.legalName = this.humanName;
              } else {
                for (let val of this.holderList) {
                  if (val.name == item.name) {
                    item.legalName = val.legalPersonName;
                  } else {
                    for (let v of this.officeList) {
                      if (v.name == item.name) {
                        item.legalName =
                          v.legalPersonName == "undefined"
                            ? "--"
                            : v.legalPersonName;
                      }
                    }
                  }
                }
              }
              item.other = "";
              for (let val of this.holderList) {
                if (val.name == item.name) {
                  item.other =
                    "TA是股东(" +
                    val.percent +
                    "),同时任职" +
                    item.type.replace(
                      /(,法人)|(法人,)|(法人)|(,股东)|(股东,)|(股东)/g,
                      ""
                    );
                }
              }
              if (item.other.length == 0) {
                item.other =
                  "TA任职" +
                  item.type.replace(
                    /(,法人)|(法人,)|(法人)|(,股东)|(股东,)|(股东)/g,
                    ""
                  );
              }
              return item;
            });
          }
        });
    },
    // 人物所有合作伙伴
    getPartners() {
      this.$http
        .get(config.human, {
          uri:
            "https://open.api.tianyancha.com/services/v3/newopen/partners.json?humanName=" +
            this.humanName +
            "&name=" +
            this.companyName,
          companyName: this.companyName,
          human: this.humanName,
          urlType: "partners"
        })
        .then(res => {
          if (res.data.state === "ok") {
            this.partners = res.data.data;
          }
        });
    },
    //显示更多任务简介
    showMoreDescription() {
      if (!this.lookMore) {
        this.lookMore = true;
      }
    },
    //隐藏更多任务简介
    hideMoreDescription() {
      this.lookMore = false;
    },
    handleChangeScroll(detail) {
      this.currentScroll = detail.target.key;
    },
    // 跳转到人物详情页
    goManInfo(name) {
      wx.navigateTo({
        url:
          "/pages/manInfo/main?humanName=" +
          name +
          "&companyName=" +
          this.companyName
      });
    },
    //获取路由参数
    getParam() {
      this.humanName = this.$root.$mp.query.humanName;
      this.companyName = this.$root.$mp.query.companyName;
    }
  },
  //页面滚动执行方式
  /* onPageScroll(e) {
    if (e.scrollTop >= 100) {
      this.fixedClass = "currentScroll-box-fixed";
    } else {
      this.fixedClass = "";
    }
  }, */
  mounted() {
    this.getParam();
    this.lastname = this.humanName.substr(0, 1);
    this.getRoles();
    this.getDescription();
    this.getPartners();
    // this.getAllCompanys();
  }
};
</script>
<style lang="scss" scoped>
scroll-view {
  height: 100vh;
}
.man-name {
  overflow: hidden;
  padding: 40rpx;
  .head-img {
    width: 100rpx;
    height: 100rpx;
    border-radius: 5rpx;
    overflow: hidden;
    img {
      width: 100rpx;
      height: 100rpx;
    }
  }
  .human-name {
    font-size: 40rpx;
    line-height: 100rpx;
  }
}
.description {
  position: relative;
  text-indent: 50rpx;
  line-height: 30rpx;
  padding: 0 40rpx;
  height: 120rpx;
  overflow: hidden;
  /* .look-more {
    position: absolute;
    left: 40rpx;
    bottom: 0rpx;
    display: block;
    width: calc(100% - 80rpx);
    height: 50rpx;
    line-height: 50rpx;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8),
      white
    ); 
  } */
}
.mengban {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  .con-name {
    margin: 30rpx 20rpx;
    overflow: hidden;
    .head-img-more {
      width: 70rpx;
      height: 70rpx;
      border-radius: 5rpx;
      overflow: hidden;
      img {
        width: 70rpx;
        height: 70rpx;
      }
    }
  }
  .con {
    width: 80%;
    height: calc(100vh - 200rpx);
    margin: 100rpx 10%;
    background: #ffffff;
    border-radius: 10rpx;
    overflow: hidden;
    .close {
      right: 20rpx;
      top: 15rpx;
    }
    .all-des {
      padding: 0 20rpx;
    }
  }
}
.currentScroll-box {
  border-top: 15rpx solid #dddee1;
}
.currentScroll-box-fixed {
  position: fixed;
  top: -15rpx;
  left: 0;
  z-index: 998;
}
.search-item {
  position: relative;
  width: 100%;
  height: auto;
  padding: 10rpx 0 15rpx 0;
  background: #ffffff;
  border-top: solid 10rpx #dddee1;
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
  .state {
    position: absolute;
    right: 35rpx;
    top: 20rpx;
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
  .position {
    overflow: hidden;
    padding: 15rpx 0 0 0;
    img {
      margin-top: 5rpx;
      width: 40rpx;
      height: 40rpx;
    }
  }
}
.partners {
  padding-top: 20rpx;
  .partner-com {
    margin-left: 110rpx;
  }
}
</style>

