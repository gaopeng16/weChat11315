<template>
  <div class="search-body">
    <!-- 搜索到的结果页 -->
    <div class="search-result">
      <div class="advanced-search-box">
        <i-row i-class="advanced-search text-center">
          <i-col span="8" @click="showAdvancedDistance">不限距离
            <i-icon :type="distance"></i-icon>
          </i-col>
          <i-col span="8" @click="showAdvancedOptions">全部行业
            <i-icon :type="enter"></i-icon>
          </i-col>
          <i-col span="8" @click="showAdvancedFilter">高级筛选
            <i-icon :type="filter"></i-icon>
          </i-col>
        </i-row>
        <!-- 显示筛选距离的div -->
        <div class="advanced-distance" v-if="advancedDistance">
          <div class="adv-dis">
            <ul>
              <li
                :key="index"
                v-for="(item,index) in distanceArr"
                @click="distanceClick(index)"
              >{{item}}</li>
            </ul>
          </div>
        </div>
        <!-- 显示行业的div -->
        <div class="advance-search-options" v-if="allIndustries">
          <div class="aso-left">
            <div
              class="aso-left-item"
              :class="[industryParentIndex === index ? 'aso-left-active':'']"
              :key="index"
              v-for="(item,index) in industryParent"
              @click="chooseIndustryParent(index)"
            >{{item}}</div>
          </div>
          <div class="aso-right">
            <div
              class="aso-right-item"
              :key="index"
              v-for="(item,index) in industryChildren"
              @click="chooseIndustryChild(index)"
            >{{item.name}}</div>
          </div>
        </div>
        <!-- 高级筛选的条件div -->
        <div class="advanced-filter" v-if="advancedFilter">
          <div class="af-line">
            <div class="af-line-title">
              <span></span>注册资本
            </div>
            <div class="af-select">
              <span
                :class="[capitalIndex === index ? 'advanced-active':'']"
                :key="index"
                v-for="(item,index) in capitalArr"
                @click="captialClick(index)"
              >{{item}}</span>
            </div>
          </div>
          <div class="af-line">
            <div class="af-line-title">
              <span></span>成立年限
            </div>
            <div class="af-select">
              <span
                :class="[dateIndex === index ? 'advanced-active':'']"
                :key="index"
                v-for="(item,index) in dateArr"
                @click="dateClick(index)"
              >{{item}}</span>
            </div>
          </div>
          <div class="af-line">
            <div class="af-line-title">
              <span></span>经营状态
            </div>
            <div class="af-select">
              <span
                :class="[stateIndex === index ? 'advanced-active':'']"
                :key="index"
                v-for="(item,index) in stateArr"
                @click="stateClick(index)"
              >{{item}}</span>
            </div>
          </div>
          <div v-if="vipLevel">
            <div class="gjsx">高级筛选</div>
            <div class="af-line">
              <div class="af-line-title">
                <span></span>商标
              </div>
              <div class="af-select">
                <span
                  :class="[sbIndex === index ? 'advanced-active':'']"
                  :key="index"
                  v-for="(item,index) in sbArr"
                  @click="sbClick(index)"
                >{{item}}</span>
              </div>
            </div>
            <div class="af-line">
              <div class="af-line-title">
                <span></span>专利
              </div>
              <div class="af-select">
                <span
                  :class="[zlIndex === index ? 'advanced-active':'']"
                  :key="index"
                  v-for="(item,index) in zlArr"
                  @click="zlClick(index)"
                >{{item}}</span>
              </div>
            </div>
            <div class="af-line">
              <div class="af-line-title">
                <span></span>失信信息
              </div>
              <div class="af-select">
                <span
                  :class="[sxIndex === index ? 'advanced-active':'']"
                  :key="index"
                  v-for="(item,index) in sxArr"
                  @click="sxClick(index)"
                >{{item}}</span>
              </div>
            </div>
            <div class="af-line">
              <div class="af-line-title">
                <span></span>联系电话
              </div>
              <div class="af-select">
                <span
                  :class="[lxIndex === index ? 'advanced-active':'']"
                  :key="index"
                  v-for="(item,index) in lxArr"
                  @click="lxClick(index)"
                >{{item}}</span>
              </div>
            </div>
          </div>
          <div class="advance-btn">
            <i-row>
              <i-col span="7" offset="4">
                <i-button type="error" size="small" @click="reset">重置</i-button>
              </i-col>
              <i-col span="7" offset="1">
                <i-button type="primary" size="small" @click="advanceOk">确定</i-button>
              </i-col>
            </i-row>
          </div>
        </div>
      </div>
      <div class="search-total">
        搜索到
        <span>{{total}}</span> 家公司
      </div>
      <div v-if="!allIndustries && !advancedFilter">
        <div
          class="search-item"
          :key="index"
          v-for="(item,index) in searchList"
          @click="companyInfo(item.id)"
        >
          <div class="cname">{{item.companyName}}</div>
          <div class="cuser">{{item.legalPerson}}</div>
          <div class="cdistance">{{item.geoDistance}}</div>
          <div class="cline"></div>
          <div class="caddress">
            <img :src="imgUrl+'ic_wz.png'">
            {{item.companyAddress}}
          </div>
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
    <i-load-more i-class="footer-ts" v-if="!more && footerTs" tip="暂无数据" :loading="false"/>
    <i-load-more i-class="footer-ts" v-if="more && footerTs"/>
    <i-toast id="toast"/>
    <i-modal title="提示" :visible="!isLogin" :actions="actions" @click="goLogin">
      <div>请先登录</div>
    </i-modal>
    <i-modal :visible="reLocation" @ok="toSetting" @cancel="noSetting">
      <view>重新获取地理位置</view>
    </i-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import config from "@/config.js";
