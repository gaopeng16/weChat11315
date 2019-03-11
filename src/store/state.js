const state = {
    passOnOff: false,
    companyName: "",
    companyId: "",
    sign: {
        "score": 0
    }, // 签到
    vipLevel: 0, // 是否会员
    isDepth: false,//是否深度过
    navHeight: 0,//自定义导航  的高度
    judgmentContent: "", //裁判文书
    detailContent: {}, //详情页展示的对象信息
    companyDetailsData: {}, //公司详情页数据
    dwtzDetailData: {}, //对外投资详情页数据
    fhqkDetailData: {}, //对外投资详情页数据
    zzzsDetailData: {}, //资质证书详情页数据
    annualreportData: {}, // 企业年报详情页数据
    tzsjDetailData: {}, // 投资事件详情数据
    courtLawDetailData: {}, // 裁判文书详情
    courtNoticeDetailData: {}, // 法院公告详情
    courtSessionDetailData: {}, // 开庭公告详情
    courtDishonestyDetailData: {}, // 失信人详情
    judicialDetailData: {}, // 司法协助详情
    developmentCompetitionDetailData: {}, // 竞品信息详情
    operateRiskMortgageDetailData: {}, // 动产抵押详情
    operateRiskJudicialSaleDetailData: {}, // 司法拍卖
    operateStatusPurchaseDetailData: {}, // 购地信息详情
    operateStatusBondDetailData: {}, // 债权信息详情
    operateStatusBiddingDetailData: {}, // 招投标详情
    developmentRecruitDetailData: {}, // 招聘详情
    developmentGoodsDemandDetailData: {}, // 需求详情
    developmentGoodsSupplyDetailData: {}, // 供应详情
    operateStatusWechatDetailData: {}, // 微信公众号详情
    operateStatusAppDetailData: {}, // 产品信息详情
    ledgePropertyPatentDetailData: {}, //专利详情
    newsNewsDetailData: {}, //新闻详情
    historyHxInvestDetailData: {}, //历史信息-对外投资详情
    historyHxAnnouncementDetailData: {}, //历史信息-开庭公告详情
    historyHxLawsuitDetailData: {}, //历史信息-法律诉讼详情
    historyHxCourtDetailData: {}, //历史信息-法院公告详情
    historyHxDishonestDetailData: {}, //历史信息-失信人详情
    historyHxZhixingDetailData: {}, //历史信息-被执行人详情
    historyHxPunishmentDetailData: {}, //历史信息-被执行人详情
    historyHxEquityinfoDetailData: {}, //历史信息-股权出质详情
    historyHxLicenceDetailData: {}, //历史信息-行政许可详情
    historyHxBaseInfoDetailData: {}, //历史信息-行政许可详情

    invoiceData: {}
}
export default state
