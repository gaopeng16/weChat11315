<template>
  <div class="companyinfo-body" :class="[showAllBiref?'no-scroll-body':'']">
    <Vip v-if="showByVip"></Vip>
    <div class="deep-search" @click="comDepthSearch(companyName)">深度
      <br>查询
    </div>
    <!-- 公司简介部分 -->
    <div class="company-biref">
      <div class="logo-name">
        <div class="logo">
          <img mode="aspectFit" v-if="imgFile && companyLogo" :src="imgFile+companyLogo">
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
      <div class="company-biref-text clearboth">
        <div class="cbl left">简介：{{newContent?newContent:'暂无简介'}}</div>
        <div class="slh left" v-if="newContent">...</div>
        <div class="xq right font-click" v-if="newContent" @click="_showAllBiref">详情</div>
      </div>
      <div class="show-all-biref" v-show="showAllBiref">
        <div class="all-biref">
          <div class="top text-center">简介</div>
          <div class="text">{{newContent}}</div>
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
      <div class="cbi-box left" @click="aroundBussiness">
        <img v-if="imgUrl" :src="imgUrl+'top_map.png'">
      </div>
      <div class="cbi-box left">
        <img v-if="imgFile && creditPhoto" :src="imgFile+creditPhoto">
        <img v-else-if="imgUrl" :src="imgUrl+'wtg.png'">
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
      <div class="h-djg hareholder" v-if="shareholder.length > 0">
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
                  :class="[item.type == 1 ? 'font1':'font4']"
                >
                  <img v-if="imgFile && item.logo" :src="imgFile+item.logo">
                  <span v-else>{{item.biref}}</span>
                </div>
                <div class="fi-top-text left">
                  <div v-if="item.type == 1" class="font-click">{{item.shareholderName}}</div>
                  <div v-if="item.type == 2">
                    <div
                      class="font-click"
                      :class="[index == 0 ? 'sub-name':'name']"
                    >{{item.shareholderName}}</div>
                  </div>
                  <div v-if="index == 0" class="sub-name big-gd">大股东</div>
                </div>
              </div>
              <div class="fi-bottom">
                持股比例:
                <span class="red">{{item.investmentRatio}}</span>
              </div>
              <div class="fi-bottom origin-deep" v-if="item.toco == ''">他的企业>></div>
              <div class="fi-bottom" v-else>
                他有
                <span class="red">{{item.toco}}</span>家企业
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
      <div class="h-djg djg" v-if="mainPerson.length > 0">
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
                  <img v-if="imgFile && item.headUrl" :src="imgFile+item.headUrl">
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
      <a :href="'/pages/companyInfoPackage/pages/comBascInfo/qxfx/main?companyId='+companyId">
        <div class="look-risk right">查看风险</div>
      </a>
    </div>
    <!-- 企业图谱 -->
    <div class="company-map">
      <div class="cm-title title blod lh70">企业图谱</div>
      <div class="filter-type">
        <div
          class="type-item"
          @click="mapGroup('/pages/companyInfoPackage/pages/comBascInfo/gxt/main?companyId='+companyId)"
        >
          <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'icon_guanxi.png'">
          <div class="title blod lh50 text-center">企业关系</div>
        </div>
        <div
          class="type-item"
          @click="mapGroup('/pages/companyInfoPackage/pages/comBascInfo/gqctt/main?companyId='+companyId)"
        >
          <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'icon_guquan.png'">
          <div class="title blod lh50 text-center">股权穿透图</div>
        </div>
        <div
          class="type-item"
          @click="mapGroup('/pages/companyInfoPackage/pages/comBascInfo/gqjgt/main?companyId='+companyId+'&companyName='+companyName)"
        >
          <img mode="widthFix" class="typeimg" v-if="imgUrl" :src="imgUrl+'guquanchuantou.png'">
          <div class="title blod lh50 text-center">股权结构</div>
        </div>
      </div>
    </div>
    <!--************************************** 上市信息 ****************************************-->
    <div class="container-block" v-if="isListed">
      <div class="plate-title">上市信息</div>
      <i-row>
        <!-- 股票详情 -->
        <i-col span="11" offset="1">
          <a :href="'/pages/companyInfoPackage/pages/comListed/gpxq/main?companyId='+companyId">
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv7_1.png'">
              </div>
              <span class="left">股票详情</span>
              <img class="shendu right" v-if="imgUrl" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 企业简介 -->
        <i-col span="11" offset="1">
          <a :href="'/pages/companyInfoPackage/pages/comListed/qyjj/main?companyId='+companyId">
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'companypro.png'">
              </div>
              <span class="left">企业简介</span>
              <img class="shendu right" v-if="imgUrl" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 参股控股 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comListed/cgkg/main?companyId='+companyId+'&total='+cgkgTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_3.png'">
              </div>
              <span class="left">参股控股</span>
              <span v-if="cgkgTotal" class="right mr20 sub-content">{{cgkgTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 上市公告 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comListed/ssgg/main?companyId='+companyId+'&total='+ssggTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_11.png'">
              </div>
              <span class="left">上市公告</span>
              <span v-if="ssggTotal" class="right mr20 sub-content">{{ssggTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 发行相关 -->
        <i-col span="11" offset="1">
          <a :href="'/pages/companyInfoPackage/pages/comListed/fxxg/main?companyId='+companyId">
            <div class="plate-line">
              <div class="item-img-box left">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_faxing.png'"
                >
              </div>
              <span class="left">发行相关</span>
              <img class="shendu right" v-if="imgUrl" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 高管信息 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comListed/ggxx/main?companyId='+companyId+'&total='+ggxxTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_4.png'">
              </div>
              <span class="left">高管信息</span>
              <span v-if="ggxxTotal" class="right mr20 sub-content">{{ggxxTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 股本变动 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comListed/gbbd/main?companyId='+companyId+'&total='+gbbdTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_4.png'">
              </div>
              <span class="left">股本变动</span>
              <span v-if="gbbdTotal" class="right mr20 sub-content">{{gbbdTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 分红情况 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comListed/fhqk/main?companyId='+companyId+'&total='+fhqkTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_4.png'">
              </div>
              <span class="left">分红情况</span>
              <span v-if="fhqkTotal" class="right mr20 sub-content">{{fhqkTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
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
        <i-col span="11" offset="1">
          <a :href="'/pages/companyInfoPackage/pages/comBascInfo/gsxx/main?companyId='+companyId">
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_1.png'">
              </div>
              <span class="left">工商信息</span>
              <img class="ic_hot left" v-if="imgUrl" :src="imgUrl+'ic_hot.png'">
            </div>
          </a>
        </i-col>
        <!-- 企信风险 -->
        <i-col span="11" offset="1">
          <a :href="'/pages/companyInfoPackage/pages/comBascInfo/qxfx/main?companyId='+companyId">
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_1.png'">
              </div>
              <span class="left">企信风险</span>
              <span
                v-if="selfRisk+aroundRisk"
                class="right mr20 sub-content"
              >{{selfRisk+aroundRisk}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 资质证书 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/zzzs/main?companyId='+companyId+'&total='+zzzsTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_1.png'">
              </div>
              <span class="left">资质证书</span>
              <span v-if="zzzsTotal" class="right mr20 sub-content">{{zzzsTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 主要人员 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/zyry/main?companyId='+companyId+'&total='+zyryTotal+'&companyName='+companyName"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_3.png'">
              </div>
              <span class="left">主要人员</span>
              <span v-if="zyryTotal" class="right mr20 sub-content">{{zyryTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 股东 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/gdxx/main?companyId='+companyId+'&total='+gdxxTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_4.png'">
              </div>
              <span class="left">股东</span>
              <span v-if="gdxxTotal" class="right mr20 sub-content">{{gdxxTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 对外投资 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/dwtz/main?companyId='+companyId+'&total='+dwtzTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_5.png'">
              </div>
              <span class="left">对外投资</span>
              <span v-if="dwtzTotal" class="right mr20 sub-content">{{dwtzTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 变更记录 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/bgjl/main?companyId='+companyId+'&total='+bgjlTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_6.png'">
              </div>
              <span class="left">变更记录</span>
              <span v-if="bgjlTotal" class="right mr20 sub-content">{{bgjlTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 年报 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/qynb/main?companyId='+companyId+'&total='+qynbTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_7.png'">
              </div>
              <span class="left">年报</span>
              <span v-if="qynbTotal" class="right mr20 sub-content">{{qynbTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 分支机构 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/fzjg/main?companyId='+companyId+'&total='+fzjgTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_8.png'">
              </div>
              <span class="left">分支机构</span>
              <span v-if="fzjgTotal" class="right mr20 sub-content">{{fzjgTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 实际控制权 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/sjkzq/main?companyId='+companyId+'&total='+sjkzqTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_realkongzhi.png'"
                >
              </div>
              <span class="left">实际控制权</span>
              <span v-if="sjkzqTotal" class="right mr20 sub-content">{{sjkzqTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 最终受益人 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comBascInfo/zzsyr/main?companyName='+companyName+'&companyId='+companyId+'&total='+zzsyrTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_shouyiren.png'"
                >
              </div>
              <span class="left">最终受益人</span>
              <span v-if="zzsyrTotal" class="right mr20 sub-content">{{zzsyrTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 股权结构 -->
        <i-col span="11" offset="1">
          <a href="/pages/companyInfoPackage/pages/comBascInfo/gqjgt/main">
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_9.png'">
              </div>
              <span class="left">股权结构</span>
              <img class="ic_new2 left" v-if="imgUrl" :src="imgUrl+'ic_new2.png'">
            </div>
          </a>
        </i-col>
        <!-- 关系图 -->
        <i-col span="11" offset="1">
          <a href="/pages/companyInfoPackage/pages/comBascInfo/gxt/main">
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv1_2.png'">
              </div>
              <span class="left">关系图</span>
              <img class="ic_new2 left" v-if="imgUrl" :src="imgUrl+'ic_new2.png'">
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
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comJusticeRisk/flss/main?companyId='+companyId+'&total='+flssTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv3_1.png'">
              </div>
              <span class="left">法律诉讼</span>
              <span v-if="flssTotal" class="right mr20 sub-content">{{flssTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 法院公告 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comJusticeRisk/fygg/main?companyId='+companyId+'&total='+fyggTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv3_2.png'">
              </div>
              <span class="left">法院公告</span>
              <span v-if="fyggTotal" class="right mr20 sub-content">{{fyggTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 失信人 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comJusticeRisk/sxr/main?companyId='+companyId+'&total='+sxrTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv3_3.png'">
              </div>
              <span class="left">失信人</span>
              <span v-if="sxrTotal" class="right mr20 sub-content">{{sxrTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 被执行人 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comJusticeRisk/bzxr/main?companyId='+companyId+'&total='+bzxrTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv3_4.png'">
              </div>
              <span class="left">被执行人</span>
              <span v-if="bzxrTotal" class="right mr20 sub-content">{{bzxrTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 开庭公告 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comJusticeRisk/ktgg/main?companyId='+companyId+'&total='+ktggTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_7.png'">
              </div>
              <span class="left">开庭公告</span>
              <span v-if="ktggTotal" class="right mr20 sub-content">{{ktggTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
        <!-- 司法协助 -->
        <i-col span="11" offset="1">
          <a
            :href="'/pages/companyInfoPackage/pages/comJusticeRisk/sfxz/main?companyId='+companyId+'&total='+sfxzTotal"
          >
            <div class="plate-line">
              <div class="item-img-box left">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'ic_gv_xiezhu.png'"
                >
              </div>
              <span class="left">司法协助</span>
              <span v-if="sfxzTotal" class="right mr20 sub-content">{{sfxzTotal}}</span>
              <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
            </div>
          </a>
        </i-col>
      </i-row>
    </div>
    <!--****************************************************** VIP专享受 ********************************************************-->
    <div class="relative">
      <!-- 非vip遮罩 -->
      <div v-if="!vipLevel" class="shade absolute" @click="goBuyVip">
        <img class="shade-bg" v-if="imgUrl" :src="imgUrl+'bg_mao_2.jpg'">
        <img class="vip" v-if="imgUrl" :src="imgUrl+'vip_ic_pay.png'">
      </div>
      <!--************************************** 企业发展 ****************************************-->
      <div class="container-block">
        <div class="plate-title">企业发展</div>
        <i-row>
          <!-- 融资历史 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comDevelopment/rzls/main?companyId='+companyId+'&total='+rzlsTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_1.png'">
                </div>
                <span class="left">融资历史</span>
                <span v-if="rzlsTotal" class="right mr20 sub-content">{{rzlsTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 核心团队 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comDevelopment/hxtd/main?companyId='+companyId+'&total='+hxtdTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_2.png'">
                </div>
                <span class="left">核心团队</span>
                <span v-if="hxtdTotal" class="right mr20 sub-content">{{hxtdTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 企业业务 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comDevelopment/qyyw/main?companyId='+companyId+'&total='+qyywTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_3.png'">
                </div>
                <span class="left">企业业务</span>
                <span v-if="qyywTotal" class="right mr20 sub-content">{{qyywTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 投资事件 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comDevelopment/tzsj/main?companyId='+companyId+'&total='+tzsjTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_4.png'">
                </div>
                <span class="left">投资事件</span>
                <span v-if="tzsjTotal" class="right mr20 sub-content">{{tzsjTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 竞品信息 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comDevelopment/jpxx/main?companyId='+companyId+'&total='+jpxxTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv2_5.png'">
                </div>
                <span class="left">竞品信息</span>
                <span v-if="jpxxTotal" class="right mr20 sub-content">{{jpxxTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 宣传视频 -->
          <i-col span="11" offset="1">
            <div class="plate-line">
              <div class="item-img-box left">
                <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'video.png'">
              </div>
              <span class="left">宣传视频</span>
              <img class="shendu right" v-if="imgUrl" :src="imgUrl+'ic_shendu.png'">
            </div>
          </i-col>
          <!-- 企业展示 -->
          <i-col span="11" offset="1">
            <div class="plate-line">
              <div class="item-img-box left">
                <img
                  class="item-img"
                  mode="aspectFit"
                  v-if="imgUrl"
                  :src="imgUrl+'conpanyshow.png'"
                >
              </div>
              <span class="left">企业展示</span>
              <img class="shendu right" v-if="imgUrl" :src="imgUrl+'ic_shendu.png'">
            </div>
          </i-col>
        </i-row>
      </div>
      <!--************************************** 经营风险 ****************************************-->
      <div class="container-block">
        <div class="plate-title">经营风险</div>
        <i-row>
          <!-- 经营异常 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateRisk/jyyc/main?companyId='+companyId+'&total='+jyycTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_1.png'">
                </div>
                <span class="left">经营异常</span>
                <span v-if="jyycTotal" class="right mr20 sub-content">{{jyycTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 行政处罚 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateRisk/xzcf/main?companyId='+companyId+'&total='+xzcfTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_2.png'">
                </div>
                <span class="left">行政处罚</span>
                <span v-if="xzcfTotal" class="right mr20 sub-content">{{xzcfTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 严重违法 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateRisk/yzwf/main?companyId='+companyId+'&total='+yzwfTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_3.png'">
                </div>
                <span class="left">严重违法</span>
                <span v-if="yzwfTotal" class="right mr20 sub-content">{{yzwfTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 股权出质 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateRisk/gqcz/main?companyId='+companyId+'&total='+gqczTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_4.png'">
                </div>
                <span class="left">股权出质</span>
                <span v-if="gqczTotal" class="right mr20 sub-content">{{gqczTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 动产抵押 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateRisk/dcdy/main?companyId='+companyId+'&total='+dcdyTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_5.png'">
                </div>
                <span class="left">动产抵押</span>
                <span v-if="dcdyTotal" class="right mr20 sub-content">{{dcdyTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 欠税公告 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateRisk/qsgg/main?companyId='+companyId+'&total='+qsggTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_6.png'">
                </div>
                <span class="left">欠税公告</span>
                <span v-if="qsggTotal" class="right mr20 sub-content">{{qsggTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 司法拍卖 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateRisk/sfpm/main?companyId='+companyId+'&total='+sfpmTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv4_7.png'">
                </div>
                <span class="left">司法拍卖</span>
                <span v-if="sfpmTotal" class="right mr20 sub-content">{{sfpmTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 清算信息 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateRisk/qsxx/main?companyId='+companyId"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'ic_gv_qingsuan.png'"
                  >
                </div>
                <span class="left">清算信息</span>
                <img class="shendu right" v-if="imgUrl" :src="imgUrl+'ic_shendu.png'">
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
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/gdxx/main?companyId='+companyId+'&total='+gdxxJyTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_2.png'">
                </div>
                <span class="left">购地信息</span>
                <span v-if="gdxxJyTotal" class="right mr20 sub-content">{{gdxxJyTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 债券信息 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/zqxx/main?companyId='+companyId+'&total='+zqxxTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_3.png'">
                </div>
                <span class="left">债券信息</span>
                <span v-if="zqxxTotal" class="right mr20 sub-content">{{zqxxTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 税务评级 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/swpj/main?companyId='+companyId+'&total='+swpjTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_4.png'">
                </div>
                <span class="left">税务评级</span>
                <span v-if="swpjTotal" class="right mr20 sub-content">{{swpjTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 抽查检查 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/ccjc/main?companyId='+companyId+'&total='+ccjcTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_5.png'">
                </div>
                <span class="left">抽查检查</span>
                <span v-if="ccjcTotal" class="right mr20 sub-content">{{ccjcTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 招投标 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/ztb/main?companyId='+companyId+'&total='+ztbTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_6.png'">
                </div>
                <span class="left">招投标</span>
                <span v-if="ztbTotal" class="right mr20 sub-content">{{ztbTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 招聘 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/zp/main?companyId='+companyId+'&total='+zpTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_7.png'">
                </div>
                <span class="left">招聘</span>
                <span v-if="zpTotal" class="right mr20 sub-content">{{zpTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 需求 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/xq/main?companyId='+companyId+'&total='+xqTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'ic_gv_demondgoods.png'"
                  >
                </div>
                <span class="left">需求</span>
                <span v-if="xqTotal" class="right mr20 sub-content">{{xqTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 供应 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/gy/main?companyId='+companyId+'&total='+gyTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'ic_gv_supplygoods.png'"
                  >
                </div>
                <span class="left">供应</span>
                <span v-if="gyTotal" class="right mr20 sub-content">{{gyTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 进出口信用 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/jckxy/main?companyId='+companyId"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv5_9.png'">
                </div>
                <span class="left">进出口信用</span>
                <img class="shendu right" v-if="imgUrl" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 微信公众号 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/wechat/main?companyId='+companyId+'&total='+wechatTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'ic_gv5_10.png'"
                  >
                </div>
                <span class="left">微信公众号</span>
                <span v-if="wechatTotal" class="right mr20 sub-content">{{wechatTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 产品信息 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comOperateStatus/app/main?companyId='+companyId+'&total='+appTotalss"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'productinfo.png'"
                  >
                </div>
                <span class="left">产品信息</span>
                <span v-if="appTotal" class="right mr20 sub-content">{{appTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
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
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comLedgeProperty/sb/main?companyId='+companyId+'&total='+sbTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv6_1.png'">
                </div>
                <span class="left">商标</span>
                <span v-if="sbTotal" class="right mr20 sub-content">{{sbTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 专利 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comLedgeProperty/zl/main?companyId='+companyId+'&total='+zlTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv6_2.png'">
                </div>
                <span class="left">专利</span>
                <span v-if="zlTotal" class="right mr20 sub-content">{{zlTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 著作权 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comLedgeProperty/zzq/main?companyId='+companyId+'&total='+(rjzzqTotal+zpzzqTotal)"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv6_4.png'">
                </div>
                <span class="left">著作权</span>
                <span
                  v-if="rjzzqTotal+zpzzqTotal"
                  class="right mr20 sub-content"
                >{{rjzzqTotal+zpzzqTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 网站备案 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comLedgeProperty/wzba/main?companyId='+companyId+'&total='+wzbaTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'ic_gv6_5.png'">
                </div>
                <span class="left">网站备案</span>
                <span v-if="wzbaTotal" class="right mr20 sub-content">{{wzbaTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
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
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comNews/xw/main?companyId='+companyId+'&total='+newsTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'news.png'">
                </div>
                <span class="left">新闻</span>
                <span v-if="newsTotal" class="right mr20 sub-content">{{newsTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'ic_shendu.png'">
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
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisGsxx/main?companyId='+companyId"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_basic.png'">
                </div>
                <span class="left">工商信息</span>
                <img class="shendu right" v-if="imgUrl" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 股东信息 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisGdxx/main?companyId='+companyId+'&total='+hisGdxxTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_holder.png'"
                  >
                </div>
                <span class="left">股东信息</span>
                <span v-if="hisGdxxTotal" class="right mr20 sub-content">{{hisGdxxTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 对外投资 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisDwtz/main?companyId='+companyId+'&total='+hisDwtzTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_invest.png'"
                  >
                </div>
                <span class="left">对外投资</span>
                <span v-if="hisDwtzTotal" class="right mr20 sub-content">{{hisDwtzTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 开庭公告 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisKtgg/main?companyId='+companyId+'&total='+hisKtggTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_kaiting.png'"
                  >
                </div>
                <span class="left">开庭公告</span>
                <span v-if="hisKtggTotal" class="right mr20 sub-content">{{hisKtggTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 法律诉讼 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisFlss/main?companyId='+companyId+'&total='+hisFlssTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_falv.png'">
                </div>
                <span class="left">法律诉讼</span>
                <span v-if="hisFlssTotal" class="right mr20 sub-content">{{hisFlssTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 法院公告 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisFygg/main?companyId='+companyId+'&total='+hisFyggTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_fayuan.png'"
                  >
                </div>
                <span class="left">法院公告</span>
                <span v-if="hisFyggTotal" class="right mr20 sub-content">{{hisFyggTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 失信人信息 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisSxr/main?companyId='+companyId+'&total='+hisSxrTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_shixin.png'"
                  >
                </div>
                <span class="left">失信人信息</span>
                <span v-if="hisSxrTotal" class="right mr20 sub-content">{{hisSxrTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 被执行人 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisBzxr/main?companyId='+companyId+'&total='+hisBzxrTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_zhixing.png'"
                  >
                </div>
                <span class="left">被执行人</span>
                <span v-if="hisBzxrTotal" class="right mr20 sub-content">{{hisBzxrTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 行政处罚 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisXzcf/main?companyId='+companyId+'&total='+hisXzcfTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img class="item-img" mode="aspectFit" v-if="imgUrl" :src="imgUrl+'hx_chufa.png'">
                </div>
                <span class="left">行政处罚</span>
                <span v-if="hisXzcfTotal" class="right mr20 sub-content">{{hisXzcfTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 股权出质 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisGqcz/main?companyId='+companyId+'&total='+hisGqczTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_guquan.png'"
                  >
                </div>
                <span class="left">股权出质</span>
                <span v-if="hisGqczTotal" class="right mr20 sub-content">{{hisGqczTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 行政许可 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisXzxk/main?companyId='+companyId+'&total='+hisXzxkTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_xingzheng.png'"
                  >
                </div>
                <span class="left">行政许可</span>
                <span v-if="hisXzxkTotal" class="right mr20 sub-content">{{hisXzxkTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
          <!-- 动产抵押 -->
          <i-col span="11" offset="1">
            <a
              :href="'/pages/companyInfoPackage/pages/comHistoryInfo/hisDcdy/main?companyId='+companyId+'&total='+hisDcdyTotal"
            >
              <div class="plate-line">
                <div class="item-img-box left">
                  <img
                    class="item-img"
                    mode="aspectFit"
                    v-if="imgUrl"
                    :src="imgUrl+'hx_dongchan.png'"
                  >
                </div>
                <span class="left">动产抵押</span>
                <span v-if="hisDcdyTotal" class="right mr20 sub-content">{{hisDcdyTotal}}</span>
                <img v-else-if="imgUrl" class="shendu right" :src="imgUrl+'hx_ic_shendu.png'">
              </div>
            </a>
          </i-col>
        </i-row>
      </div>
    </div>
    <!--****************************************************** VIP专享受 ********************************************************-->
    <!-- 占高 -->
    <div style="height:120rpx;"></div>
    <!-- 底部小导航部分 -->
    <div class="foot">
      <i-row i-class="text-center">
        <i-col span="6">
          <div @click="creditReport">
            <i-icon type="activity" size="28"/>
            <br>
            <span>信用报告</span>
          </div>
        </i-col>
        <i-col span="6">
          <div @click="companyClaim">
            <i-icon type="mine" size="28" :color="iconBoolean2?'#209bf9':'#80848f'"/>
            <br>
            <span v-if="iconBoolean2" :class="[iconBoolean2?'font-click':'']">已认领</span>
            <span v-else>未认领</span>
          </div>
        </i-col>
        <i-col span="6">
          <div @click="attentions">
            <i-icon type="like" size="28" :color="iconBoolean3?'#209bf9':'#80848f'"/>
            <br>
            <span v-if="iconBoolean3" style="color:#209bf9">已关注</span>
            <span v-else>未关注</span>
          </div>
        </i-col>
        <i-col span="6">
          <div @click="monitoring">
            <i-icon type="browse" size="28" :color="iconBoolean4?'#209bf9':'#80848f'"/>
            <br>
            <span v-if="iconBoolean4" style="color:#209bf9;">已监控</span>
            <span v-else>未监控</span>
          </div>
        </i-col>
      </i-row>
    </div>
    <i-toast id="toast"/>
  </div>
</template>
<script>
import config from "@/config.js";
import { mapState, mapMutations } from "vuex";
import {
  SET_IS_DEPTH,
  SET_COMPANY_NAME,
  SET_COMPANY_ID
} from "@/store/mutation-types";
import { compare } from "@/utils";
import { showLoading, hideLoading } from "@/utils";
import Vip from "@/components/Vip";
const { $Toast } = require("../../../../../static/iview/base/index");
export default {
  components: { Vip },
  data() {
    return {
      imgUrl: config.imgUrl,
      imgUrlScore: config.imgUrlScore,
      imgFile: config.imgFile,
      isShowAllContactInfo: false,
      userId: "",
      showByVip: false,
      isListed: false, // 是否是上市公司
      companyId: "",
      companyName: "", // 公司名称
      companyLogo: "", // 公司logo
      legalPerson: "", // 公司法人
      registeredCapital: "0", // 注册资金
      registrationDate: "", // 注册时间
      state: "", // 公司状态
      contactWay: "", // 联系方式
      website: "", // 公司网址
      mailbox: "", // 公司邮箱
      companyAddress: "", // 公司地址
      newContent: "", // 公司简介
      showAllBiref: false, //是否显示公司全部简介
      hasLongitude: false,
      creditPhoto: "", //拍照
      lat: 0, // 维度
      lon: 0, //经度
      score: 0, // 评分
      selfRisk: 0, //自身风险统计
      aroundRisk: 0, //周边风险统计

      shareholder: [], //股东
      mainPerson: [], //董监高

      cgkgTotal: 0, // 上市信息-参股控股统计
      ssggTotal: 0, // 上市信息-上市公告统计
      ggxxTotal: 0, // 上市信息-高管信息统计
      gbbdTotal: 0, // 上市信息-股本变动统计
      fhqkTotal: 0, // 上市信息-分红情况统计

      zzzsTotal: 0, // 基本信息-资质证书统计
      zyryTotal: 0, // 基本信息-主要人员统计
      gdxxTotal: 0, // 基本信息-股东信息统计
      dwtzTotal: 0, // 基本信息-对外投资统计
      bgjlTotal: 0, // 基本信息-变更记录统计
      fzjgTotal: 0, // 基本信息-分支机构统计
      qynbTotal: 0, // 基本信息-企业年报统计
      sjkzqTotal: 0, // 基本信息-实际控制权统计
      zzsyrTotal: 0, // 基本信息-最终受益人统计

      flssTotal: 0, // 司法风险-法律诉讼统计
      fyggTotal: 0, // 司法风险-法院公告统计
      sxrTotal: 0, // 司法风险-失信人统计
      bzxrTotal: 0, // 司法风险-被执行人统计
      ktggTotal: 0, // 司法风险-被执行人统计
      sfxzTotal: 0, // 司法风险-司法协助统计

      rzlsTotal: 0, // 企业发展-融资历史统计
      hxtdTotal: 0, // 企业发展-核心团队统计
      qyywTotal: 0, // 企业发展-企业业务统计
      tzsjTotal: 0, // 企业发展-投资事件统计
      jpxxTotal: 0, // 企业发展-竞品信息统计

      jyycTotal: 0, // 经营风险-经营异常统计
      xzcfTotal: 0, // 经营风险-行政处罚统计
      yzwfTotal: 0, // 经营风险-严重违法统计
      gqczTotal: 0, // 经营风险-股权出质统计
      dcdyTotal: 0, // 经营风险-动产抵押统计
      qsggTotal: 0, // 经营风险-欠税公告统计
      sfpmTotal: 0, // 经营风险-司法拍卖统计

      gdxxJyTotal: 0, // 经营状况-购地信息统计
      zqxxTotal: 0, // 经营状况-债券信息统计
      swpjTotal: 0, // 经营状况-税务评级统计
      ccjcTotal: 0, // 经营状况-抽查检查统计
      ztbTotal: 0, // 经营状况-招投标统计
      zpTotal: 0, // 经营状况-招聘统计
      gyTotal: 0, // 经营状况-供应统计
      xqTotal: 0, // 经营状况-需求统计
      wechatTotal: 0, // 经营状况-微信公众号统计
      appTotal: 0, // 经营状况-产品信息统计

      sbTotal: 0, // 知识产权-商标统计
      zlTotal: 0, // 知识产权-专利统计
      rjzzqTotal: 0, // 知识产权-软件著作权统计
      zpzzqTotal: 0, // 知识产权-作品著作权统计
      wzbaTotal: 0, // 知识产权-网站备案统计

      newsTotal: 0, // 新闻舆情-新闻统计

      hisGdxxTotal: 0, // 历史信息-股东信息统计
      hisDwtzTotal: 0, // 历史信息-对外投资统计
      hisKtggTotal: 0, // 历史信息-开庭公告统计
      hisFlssTotal: 0, // 历史信息-法律诉讼统计
      hisFyggTotal: 0, // 历史信息-法院公告统计
      hisSxrTotal: 0, // 历史信息-失信人信息统计
      hisBzxrTotal: 0, // 历史信息-被执行人统计
      hisXzcfTotal: 0, // 历史信息-行政处罚统计
      hisGqczTotal: 0, // 历史信息-股权出质统计
      hisXzxkTotal: 0, // 历史信息-行政许可统计
      hisDcdyTotal: 0, // 历史信息-动产抵押统计

      iconBoolean1: false, // 底部-信用报告
      iconBoolean2: false, // 底部-是否认领
      iconBoolean3: false, // 底部-是否关注
      iconBoolean4: false // 底部-是否监控
    };
  },
  computed: {
    ...mapState(["vipLevel", "isDepth"])
  },
  methods: {
    ...mapMutations({
      _isDepth: SET_IS_DEPTH,
      setCompanyName: SET_COMPANY_NAME,
      setCompanyId: SET_COMPANY_ID
    }),
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
    // 判断是否上市
    _isListed() {
      this.$http
        .post(config.isListed, { companyId: this.companyId })
        .then(res => {
          if (res.data.code == 0) {
            this.isListed = true;
          } else {
            this.isListed = false;
          }
        });
    },
    // GET /companyInfo/comBasic 获取企业基本信息
    comBasic() {
      // 股东
      this.$http
        .get("app/buss/companyInfo/comBasic", {
          companyId: this.companyId,
          type: "holder"
        })
        .then(res => {
          if (res.data.code == 0) {
            this.shareholder = res.data.data.holder.map(item => {
              item.investmentRatio = !item.investmentRatio.startsWith("未")
                ? item.investmentRatio.slice(
                    0,
                    item.investmentRatio.length - 1
                  ) + "%"
                : item.investmentRatio;
              if (item.type == 1) {
                item.biref = item.shareholderName.substr(0, 1);
              } else {
                let biref = "";
                if (item.shareholderName.indexOf("县") != -1) {
                  biref = item.shareholderName.substr(
                    item.shareholderName.indexOf("县") + 1,
                    4
                  );
                } else if (item.shareholderName.indexOf("市") != -1) {
                  biref = item.shareholderName.substr(
                    item.shareholderName.indexOf("市") + 1,
                    4
                  );
                } else if (item.shareholderName.indexOf("区") != -1) {
                  biref = item.shareholderName.substr(
                    item.shareholderName.indexOf("区") + 1,
                    4
                  );
                } else if (item.shareholderName.indexOf("省") != -1) {
                  biref = item.shareholderName.substr(
                    item.shareholderName.indexOf("省") + 1,
                    4
                  );
                } else {
                  biref = item.shareholderName.substr(0, 4);
                }
                item.biref = biref;
              }
              item.shareholderName =
                item.shareholderName.length > 7
                  ? item.shareholderName.substr(0, 7) + "..."
                  : item.shareholderName;
              return item;
            });
          }
        });
      // 董监高
      this.$http
        .get("app/buss/companyInfo/comBasic", {
          companyId: this.companyId,
          type: "mainPerson"
        })
        .then(res => {
          if (res.data.code == 0) {
            this.mainPerson = res.data.data.mainPerson.map(item => {
              item.lastname = item.name.substr(0, 1);
              return item;
            });
          }
        });
    },
    // GET /companyInfo/comHead 获取企业头信息
    comHead() {
      this.$http
        .get("app/buss/companyInfo/comHead", {
          companyId: this.companyId
        })
        .then(res => {
          if (res.data.code == 0) {
            this.newContent = res.data.data.newContent;
            const comBasicData = res.data.data.comBasic;
            this.companyName = comBasicData.companyName;
            this.companyLogo = comBasicData.logoUrl;
            this.legalPerson = comBasicData.legalPerson;
            this.registeredCapital =
              comBasicData.registeredCapital +
              comBasicData.registeredCapitalUnit;
            this.registrationDate = comBasicData.registrationDate.substr(0, 10);
            this.state = comBasicData.state
              ? comBasicData.state.length > 2
                ? comBasicData.state.substr(0, 2)
                : comBasicData.state
              : "企业选择不公开";
            this.score = comBasicData.creditScore
              ? comBasicData.creditScore
              : 0;

            const comExpandData = res.data.data.comExpand;
            this.creditPhoto = comExpandData.creditPhoto;
            this.contactWay = comExpandData.contactWay
              ? comExpandData.contactWay
              : "企业选择不公开";
            this.website = comExpandData.website
              ? comExpandData.website
              : "企业选择不公开";
            this.mailbox = comExpandData.mailbox
              ? comExpandData.mailbox
              : "企业选择不公开";
            this.companyAddress = comExpandData.companyAddress
              ? comExpandData.companyAddress
              : "企业选择不公开";
            this.lon = comExpandData.longitude.split(",")[0];
            this.lat = comExpandData.longitude.split(",")[1];
            if (comExpandData.longitude) {
              this.hasLongitude = true;
              this.setCompanyName(this.companyName);
              this.setCompanyId(this.companyId);
            } else {
              this.hasLongitude = false;
            }
          }
        });
    },
    // GET /companyInfo/count 获取企业详细信息统计
    count() {
      this.$http
        .get("app/buss/companyInfo/count", {
          companyId: this.companyId
        })
        .then(res => {
          if (res.data.code == 0) {
            // 上市信息
            const stockCount = res.data.data.stockCount;
            this.cgkgTotal = stockCount.stockComholderCount; //上市信息-参股控股统计
            this.ssggTotal = stockCount.stockNoticeCount; //上市信息-上市公告统计
            this.ggxxTotal = stockCount.stockSeniormanagementCount; //上市信息-高管信息统计
            this.gbbdTotal = stockCount.stockEquityChangeCount; //上市信息-股本变动
            this.fhqkTotal = stockCount.stockBonusCount; //上市信息-分红情况
            // 基本信息
            const basicInfoCount = res.data.data.basicInfoCount;
            this.zzzsTotal = basicInfoCount.qualificationCount; // 基本信息-资质证书统计
            this.zyryTotal = basicInfoCount.mainPersonCount; // 基本信息-主要人员统计
            this.gdxxTotal = basicInfoCount.shareholderCount; // 基本信息-股东信息统计
            this.dwtzTotal = basicInfoCount.investCount; // 基本信息-对外投资统计
            this.bgjlTotal = basicInfoCount.changeCount; // 基本信息-变更记录统计
            this.fzjgTotal = basicInfoCount.branchCount; // 基本信息-分支机构统计
            this.qynbTotal = basicInfoCount.annualreportCount; // 基本信息-企业年报统计
            this.sjkzqTotal = basicInfoCount.holdingCount; // 基本信息-实际控制权统计
            this.zzsyrTotal = basicInfoCount.humanHoldingCount; // 基本信息-最终受益人统计
            // 司法风险justiceRiskCount
            const justiceRiskCount = res.data.data.justiceRiskCount;
            this.flssTotal = justiceRiskCount.courtLawCount; // 司法风险-法律诉讼统计
            this.fyggTotal = justiceRiskCount.courtNoticeCount; // 司法风险-法院公告统计
            this.sxrTotal = justiceRiskCount.courtDishonestyCount; // 司法风险-失信人
            this.bzxrTotal = justiceRiskCount.courtExecutorCount; // 司法风险-被执行人统计
            this.ktggTotal = justiceRiskCount.courtSessionCount; // 司法风险-开庭公告统计
            this.sfxzTotal = justiceRiskCount.judicialCount; // 司法风险-司法协助统计
            // 企业发展
            const developmentCount = res.data.data.developmentCount;
            this.rzlsTotal = developmentCount.financingHistoryCount; // 企业发展-融资历史统计
            this.hxtdTotal = developmentCount.coreTeamCount; // 企业发展-核心团队统计
            this.qyywTotal = developmentCount.productCount; // 企业发展-企业业务统计
            this.tzsjTotal = developmentCount.investmentEventCount; // 企业发展-投资事件统计
            this.jpxxTotal = developmentCount.competitionCount; // 企业发展-竞品信息统计
            // 经营风险
            const operateRiskCount = res.data.data.operateRiskCount;
            this.jyycTotal = operateRiskCount.abnormalCount; // 经营风险-经营异常统计
            this.xzcfTotal = operateRiskCount.penaltyCount; // 经营风险-行政处罚统计
            this.yzwfTotal = operateRiskCount.breakLawCount; // 经营风险-严重违法统计
            this.gqczTotal = operateRiskCount.equityCount; // 经营风险-股权出质统计
            this.dcdyTotal = operateRiskCount.mortgageCount; // 经营风险-动产抵押统计
            this.qsggTotal = operateRiskCount.owingTaxCount; // 经营风险-欠税公告统计
            this.sfpmTotal = operateRiskCount.judicialSaleCount; // 经营风险-司法拍卖统计
            // 经营状况
            const operateStatusCount = res.data.data.operateStatusCount;
            this.gdxxJyTotal = operateStatusCount.purchaseCount; // 经营状况-购地信息统计
            this.zqxxTotal = operateStatusCount.bondCount; // 经营状况-债券信息统计
            this.swpjTotal = operateStatusCount.taxCount; // 经营状况-税务评级统计
            this.ccjcTotal = operateStatusCount.checkCount; // 经营状况-抽查检查统计
            this.ztbTotal = operateStatusCount.combidsCount; // 经营状况-招投标统计
            this.zpTotal = operateStatusCount.recruitCount; // 经营状况-招聘统计
            this.gyTotal = operateStatusCount.goodsSupplyCount; // 经营状况-供应统计
            this.xqTotal = operateStatusCount.goodsDemandCount; // 经营状况-需求统计
            this.wechatTotal = operateStatusCount.wechatCount; // 经营状况-微信公众号统计
            this.appTotal = operateStatusCount.appCount; // 经营状况-产品信息统计
            // 知识产权
            const ledgePropertyCount = res.data.data.ledgePropertyCount;
            this.sbTotal = ledgePropertyCount.trademarkCount; // 知识产权-商标统计
            this.zlTotal = ledgePropertyCount.patentCount; // 知识产权-专利统计
            this.rjzzqTotal = ledgePropertyCount.copyrightCount; // 知识产权-软件著作权统计
            this.zpzzqTotal = ledgePropertyCount.copyrightWorksCount; // 知识产权-作品著作权统计
            this.wzbaTotal = ledgePropertyCount.websiteCount; // 知识产权-网站备案统计 */
            // 新闻舆情
            const newsCount = res.data.data.newsCount;
            this.newsTotal = newsCount.newsCount; //  新闻舆情-新闻统计
            // 历史信息
            const historyCount = res.data.data.historyCount;
            this.hisGdxxTotal = historyCount.hxHolderCount; //  历史信息-股东信息统计
            this.hisDwtzTotal = historyCount.hxInvestCount; //  历史信息-对外投资统计
            this.hisKtggTotal = historyCount.hxAnnouncementCount; //  历史信息-开庭公告统计
            this.hisFlssTotal = historyCount.hxLawsuitCount; //  历史信息-法律诉讼统计
            this.hisFyggTotal = historyCount.hxCourtCount; //  历史信息-法院公告统计
            this.hisSxrTotal = historyCount.hxDishonestCount; //  历史信息-失信人信息统计
            this.hisBzxrTotal = historyCount.hxZhixingCount; //  历史信息-被执行人统计
            this.hisXzcfTotal = historyCount.hxPunishmentCount; //  历史信息-行政处罚统计
            this.hisGqczTotal = historyCount.hxEquityinfoCount; //  历史信息-股权出质统计
            this.hisXzxkTotal = historyCount.hxLicenceCount; //  历史信息-行政许可统计
            this.hisDcdyTotal = historyCount.hxBaseInfoCount; //  历史信息-动产抵押统计
          }
        });
    },
    //企信风险统计
    otherRiskForApp() {
      this.$http
        .get("app/search/otherRiskForApp", {
          termStr: this.companyId,
          page: 1,
          pageSize: config.pageSize,
          type: "me"
        })
        .then(res => {
          this.selfRisk = res.data.zwfx;
        });
      this.$http
        .get("app/search/otherRiskForApp", {
          termStr: this.companyId,
          page: 1,
          pageSize: config.pageSize,
          type: "other"
        })
        .then(res => {
          this.aroundRisk = res.data.zwfx;
        });
    },
    // 企业周边企业
    aroundBussiness() {
      if (this.hasLongitude) {
        wx.navigateTo({
          url:
            "/pages/businessesAround/main?lat=" + this.lat + "&lon=" + this.lon
        });
      } else {
        this.myToast("该企业无定位信息", "warning");
      }
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
          "/pages/companyInfoPackage/pages/companyInfo/main?companyId=" +
          companyId
      });
    },
    // 跳转到个人或者详情
    goManInfoOrCompanyInfo(item) {
      if (item.type === 1) {
        this.goManInfo(item.shareholderName);
      } else if (item.type === 2) {
        //this.companyInfo(item.id);
      }
    },
    // 显示联系信息
    showAllContactInfo() {
      this.isShowAllContactInfo = !this.isShowAllContactInfo;
    },
    // 信用报告
    creditReport() {
      wx.navigateTo({
        url: "/pages/creditReport/main"
      });
    },
    // 是否被认领
    exitClaim() {
      this.$http.get(config.exitClaim + this.companyId).then(res => {
        if (res.data.code == 0) {
          this.iconBoolean2 = res.data.data;
        }
      });
    },
    // 认领
    companyClaim() {
      if (!this.iconBoolean2) {
        wx.navigateTo({
          url:
            "/pages/companyClaimApplication/main?companyName=" +
            this.companyName
        });
      } else {
        return;
      }
    },
    // 是否关注
    hasFollowed() {
      this.$http
        .get(config.hasFollowed, {
          companyId: this.companyId,
          userId: this.userId
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data === "false") {
              this.iconBoolean3 = false;
            } else {
              this.iconBoolean3 = true;
            }
          }
        });
    },
    // 关注
    attentions() {
      if (!this.iconBoolean3) {
        this.$http
          .post(config.addFollow, {
            companyId: this.companyId,
            userId: this.userId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.iconBoolean3 = true;
              this.myToast("关注成功！", "success");
            }
          });
      } else {
        this.$http
          .post(config.deleteFollow, {
            companyId: this.companyId,
            userId: this.userId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.iconBoolean3 = false;
              this.myToast("已取消关注", "warning");
            }
          });
      }
    },
    // 是否监控
    hasMonitoring() {
      this.$http
        .get(config.hasMonitored, {
          companyId: this.companyId,
          userId: this.userId
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data === "false") {
              this.iconBoolean4 = false;
            } else {
              this.iconBoolean4 = true;
            }
          }
        });
    },
    // 监控
    monitoring() {
      if (!this.iconBoolean4) {
        this.$http
          .post(config.addMonitor, {
            companyId: this.companyId,
            userId: this.userId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.iconBoolean4 = true;
              this.myToast("监控成功！", "success");
            }
          });
      } else {
        this.$http
          .post(config.deleteMonitor, {
            companyId: this.companyId,
            userId: this.userId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.iconBoolean4 = false;
              this.myToast("已取消监控", "warning");
            }
          });
      }
    },
    getCompanyId() {
      this.companyId = this.$root.$mp.query.companyId;
    },
    // 深度查询
    comDepthSearch(companyName) {
      if (!this.vipLevel) {
        this.showByVip = true;
      } else {
        this._isDepth(true);
        wx.navigateTo({
          url:
            "/pages/companyInfoDepthPackage/pages/companyInfoDepth/main?companyName=" +
            companyName +
            "&isListed=" +
            this.isListed
        });
      }
    },
    // 点击vip专享遮罩层，直接跳转到vip特权页面
    goBuyVip() {
      wx.navigateTo({
        url: "/pages/meOptions/vipPrivilege/main"
      });
    },
    // 企业图谱 跳转之前判断是否vip
    mapGroup(url) {
      if (!this.vipLevel) {
        this.showByVip = true;
      } else {
        wx.navigateTo({
          url: url
        });
      }
    }
  },
  mounted() {
    this.getCompanyId();
    this.getLoginInfo();
    this._isListed();
    this.comBasic();
    this.comHead();
    this.count();
    this.otherRiskForApp();
    this.hasMonitoring();
    this.hasFollowed();
    this.exitClaim();
  },
  onShow() {
    // 每次打开页面判断是否深度过，如果深度过就重新获取一遍数据
    if (this.isDepth) {
      this._isListed();
      this.comBasic();
      this.comHead();
      this.count();
      this._isDepth(false);
    }
    this.showByVip = false;
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
    z-index: 9998;
  }
  // 企业简介
  .company-biref {
    width: auto;
    background: #ffffff;
    padding: 20rpx;
    overflow: hidden;
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
      height: 80rpx;
      line-height: 80rpx;
      .item-img-box {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
        .item-img {
          vertical-align: middle;
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
  .foot {
    box-sizing: border-box;
    height: 120rpx;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    padding-top: 12rpx;
    border-top: 1px solid #ddd;
  }
  .shade {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .shade-bg {
      width: 100%;
      height: 100%;
    }
    .vip {
      position: absolute;
      top: 20rpx;
      right: 0;
      width: 245rpx;
      height: 200rpx;
    }
  }
}
</style>
