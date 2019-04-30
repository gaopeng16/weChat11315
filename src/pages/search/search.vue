<template>
  <div class="search-body min-height100 gray-body">
    <div class="search-group">
      <i-row>
        <i-col span="19">
          <input v-model="keyWord" class="search-input" type="text" :placeholder="placeholder">
        </i-col>
        <i-col span="5" v-if="!isSort">
          <i-button i-class="my-search-btn" type="warning" @click="goSearch(true)">搜索</i-button>
        </i-col>
        <i-col span="5" v-if="isSort">
          <i-button i-class="my-search-btn" type="warning" @click="_showSort">排序</i-button>
        </i-col>
      </i-row>
    </div>
    <div class="sort-condition-bg" v-if="showSort">
      <div class="sort-condition">
        <div @click="chooseSortCondition(1)">默认排序</div>
        <div @click="chooseSortCondition(2)">注册资本降序</div>
        <div @click="chooseSortCondition(3)">注册资本升序</div>
        <div @click="chooseSortCondition(4)">注册时间降序</div>
        <div @click="chooseSortCondition(5)">注册时间升序</div>
        <div @click="chooseSortCondition(6)">信用评分降序</div>
        <div @click="chooseSortCondition(7)">信用评分升序</div>
      </div>
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
        <span
          :key="index"
          v-for="(item,index) in hotBotArr"
          @click="companyInfo(item.companyId)"
        >{{item.hotSpot}}</span>
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
    <div v-if="isGoSearch" class="search-result" :class="[showSort?'search-result-hidden':'']">
      <div class="advanced-search-box">
        <i-row i-class="advanced-search text-center">
          <i-col span="8">
            <div @click="showAreaOptions">
              {{area}}
              <i-icon :type="zone"></i-icon>
            </div>
          </i-col>
          <i-col span="8">
            <div @click="showAdvancedOptions">
              {{allIndustry}}
              <i-icon :type="enter"></i-icon>
            </div>
          </i-col>
          <i-col span="8">
            <div @click="showAdvancedFilter">
              高级筛选
              <i-icon :type="filter"></i-icon>
            </div>
          </i-col>
        </i-row>
        <!-- 显示地区的div -->
        <div class="advance-search-area" v-if="allAreas">
          <div class="area-left">
            <div
              class="area-left-item"
              :class="[areaProvinceIndex === index ? 'area-left-active':'']"
              :key="index"
              v-for="(item,index) in areaProvince"
              @click="chooseAreaProvince(index,item.citys)"
            >{{item.name}}</div>
          </div>
          <div class="area-right">
            <div class="area-right-item" @click="chooseAreaCity(1,'全国')">全国</div>
            <div
              class="area-right-item"
              :key="index"
              v-for="(item,index) in areaCity"
              @click="chooseAreaCity(item.id,item.name)"
            >{{item.name}}</div>
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
              @click="chooseIndustryChild(index,item.name)"
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
        <span class="red" v-if="!vipLevel">,VIP用户可查看5000+家公司</span>
      </div>
      <div v-if="!allIndustries && !advancedFilter && !allAreas">
        <div
          class="search-new-item"
          :key="index"
          v-for="(item,index) in searchList"
          @click="companyInfo(item.id)"
        >
          <div class="logo-name overflow-hidden">
            <div class="logo left">
              <img v-if="item.logoUrl != ''" :src="item.logoUrl">
              <FontImg
                v-else
                :type="4"
                :brief="item.brief"
                :width="70"
                :height="70"
                :lineHeight="35"
              ></FontImg>
            </div>
            <div class="name blod left ml20 lh70 mt10">
              <rich-text type="text" :nodes="item.companyName"></rich-text>
            </div>
            <div
              class="grade right"
              :class="[(item.State == '吊销' || item.State == '注销')  ? 'grade-gray' : '']"
            >{{item.creditScore}}</div>
          </div>
          <div class="tips">
            <div
              class="state left"
              :class="[(item.State == '吊销' || item.State == '注销')  ? 'state-red' : '']"
              v-if="item.State"
            >{{item.State}}</div>
            <!-- <div class="authentication left ml10">
              <img class="left" v-if="imgUrl" :src="imgUrl+'authentication.png'">
              <span class="left ml10">已认证</span>
            </div>-->
            <div v-if="item.oldCompnayName" class="oldname left ml10">{{item.oldCompnayName}}</div>
            <!-- <div class="type left ml10">小微企业</div> -->
          </div>
          <div class="item-info-box">
            <div class="item-info sub-content-light left">
              法定代表人
              <br>
              <span class="font-click">
                <rich-text type="text" :nodes="item.legalPerson"></rich-text>
              </span>
            </div>
            <div class="div-line left"></div>
            <div class="item-info sub-content-light left">
              注册资本
              <br>
              <span class="title">{{item.registeredCapital+item.registeredCapitalUnit}}</span>
            </div>
            <div class="div-line left"></div>
            <div class="item-info sub-content-light left">
              成立日期
              <br>
              <span class="title">{{item.registrationDate}}</span>
            </div>
          </div>
          <div
            v-if="item.piPeiHolder || item.piPeiLegalPerson || item.piPeiTrademark ||item.piPeiOldCompnayName "
          >
            <div class="line"></div>
            <div class="item-bot">
              <img class="left" v-if="imgUrl" :src="imgUrl+'gou.png'">
              <span class="left ml15" v-if="item.piPeiHolder">
                <rich-text :nodes="item.piPeiHolder"></rich-text>
              </span>
              <span class="left ml15" v-else-if="item.piPeiLegalPerson">
                <rich-text :nodes="item.piPeiLegalPerson"></rich-text>
              </span>
              <span class="left ml15" v-else-if="item.piPeiTrademark">
                <rich-text :nodes="item.piPeiTrademark"></rich-text>
              </span>
              <span class="left ml15" v-else-if="item.piPeiOldCompnayName">
                <rich-text :nodes="item.piPeiOldCompnayName"></rich-text>
              </span>
            </div>
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
    <i-modal title="提示" :visible="!isLogin" :actions="actions" @click="goLogin">
      <div>请先登录</div>
    </i-modal>
    <i-modal title="提示" :visible="loginInOther" @ok="goLogin" @cancel="noLogin">
      <div>账号已在其他设备登录，您被强制下线！</div>
    </i-modal>
  </div>
