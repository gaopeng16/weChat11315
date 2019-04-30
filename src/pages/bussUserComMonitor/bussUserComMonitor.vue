<template>
  <div>
    <i-tabs :current="current" @change="handleChange">
      <i-tab key="tab1" title="监控企业"></i-tab>
      <i-tab key="tab2" title="监控动态"></i-tab>
    </i-tabs>
    <div class="tab1" v-if="current == 'tab1'">
      <div class="tab-total">
        共监控
        <span class="red">{{monitorArr.length}}</span> 家公司
      </div>
      <div
        class="brief-card-container"
        :key="index"
        v-for="(item,index) in monitorArr"
        @click="goDetail(item.companyName,item.companyId)"
      >
        <div class="avatar">
          <img v-if="imgFile && item.logoUrl" class="img" :src="imgFile+item.logoUrl ">
          <img v-else class="img" :src="imgUrl+'logo_n.png'">
        </div>
        <div class="detail">
          <div class="title">{{item.companyName}}</div>
          <div class="time">{{item.createTime}}</div>
        </div>
      </div>
      <div class="no-data" v-if="!noM">
        <img :src="imgUrl+'ic_empty.png'">
        <br>
        <span>暂无数据</span>
      </div>
    </div>
    <div class="tab2" v-if="current == 'tab2'">
      <div class="tab-total">
        您有
        <span class="red">{{monitorArr.length}}</span> 封报未读
        <div class="allread" @click="readAll()">全部已读</div>
      </div>
      <div
        class="daily-report"
        :key="key"
        v-for="(item,key) in queryRadarArr"
        @click="dailyReport(item)"
      >
        <div class="head">
          <div class="title">监控日报</div>
          <div class="date">{{item.date}}</div>
          <div class="state">共{{item.num}}条动态</div>
        </div>
        <div class="list" :key="k" v-for="(v,k) in item.comInfoList">
          <div class="item">
            <div class="name title">{{v.companyName}}</div>
            <div class="info sub-content-light">
              <span :key="k1" v-for="(v1,k1) in v.comInfors">
                <span v-if="k1 <= 2">&nbsp;{{v1.typeName}}{{v1.num}}条</span>
              </span>
              <span v-if="v.comInfors.length > 2">...</span>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="!noDyn">
        <img :src="imgUrl+'ic_empty.png'">
        <br>
        <span>暂无数据</span>
      </div>
    </div>
    <i-spin v-if="flag" size="large" fix></i-spin>
  </div>
