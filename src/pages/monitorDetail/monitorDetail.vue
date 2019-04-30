<template>
  <div>
    <div class="top">
      <div class="comname font-click">{{companyName}}</div>
      <div class="total">
        最新 共
        <span class="font-red">{{queryRadar.num}}</span> 条监控动态
      </div>
    </div>
    <div class="list" :key="key" v-for="(item,key) in comInfors">
      <div class="list-head">
        <div class="list-head-title left">{{item.typeName}}</div>
        <div v-if="item.type == 25 || item.type == 26" class="type left -normal">利好信息</div>
        <div v-else-if="item.type >=9 && item.type<=13" class="type left -wrong">高风险信息</div>
        <div v-else-if="item.type >=1 && item.type<=8" class="type left -warn">警示信息</div>
        <div v-else-if="item.type >=14 && item.type<=24" class="type left -notice">提示信息</div>
        <div class="item-total right">共 {{item.num}} 条动态</div>
      </div>
      <!--  -->
      <div v-if="item.type==1">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.pubDate}}</div>
          <div>{{v.noticeContent}}</div>
        </div>
      </div>
      <div v-else-if="item.type==2">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.noticedate}}</div>
          <div>{{v.noticeContent}}</div>
        </div>
      </div>
      <div v-else-if="item.type==3">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.startDate}}</div>
          <div>原告: {{v.plaintiff}}</div>
          <div>被告: {{v.defendant}}</div>
          <div>案由: {{v.caseReason}}</div>
        </div>
      </div>
      <div v-else-if="item.type==4">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>被执行人: {{v.executedPerson}}</div>
          <div>执行机构: {{v.executiveCourt}}</div>
          <div>类型状态: {{v.typeState}}</div>
        </div>
      </div>
      <div v-else-if="item.type==5">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.abnormaTime}}</div>
          <div>{{v.abnormalCauses}}</div>
        </div>
      </div>
      <div v-else-if="item.type==6">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.regDate}}</div>
          <div>出质方: {{v.pledgor}}</div>
          <div>质权人: {{v.pledgee}}</div>
          <div>数额: {{v.units}}</div>
        </div>
      </div>
      <div v-else-if="item.type==7">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.regDate}}</div>
          <div>抵押物: {{v.guaname}}{{v.guades}}</div>
          <div>数额: {{v.amount}}</div>
        </div>
      </div>
      <div v-else-if="item.type==8">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.declarationDate}}</div>
          <div>{{v.auctionNotice}}</div>
        </div>
      </div>
      <div v-else-if="item.type==9">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.caseCreateTime}}</div>
          <div>执行法院: {{v.execCourtName}}</div>
          <div>案件号: {{v.caseCode}}</div>
        </div>
      </div>
      <div v-else-if="item.type==10">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.regDate}}</div>
          <div>执行法院: {{v.courtName}}</div>
          <div>案件号: {{v.caseCode}}</div>
        </div>
      </div>
      <div v-else-if="item.type==11">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.abntime}}</div>
          <div>列入原因: {{v.serillreaCn}}</div>
        </div>
      </div>
      <div v-else-if="item.type==12">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.pubdate}}</div>
          <div>处罚原因: {{v.illegacttype}}</div>
        </div>
      </div>
      <div v-else-if="item.type==13">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.pudDate}}</div>
          <div>税务机关: {{v.taxOffice}}</div>
          <div>税种: {{v.taxCategories}}</div>
          <div>税额: {{v.remainingSum}}</div>
        </div>
      </div>
      <div v-else-if="item.type==14">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>清算组负责人: {{v.manager}}</div>
          <div>清算组成员: {{v.member?'无':v.member}}</div>
        </div>
      </div>
      <div v-else-if="item.type==15">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.approvedDate}}</div>
          <div>变更:</div>
          <div>注册地址: {{v.registeredAddress}}</div>
          <div>经营范围: {{v.businessScope}}</div>
          <div>营业期限: {{v.businessTerm}}</div>
        </div>
      </div>
      <div v-else-if="item.type==16">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.dateTime}}</div>
          <div>证书类型: {{v.type}}</div>
          <div>详情: {{v.details}}</div>
        </div>
      </div>
      <div v-else-if="item.type==17"></div>
      <div v-else-if="item.type==18"></div>
      <div v-else-if="item.type==19">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>被投资企业名称: {{v.investComName}}</div>
          <div>投资金额: {{v.registeredCapital}}</div>
        </div>
      </div>
      <div v-else-if="item.type==20">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>分支机构名称: {{v.branchName}}</div>
          <div>法人代表: {{v.legalPerson}}</div>
        </div>
      </div>
      <div v-else-if="item.type==21"></div>
      <div v-else-if="item.type==22"></div>
      <div v-else-if="item.type==23">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.year}}年年报</div>
          <div>{{v.year}}年报已出</div>
        </div>
      </div>
      <div v-else-if="item.type==24">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.title}}</div>
          <div>发布时间: {{v.time}}</div>
          <div>来源: {{v.website}}</div>
        </div>
      </div>
      <div v-else-if="item.type==25">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.createTime}}</div>
          <div>类型: {{v.patentType}}</div>
          <div>专利名称: {{v.patentName}}</div>
        </div>
      </div>
      <div v-else-if="item.type==26">
        <div class="list-item" :key="k" v-for="(v,k) in item.changeInfo">
          <div>{{v.applicationDate}}</div>
          <div>类型: {{v.trademarkType}}</div>
          <div>商标名称: {{v.trademarkName}}</div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyName: "",
      companyId: "",
      queryRadar: {},
      comInfors: []
    };
  },
  methods: {
    init() {
      let params = {
        companyId: this.companyId,
        page: 1,
        pageNum: 1
      };
      this.$http
        .get("/app/buss/radarmain/queryRadarByComId", params)
        .then(res => {
          if (res.data.code == 0) {
            const queryRadarData = res.data.data.records.map(item => {
              item.date = item.date ? item.date.substr(0, 10) : "--";
              item.comInfoList = JSON.parse(item.comInfoList);
              item.comInfoList.comInfors.map(v => {
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
              return item;
            });
            this.queryRadar = queryRadarData[0];
            this.comInfors = this.queryRadar.comInfoList.comInfors;
          }
        });
    }
  },
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
    this.companyId = this.$root.$mp.query.companyId;
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.top {
  height: 100rpx;
  line-height: 50rpx;
  background: #f2f2f2;
  text-indent: 16rpx;
}
.list {
  .list-head {
    padding-left: 16rpx;
    padding: 20rpx;
    line-height: 40rpx;
    border-bottom: dotted 1px #bbbec4;
    overflow: hidden;
    .type {
      height: 40rpx;
      line-height: 38rpx;
      margin-left: 15rpx;
      box-sizing: border-box;
      padding: 0 10rpx;
      border-radius: 2px;
    }
  }
  .list-item {
    padding: 10rpx 0 10rpx 30rpx;
    line-height: 40rpx;
    border-bottom: dotted 1px #bbbec4;
  }
}
.-normal {
  border: solid 1px #079c49;
  color: #079c49;
}
.-wrong {
  border: solid 1px #ff0000;
  color: #ff0000;
}
.-warn {
  border: solid 1px #ff7d18;
  color: #ff7d18;
}
.-notice {
  border: solid 1px #c66ef2;
  color: #c66ef2;
}
</style>