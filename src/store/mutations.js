import * as type from "./mutation-types"
const mutations = {
    /**
	  * state:当前状态树
	  * v: 提交mutations时传的参数
	  */
    [type.SET_PASS_ON_OFF](state, v) {
        state.passOnOff = v
    },
    [type.SET_COMPANY_NAME](state, v) {
        state.companyName = v
    },
    [type.SET_COMPANY_ID](state, v) {
        state.companyId = v
    },
    [type.SET_SIGN](state, v) {
        state.sign = Object.assign(state.sign, v)
    },
    [type.SET_TOKEN](state, v) {
        state.token = v
    },
    [type.SET_VIPLEVEL](state, v) {
        state.vipLevel = v
    },
    [type.SET_IS_DEPTH](state, v) {
        state.isDepth = v
    },
    [type.SET_NAV_HEIGHT](state, v) {
        state.navHeight = v
    },
    [type.SET_JUDGMENT_CONTENT](state, v) {
        state.judgmentContent = v
    },
    [type.SET_DAILY_REPORT](state, v) {
        state.dailyReportData = v
    },
    [type.SET_MONITOR_DETAIL](state, v) {
        state.monitorDetailData = v
    },
    [type.SET_DETAIL_CONTENT](state, v) {
        state.detailContent = v
    },
    [type.SET_COMPANY_DETAILS_DATA](state, v) {
        state.companyDetailsData = v
    },
    [type.SET_FHQK_DETAIL_DATA](state, v) {
        state.fhqkDetailData = v
    },
    [type.SET_ZZZS_DETAIL_DATA](state, v) {
        state.zzzsDetailData = v
    },
    [type.SET_DWTZ_DETAIL_DATA](state, v) {
        state.dwtzDetailData = v
    },
    [type.SET_ANNUALREPORT_DATA](state, v) {
        state.annualreportData = v
    },
    [type.SET_TZSJ_DETAIL_DATA](state, v) {
        state.tzsjDetailData = v
    },
    [type.SET_COURT_LAW_DETAIL_DATA](state, v) {
        state.courtLawDetailData = v
    },
    [type.SET_COURT_NOTICE_DETAIL_DATA](state, v) {
        state.courtNoticeDetailData = v
    },
    [type.SET_COURT_SESSION_DETAIL_DATA](state, v) {
        state.courtSessionDetailData = v
    },
    [type.SET_COURT_DISHONESTY_DETAIL_DATA](state, v) {
        state.courtDishonestyDetailData = v
    },
    [type.SET_JUDICIAL_DETAIL_DATA](state, v) {
        state.judicialDetailData = v
    },
    [type.SET_DEVELOPMENT_HXTD_DETAIL_DATA](state, v) {
        state.developmentHxtdDetailData = v
    },
    [type.SET_DEVELOPMENT_COMPETITION_DETAIL_DATA](state, v) {
        state.developmentCompetitionDetailData = v
    },
    [type.SET_OPERATE_RISK_MORTGAGE_DETAIL_DATA](state, v) {
        state.operateRiskMortgageDetailData = v
    },
    [type.SET_OPERATE_RISK_JUDICIAL_SALE_DETAIL_DATA](state, v) {
        state.operateRiskJudicialSaleDetailData = v
    },
    [type.SET_OPERATE_STATUS_PURCHASE_DETAIL_DATA](state, v) {
        state.operateStatusPurchaseDetailData = v
    },
    [type.SET_OPERATE_STATUS_BOND_DETAIL_DATA](state, v) {
        state.operateStatusBondDetailData = v
    },
    [type.SET_OPERATE_STATUS_BIDDING_DETAIL_DATA](state, v) {
        state.operateStatusBiddingDetailData = v
    },
    [type.SET_DEVELOPMENT_RECRUIT_DETAIL_DATA](state, v) {
        state.developmentRecruitDetailData = v
    },
    [type.SET_DEVELOPMENT_GOODS_DEMAND_DETAIL_DATA](state, v) {
        state.developmentGoodsDemandDetailData = v
    },
    [type.SET_DEVELOPMENT_GOODS_SUPPLY_DETAIL_DATA](state, v) {
        state.developmentGoodsSupplyDetailData = v
    },
    [type.SET_OPERATE_STATUS_WECHAT_DETAIL_DATA](state, v) {
        state.operateStatusWechatDetailData = v
    },
    [type.SET_OPERATE_STATUS_APP_DETAIL_DATA](state, v) {
        state.operateStatusAppDetailData = v
    },
    [type.SET_LEDGE_PROPERTY_PATENT_DETAIL_DATA](state, v) {
        state.ledgePropertyPatentDetailData = v
    },
    [type.SET_NEWS_NEWS_DETAIL_DATA](state, v) {
        state.newsNewsDetailData = v
    },
    [type.SET_HISTORY_HX_INVEST_DETAIL_DATA](state, v) {
        state.historyHxInvestDetailData = v
    },
    [type.SET_HISTORY_HX_ANNOUNCEMENT_DETAIL_DATA](state, v) {
        state.historyHxAnnouncementDetailData = v
    },
    [type.SET_HISTORY_HX_LAWSUIT_DETAIL_DATA](state, v) {
        state.historyHxLawsuitDetailData = v
    },
    [type.SET_HISTORY_HX_COURT_DETAIL_DATA](state, v) {
        state.historyHxCourtDetailData = v
    },
    [type.SET_HISTORY_HX_DISHONEST_DETAIL_DATA](state, v) {
        state.historyHxDishonestDetailData = v
    },
    [type.SET_HISTORY_HX_ZHIXING_DETAIL_DATA](state, v) {
        state.historyHxZhixingDetailData = v
    },
    [type.SET_HISTORY_HX_PUNISHMENT_DETAIL_DATA](state, v) {
        state.historyHxPunishmentDetailData = v
    },
    [type.SET_HISTORY_HX_EQUITYINFO_DETAIL_DATA](state, v) {
        state.historyHxEquityinfoDetailData = v
    },
    [type.SET_HISTORY_HX_LICENCE_DETAIL_DATA](state, v) {
        state.historyHxLicenceDetailData = v
    },
    [type.SET_HISTORY_HX_BASEINFO_DETAIL_DATA](state, v) {
        state.historyHxBaseInfoDetailData = v
    },
    [type.SET_INVOICE_DATA](state, v) {
        state.invoiceData = v
    },
}
export default mutations