import * as utils from "@/utils";
import NavigateBar from "@/components/NavigateBar";
import industry from "@/utils/industry.js";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  components: { NavigateBar },
  data() {
    return {
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      isLogin: true, //判断是否登录
      actions: [{ name: "确定", color: "#2d8cf0" }],
      searchArguments: {}, //搜索的参数
      hasData: true, //是否搜索到了数据，如果没有，显示暂无数据的图片和文字
      more: true, //(在显示底部数据加载状态的情况下)显示加载状态还是暂无数据
      footerTs: true, //控制是否显示底部数据加载状态
      searchType: 1, //搜索类型，从其他页面点击过来 带过来的参数可以判断是什么条件的搜索
      page: 1, //默认搜索第一页
      total: 0, //搜索到的总条数
      searchList: [], //搜索到的数据数组
      enter: "enter", //全部行业箭头方向控制
      filter: "enter", //高级筛选箭头方向控制
      distance: "enter", //距离控制
      allIndustries: false, //是否显示全部行业
      advancedFilter: false, //是否显示高级筛选
      advancedDistance: false, //是否显示筛选距离
      industryParentIndex: 0, //选中父级行业的索引
      industryParent: [], //父级行业
      industryChildren: ["全部行业"], //子级行业
      upgrade: false, //查关系的时候显示功能正在升级
      reLocation: false,

      lat: 0, // 维度
      lon: 0, //经度
      distanceNum: 10000, //距离
      scopeStr: 1, //搜索范围
      capitalStr: 1, //注册资本
      dateStr: 1, //成立年限
      stateStr: 1, //经营状态
      areaStr: 1, //区域
      tradeStr: "100", //行业
      sbStr: 1, //商标
      zlStr: 1, //专利
      lxStr: 1, //联系电话
      sxStr: 1, //失信信息
      sort: 1,

      distanceArr: ["不限", "1km内", "3km内", "5km内", "10km内"],
      capitalArr: [
        "全部",
        "0万-100万",
        "100万-200万",
        "200万-500万",
        "500万-1000万",
        "1000万以上"
      ],
      dateArr: ["全部", "1年内", "1-5年", "5-10年", "10-15年", "15年以上"],
      stateArr: [
        "不限",
        "吊销",
        "在业",
        "在营",
        "存续",
        "开业",
        "注销",
        "迁出"
      ],
      sbArr: ["全部", "有商标", "无商标"],
      zlArr: ["全部", "有专利", "无专利"],
      sxArr: ["全部", "有失信信息", "无失信信息"],
      lxArr: ["全部", "有联系电话", "无联系电话"],
      capitalIndex: 0,
      dateIndex: 0,
      stateIndex: 0,
      sbIndex: 0,
      zlIndex: 0,
      sxIndex: 0,
      lxIndex: 0
    };
  },
  computed: {
    ...mapState(["vipLevel"])
  },
  methods: {
    myToast(con) {
      $Toast({
        content: con
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
    //跳转详情页
    companyInfo(companyId) {
      wx.navigateTo({
        url:
          "/pages/companyInfoPackage/pages/companyInfo/main?companyId=" +
          companyId
      });
    },
    // 去搜索
    goSearch(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      const _this = this;
      this.allIndustries = false; //一开始搜索不显示全部行业
      this.enter = "enter"; //当然箭头也是向右的
      this.advancedFilter = false; //一开始搜索不显示高级筛选
      this.filter = "enter"; //当然箭头也是向右的
      this.advancedDistance = false; //一开始不显示筛选距离
      this.distance = "enter"; // 当然箭头也是向右的
      utils.showLoading();

      this.searchArguments = {
        lat: this.lat,
        lon: this.lon,
        distance: this.distanceNum,
        scopeStr: this.scopeStr,
        capitalStr: this.capitalStr,
        dateStr: this.dateStr,
        stateStr: this.stateStr,
        areaStr: this.areaStr,
        tradeStr: this.tradeStr,
        sbStr: this.sbStr,
        zlStr: this.zlStr,
        lxStr: this.lxStr,
        sxStr: this.sxStr,
        page: this.page,
        sort: this.sort
      };

      this.$http.get(config.bussinessAround, this.searchArguments).then(res => {
        utils.hideLoading();
        if (res.data.code == 0) {
          this.total = res.data.data.count;
          if (res.data.data.count > 0) {
            this.footerTs = res.data.data.count < 10 ? false : true;
            this.hasData = true;
            //普通搜索返回的数据
            const searchList = res.data.data.data.map(function(item) {
              item.companyName =
                item.companyName.length > 15
                  ? item.companyName.substr(0, 15) + "..."
                  : item.companyName;
              item.legalPerson = item.legalPerson
                ? item.legalPerson
                : "企业选择不公开";
              if (item.geoDistance > 1000) {
                item.geoDistance = item.geoDistance + "";
                item.geoDistance =
                  item.geoDistance.substr(0, item.geoDistance.length - 3) +
                  "." +
                  item.geoDistance.substr(-1, 3) +
                  "km";
              } else {
                item.geoDistance = item.geoDistance + "m";
              }
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
            this.more = false;
          }
        }
      });
    },
    //获取联想搜索
    relatedSearch() {
      this.$http
        .get(config.relatedSearch, { termStr: this.keyWord })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data);
            this.relatedSearchArr = res.data.data;
          }
        });
    },
    //是否显示所有距离
    showAdvancedDistance() {
      this.distance = this.advancedDistance ? "enter" : "unfold";
      this.advancedDistance = !this.advancedDistance;
      this.enter = "enter";
      this.allIndustries = false;
      this.filter = "enter";
      this.advancedFilter = false;
    },
    distanceClick(index) {
      switch (index) {
        case 0:
          this.distanceNum = 20000;
          break;
        case 1:
          this.distanceNum = 1000;
          break;
        case 2:
          this.distanceNum = 3000;
          break;
        case 3:
          this.distanceNum = 5000;
          break;
        case 4:
          this.distanceNum = 10000;
          break;
        default:
          this.distanceNum = 20000;
          break;
      }
      this.goSearch(true);
    },
    //是否展示全部行业
    showAdvancedOptions() {
      this.enter = this.allIndustries ? "enter" : "unfold";
      this.allIndustries = !this.allIndustries;
      this.filter = "enter";
      this.advancedFilter = false;
      this.distance = "enter";
      this.advancedDistance = false;
    },
    //点击父级行业展示相应的子行业
    chooseIndustryParent(index) {
      this.industryParentIndex = index;
      const industryParentName = this.industryParent[index];
      this.industryChildren = industry.industry[0][industryParentName];
    },
    //点击子级行业去搜素
    chooseIndustryChild(index) {
      this.tradeStr = this.industryChildren[index].id;
      this.allIndustries = false; //隐藏高级筛选的条件页
      //this.conditionSearch = true; //走条件搜索 //-->由于不需要普通搜素了，暂时这个变量不需要更改
      this.goSearch(true);
    },
    // 是否显示高级筛选条件
    showAdvancedFilter() {
      this.filter = this.advancedFilter ? "enter" : "unfold";
      this.advancedFilter = !this.advancedFilter;
      this.enter = "enter";
      this.allIndustries = false;
      this.distance = "enter";
      this.advancedDistance = false;
    },
    //高级筛选-注册资本
    captialClick(index) {
      this.capitalIndex = index;
    },
    //高级筛选-成立年限
    dateClick(index) {
      this.dateIndex = index;
    },
    //高级筛选-经营状态
    stateClick(index) {
      this.stateIndex = index;
    },
    //高级筛选-商标
    sbClick(index) {
      this.sbIndex = index;
    },
    //高级筛选-专利
    zlClick(index) {
      this.zlIndex = index;
    },
    //高级筛选-失信信息
    sxClick(index) {
      this.sxIndex = index;
    },
    //高级筛选-联系电话
    lxClick(index) {
      this.lxIndex = index;
    },
    //高级筛选-重置
    reset() {
      this.capitalIndex = 0;
      this.dateIndex = 0;
      this.stateIndex = 0;
      this.sbIndex = 0;
      this.zlIndex = 0;
      this.sxIndex = 0;
      this.lxIndex = 0;
    },
    //高级筛选-确定
    advanceOk() {
      this.capitalStr = this.capitalIndex + 1;
      this.dateStr = this.dateIndex + 1;
      this.stateStr = this.stateIndex + 1;
      this.sbStr = this.sbIndex + 1;
      this.zlStr = this.zlIndex + 1;
      this.lxStr = this.lxIndex + 1;
      this.sxStr = this.sxIndex + 1;
      this.advancedFilter = false; //隐藏高级筛选的条件页
      // this.conditionSearch = true; //走条件搜索 //-->由于不需要普通搜素了，暂时这个变量不需要更改
      this.goSearch(true);
    },
    //全部父级行业
    setIndustryParent() {
      for (let key in industry.industry[0]) {
        this.industryParent.push(key);
      }
    },
    getPostion() {
      wx.getLocation({
        type: "wgs84",
        success: res => {
          var latitude = res.latitude;
          var longitude = res.longitude;
          var speed = res.speed;
          var accuracy = res.accuracy;
          this.lat = latitude;
          this.lon = longitude;
          wx.setStorageSync("location", { lat: latitude, lon: longitude });
          this.setIndustryParent();
          this.goSearch(true);
        },
        fail: res => {
          this.reLocation = true;
          this.myToast("位置获取失败");
        }
      });
    },
    toSetting() {
      const that = this;
      wx.openSetting({
        success(res) {
          wx.getLocation({
            type: "wgs84",
            success(res) {
              var latitude = res.latitude;
              var longitude = res.longitude;
              var speed = res.speed;
              var accuracy = res.accuracy;
              that.reLocation = false;
              that.lat = latitude;
              that.lon = longitude;
              wx.setStorageSync("location", { lat: latitude, lon: longitude });
              that.setIndustryParent();
              that.goSearch(true);
            }
          });
        }
      });
    },
    noSetting() {
      this.reLocation = false;
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
    if (Object.keys(this.$root.$mp.query).length > 0) {
      this.lat = this.$root.$mp.query.lat;
      this.lon = this.$root.$mp.query.lon;
      this.goSearch(true);
    } else {
      this.getPostion();
    }
  },
  onShow() {
    this.checkLogin();
  }
};
</script>
<style lang="scss">
.search-body {
  .search-result {
    .advanced-search-box {
      position: relative;
      .advanced-search {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        box-sizing: border-box;
        line-height: 36px;
        height: 36px;
        padding-bottom: 5px;
        border-bottom: 1px solid #dddee1;
        background: #ffffff;
      }
      .advanced-distance {
        position: absolute;
        left: 0;
        top: 36px;
        width: 100%;
        overflow: hidden;
        z-index: 999;
        height: calc(100vh - 36px);
        background: rgba(0, 0, 0, 0.5);
        .adv-dis {
          background: #ffffff;
          li {
            line-height: 80rpx;
            border-bottom: solid 1px #dddee1;
            text-indent: 20rpx;
          }
        }
      }
      .advance-search-options {
        position: absolute;
        left: 0;
        top: 36px;
        width: 100%;
        overflow: hidden;
        z-index: 999;
        .aso-left {
          width: 40%;
          float: left;
          background: #ffffff;
          height: calc(100vh - 36px);
          overflow-y: auto;
          .aso-left-active {
            color: #209bf9;
            background: #e9eaec;
          }
          .aso-left-item {
            padding-left: 20rpx;
            line-height: 70rpx;
            border-bottom: 1px solid #dddee1;
          }
        }
        .aso-right {
          width: 60%;
          float: left;
          background: #e9eaec;
          height: calc(100vh - 36px);
          overflow-y: auto;
          .aso-right-item {
            padding-left: 20rpx;
            line-height: 70rpx;
            border-bottom: 1px solid #dddee1;
          }
        }
      }
      .advanced-filter {
        position: absolute;
        left: 0;
        top: 36px;
        width: 100%;
        overflow-y: auto;
        z-index: 999;
        max-height: calc(100vh - 36px);
        background: #ffffff;
        .advanced-active {
          background: #209bf9;
          color: #ffffff;
        }
        .gjsx {
          color: #209bf9;
          border-top: 4px solid #dddee1;
          line-height: 70rpx;
          text-indent: 15px;
        }
        .af-line {
          margin-top: 20rpx;
          .af-line-title {
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            margin-bottom: 20rpx;
            font-weight: bold;
            span {
              display: inline-block;
              width: 2px;
              height: 12px;
              background: #209bf9;
              margin-left: 10px;
              margin-right: 5px;
            }
          }
          .af-select {
            margin-left: 17px;
            span {
              display: inline-block;
              padding: 10rpx;
              border: 1px solid #dddee1;
              border-radius: 4px;
              margin-right: 10rpx;
              margin-bottom: 10rpx;
            }
          }
        }
      }
    }
    .search-total {
      margin-top: 36px;
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
      margin-left: 5%;
      margin-top: 40rpx;
      padding: 10rpx 15rpx 15rpx 15rpx;
      box-shadow: 0px 0px 8px #e9eaec;
      background: #ffffff;
      border-radius: 8rpx;
      display: inline-block;
      .cname {
        line-height: 70rpx;
        color: #1c2438;
        font-weight: bold;
      }
      .cdistance {
        position: absolute;
        right: 10rpx;
        top: 80rpx;
        color: #ed3f14;
      }
      .cline {
        width: 100%;
        margin: 10rpx auto;
        height: 1px;
        background: #dddee1;
      }
      .caddress {
        img {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
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
