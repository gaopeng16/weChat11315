<template>
  <div class="companyinfo-body" :class="[showAllBiref?'no-scroll-body':'']">
    <!-- 公司简介部分 -->
    <div class="company-biref">
      <div class="logo-name">
        <div class="logo">
          <img mode="aspectFit" v-if="companyLogo" :src="companyLogo">
          <img mode="aspectFit" v-else-if="imgUrl" :src="imgUrl+'placeholder_avatar.png'">
        </div>
        <div class="company-name-tag">
          <div class="company-name">{{companyName}}</div>
          <div class="company-tag">
            <span class="span" :class="[state == '吊销' ? 'state-red' :'']">{{state}}</span>
            <span class="save-invoice">保存发票抬头</span>
          </div>
        </div>
      </div>
      <div class="item-info-box">
        <div class="item-info sub-content-light left">法定代表人
          <br>
          <span class="font-click" @click="goManInfo(legalPerson)">{{legalPerson}}</span>
        </div>
        <div class="div-line left"></div>
        <div class="item-info sub-content-light left">注册资本
          <br>
          <span class="title">{{registeredCapital}}</span>
        </div>
        <div class="div-line left"></div>
        <div class="item-info sub-content-light left">成立日期
          <br>
          <span class="title">{{registrationDate}}</span>
        </div>
      </div>
      <div class="company-biref-text clearboth overflow-hidden" v-if="profile">
        <div class="cbl left">简介：{{profile}}</div>
        <div class="slh left" v-if="profile">...</div>
        <div class="xq right font-click" @click="_showAllBiref">详情</div>
      </div>
      <div class="show-all-biref" v-show="showAllBiref">
        <div class="all-biref">
          <div class="top text-center">简介</div>
          <div class="text">{{profile}}</div>
          <div class="line"></div>
          <div class="bot font-click text-center" @click="_hideAllBiref">我知道了</div>
        </div>
      </div>
    </div>
    <!-- 公司简介下的图片 -->
    <div class="company-biref-img overflow-hidden">
      <div class="cbi-box left">
        <img v-if="imgUrlScore" :src="imgUrlScore+'score_'+score+'.jpg'">
      </div>
      <div class="cbi-box left">
        <a href="/pages/businessesAround/main">
          <img v-if="imgUrl" :src="imgUrl+'top_map.png'">
        </a>
      </div>
      <div class="cbi-box left">
        <img v-if="imgUrl" :src="imgUrl+'wtg.png'">
      </div>
    </div>
    <!-- 联系信息 -->
    <div class="contact-info">
      <div class="contact-tab">
        <div class="contact-left" @click="call(contactWay)">
          <img v-if="imgUrl" :src="imgUrl+'set_call.png'">
          {{contactWay}}
        </div>
        <div class="show-info" @click="showAllContactInfo">联系信息
          <i-icon :type="isShowAllContactInfo ? 'unfold': 'enter'"/>
        </div>
      </div>
      <div v-if="isShowAllContactInfo" class="show-all-contact">
        <div class="contact-tab">
          <div class="contact-left">
            <img v-if="imgUrl" :src="imgUrl+'ic_dn.png'">
            {{website}}
          </div>
        </div>
        <div class="contact-tab">
          <div class="contact-left">
            <img v-if="imgUrl" :src="imgUrl+'ic_yx.png'">
            {{mailbox}}
          </div>
        </div>
        <div class="contact-tab">
          <div class="contact-left" @click="openMap">
            <img v-if="imgUrl" :src="imgUrl+'ic_wz.png'">
            {{companyAddress}}
          </div>
        </div>
      </div>
    </div>
    <!-- 股东/董监高 -->
    <div class="hareholder-djg" v-if="shareholder.length > 0 || mainPerson.length > 0">
      <!-- <div class="hareholder-djg"> -->
      <div class="h-djg hareholder" v-if="shareholder.length > 0">
        <!-- <div class="h-djg hareholder"> -->
        <div class="hdjg-left hdjg-left-hh left text-center blod">股东</div>
        <div class="hdjg-right left">
          <div class="filter">
            <!--  -->
            <div
              class="filter-item"
              :key="index"
              v-for="(item,index) in shareholder"
              @click="goManInfoOrCompanyInfo(item)"
            >
              <div class="fi-top">
                <div
                  class="item-logo item-logo-hh left text-center blod"
                  :class="[item.type == 2 ? 'font1':'font4']"
                >
                  <img v-if="item.logo" :src="item.logo">
                  <span v-else>{{item.biref}}</span>
                </div>
                <div class="fi-top-text left">
                  <div v-if="item.type == 1" class="font-click">{{item.name}}</div>
                  <div v-if="item.type == 2">
                    <div class="font-click" :class="[index == 0 ? 'sub-name':'name']">{{item.name}}</div>
                  </div>
                  <div v-if="index == 0" class="sub-name big-gd">大股东</div>
                </div>
              </div>
              <div class="fi-bottom">
                持股比例:
                <span class="red">{{item.percent}}</span>
              </div>
              <div class="fi-bottom origin-deep" v-if="item.toco == ''">他的企业>></div>
              <div class="fi-bottom" v-else>
                他有
                <span class="red">{{item.toco}}</span>家企业>>
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
      <div class="h-djg djg" v-if="mainPerson.length > 0">
        <!-- <div class="h-djg djg"> -->
        <div class="hdjg-left hdjg-left-djg left text-center blod">董监高</div>
        <div class="hdjg-right left">
          <div class="filter">
            <!--  -->
            <div
              class="filter-item"
              :key="index"
              v-for="(item,index) in mainPerson"
              @click="goManInfo(item.name)"
            >
              <div class="fi-top">
                <div class="item-logo item-logo-djg text-center left blod font1">
                  <img v-if="item.logo" :src="item.logo">
                  <span v-else>{{item.lastname}}</span>
                </div>
                <div class="fi-top-text left">
                  <div class="font-click">{{item.name}}</div>
                  <div class="sub-name sub-content">{{item.position}}</div>
                </div>
              </div>
              <div class="fi-bottom lh70 origin-deep">他的企业>></div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
    <!-- 企信风险 -->
    <div class="qx-risk">
      <div class="risk-icon left">
        <img v-if="imgUrl" :src="imgUrl+'icon_risk.png'">
      </div>
      <div class="risk left">自身风险:</div>
      <span class="risk-num left">{{selfRisk}}条</span>
      <div class="risk left">周边风险:</div>
      <span class="risk-num left">{{aroundRisk}}条</span>
      <a :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/qxfx/main?companyId='+cId">
        <div class="look-risk right">查看风险</div>
      </a>
    </div>
    <!-- 企业图谱 -->
    <div class="company-map">
      <div class="cm-title title blod lh70">企业图谱</div>
      <div class="filter-type">
        <div class="type-item" @click="searchTrademark">
          <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/gxt/main">
            <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'icon_guanxi.png'">
          </a>
          <div class="title blod lh50 text-center">企业关系</div>
        </div>
        <div class="type-item" @click="searchPatent">
          <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/gqctt/main">
            <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'icon_guquan.png'">
          </a>
          <div class="title blod lh50 text-center">股权穿透图</div>
        </div>
        <div class="type-item" @click="searchDishonesty">
          <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/gqjgt/main">
            <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'guquanchuantou.png'">
          </a>
          <div class="title blod lh50 text-center">股权结构</div>
        </div>
      </div>
    </div>
    <!--************************************** 上市信息 ****************************************-->
    <div class="container-block" v-if="isListed != 'false'">
      <div class="plate-title">上市信息</div>
      <i-row>
        <!-- 股票详情 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comListed/gpxq/main?companyId='+companyId"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv7_1.png'">
              </div>
              <span class="block">股票详情</span>
            </div>
          </a>
        </i-col>
        <!-- 企业简介 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comListed/qyjj/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'companypro.png'">
              </div>
              <span class="block">企业简介</span>
            </div>
          </a>
        </i-col>
        <!-- 参股控股 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comListed/cgkg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_3.png'">
              </div>
              <span class="block">参股控股</span>
            </div>
          </a>
        </i-col>
        <!-- 上市公告 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comListed/ssgg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_11.png'">
              </div>
              <span class="block">上市公告</span>
            </div>
          </a>
        </i-col>
        <!-- 发行相关 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comListed/fxxg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_faxing.png'"
                >
              </div>
              <span class="block">发行相关</span>
            </div>
          </a>
        </i-col>
        <!-- 高管信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comListed/ggxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_4.png'">
              </div>
              <span class="block">高管信息</span>
            </div>
          </a>
        </i-col>
        <!-- 股本变动 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comListed/gbbd/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_4.png'">
              </div>
              <span class="block">股本变动</span>
            </div>
          </a>
        </i-col>
        <!-- 分红情况 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comListed/fhqk/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_4.png'">
              </div>
              <span class="block">分红情况</span>
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <!--************************************** 基本信息 ****************************************-->
    <div class="container-block">
      <div class="plate-title">基本信息</div>
      <i-row>
        <!-- 工商信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/gsxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_1.png'">
              </div>
              <span class="block">工商信息</span>
            </div>
          </a>
        </i-col>
        <!-- 企信风险 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/qxfx/main?companyName='+companyName+'&companyId='+companyId"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_1.png'">
              </div>
              <span class="block">企信风险</span>
            </div>
          </a>
        </i-col>
        <!-- 资质证书 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/zzzs/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_1.png'">
              </div>
              <span class="block">资质证书</span>
            </div>
          </a>
        </i-col>
        <!-- 主要人员 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/zyry/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_3.png'">
              </div>
              <span class="block">主要人员</span>
            </div>
          </a>
        </i-col>
        <!-- 股东 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/gdxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_4.png'">
              </div>
              <span class="block">股东</span>
            </div>
          </a>
        </i-col>
        <!-- 对外投资 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/dwtz/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_5.png'">
              </div>
              <span class="block">对外投资</span>
            </div>
          </a>
        </i-col>
        <!-- 变更记录 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/bgjl/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_6.png'">
              </div>
              <span class="block">变更记录</span>
            </div>
          </a>
        </i-col>
        <!-- 年报 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/qynb/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_7.png'">
              </div>
              <span class="block">年报</span>
            </div>
          </a>
        </i-col>
        <!-- 分支机构 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/fzjg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_8.png'">
              </div>
              <span class="block">分支机构</span>
            </div>
          </a>
        </i-col>
        <!-- 实际控制权 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/sjkzq/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_realkongzhi.png'"
                >
              </div>
              <span class="block">实际控制权</span>
            </div>
          </a>
        </i-col>
        <!-- 最终受益人 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comBascInfo/zzsyr/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_shouyiren.png'"
                >
              </div>
              <span class="block">最终受益人</span>
            </div>
          </a>
        </i-col>
        <!-- 股权结构 -->
        <i-col span="6">
          <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/gqjgt/main">
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_9.png'">
              </div>
              <span class="block">股权结构</span>
            </div>
          </a>
        </i-col>
        <!-- 关系图 -->
        <i-col span="6">
          <a href="/pages/companyInfoDepthPackage/pages/comBascInfo/gxt/main">
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_2.png'">
              </div>
              <span class="block">关系图</span>
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <!--************************************** 司法风险 ****************************************-->
    <div class="container-block">
      <div class="plate-title">司法风险</div>
      <i-row>
        <!-- 法律诉讼 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/flss/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv3_1.png'">
              </div>
              <span class="block">法律诉讼</span>
            </div>
          </a>
        </i-col>
        <!-- 法院公告 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/fygg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv3_2.png'">
              </div>
              <span class="block">法院公告</span>
            </div>
          </a>
        </i-col>
        <!-- 失信人 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/sxr/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv3_3.png'">
              </div>
              <span class="block">失信人</span>
            </div>
          </a>
        </i-col>
        <!-- 被执行人 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/bzxr/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv3_4.png'">
              </div>
              <span class="block">被执行人</span>
            </div>
          </a>
        </i-col>
        <!-- 开庭公告 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/ktgg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_7.png'">
              </div>
              <span class="block">开庭公告</span>
            </div>
          </a>
        </i-col>
        <!-- 司法协助 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comJusticeRisk/sfxz/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_xiezhu.png'"
                >
              </div>
              <span class="block">司法协助</span>
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <!--************************************** 企业发展 ****************************************-->
    <div class="container-block">
      <div class="plate-title">企业发展</div>
      <i-row>
        <!-- 融资历史 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comDevelopment/rzls/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_1.png'">
              </div>
              <span class="block">融资历史</span>
            </div>
          </a>
        </i-col>
        <!-- 核心团队 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comDevelopment/hxtd/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_2.png'">
              </div>
              <span class="block">核心团队</span>
            </div>
          </a>
        </i-col>
        <!-- 企业业务 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comDevelopment/qyyw/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_3.png'">
              </div>
              <span class="block">企业业务</span>
            </div>
          </a>
        </i-col>
        <!-- 投资事件 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comDevelopment/tzsj/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_4.png'">
              </div>
              <span class="block">投资事件</span>
            </div>
          </a>
        </i-col>
        <!-- 竞品信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comDevelopment/jpxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_5.png'">
              </div>
              <span class="block">竞品信息</span>
            </div>
          </a>
        </i-col>
        <!-- 宣传视频 -->
        <i-col span="6">
          <div class="plate-line">
            <div class="item-img-box">
              <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'video.png'">
            </div>
            <span class="block">宣传视频</span>
          </div>
        </i-col>
        <!-- 企业展示 -->
        <i-col span="6">
          <div class="plate-line">
            <div class="item-img-box">
              <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'conpanyshow.png'">
            </div>
            <span class="block">企业展示</span>
          </div>
        </i-col>
      </i-row>
    </div>
    <!--************************************** 经营风险 ****************************************-->
    <div class="container-block">
      <div class="plate-title">经营风险</div>
      <i-row>
        <!-- 经营异常 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateRisk/jyyc/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_1.png'">
              </div>
              <span class="block">经营异常</span>
            </div>
          </a>
        </i-col>
        <!-- 行政处罚 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateRisk/xzcf/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_2.png'">
              </div>
              <span class="block">行政处罚</span>
            </div>
          </a>
        </i-col>
        <!-- 严重违法 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateRisk/yzwf/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_3.png'">
              </div>
              <span class="block">严重违法</span>
            </div>
          </a>
        </i-col>
        <!-- 股权出质 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateRisk/gqcz/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_4.png'">
              </div>
              <span class="block">股权出质</span>
            </div>
          </a>
        </i-col>
        <!-- 动产抵押 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateRisk/dcdy/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_5.png'">
              </div>
              <span class="block">动产抵押</span>
            </div>
          </a>
        </i-col>
        <!-- 欠税公告 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateRisk/qsgg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_6.png'">
              </div>
              <span class="block">欠税公告</span>
            </div>
          </a>
        </i-col>
        <!-- 司法拍卖 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateRisk/sfpm/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_7.png'">
              </div>
              <span class="block">司法拍卖</span>
            </div>
          </a>
        </i-col>
        <!-- 清算信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateRisk/qsxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_qingsuan.png'"
                >
              </div>
              <span class="block">清算信息</span>
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <!--************************************** 经营状况 ****************************************-->
    <div class="container-block">
      <div class="plate-title">经营状况</div>
      <i-row>
        <!-- 购地信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/gdxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_2.png'">
              </div>
              <span class="block">购地信息</span>
            </div>
          </a>
        </i-col>
        <!-- 债券信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/zqxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_3.png'">
              </div>
              <span class="block">债券信息</span>
            </div>
          </a>
        </i-col>
        <!-- 税务评级 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/swpj/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_4.png'">
              </div>
              <span class="block">税务评级</span>
            </div>
          </a>
        </i-col>
        <!-- 抽查检查 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/ccjc/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_5.png'">
              </div>
              <span class="block">抽查检查</span>
            </div>
          </a>
        </i-col>
        <!-- 招投标 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/ztb/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_6.png'">
              </div>
              <span class="block">招投标</span>
            </div>
          </a>
        </i-col>
        <!-- 招聘 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/zp/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_7.png'">
              </div>
              <span class="block">招聘</span>
            </div>
          </a>
        </i-col>
        <!-- 需求 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/xq/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_demondgoods.png'"
                >
              </div>
              <span class="block">需求</span>
            </div>
          </a>
        </i-col>
        <!-- 供应 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/gy/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_supplygoods.png'"
                >
              </div>
              <span class="block">供应</span>
            </div>
          </a>
        </i-col>
        <!-- 进出口信用 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/jckxy/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_9.png'">
              </div>
              <span class="block">进出口信用</span>
            </div>
          </a>
        </i-col>
        <!-- 微信公众号 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/wechat/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_10.png'">
              </div>
              <span class="block">微信公众号</span>
            </div>
          </a>
        </i-col>
        <!-- 产品信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comOperateStatus/app/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'productinfo.png'"
                >
              </div>
              <span class="block">产品信息</span>
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <!--************************************** 知识产权 ****************************************-->
    <div class="container-block">
      <div class="plate-title">知识产权</div>
      <i-row>
        <!-- 商标 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/sb/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv6_1.png'">
              </div>
              <span class="block">商标</span>
            </div>
          </a>
        </i-col>
        <!-- 专利 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/zl/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv6_2.png'">
              </div>
              <span class="block">专利</span>
            </div>
          </a>
        </i-col>
        <!-- 著作权 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/zzq/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv6_4.png'">
              </div>
              <span class="block">著作权</span>
            </div>
          </a>
        </i-col>
        <!-- 网站备案 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comLedgeProperty/wzba/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv6_5.png'">
              </div>
              <span class="block">网站备案</span>
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <!--************************************** 新闻舆情 ****************************************-->
    <div class="container-block">
      <div class="plate-title">新闻舆情</div>
      <i-row>
        <!-- 新闻 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comNews/xw/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'news.png'">
              </div>
              <span class="block">新闻</span>
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <!--************************************** 历史信息 ****************************************-->
    <div class="container-block">
      <div class="plate-title">历史信息</div>
      <i-row>
        <!-- 工商信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisGsxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_basic.png'">
              </div>
              <span class="block">工商信息</span>
            </div>
          </a>
        </i-col>
        <!-- 股东信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisGdxx/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_holder.png'">
              </div>
              <span class="block">股东信息</span>
            </div>
          </a>
        </i-col>
        <!-- 对外投资 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisDwtz/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_invest.png'">
              </div>
              <span class="block">对外投资</span>
            </div>
          </a>
        </i-col>
        <!-- 开庭公告 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisKtgg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_kaiting.png'">
              </div>
              <span class="block">开庭公告</span>
            </div>
          </a>
        </i-col>
        <!-- 法律诉讼 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisFlss/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_falv.png'">
              </div>
              <span class="block">法律诉讼</span>
            </div>
          </a>
        </i-col>
        <!-- 法院公告 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisFygg/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_fayuan.png'">
              </div>
              <span class="block">法院公告</span>
            </div>
          </a>
        </i-col>
        <!-- 失信人信息 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisSxr/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_shixin.png'">
              </div>
              <span class="block">失信人信息</span>
            </div>
          </a>
        </i-col>
        <!-- 被执行人 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisBzxr/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_zhixing.png'">
              </div>
              <span class="block">被执行人</span>
            </div>
          </a>
        </i-col>
        <!-- 行政处罚 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisXzcf/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_chufa.png'">
              </div>
              <span class="block">行政处罚</span>
            </div>
          </a>
        </i-col>
        <!-- 股权出质 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisGqcz/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_guquan.png'">
              </div>
              <span class="block">股权出质</span>
            </div>
          </a>
        </i-col>
        <!-- 行政许可 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisXzxk/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'hx_xingzheng.png'"
                >
              </div>
              <span class="block">行政许可</span>
            </div>
          </a>
        </i-col>
        <!-- 动产抵押 -->
        <i-col span="6">
          <a
            :href="'/pages/companyInfoDepthPackage/pages/comHistoryInfo/hisDcdy/main?companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'hx_dongchan.png'"
                >
              </div>
              <span class="block">动产抵押</span>
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
import { compare } from "@/utils";
import { showLoading, hideLoading, formatTime } from "@/utils";
import store from "@/store";
const { $Toast } = require("../../../../../static/iview/base/index");
export default {
  data() {
    return {
      imgUrl: config.imgUrl,
      imgUrlScore: config.imgUrlScore,
      imgFile: config.imgFile,
      isShowAllContactInfo: false,
      userId: "",
      isListed: false, // 是否是上市公司
      companyId: "",
      companyName: "", // 公司名称 --辰欣药业股份有限公司
      companyLogo: "", // 公司logo
      legalPerson: "", // 公司法人
      registeredCapital: "0", // 注册资金
      registrationDate: "", // 注册时间
      historyNames: "", //曾用名
      profile: "", // 企业简介
      state: "", // 公司状态
      contactWay: "", // 联系方式
      website: "", // 公司网址
      mailbox: "", // 公司邮箱
      companyAddress: "", // 公司地址
      score: 0,
      showAllBiref: false, //是否显示公司全部详情
      lat: 0, // 维度
      lon: 0, //经度
      selfRisk: 0, //自身风险统计
      aroundRisk: 0, //周边风险统计

      shareholder: [], //股东
      mainPerson: [] //董监高
    };
  },
  computed: {
    cId() {
      return this.$store.state.companyId;
    }
  },
  methods: {
    myToast(con, type) {
      $Toast({
        content: con,
        type: type
      });
    },
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    },
    //深度头部信息
    tycCompanyInfoHead() {
      this.$http
        .get(config.tycCompanyInfoHead, { companyName: this.companyName })
        .then(res => {
          // 基本信息
          if (res.data.baseInfoV3.reason === "ok") {
            const baseInfoV3 = res.data.baseInfoV3.result;
            this.companyId = baseInfoV3.companyId;
            this.companyLogo = baseInfoV3.logo;
            this.legalPerson = baseInfoV3.legalPersonName;
            this.registeredCapital = baseInfoV3.regCapital;
            this.registrationDate = formatTime(
              new Date(baseInfoV3.estiblishTime)
            ).substr(0, 10);
            this.historyNames = baseInfoV3.historyNames
              ? baseInfoV3.historyNames
              : "--";
            this.contactWay = baseInfoV3.phoneNumber;
            this.website = baseInfoV3.websiteList;
            this.mailbox = baseInfoV3.email;
            this.companyAddress = baseInfoV3.regLocation;
            this.score = Math.floor(baseInfoV3.percentileScore / 100);

            //主要人员(董监高)
            this.mainPerson = baseInfoV3.staffList.result.map(item => {
              item.lastname = item.name.substr(0, 1);
              item.position = item.typeJoin.join("兼");
              return item;
            });
          }
          // 企业简介
          if (res.data.profile.reason == "ok") {
            this.profile = res.data.profile.result;
          } else {
            this.profile = "";
          }
          // 股东信息
          if (res.data.holder.reason == "ok") {
            this.shareholder = res.data.holder.result.items
              .map(item => {
                item.percent = item.capital[0].percent;
                if (item.type == 2) {
                  item.biref = item.name.substr(0, 1);
                } else {
                  let biref = "";
                  if (item.name.indexOf("县") != -1) {
                    biref = item.name.substr(item.name.indexOf("县") + 1, 4);
                  } else if (item.name.indexOf("市") != -1) {
                    biref = item.name.substr(item.name.indexOf("市") + 1, 4);
                  } else if (item.name.indexOf("区") != -1) {
                    biref = item.name.substr(item.name.indexOf("区") + 1, 4);
                  } else if (item.name.indexOf("省") != -1) {
                    biref = item.name.substr(item.name.indexOf("省") + 1, 4);
                  } else {
                    biref = item.name.substr(0, 4);
                  }
                  item.biref = biref;
                }
                item.name =
                  item.name.length > 7
                    ? item.name.substr(0, 7) + "..."
                    : item.name;
                return item;
              })
              .sort(compare("percent", "desc"));
          }
        });
    },
    //企信风险统计
    otherRiskForApp() {
      this.$http
        .get("app/search/otherRiskForApp", {
          termStr: this.cId,
          page: 1,
          pageSize: config.pageSize,
          type: "me"
        })
        .then(res => {
          this.selfRisk = res.data.zwfx;
        });
      this.$http
        .get("app/search/otherRiskForApp", {
          termStr: this.cId,
          page: 1,
          pageSize: config.pageSize,
          type: "other"
        })
        .then(res => {
          this.aroundRisk = res.data.zwfx;
        });
    },
    //显示公司全部详情
    _showAllBiref() {
      this.showAllBiref = true;
    },
    //隐藏公司全部详情
    _hideAllBiref() {
      this.showAllBiref = false;
    },
    // 拨打电话
    call(number) {
      wx.makePhoneCall({
        phoneNumber: number
      });
    },
    // 打开地图
    openMap() {
      const latitude = parseFloat(this.lat);
      const longitude = parseFloat(this.lon);
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      });
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
    //跳转详情页
    companyInfo(companyId) {
      wx.navigateTo({
        url:
          "/pages/companyInfoDepthPackage/pages/companyInfo/main?companyId=" +
          companyId
      });
    },
    // 跳转到个人或者详情
    goManInfoOrCompanyInfo(item) {
      if (item.type === 2) {
        this.goManInfo(item.name);
      } else if (item.type === 1) {
        //this.companyInfo(item.id);
      }
    },
    // 显示联系信息
    showAllContactInfo() {
      this.isShowAllContactInfo = !this.isShowAllContactInfo;
    },
    init() {
      this.$http.get(config.tycCompanyInfo, { companyName: this.companyName });
    }
  },
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
    this.isListed = this.$root.$mp.query.isListed;
    this.getLoginInfo();
    this.tycCompanyInfoHead();
    this.otherRiskForApp();
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.companyinfo-body {
  background: #f0f0f0;
  min-height: 100vh;
  .deep-search {
    position: fixed;
    top: 15rpx;
    right: 15rpx;
    width: 80rpx;
    height: 70rpx;
    padding-top: 10rpx;
    line-height: 30rpx;
    text-align: center;
    border-radius: 50%;
    background: #209bf9;
    color: #ffffff;
    font-size: 12px;
  }
  // 企业简介
  .company-biref {
    width: auto;
    background: #ffffff;
    padding: 20rpx;
    .logo-name {
      overflow: hidden;
      .logo {
        float: left;
        width: 100rpx;
        height: 100rpx;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .company-name-tag {
        float: left;
        margin-left: 15rpx;
        .company-name {
          border-left: 2px solid #209bf9;
          text-indent: 10rpx;
          color: #1c2438;
          font-weight: bold;
          font-size: 30rpx;
          margin: 10rpx 0;
        }
        .company-tag {
          font-size: 12px;
          line-height: 30rpx;
          .span {
            float: left;
            margin-left: 15rpx;
            border: solid 1px #209bf9;
            padding: 0 10rpx;
            border-radius: 15rpx;
            color: #209bf9;
          }
          .state-red {
            border: solid 1px #ff0000;
            color: #ff0000;
          }
          .save-invoice {
            float: left;
            margin-left: 20rpx;
            border: solid 1px #0aa30a;
            padding: 0 10rpx;
            color: #0aa30a;
          }
        }
      }
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
    .company-biref-text {
      width: 100%;
      .cbl {
        width: calc(100% - 120rpx);
        height: 40rpx;
        text-overflow: ellipsis;
        white-space: normal;
        overflow: hidden;
      }
      .slh {
        width: 60rpx;
      }
      .xq {
        width: 60rpx;
      }
    }
  }
  //企业简介弹窗
  .show-all-biref {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.7);
    .all-biref {
      position: absolute;
      width: 80%;
      top: 20%;
      left: 10%;
      background: #ffffff;
      border-radius: 8rpx;
      .top {
        line-height: 80rpx;
        font-size: 30rpx;
      }
      .text {
        padding: 20rpx;
        height: 500rpx;
        overflow-y: auto;
      }
      .bot {
        line-height: 80rpx;
      }
    }
  }
  // 企业简介下的图片
  .company-biref-img {
    background: #ffffff;
    height: 156rpx;
    .cbi-box {
      width: 31%;
      height: 156rpx;
      margin: 0 1%;
      img {
        width: 100%;
        height: 156rpx;
      }
    }
  }
  // 联系信息
  .contact-info {
    margin-top: 15rpx;
    background: #ffffff;
    .contact-tab {
      width: 94%;
      margin: 0 auto;
      height: 70rpx;
      line-height: 70rpx;
      .contact-left {
        float: left;
        img {
          width: 30rpx;
          height: 30rpx;
          margin-right: 15rpx;
        }
      }
      .show-info {
        float: right;
        color: #209bf9;
      }
    }
    .show-all-contact {
      .contact-tab {
        border-top: solid 1px #dddee1;
      }
    }
  }
  //股东-董监高
  .hareholder-djg {
    margin: 15rpx 0;
    background: #ffffff;
    .h-djg {
      width: 100%;
      overflow: hidden;
      .hdjg-left {
        width: 50rpx;
        height: 140rpx;
        margin: 10rpx;
      }
      .hdjg-left-hh {
        line-height: 70rpx;
        background: #e8f8fe;
        color: #5ccdf2;
      }
      .hdjg-left-djg {
        line-height: 46rpx;
        background: #eef4fd;
        color: #84aff0;
      }
      .hdjg-right {
        float: left;
        width: calc(100% - 80rpx);
        overflow: hidden;
        .filter {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          white-space: nowrap;
          .filter-item {
            display: inline-block;
            width: 220rpx;
            height: 140rpx;
            margin: 10rpx;
            background: #e5e4e4;
            border-radius: 8rpx;
            font-size: 12px;
            .fi-top {
              height: 70rpx;
              .item-logo {
                width: 60rpx;
                height: 60rpx;
                margin: 10rpx 10rpx 0 10rpx;
                border-radius: 5rpx;
                color: #ffffff;
                overflow: hidden;
                img {
                  width: 60rpx;
                  height: 60rpx;
                }
              }
              .font4 {
                color: #ffffff;
                line-height: 30rpx;
                white-space: normal;
              }
              .font1 {
                color: #ffffff;
                line-height: 60rpx;
                font-size: 40rpx;
              }
              .item-logo-hh {
                background: #5ccdf2;
              }
              .item-logo-djg {
                background: #84aff0;
              }
              .fi-top-text {
                width: 130rpx;
                height: 60rpx;
                line-height: 30rpx;
                margin-top: 10rpx;
                overflow: hidden;
                .name {
                  height: 60rpx;
                  overflow: hidden;
                  white-space: normal;
                }
                .sub-name {
                  width: 130rpx;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .big-gd {
                  float: left;
                  width: auto;
                  background: red;
                  margin-top: 5rpx;
                  padding: 0rpx 10rpx;
                  line-height: 25rpx;
                  font-size: 10px;
                  color: #ffffff;
                  border-top-left-radius: 8rpx;
                  border-bottom-right-radius: 8rpx;
                }
              }
            }
            .fi-bottom {
              text-indent: 10rpx;
            }
          }
        }
      }
    }
  }
  // 企信风险
  .qx-risk {
    width: 98%;
    height: 80rpx;
    background: #ffffff;
    margin: 15rpx 1%;
    font-size: 12px;
    .risk-icon {
      margin-left: 10rpx;
      margin-top: 10rpx;
      img {
        width: 80rpx;
        height: 68rpx;
      }
    }
    .risk {
      margin: 0 10rpx;
      line-height: 80rpx;
    }
    .risk-num {
      display: block;
      padding: 0 10rpx;
      line-height: 30rpx;
      border: solid 1px #ff3030;
      background: #ffd7d5;
      color: #ff3030;
      margin-top: 25rpx;
    }
    .look-risk {
      padding: 0 10rpx;
      line-height: 40rpx;
      margin-top: 20rpx;
      margin-right: 10rpx;
      color: #ff3030;
      border: solid 1px #ff3030;
    }
  }
  //企业图谱
  .company-map {
    margin: 15rpx 0;
    padding: 10rpx 0;
    background: #ffffff;
    .cm-title {
      padding-left: 20rpx;
      margin-bottom: 15rpx;
    }
    .filter-type {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
      //text-overflow: ellipsis;
      .type-item {
        display: inline-block;
        width: calc(33% - 20rpx);
        height: auto;
        margin: 0 10rpx;
        .typeimg {
          width: 100%;
          border: solid 1px #dddee1;
          border-radius: 10rpx;
        }
      }
    }
  }
  //板块盒子
  .container-block {
    width: 94%;
    margin: 15rpx 3%;
    background: #ffffff;
    border-radius: 10rpx;
    box-shadow: 0 0 10rpx 10rpx 10rpx #bbbec4;
    .plate-title {
      display: inline-block;
      margin-left: 15rpx;
      margin-top: 15rpx;
      border-left: solid 2px #209bf9;
      color: #1c2438;
      text-indent: 25rpx;
    }
    .plate-line {
      margin-top: 20rpx;
      line-height: 80rpx;
      text-align: center;
      .item-img-box {
        width: 40rpx;
        height: 40rpx;
        margin: 0 auto;
        .item-img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .shendu {
        width: 30rpx;
        height: 30rpx;
        margin-top: 25rpx;
        margin-right: 20rpx;
      }
      .ic_hot,
      .ic_new2 {
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
}
</style>
