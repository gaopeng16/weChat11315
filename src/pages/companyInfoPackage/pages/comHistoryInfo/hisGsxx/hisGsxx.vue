<template>
  <div>
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisGsxx/main'"
      v-if="Object.keys(data).lneght <=0 || (pastLegalPersonList.length <= 0 && historyNameList.length <= 0 && deadLineList.length <= 0 && regNumberList.length <= 0 && businessScopeList.length <= 0 && regCapitalList.length <= 0 && pastStafferList.length <= 0 && locationList.length <= 0 && creditCodeList.length <= 0 && typeList.length <= 0 && orgNumberList.length <= 0)"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisGsxx/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!-- 历史法人代表 pastLegalPersonList-->
      <div class="column-title" v-if="pastLegalPersonList.length > 0">
        <div class="left title blod ml15">历史法人代表</div>
        <div class="right mr15 sub-content">{{pastLegalPersonList.length}}</div>
      </div>
      <div v-if="pastLegalPersonList.length > 0">
        <div :key="k" v-for="(v,k) in pastLegalPersonList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0 ?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div class="overflow-hidden lh70">
              <LastName :lastname="v.name"></LastName>
              <span class="man-name font-click left ml15">{{v.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史曾用名 historyNameList-->
      <div class="column-title" v-if="historyNameList.length > 0">
        <div class="left title blod ml15">历史曾用名</div>
        <div class="right mr15 sub-content">{{historyNameList.length}}</div>
      </div>
      <div v-if="historyNameList.length > 0">
        <div :key="k" v-for="(v,k) in historyNameList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史经营范围 -->
      <div class="column-title" v-if="businessScopeList.length > 0">
        <div class="left title blod ml15">历史经营范围</div>
        <div class="right mr15 sub-content">{{businessScopeList.length}}</div>
      </div>
      <div v-if="businessScopeList.length > 0">
        <div :key="k" v-for="(v,k) in businessScopeList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div class="gsxx-con" :class="[key==k?'gsxx-con-auto':'']">{{v.name}}</div>
            <div
              v-if="v.name !== '无'"
              class="font-click text-center"
              @click="show(k)"
            >{{key==k?'收起':'展开'}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史注册资本 -->
      <div class="column-title" v-if="regCapitalList.length > 0">
        <div class="left title blod ml15">历史注册资本</div>
        <div class="right mr15 sub-content">{{regCapitalList.length}}</div>
      </div>
      <div v-if="regCapitalList.length > 0">
        <div :key="k" v-for="(v,k) in regCapitalList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史主要人员 -->
      <div class="column-title" v-if="pastStafferList.length > 0">
        <div class="left title blod ml15">历史主要人员</div>
        <div class="right mr15 sub-content">{{pastStafferList.length}}</div>
      </div>
      <div v-if="pastStafferList.length > 0">
        <div :key="k" v-for="(v,k) in pastStafferList">
          <div :key="y" v-for="(x,y) in v">
            <div class="time-box sub-content-light">
              <div class="time-icon left" :class="[k==0 && y==0?'time-icon-first':'']">
                <img v-if="imgUrl && k==0 && y==0" :src="imgUrl+'time_icon_cur.png'">
                <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
              </div>
              <div class="time ml15 left">{{x.time}}</div>
            </div>
            <div class="gsxx-container">
              <div class="overflow-hidden lh70">
                <LastName :lastname="x.name"></LastName>
                <span class="man-name font-click left ml15">{{x.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史营业期限 deadLineList-->
      <div class="column-title" v-if="deadLineList.length > 0">
        <div class="left title blod ml15">历史营业期限</div>
        <div class="right mr15 sub-content">{{deadLineList.length}}</div>
      </div>
      <div v-if="deadLineList.length > 0">
        <div :key="k" v-for="(v,k) in deadLineList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史注册号 regNumberList-->
      <div class="column-title" v-if="regNumberList.length > 0">
        <div class="left title blod ml15">历史注册号</div>
        <div class="right mr15 sub-content">{{regNumberList.length}}</div>
      </div>
      <div v-if="regNumberList.length > 0">
        <div :key="k" v-for="(v,k) in regNumberList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史注册地址 locationList-->
      <div class="column-title" v-if="locationList.length > 0">
        <div class="left title blod ml15">历史注册地址</div>
        <div class="right mr15 sub-content">{{locationList.length}}</div>
      </div>
      <div v-if="locationList.length > 0">
        <div :key="k" v-for="(v,k) in locationList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史统一信用代码 creditCodeList-->
      <div class="column-title" v-if="creditCodeList.length > 0">
        <div class="left title blod ml15">历史统一信用代码</div>
        <div class="right mr15 sub-content">{{creditCodeList.length}}</div>
      </div>
      <div v-if="creditCodeList.length > 0">
        <div :key="k" v-for="(v,k) in creditCodeList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史企业类型 typeList-->
      <div class="column-title" v-if="typeList.length > 0">
        <div class="left title blod ml15">历史企业类型</div>
        <div class="right mr15 sub-content">{{typeList.length}}</div>
      </div>
      <div v-if="typeList.length > 0">
        <div :key="k" v-for="(v,k) in typeList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 历史工商注册号 orgNumberList-->
      <div class="column-title" v-if="orgNumberList.length > 0">
        <div class="left title blod ml15">历史工商注册号</div>
        <div class="right mr15 sub-content">{{orgNumberList.length}}</div>
      </div>
      <div v-if="orgNumberList.length > 0">
        <div :key="k" v-for="(v,k) in orgNumberList">
          <div class="time-box sub-content-light">
            <div class="time-icon left" :class="[k==0?'time-icon-first':'']">
              <img v-if="imgUrl && k==0" :src="imgUrl+'time_icon_cur.png'">
              <img v-else-if="imgUrl" :src="imgUrl+'time_icon_lat.png'">
            </div>
            <div class="time ml15 left">{{v.time}}</div>
          </div>
          <div class="gsxx-container">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="bottom90"></div>
      <Share></Share>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import LastName from "@/components/LastName";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, LastName, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      imgFile: config.imgFile,
      imgUrl: config.imgUrl,
      title: "历史信息",
      subTitle: "历史工商信息",
      total: "",
      data: {},
      pastLegalPersonList: [], //历史法人代表
      historyNameList: [], // 历史曾用名
      deadLineList: [], // 历史营业期限
      regNumberList: [], // 历史注册号
      businessScopeList: [], //历史经营范围
      regCapitalList: [], //历史注册资本
      pastStafferList: [], //历史主要人员
      locationList: [], //历史注册地址
      creditCodeList: [], // 历史统一信用代码
      typeList: [], //历史企业类型
      orgNumberList: [], // 历史工商注册号
      key: -1,
      _k1: -1
    };
  },
  methods: {
    init() {
      this.$http
        .get("app/buss/companyInfo/comHx", {
          companyId: this.companyId,
          type: "pastIc"
        })
        .then(res => {
          if (res.data.code == 0) {
            this.data = res.data.data;
            if (Object.keys(this.data).length <= 0) {
              return false;
            }
            // 历史法人代表
            this.pastLegalPersonList = !res.data.data.pastLegalPersonList
              ? []
              : res.data.data.pastLegalPersonList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            // 历史曾用名
            this.historyNameList = !res.data.data.historyNameList
              ? []
              : res.data.data.historyNameList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            // 历史经营范围
            this.businessScopeList = !res.data.data.businessScopeList
              ? []
              : res.data.data.businessScopeList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            // 历史注册资本
            this.regCapitalList = !res.data.data.regCapitalList
              ? []
              : res.data.data.regCapitalList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            // 历史主要人员
            this.pastStafferList = !res.data.data.pastStafferList
              ? []
              : res.data.data.pastStafferList.map(item => {
                  item.map(v => {
                    v.time = v.time ? v.time.substr(0, 10) : "--";
                    return v;
                  });
                  return item;
                });
            // 历史营业期限
            this.deadLineList = !res.data.data.deadLineList
              ? []
              : res.data.data.deadLineList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            // 历史注册号
            this.regNumberList = !res.data.data.regNumberList
              ? []
              : res.data.data.regNumberList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            // 历史注册地址
            this.locationList = !res.data.data.locationList
              ? []
              : res.data.data.locationList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            // 历史统一信用代码
            this.creditCodeList = !res.data.data.creditCodeList
              ? []
              : res.data.data.creditCodeList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            //历史企业类型
            this.typeList = !res.data.data.typeList
              ? []
              : res.data.data.typeList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
            // 历史工商注册号
            this.orgNumberList = !res.data.data.orgNumberList
              ? []
              : res.data.data.orgNumberList.map(item => {
                  item.time = item.time ? item.time.substr(0, 10) : "--";
                  return item;
                });
          }
        });
    },
    show(k) {
      const _k0 = k;
      if (_k0 == this._k1) {
        this.key = -1;
      } else {
        this._k1 = _k0;
        this.key = k;
      }
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.init();
  }
};
</script>
<style lang="scss">
.column-title {
  height: 80rpx;
  line-height: 80rpx;
  border-top: solid 8rpx #cccccc;
  border-bottom: solid 8rpx #e7e7e7;
  .left {
    font-size: 30rpx;
  }
}
.time-box {
  height: 34rpx;
  line-height: 34rpx;
  font-size: 10px;
  margin-left: 10rpx;
  .time-icon {
    width: 34rpx;
    height: 34rpx;
    img {
      width: 12rpx;
      height: 12rpx;
      margin-left: 11rpx;
      margin-top: 11rpx;
    }
  }
  .time-icon-first {
    img {
      width: 34rpx;
      height: 34rpx;
      margin-left: 0;
      margin-top: 0;
    }
  }
}
.gsxx-container {
  margin-left: 25rpx;
  padding: 15rpx;
  height: auto;
  border-left: solid 1px #dddee1;
  .gsxx-con {
    height: 140rpx;
    line-height: 36rpx;
    overflow: hidden;
  }
  .gsxx-con-auto {
    height: auto;
  }
}
</style>
