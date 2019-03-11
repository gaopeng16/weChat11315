const host = "https://www.pic11315.com";
const hostPay = "https://spay.pic11315.com"
const config = {
  appId: "wxa4d803725b952d06",
  APPSecret: "8092cca8ecbbf551b8c1068a3c8fbed5",
  version: "1.1.9",
  invitePrice: 39, //购买会员填写邀请码减免金额
  host,
  hostPay,
  pageSize: 20,
  //获取openId
  openId: "/app/buss/smallRoutine/getOpenid",
  // 本地图片
  imgUrl: `${host}/static/image/wechat/`,
  // 企业评分图片
  imgUrlScore: `${host}/static/image/score/`,
  // 接口获取 图片服务器路径
  imgFile: "http://file.pic11315.com:9334/",
  // 处理天眼查水印
  typImg: "/app/buss/tyc/changeTycImgMark",
  // 热点列表
  hotListUrl: "/app/buss/news/mtrp/list",
  // zhengxinxinwen列表
  creditNewsListUrl: "/app/buss/news/zxxw/list",
  // 征信/热点新闻详情
  newsUrl: "/phone-details.html?newsId=",
  // 通过openid 验证是否绑定手机号
  checkBindPhone: "/app/buss/user/checkQQOrWXAndroid",
  // 绑定手机号
  bindPhone: "/app/buss/user/bindingMobileAndroid",
  //密码登录
  loginByPass: "/app/buss/user/login",
  //获取验证码
  getVerify: "/app/buss/kaptcha/sendVerificationCode",
  //验证码登录
  loginByVerify: "/app/buss/user/logInByVerificationCode",
  //注册{iphone,userVerificationCode,password,repassword,%invitationCode}
  register: "/app/buss/user/register",
  //获取热搜
  hotBotUrl: "/app/buss/hotSport/hotSport",
  // 查看信用报告下载次数
  selectReportNum: "/app/buss/user/selectReportNum",
  // 信用报告剩余下载次数
  reportNum:"/app/buss/userdownloadtime/residualTimes",
  // 普通会员（一年。两年，三年vip）
  appGetOrdinaryVIP:"/app/buss/payProduct/appGetOrdinaryVIP",
  // 企业会员VIP
  appGetEnterpriseVIP:"/app/buss/payProduct/appGetEnterpriseVIP",
  //普通搜索(注意后面跟了变量参数详情在search.vue可查询){tremStr:"关键字","page":1}
  generalSearch: "/app/search/termSearch/",
  /**
  条件搜索[非VIP]
  {
    str "termStr":"关键词",
    int "scopeStr":"搜索范围:1->全部/2->公司名称/3->股东/4->法人代表",
    int "capitalStr":"注册资本:1>全部/2->0万-100万/3->100万-200万/4->200万-500万/5->500万-1000万/6->1000万以上",
    int "dateStr":"成立年限:1->全部/2->1年内/3->1-5年/4->5-10年/5->10-15年/6->15年以上",
    int "stateStr":"经营状态:1->不限/2->吊销/3->在业/4->在营/5->存续/6->开业/7->注销/8->迁出",
    int "areaStr":"区域:与页面地区名字保持一致(不限区域 发送代码1)",
    str "tradeStr":"行业:与页面行业名字保持一致(不限行业 发送代码'100')",
    "page":"page",
    "sort":"1",
  }
   */
  commonSearch: "/app/search/commonSearch/",
  /**
  条件搜索[VIP]
  {
    str "termStr":"关键词",
    int "scopeStr":"搜索范围:1->全部/2->公司名称/3->股东/4->法人代表",
    int "capitalStr":"注册资本:1>全部/2->0万-100万/3->100万-200万/4->200万-500万/5->500万-1000万/6->1000万以上",
    int "dateStr":"成立年限:1->全部/2->1年内/3->1-5年/4->5-10年/5->10-15年/6->15年以上",
    int "stateStr":"经营状态:1->不限/2->吊销/3->在业/4->在营/5->存续/6->开业/7->注销/8->迁出",
    int "areaStr":"区域:与页面地区名字保持一致(不限区域 发送代码1)",
    str "tradeStr":"行业:与页面行业名字保持一致(不限行业 发送代码'100')",
    int "sbStr":"商标:1->全部/2->有商标/3->无商标",
    int "zlStr":"专利:1->全部/2->有专利/3->无专利",
    int "lxStr":"联系电话:1->全部/2->有联系电话/3->无联系电话",
    int "sxStr":"失信信息:1->全部/2->有失信信息/3->无失信信息",
    "page":"page",
    "sort":"1",
  }
   */
  vipSearch: "/app/search/vipSearch/",
  //联想搜索
  relatedSearch: "/app/search/related",
  //查商标{tremStr:"关键字",pageSize:"每页条数","page":1}
  trademarkSearch: "/app/search/trademark",
  //查专利{tremStr:"关键字",pageSize:"每页条数","page":1}
  patentSearch: "/app/search/patent",
  //查失信{tremStr:"关键字",pageSize:"每页条数","page":1}
  dishonestySearch: "/app/search/dishonesty",
  //查裁判文书{tremStr:"关键字",pageSize:"每页条数","page":1}
  courtLawByPageSearch: "/app/search/courtLawByPage",
  //查著作权{tremStr:"关键字",pageSize:"每页条数","page":1}
  copyrightSearch: "/app/search/copyright",
  //找电话{"term":"","page":"","pageSize"}
  contactWaySearch: "/app/search/contactWay",
  //热门服务-政策法规
  acfgSearch: "/app/buss/news/zcfg/list",
  //热门服务-行业展示
  hyzsSearch: "http://jnpia.pic11315.com/Medicine/Index",
  //热门服务-media热评
  mtrpSearch: "/app/buss/news/mtrp/list",
  //司法风险-法律诉讼(接口同查裁判文书一样)
  //司法风险-法院公告{tremStr:"关键字",pageSize:"每页条数","page":1}
  courtNoticeByPage: "/app/search/courtNoticeByPage",
  //经营风险-经营异常{tremStr:"关键字",pageSize:"每页条数","page":1}
  abnormalSearch: "/app/search/abnormal",
  //经营风险-行政处罚{tremStr:"关键字",pageSize:"每页条数","page":1}
  penaltySearch: "/app/search/penalty",
  //经营风险-股权出质{tremStr:"关键字",pageSize:"每页条数","page":1}
  equitySearch: "/app/search/equity",
  //经营风险-动产抵押{tremStr:"关键字",pageSize:"每页条数","page":1}
  mortgageSearch: "/app/search/mortgage",
  //企业认证{"companyId":"公司ID","userId":"用户ID","mobileNumber":"","email":"","userKaptcha":"","userName":"","companyName":"","imgUrl":"","fanrenUrl":""}
  companyClaimApplication: "/app/buss/comClaim/submitCompanyClaimApplication",
  //判断是否认领  /companyId
  exitClaim: "/app/buss/comClaim/exitClaim/",
  //模糊查询{"termStr":""}
  matchCompanyName: "/app/search/matchCompanyName",
  // 获取所有的地区
  area: "/app/buss/region/list",
  // 获取图片验证码 /userId
  kaptcha: "/pic/app/down/buss/kaptcha/",
  // 雷达监控 {userId}
  bussUserComMonitor: "/app/buss/bussUserComMonitor/getMonitorByUserId",
  // 保存发票抬头
  addInvoice: "/app/buss/bussInvoice/appAddInvoice",
  //新加公司
  findNewCom: "/app/buss/comClaim/findNewComClaimsSuccess",
  //最新注册企业
  newRegist: "/app/buss/company/newList",
  //周边企业
  /**
    "lat":维度
    "lon":经度
    "distance":距离
    int "scopeStr":"搜索范围:1->全部/2->公司名称/3->股东/4->法人代表",
    int "capitalStr":"注册资本:1>全部/2->0万-100万/3->100万-200万/4->200万-500万/5->500万-1000万/6->1000万以上",
    int "dateStr":"成立年限:1->全部/2->1年内/3->1-5年/4->5-10年/5->10-15年/6->15年以上",
    int "stateStr":"经营状态:1->不限/2->吊销/3->在业/4->在营/5->存续/6->开业/7->注销/8->迁出",
    int "areaStr":"区域:与页面地区名字保持一致(不限区域 发送代码1)",
    str "tradeStr":"行业:与页面行业名字保持一致(不限行业 发送代码'100')",
    int "sbStr":"商标:1->全部/2->有商标/3->无商标",
    int "zlStr":"专利:1->全部/2->有专利/3->无专利",
    int "lxStr":"联系电话:1->全部/2->有联系电话/3->无联系电话",
    int "sxStr":"失信信息:1->全部/2->有失信信息/3->无失信信息",
    "page":"page",
    "sort":"1",
   */
  bussinessAround: "/app/search/appMapSearch",
  // 公司详情 /companyId,{companyId:""}
  company: "/app/buss/company/",
  //判断是否是上市公司 {companyId:""}
  isListed: "/app/buss/shares/isListed",
  // 关注 {companyId:"",userId:""}
  addFollow: "/app/buss/bussUserComFollow/addFollow",
  // 取消关注 {companyId:"",userId:""}
  deleteFollow: "/app/buss/bussUserComFollow/deleteFollow",
  // 判断是否关注 {companyId:"",userId:""}
  hasFollowed: "/app/buss/bussUserComFollow/hasFollowed",
  // 监控
  addMonitor: "/app/buss/bussUserComMonitor/addMonitor",
  // 取消监控
  deleteMonitor: "/app/buss/bussUserComMonitor/deleteMonitor",
  // 判断是否监控 {companyId:"",userId:""}
  hasMonitored: "/app/buss/bussUserComMonitor/hasMonitored",
  // 上市信息-股票详情 {companyId:""}
  getStockMarket: "/app/buss/shares/getStockMarket",
  // 判断天眼查是否有关系图的数据
  isHaveRelationshipTycDataJSON: "/pic/buss/tyc/isHaveRelationshipTycDataJSON",
  // 人员
  human: "/app/buss/tyc/human",
  /************************************************ 深度接口 **************************************************/
  // 深度头部信息
  tycCompanyInfoHead: "app/buss/tyc/tycCompanyInfoHead",
  // 大深度<后台去深度那几十个接口>
  tycCompanyInfo: "app/buss/tyc/tycCompanyInfo",
  // 企业（深度）
  companyName: "/app/buss/tyc/companyName",
  /************************ 上市信息 **************************/
  // 企业简介
  companyInfoDe: "http://open.api.tianyancha.com/services/v4/open/companyInfo?name=",
  // 参股控股
  holdingCompanyDe: "https://open.api.tianyancha.com/services/v4/open/holdingCompany?name=",
  // 上市公告
  announcementDe: "https://open.api.tianyancha.com/services/v4/open/announcement.json?name=",
  // 股票详情未使用天眼
  volatilityDe: "http://open.api.tianyancha.com/services/v4/open/volatility?name=",
  // 高管信息
  seniorExecutiveDe: "http://open.api.tianyancha.com/services/v4/open/seniorExecutive?name=",
  // 发行相关
  issueRelatedDe: "http://open.api.tianyancha.com/services/v4/open/issueRelated?name=",
  // 股本变动
  equityChangeDe: "http://open.api.tianyancha.com/services/v4/open/equityChange?name=",
  // 分红情况
  bonusInfoDe: "http://open.api.tianyancha.com/services/v4/open/bonusInfo?name=",
  /************************ 基本信息 **************************/
  //企业简介
  profile: "http://open.api.tianyancha.com/services/v4/open/profile?name=",
  //获取企业基本信息（含主要人员）
  baseinfoV3De: "http://open.api.tianyancha.com/services/v4/open/baseinfoV3.json?name=",
  //资质证书
  certificateDe: "http://open.api.tianyancha.com/services/v4/open/certificate.json?name=",
  //股东信息
  holderDe: "http://open.api.tianyancha.com/services/v4/open/holder.json?name=",
  //对外投资
  inverstDe: "http://open.api.tianyancha.com/services/v4/open/inverst.json?name=",
  //变更记录[有个大小写  具体问后台]
  changeinfoDe: "http://open.api.tianyancha.com/services/v4/open/changeinfo.json?name=",
  //企业年报
  annualreportDe: "https://open.api.tianyancha.com/services/v3/newopen/annualreport.json?name=",
  //分支结构
  branchDe: "http://open.api.tianyancha.com/services/v4/open/branch.json?name=",
  //实际控制权
  companyholdingDe: "http://open.api.tianyancha.com/services/v4/open/companyholding?name=",
  //最终受益人
  humanholdingDe: "http://open.api.tianyancha.com/services/v4/open/humanholding?name=",
  /************************ 司法风险 **************************/
  //法律诉讼
  lawSuitDe: "http://open.api.tianyancha.com/services/v4/open/lawSuit.json?name=",
  //法院公告
  courtAnnouncementDe: "http://open.api.tianyancha.com/services/v4/open/courtAnnouncement.json?name=",
  //被执行人
  zhixinginfoDe: "http://open.api.tianyancha.com/services/v4/open/zhixinginfo.json?name=",
  //失信人
  dishonestDe: "http://open.api.tianyancha.com/services/v4/open/dishonest.json?name=",
  //开庭公告
  ktannouncementDe: "http://open.api.tianyancha.com/services/v4/open/ktannouncement.json?name=",
  //司法协助
  judicialDe: "http://open.api.tianyancha.com/services/v4/open/judicial?name=",
  //司法协助详情
  getJudicialDetailDe: "http://open.api.tianyancha.com/services/v4/open/getJudicialDetail?name=",
  /************************ 企业发展 **************************/
  //融资历史
  findHistoryRongziDe: "http://open.api.tianyancha.com/services/v4/open/findHistoryRongzi.json?name=",
  //核心团队
  findTeamMemberDe: "http://open.api.tianyancha.com/services/v4/open/findTeamMember?name=",
  //企业业务
  getProductInfoDe: "http://open.api.tianyancha.com/services/v4/open/getProductInfo?name=",
  //投资事件
  findTzanliDe: "http://open.api.tianyancha.com/services/v4/open/findTzanli.json?name=",
  //竞品信息
  findJingpinDe: "http://open.api.tianyancha.com/services/v4/open/findJingpin?name=",
  /************************ 经营风险 **************************/
  //经营异常
  abnormalDe: "http://open.api.tianyancha.com/services/v4/open/abnormal.json?name=",
  //行政处罚
  punishmentInfoDe: "http://open.api.tianyancha.com/services/v4/open/punishmentInfo?name=",
  //严重违法
  illegalinfoDe: "http://open.api.tianyancha.com/services/v4/open/illegalinfo.json?name=",
  //股权出质
  equityInfoDe: "http://open.api.tianyancha.com/services/v4/open/equityInfo.json?name=",
  //动产抵押
  mortgageInfoDe: "http://open.api.tianyancha.com/services/v4/open/mortgageInfo.json?name=",
  //欠税公告
  ownTaxDe: "http://open.api.tianyancha.com/services/v4/open/ownTax.json?name=",
  //司法拍卖
  judicialSaleDe: "http://open.api.tianyancha.com/services/v4/open/judicialSale.json?name=",
  //清算信息
  liquidatingDe: "http://open.api.tianyancha.com/services/v4/open/liquidating?name=",
  /************************ 经营状况 **************************/
  //购地信息
  purchaseLandDe: "http://open.api.tianyancha.com/services/v4/open/purchaseLand?name=",
  //债券信息
  bondDe: "http://open.api.tianyancha.com/services/v4/open/bond?name=",
  //税务评级
  taxCreditDe: "http://open.api.tianyancha.com/services/v4/open/taxCredit.json?name=",
  //抽查检查
  checkInfoDe: "http://open.api.tianyancha.com/services/v4/open/checkInfo?name=",
  //招投标
  bidsDe: "https://open.api.tianyancha.com/services/v4/open/bids.json?name=",
  //招聘
  employmentsDe: "http://open.api.tianyancha.com/services/v4/open/employments?name=",
  //供求信息（暂无）
  //进出口信用
  importAndExportDe: "http://open.api.tianyancha.com/services/v4/open/importAndExport?name=",
  //微信公众号
  publicWeChatDe: "http://open.api.tianyancha.com/services/v4/open/publicWeChat.json?name=",
  //产品信息
  appbkInfoDe: "http://open.api.tianyancha.com/services/v4/open/appbkInfo?name=",
  /************************ 知识产权 **************************/
  //商标信息
  tmDe: "https://open.api.tianyancha.com/services/v3/newopen/tm.json?name=",
  //专利
  patentsDe: "http://open.api.tianyancha.com/services/v4/open/patents?name=",
  //著作权
  copyRegDe: "https://open.api.tianyancha.com/services/v4/open/copyReg.json?name=",
  //作品著作权
  copyRegWorksDe: "http://open.api.tianyancha.com/services/v4/open/copyReg?name=",
  //网站备案
  icpDe: "http://open.api.tianyancha.com/services/v4/open/icp.json?name=",
  /************************ 知识产权 **************************/
  //公司新闻
  newsDe: "http://open.api.tianyancha.com/services/v3/open/news.json?name=",
  /************************ 历史信息 **************************/
  //历史工商信息
  hisIcDe: "http://open.api.tianyancha.com/services/v4/open/past/ic?name=",
  //历史股东信息
  hisHolderDe: "http://open.api.tianyancha.com/services/v4/open/past/holder?name=",
  //历史对外投资
  hisInvestDe: "http://open.api.tianyancha.com/services/v4/open/past/invest?name=",
  //历史开庭公告
  hisAnnouncementDe: "http://open.api.tianyancha.com/services/v4/open/past/announcement?name=",
  //历史法律诉讼
  hisLawsuitDe: "http://open.api.tianyancha.com/services/v4/open/past/lawsuit?name=",
  //历史法院公告
  hisCourtDe: "http://open.api.tianyancha.com/services/v4/open/past/court?name=",
  //历史失信人信息
  hisDishonestDe: "http://open.api.tianyancha.com/services/v4/open/past/dishonest?name=",
  //历史被执行人
  hisZhixingDe: "http://open.api.tianyancha.com/services/v4/open/past/zhixing?name=",
  //历史行政处罚
  hisPunishmentDe: "http://open.api.tianyancha.com/services/v4/open/past/punishment?name=",
  //历史股权出质
  hisEquityInfoDe: "http://open.api.tianyancha.com/services/v4/open/past/equityInfo?name=",
  //历史行政许可
  hisLicenseDe: "http://open.api.tianyancha.com/services/v4/open/past/license?name=",
  //历史动产抵押
  hisMortgageInfoDe: "http://open.api.tianyancha.com/services/v4/open/past/mortgageInfo?name=",

  /************************ 我的 **************************/
  // 签到{userId}
  continueSignin: "/app/buss/user/continueSignin",
  // 判断是否签到{userId}
  signinState: "/app/buss/user/signinState",
  // 排行榜
  signinList: "/app/buss/user/signinList",
  // 我的关注{userId}
  getFollowByUserId: "/app/buss/bussUserComFollow/getFollowByUserId",
  // 我的order{userId，page} 状态1->未付 2->付成功 3->order完成 4->已下单 5->order关闭
  queryUserOrder: "/app/picpay/pay/queryUserOrder",
  // 我的公司
  findUserComClaimList: "/app/buss/comClaim/findUserComClaimList/",
  // 获取产品价格
  getProductByCode: "/app/buss/payProduct/getProductByCode?codeStr=",
  // 校验邀请码{invitationCode,tpey:"1001,userId}
  invitationCodeIsLegal: "/app/buss/user/invitationCodeIsLegal",
  // 我的发票 {userId}
  getInvoiceByUserId: "/app/buss/bussInvoice/getInvoiceByUserId",
  // 添加发票抬头{bankAccount,bankName,companyAddr,companyName,companyPhone}
  addInvoice: "/app/buss/bussInvoice/appAddInvoice",
  // 修改发票抬头{bankAccount,bankName,companyAddr,companyName,companyPhone,id}
  updateInvoice: "/app/buss/bussInvoice/updateInvoice",
  // 删除发票抬头{id}
  deleteInvoice: "/app/buss/bussInvoice/deleteInvoice",
  // 获取金额 {userId}
  accountMoney: "/app/buss/userAccount/accountMoney",
  // 判断是否绑定zhi付bao账号 {userId}
  existBankInfo: "/app/buss/existBankInfo",
  // 判断是否实名认证{userId}    认证状态：1、未认证 2、审核中 3、认证通过 4、认证未通过
  hasAuth: "/app/buss/realName/hasAuth",
  // 实名认证{userId,userName,idNumber,frontImg,backImg}
  newAuth: "/app/buss/realName/newAuth",
  // 图片服务器地址
  upImgUrl: `${host}/pic/upload`,
  // 修改密码{mobile,userVerificationCode,newPasswd}
  changePasswd: "/app/buss/user/changePasswd",
  // 更换手机号{userId,verificationCode,iphone}
  replaceMobile: "/app/buss/user/replaceBindingMobileAndroid",
  // 获取邮箱验证码{mailAddress,sendType:"verification_code"}
  mailVerificationCode: "/app/buss/kaptcha/sendMailVerificationCode",
  // 绑定邮箱{bingingEmailAddress,verificationCode,userId}
  bindEmail: "/app/buss/user/bindingEmail"
};
export default config;