</template>
<script>
import config from "@/config.js";
import { mapMutations } from "vuex";
import { SET_DAILY_REPORT } from "@/store/mutation-types";
export default {
  data() {
    return {
      current: "tab1",
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      userId: "",
      monitorArr: [], //监控数据
      queryRadarArr: [], //监控动态
      noM: false, //没有监控数据
      noDyn: false, //没有动态数据
      page: 1,
      more: true,
      flag: false
    };
  },
  methods: {
    ...mapMutations({
      SET_DAILY_REPORT
    }),
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    },
    handleChange(e) {
      this.current = e.mp.detail.key;
    },
    // 获取监控企业
    getMonitor() {
      this.$http
        .get(config.bussUserComMonitor, { userId: this.userId })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data.count > 0) {
              this.noM = true;
              this.monitorArr = res.data.data.data;
            } else {
              this.noM = false;
            }
          }
        });
    },
    // 获取监控动态 queryRadarByUserId
    queryRadarByUserId(init) {
      this.flag = true;
      let param = {
        page: this.page
      };
      this.$http.get(config.queryRadarByUserId, param).then(res => {
        this.flag = false;
        if (res.data.code == 0) {
          this.noDyn = true;
          const queryRadarData = res.data.data.records.map(item => {
            item.date = item.date ? item.date.substr(0, 10) : "--";
            item.comInfoList = JSON.parse(item.comInfoList);
            item.comInfoList.map(val => {
              val.comInfors.map(v => {
                v.changeInfo = JSON.parse(v.changeInfo);
                let typeName = "";
                switch (v.type) {
                  case 1: // 法律诉讼
                    typeName = "法律诉讼";
                    break;
                  case 2: // 法院公告
                    typeName = "法院公告";
                    break;
                  case 3: // 开庭公告
                    typeName = "开庭公告";
                    break;
                  case 4: // 司法协助
                    typeName = "司法协助";
                    break;
                  case 5: // 经营异常
                    typeName = "经营异常";
                    break;
                  case 6: // 股权出质
                    typeName = "股权出质";
                    break;
                  case 7: // 动产抵押
                    typeName = "动产抵押";
                    break;
                  case 8: // 司法拍卖
                    typeName = "司法拍卖";
                    break;
                  case 9: // 被执行人
                    typeName = "被执行人";
                    break;
                  case 10: // 失信人
                    typeName = "失信人";
                    break;
                  case 11: // 严重违法
                    typeName = "严重违法";
                    break;
                  case 12: // 行政处罚
                    typeName = "行政处罚";
                    break;
                  case 13: // 欠税公告
                    typeName = "欠税公告";
                    break;
                  case 14: // 清算信息
                    typeName = "清算信息";
                    break;
                  case 15: // 工商信息
                    typeName = "工商信息";
                    break;
                  case 16: // 资质证书
                    typeName = "资质证书";
                    break;
                  case 17: // 主要人员
                    typeName = "主要人员";
                    break;
                  case 18: // 股东
                    typeName = "股东";
                    break;
                  case 19: // 对外投资
                    typeName = "对外投资";
                    break;
                  case 20: // 分支机构
                    typeName = "分支机构";
                    break;
                  case 21: // 最终受益人
                    typeName = "最终受益人";
                    break;
                  case 22: // 实际控制权
                    typeName = "实际控制权";
                    break;
                  case 23: // 年报
                    typeName = "年报";
                    break;
                  case 24: // 新闻
                    typeName = "新闻";
                    break;
                  case 25: // 专利信息
                    typeName = "专利信息";
                    break;
                  case 26: // 商标信息
                    typeName = "商标信息";
                    break;
                }
                v.typeName = typeName;
                return v;
              });
              return val;
            });
            return item;
          });
          if (init) {
            this.queryRadarArr = queryRadarData;
          } else {
            this.queryRadarArr = [...this.queryRadarArr, ...queryRadarData];
          }
        } else {
          this.noDyn = false;
        }
      });
    },
    // 某一天的日报页面
    dailyReport(data) {
      this.SET_DAILY_REPORT(data);
      if (data.isOpened == 0) {
        this.$http
          .get("/app/buss/radarmain/setAlreadyRead", { dailyId: data.id })
          .then(res => {
            if (res.data.code == 0) {
              this.getMonitor();
            }
          });
      }
      wx.navigateTo({
        url: "/pages/dailyReport/main"
      });
    },
    // 公司监控详情
    goDetail(companyName, companyId) {
      wx.navigateTo({
        url:
          "/pages/monitorDetail/main?companyName=" +
          companyName +
          "&companyId=" +
          companyId
      });
    },
    // 全部已读
    readAll() {
      this.$http
        .get("/app/buss/radarmain/radarRead", { userId: this.userId })
        .then(res => {
          if (res.data.code == 0 && res.data.data == 1) {
            this.getMonitor();
          }
        });
    }
  },
  onReachBottom() {
    this.page++;
    this.queryRadarByUserId();
  },
  mounted() {
    this.getLoginInfo();
    this.getMonitor();
    this.queryRadarByUserId(true);
  }
};
</script>
<style lang="scss" scoped>
.brief-card-container {
  width: calc(94% - 36px);
  margin-left: 36px;
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 3px 5px 0px #dddddd;
  min-height: 130rpx;
  position: relative;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: -15px;
    margin-top: 5px;
    float: left;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    width: calc(100% - 40px);
    float: left;
    margin-left: 10px;
    .title {
      font-size: 16px;
      line-height: 40rpx;
      padding-top: 10px;
    }
    .time {
      position: absolute;
      bottom: 5px;
      left: 36px;
      color: #999;
      font-size: 12px;
    }
  }
}
.no-data {
  text-align: center;
  img {
    width: 300rpx;
    height: 300rpx;
    margin-top: 200rpx;
  }
}
.tab-total {
  background: #f2f2f2;
  text-indent: 20rpx;
  line-height: 80rpx;
  .red {
    color: #ff0000;
  }
  .allread {
    float: right;
    margin-right: 10rpx;
    color: #4383da;
  }
}
.daily-report {
  padding: 10px;
  border-bottom: dotted 1px #bbbec4;
  .head {
    overflow: hidden;
    line-height: 60rpx;
    .title {
      float: left;
      width: 150rpx;
      text-align: center;
      background: #209bf9;
      color: #ffffff;
      border-top-left-radius: 22rpx;
      border-bottom-right-radius: 22rpx;
    }
    .date {
      float: left;
      margin-left: 20rpx;
    }
    .state {
      float: right;
    }
  }
  .item {
    text-indent: 12rpx;
    margin: 10rpx 0;
    .name {
      height: 46rpx;
      line-height: 46rpx;
      vertical-align: middle;
      overflow: hidden;
    }
    .name::before {
      content: "";
      display: block;
      width: 8rpx;
      height: 8rpx;
      margin-top: 21rpx;
      border-radius: 50%;
      background: #495060;
      margin-right: 8rpx;
      float: left;
    }
    .info {
      text-indent: 16rpx;
      font-size: 26rpx;
    }
  }
}
</style>