</template>
<script>
import config from "@/config.js";
import * as utils from "@/utils";
import { mapState } from "vuex";
import NavigateBar from "@/components/NavigateBar";
import FontImg from "@/components/FontImg";
import industry from "@/utils/industry.js";
import { setTimeout } from "timers";
const { $Toast } = require("../../../static/iview/base/index");
export default {
  components: { NavigateBar, FontImg },
  data() {
    return {
      navTitle: "搜索", //自定义顶部导航的标题(如果没有使用自定义导航请忽略)
      navHeight: 0, //由于自定义导航定位，body内容会被导航盖住(如果没有使用自定义导航请忽略)
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      userId: "",
      isLogin: true, //判断是否登录
      actions: [{ name: "确定", color: "#2d8cf0" }],
      keyWord: "", //搜索的关键词
      placeholder: "请输入企业名称、人名、产品名或其他关键字",
      isGoSearch: false, //是否去搜索
      conditionSearch: false, //是否条件搜索
      isClickFastSearch: false, //是否点击热搜、最近搜索快捷搜素
      searchUrl: "", //搜索接口路由
      searchArguments: {}, //搜索的参数
      hasData: true, //是否搜索到了数据，如果没有，显示暂无数据的图片和文字
      more: true, //(在显示底部数据加载状态的情况下)显示加载状态还是暂无数据
      footerTs: true, //控制是否显示底部数据加载状态
      searchType: 1, //搜索类型，从其他页面点击过来 带过来的参数可以判断是什么条件的搜索
      hotBotArr: [], //热搜数组(最多显示10条)
      page: 1, //默认搜索第一页
      total: 0, //搜索到的总条数
      searchList: [], //搜索到的数据数组
      recentSearch: [], //最近搜索的数组
      relatedSearchArr: [], //联想查询的数组
      zone: "enter", //区域选择箭头方向控制
      enter: "enter", //全部行业箭头方向控制
      filter: "enter", //高级筛选箭头方向控制
      allAreas: false, // 是否显示所有地区
      allIndustries: false, //是否显示全部行业
      advancedFilter: false, //是否显示高级筛选
      area: "全国",
      areaProvinceIndex: 0, //选中省级区域的索引
      areaProvince: [], // 省级
      areaCity: [], // 市级
      allIndustry: "全部行业",
      industryParentIndex: 0, //选中父级行业的索引
      industryParent: [], //父级行业
      industryChildren: ["全部行业"], //子级行业
      upgrade: false, //查关系的时候显示功能正在升级
      isSort: false, //是否显示排序按钮
      showSort: false, //是否显示排序的条件

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
      lxIndex: 0,

      loginInOther: false
    };
  },
  computed: {
    ...mapState(["vipLevel", "token"])
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
        // this.vipLevel = loginInfo.vipLevel;
        this.userId = loginInfo.userId;
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
    //点击想要搜素的目标，将点击的目标值填入搜索框
    fastSearch(companyName) {
      this.keyWord = companyName;
      this.isClickFastSearch = true;
      this.goSearch(true);
    },
    //获取到热搜
    getHotBot() {
      this.hotBotArr = [];
      this.$http.get(config.hotBotUrl, { num: 20 }).then(res => {
        if (res.data.code == 0) {
          const data = res.data.data;
          data.forEach(item => {
            this.hotBotArr.push({
              hotSpot: item.hotSpot,
              companyId: item.companyId
            });
          });
          this.hotBotArr = Array.from(new Set(this.hotBotArr));
        }
      });
    },
    // 去搜索
    goSearch(init) {
      //console.log(this.keyWord,'--',this.scopeStr,"--",this.capitalStr,"--",this.dateStr,"--",this.stateStr,"--",this.areaStr,"--",this.tradeStr,"--",this.sbStr,"--",this.zlStr,"--",this.lxStr,"--",this.sxStr,"--",this.sort,"--");
      if (init) {
        this.page = 1;
        this.more = true;
      }
      const _this = this;
      if (this.keyWord === "") {
        this.myToast("请输入要搜索的内容", "warning");
      } else {
        this._setRecentSearch(this.keyword); //设置最近搜索
        this.allAreas = false; //一开始搜索不显示所有地区
        this.zone = "enter"; //当然箭头也是向右的
        this.allIndustries = false; //一开始搜索不显示全部行业
        this.enter = "enter"; //当然箭头也是向右的
        this.advancedFilter = false; //一开始搜索不显示高级筛选
        this.filter = "enter"; //当然箭头也是向右的
        utils.showLoading();

        if (this.conditionSearch) {
          //这里不走普通搜索了，this.conditionSearch默认为false 如果需要走普通搜索，直接 if(!this.conditionSearch)即可
          //普通搜索
          //console.log("普通搜索");
          this.searchUrl = config.generalSearch;
          this.searchArguments = {
            termStr: this.keyWord,
            page: this.page
          };
        } else {
          if (this.vipLevel == 0) {
            //非VIP搜索
            //console.log("非VIP搜索");
            this.searchUrl = config.commonSearch;
            this.searchArguments = {
              termStr: this.keyWord,
              scopeStr: this.scopeStr,
              capitalStr: this.capitalStr,
              dateStr: this.dateStr,
              stateStr: this.stateStr,
              areaStr: this.areaStr,
              tradeStr: this.tradeStr,
              page: this.page,
              sort: this.sort
            };
          } else if (this.vipLevel > 0) {
            //VIP搜索
            //console.log("VIP搜索");
            this.searchUrl = config.vipSearch;
            this.searchArguments = {
              termStr: this.keyWord,
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
          }
        }
        //console.log(this.searchArguments);
        this.$http
          .get(this.searchUrl + this.page, this.searchArguments, {
            timeout: 10000
          })
          .then(res => {
            utils.hideLoading();
            this.isGoSearch = true;
            if (res.data.code == 0) {
              this.total = res.data.data.counts;
              if (res.data.data.counts > 0) {
                this.footerTs = res.data.data.counts < 10 ? false : true;
                this.hasData = true;
                this.isSort = true; //搜索出来，并且有数据，才显示排序
                //普通搜索返回的数据
                const searchList = res.data.data.companyInfos.map(function(
                  item
                ) {
                  item.brief = item.companyName
                    .replace(/<font color='#FF0000'>/g, "")
                    .replace(/<\/font>/g, "");
                  item.companyName = item.companyName
                    .replace(
                      /<font color='#FF0000'>/g,
                      "<span style='color:#FF0000'>"
                    )
                    .replace(/<\/font>/g, "</span>");
                  item.legalPerson = item.legalPerson
                    .replace(
                      /<font color='#FF0000'>/g,
                      "<span style='color:#FF0000'>"
                    )
                    .replace(/<\/font>/g, "</span>");
                  item.logoUrl =
                    item.logoUrl == ""
                      ? item.logoUrl
                      : _this.imgFile + item.logoUrl;
                  if (item.registrationDate) {
                    item.registrationDate = utils.formatTime(
                      new Date(item.registrationDate),
                      0
                    );
                  }
                  item.State =
                    item.State.length > 2
                      ? (item.State = item.State.substr(0, 2))
                      : item.State;
                  //匹配股东
                  item.piPeiHolder = item.shareholderName.includes("font", 1)
                    ? "股东：" +
                      item.shareholderName
                        .replace(
                          /<font color='#FF0000'>/g,
                          "<span style='color:#FF0000'>"
                        )
                        .replace(/<\/font>/g, "</span>")
                    : false;
                  //匹配法人
                  item.piPeiLegalPerson = item.legalPerson.includes("font", 1)
                    ? "法人:" +
                      item.legalPerson
                        .replace(
                          /<font color='#FF0000'>/g,
                          "<span style='color:#FF0000'>"
                        )
                        .replace(/<\/font>/g, "</span>")
                    : false;
                  //匹配商标
                  item.piPeiTrademark = item.trademark.includes("font", 1)
                    ? "商标:" +
                      item.trademark
                        .replace(
                          /<font color='#FF0000'>/g,
                          "<span style='color:#FF0000'>"
                        )
                        .replace(/<\/font>/g, "</span>")
                    : false;
                  //匹配曾用名
                  item.piPeiOldCompnayName = item.oldCompnayName.includes(
                    "font",
                    1
                  )
                    ? "曾用名:" +
                      item.oldCompnayName
                        .replace(
                          /<font color='#FF0000'>/g,
                          "<span style='color:#FF0000'>"
                        )
                        .replace(/<\/font>/g, "</span>")
                    : false;

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
                this.isSort = false; //没有数据就显示搜索，隐藏排序按钮
                this.footerTs = false;
                this.more = false;
              }
            }
          })
          .catch(e => {
            if (e.status == 1) {
              this.myToast("请求超时", "warning");
              utils.hideLoading();
              /* this.hasData = false;
              this.isGoSearch = true;
              this.footerTs = false; */
              setTimeout(function() {
                wx.switchTab({
                  url: "/pages/index/main"
                });
              }, 1000);
            }
          });
      }
    },
    //排序搜索
    _showSort() {
      this.showSort = !this.showSort;
    },
    // 排序条件搜索
    chooseSortCondition(sort) {
      this.showSort = false;
      this.sort = sort;
      this.goSearch(true);
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
    //是否显示所有地区
    showAreaOptions() {
      this.zone = this.allAreas ? "enter" : "unfold";
      this.allAreas = !this.allAreas;
      this.filter = "enter";
      this.advancedFilter = false;
      this.enter = "enter";
      this.allIndustries = false;
    },
    //点击省级展示相应的市级
    chooseAreaProvince(index, citys) {
      this.areaProvinceIndex = index;
      this.areaCity = citys;
    },
    // 点击城市去搜索
    chooseAreaCity(cityId, name) {
      this.areaStr = cityId;
      this.allAreas = false;
      this.area = name.length > 6 ? name.substr(0, 6) + "..." : name;
      this.goSearch(true);
    },
    //是否展示全部行业
    showAdvancedOptions() {
      this.enter = this.allIndustries ? "enter" : "unfold";
      this.allIndustries = !this.allIndustries;
      this.filter = "enter";
      this.advancedFilter = false;
      this.zone = "enter";
      this.allAreas = false;
    },
    //点击父级行业展示相应的子行业
    chooseIndustryParent(index) {
      this.industryParentIndex = index;
      const industryParentName = this.industryParent[index];
      this.industryChildren = industry.industry[0][industryParentName];
    },
    //点击子级行业去搜素
    chooseIndustryChild(index, name) {
      this.tradeStr = this.industryChildren[index].id;
      this.allIndustries = false; //隐藏高级筛选的条件页
      this.allIndustry = name.length > 6 ? name.substr(0, 6) + "..." : name;
      //this.conditionSearch = true; //走条件搜索 //-->由于不需要普通搜素了，暂时这个变量不需要更改
      this.goSearch(true);
    },
    // 是否显示高级筛选条件
    showAdvancedFilter() {
      this.filter = this.advancedFilter ? "enter" : "unfold";
      this.advancedFilter = !this.advancedFilter;
      this.enter = "enter";
      this.allIndustries = false;
      this.zone = "enter";
      this.allAreas = false;
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
    _setRecentSearch(keyword) {
      this.recentSearch.unshift(this.keyWord);
      // new Set()数组去重
      this.recentSearch = Array.from(new Set(this.recentSearch));
      if (this.recentSearch.length > 10) {
        this.recentSearch = this.recentSearch.slice(0, 10);
      }
      wx.setStorageSync("recentSearch", this.recentSearch);
    },
    //全部父级行业
    setIndustryParent() {
      for (let key in industry.industry[0]) {
        this.industryParent.push(key);
      }
    },
    // 获取所有的区域
    getArea() {
      this.$http.post(config.area).then(res => {
        if (res.data.code == 0) {
          const siteDate = res.data.data.siteDate;
          for (let k in siteDate) {
            var proList = siteDate[k];
            for (let i = 0; i < proList.length; i++) {
              this.areaProvince.push(proList[i]);
            }
          }
        }
      });
    },
    // 获取搜索类型(普通搜索、条件搜索<vip搜索、非vip搜索>)
    getSearchType() {
      const searchType = this.globalData.searchType || 1;
      switch (searchType) {
        case 1:
          this.placeholder = "请输入企业名称、人名、产品名或其他关键字";
          this.upgrade = false; // 差关系，暂时没有改功能
          this.searchType = 1; //搜索的来源
          //this.conditionSearch = false; //是否条件搜索 //-->由于不需要普通搜素了，暂时这个变量不需要更改
          break;
        case 2: //查公司
          this.placeholder = "请输入企业/公司名称关键字";
          this.upgrade = false;
          this.searchType = 2;
          // this.conditionSearch = true; //-->由于不需要普通搜素了，暂时这个变量不需要更改
          this.scopeStr = 2;
          break;
        case 3: //查老板
          this.placeholder = "请输入法人代表关键字";
          this.upgrade = false;
          this.searchType = 3;
          // this.conditionSearch = true;//-->由于不需要普通搜素了，暂时这个变量不需要更改
          this.scopeStr = 4;
          break;
        case 4: //查关系
          this.placeholder = "查关系";
          this.upgrade = true;
          this.searchType = 4;
          // this.conditionSearch = true;//-->由于不需要普通搜素了，暂时这个变量不需要更改
          break;
        case 5: //全部分类-企业名称
          this.placeholder = "请输入企业名称、人名、产品名或其他关键字";
          this.upgrade = false;
          this.searchType = 5;
          // this.conditionSearch = true;//-->由于不需要普通搜素了，暂时这个变量不需要更改
          this.scopeStr = 2;
          break;
        case 6: //全部分类-股东高管
          this.placeholder = "请输入股东关键字";
          this.upgrade = false;
          this.searchType = 6;
          // this.conditionSearch = true;//-->由于不需要普通搜素了，暂时这个变量不需要更改
          this.scopeStr = 3;
          break;
        case 7: //全部分类-经营范围
          this.placeholder = "请输入股东关键字";
          this.upgrade = false;
          this.searchType = 7;
          // this.conditionSearch = true;//-->由于不需要普通搜素了，暂时这个变量不需要更改
          break;
      }
    },
    //不同意登录
    noLogin() {
      this.loginInOther = false;
    },
    // 检查是否异地登录
    isLoginInOther() {
      this.checkLogin();
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
    },
    // 搜索参数数据重置
    searchDataInit() {
      this.area = "全国";
      this.allIndustry = "全部行业";
      this.areaProvinceIndex = 0;
      this.industryParentIndex = 0;
      this.areaStr = 1;
      this.tradeStr = "100";
      this.reset();
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
    this.getHotBot();
    this._getRecentSearch();
    this.setIndustryParent();
  },
  onShareAppMessage: function() {
    return {
      title: "我发现一款给力的信用调查小程序，超好用！棒棒哒！",
      path: "/pages/search/main"
    };
  },
  onShow() {
    this.searchDataInit();
    this.getArea();
    this.checkLogin();
    this.keyWord = "";
    this.getSearchType();
    this.isLoginInOther();
  },
  watch: {
    keyWord: function(val, oldVal) {
      this.relatedSearch();
      this.hasData = true;
      this.isSort = false;
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
      height: 38px;
      line-height: 38px;
      margin: 10px 0px 10px 10px;
      padding: 0 5px 0 10px;
      background-color: #fff;
      font-size: 12px;
      border: solid 1px #dddee1;
      border-radius: 10rpx;
    }
    .my-search-btn {
      height: 39px;
      line-height: 39px;
      margin: 10px;
      border-radius: 10rpx;
    }
  }
  .sort-condition-bg {
    position: fixed;
    left: 0;
    top: 100rpx;
    z-index: 1000;
    width: 100%;
    height: calc(100vh - 100rpx);
    background: rgba(0, 0, 0, 0.6);
    .sort-condition {
      background: #ffffff;
      line-height: 80rpx;
      text-indent: 20rpx;
      div {
        border-bottom: solid 1px #dddee1;
      }
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
  .search-result-hidden {
    height: calc(100vh - 120rpx);
    overflow: hidden;
  }
  .search-result {
    .advanced-search-box {
      position: relative;
      .advanced-search {
        box-sizing: border-box;
        line-height: 30px;
        padding-bottom: 5px;
        border-bottom: 1px solid #dddee1;
      }
      .advance-search-area {
        position: absolute;
        left: 0;
        top: 36px;
        width: 100%;
        height: calc(100vh - 96px);
        background: #ffffff;
        overflow: hidden;
        z-index: 999;
        .area-left {
          width: 40%;
          float: left;
          background: #ffffff;
          height: calc(100vh - 96px);
          overflow-y: auto;
          .area-left-active {
            color: #209bf9;
            background: #e9eaec;
          }
          .area-left-item {
            padding-left: 20rpx;
            line-height: 70rpx;
            border-bottom: 1px solid #dddee1;
          }
        }
        .area-right {
          width: 60%;
          float: left;
          background: #e9eaec;
          height: calc(100vh - 96px);
          overflow-y: auto;
          .area-right-item {
            padding-left: 20rpx;
            line-height: 70rpx;
            border-bottom: 1px solid #dddee1;
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
          height: calc(100vh - 96px);
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
          height: calc(100vh - 96px);
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
        max-height: calc(100vh - 96px);
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
      padding-left: 10rpx;
      line-height: 60rpx;
      background: #f5f2f4;
      span {
        color: red;
      }
    }
    .search-new-item {
      box-sizing: border-box;
      width: 100%;
      height: auto;
      background: #ffffff;
      overflow: hidden;
      margin-top: 20rpx;
      padding: 20rpx;
      .logo-name {
        .logo {
          img {
            width: 70rpx;
            height: 70rpx;
            margin: 10rpx 10rpx 0 10rpx;
          }
          .name {
            font-size: 30rpx;
          }
        }
      }
      .tips {
        margin-left: 104rpx;
        margin-top: -15rpx;
        overflow: hidden;
      }
      .grade {
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
      .authentication {
        padding: 0 10rpx;
        height: 36rpx;
        line-height: 36rpx;
        background: #fdf9ed;
        color: #ffab2e;
        font-size: 12px;
        img {
          width: 30rpx;
          height: 30rpx;
          margin-top: 3rpx;
        }
      }
      .oldname {
        padding: 0 10rpx;
        height: 36rpx;
        line-height: 36rpx;
        background: #f8f0fd;
        color: #bd71de;
        font-size: 12px;
      }
      .type {
        padding: 0 10rpx;
        height: 36rpx;
        line-height: 36rpx;
        background: #e8f1fe;
        color: #3a93e7;
        font-size: 12px;
      }
      .item-info-box {
        overflow: hidden;
        margin: 20rpx 0;
        .item-info {
          width: 33%;
          line-height: 40rpx;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .div-line {
          width: 1px;
          height: 40rpx;
          margin-top: 20rpx;
          background: #dddee1;
        }
      }
      .item-bot {
        padding-top: 15rpx;
        line-height: 36rpx;
        img {
          width: 36rpx;
          height: 36rpx;
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