/**
 * 详情页新接口  type 值
 * * 获取公司详情信息
     * abnormal经营异常
     * announcement上市公告
     * annualReport企业年报
     * baseInfoV3企业基本信息（含主要人员）
     * beExecuted被执行人
     * bids招投标
     * branch分支机构
     * certificate资质证书
     * changeInfo变更记录
     * checkInfo抽查检查
     * copyReg著作权
     * courtAnnouncement法院公告
     * description获取人简介
     * dishonest失信人
     * employments招聘
     * equityInfo股权出质
     * financingHistory融资历史
     * holder股东信息
     * holdingCompany参股控股（股票）
     * illegalInfo严重违法
     * invest对外投资
     * investments投资事件
     * judicialSale司法拍卖
     * ktAnnouncement开庭公告
     * lawSuit法律诉讼
     * mortgageInfo动产抵押
     * news新闻信息
     * ownTax欠税公告
     * patents专利
     * publicWeChat微信公众号
     * punishmentInfo行政处罚
     * purchaseLand购地信息
     * searchV2搜索接口
     * taxCredit税务评级
     * trademarks商标信息
     * websiteApprove网站备案
     * allCompanies人物所在企业
     * partners人物所有合作伙伴
     * roles人物所在企业职位角色
     * associationMap关系图
     * companyholding实际控制权
     * profile企业简介
     * humanholding最终受益人
     * copyRegWorks作品著作权
     * companyInfo上市企业简介
     * seniorExecutive高管信息
     * findJingpin竞品信息
     * getProductInfo企业业务
     * findTeamMember核心团队
     * liquidating清算信息
     * importAndExport进出口信用
     * appbkInfo产品信息
     * judicial司法协助
     * bond债券信息
     * issueRelated发行相关
     * pastMortgageInfo历史动产抵押
     * pastLicense历史行政许可
     * pastEquityInfo历史股权出质
     * pastZhixing历史被执行人
     * pastDishonest历史失信人
     * pastCourt历史法院公告
     * pastLawsuit历史法律诉讼
     * pastInvest历史对外投资
     * pastHolder历史股东信息
     * pastIc历史工商信息
     * pastPunishment历史行政处罚
     * shareStructure股本结构
     * equityChange股本变动
     * allotmen配股情况
     * pastAnnouncement历史开庭公告
     * bonusInfo分红情况
     * riskInfo企业风险
     * riskDetail风险信息
     * logo获取无水印logo
	 * mainPerson主要人员
 */
