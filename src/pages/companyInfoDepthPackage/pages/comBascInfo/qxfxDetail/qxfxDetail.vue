<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content" :key="key" v-for="(item,key) in data">
      <div v-if="type == 1">
        <div class="lh50">
          列入日期:
          <span>{{item.putDate}}</span>
        </div>
        <div class="lh50">
          列入原因:
          <span class="sub-content-light">{{item.putReason}}</span>
        </div>
        <div class="lh50">
          列入决定机关:
          <span class="sub-content-light">{{item.putDepartment}}</span>
        </div>
        <div class="lh50">
          移出日期:
          <span class="sub-content-light">{{item.removeDate}}</span>
        </div>
        <div class="lh50">
          移出原因:
          <span class="sub-content-light">{{item.removeReason}}</span>
        </div>
        <div class="lh50">
          移出决定机关:
          <span class="sub-content-light">{{item.removeDepartment}}</span>
        </div>
      </div>
      <div v-else-if="type == 3">
        <div class="lh50">
          立案日期:
          <span>{{item.regdate}}</span>
        </div>
        <div class="lh50">
          案号:
          <span class="sub-content-light">{{item.casecode}}</span>
        </div>
        <div class="lh50">
          执行法院:
          <span class="sub-content-light">{{item.courtname}}</span>
        </div>
        <div class="lh50">
          履行状态:
          <span class="sub-content-light">{{item.performance}}</span>
        </div>
        <div class="lh50">
          执行依据文号:
          <span class="sub-content-light">{{item.gistid}}</span>
        </div>
      </div>
      <div v-else-if="type == 5">
        <div class="lh50">
          立案日期:
          <span>{{item.caseCreateTime}}</span>
        </div>
        <div class="lh50">
          执行标的:
          <span class="sub-content-light">{{item.execMoney}}</span>
        </div>
        <div class="lh50">
          案号:
          <span class="sub-content-light">{{item.caseCode}}</span>
        </div>
        <div class="lh50">
          执行法院:
          <span class="sub-content-light">{{item.execCourtName}}</span>
        </div>
      </div>
      <div v-else-if="type == 6">
        <div class="lh50">
          决定日期:
          <span>{{item.publishDate}}</span>
        </div>
        <div class="lh50">
          决定书文号:
          <span class="sub-content-light">{{item.punishNumber}}</span>
        </div>
        <div class="lh50">
          类型:
          <span class="sub-content-light">{{item.type}}</span>
        </div>
        <div class="lh50">
          决定机关:
          <span class="sub-content-light">{{item.departmentName}}</span>
        </div>
      </div>
      <div v-else-if="type == 7">
        <div class="lh50">
          列入时间:
          <span>{{item.putDate}}</span>
        </div>
        <div class="lh50">
          列入原因:
          <span class="sub-content-light">{{item.punishNumber}}</span>
        </div>
        <div class="lh50">
          决定列入部门:
          <span class="sub-content-light">{{item.putDepartment}}</span>
        </div>
        <div class="lh50">
          移除时间:
          <span class="sub-content-light">{{item.removeDate}}</span>
        </div>
        <div class="lh50">
          移除原因:
          <span class="sub-content-light">{{item.removeReason}}</span>
        </div>
        <div class="lh50">
          决定移除部门:
          <span class="sub-content-light">{{item.removeDepartment}}</span>
        </div>
      </div>
      <div v-else-if="type == 8">
        <div class="lh50">
          日期:
          <span>{{item.submittime}}</span>
        </div>
        <div class="lh50">
          裁判文书:
          <span class="sub-content-light">{{item.title}}</span>
        </div>
        <div class="lh50">
          案件类型:
          <span class="sub-content-light">{{item.casetype}}</span>
        </div>
        <div class="lh50">
          案件号:
          <span class="sub-content-light">{{item.caseno}}</span>
        </div>
      </div>
      <div v-else-if="type == 9">
        <div class="lh50">
          公告时间:
          <span>{{item.regDate}}</span>
        </div>
        <div class="lh50">
          登记编号:
          <span class="sub-content-light">{{item.regNumber}}</span>
        </div>
        <div class="lh50">
          出质人:
          <span class="sub-content-light">{{item.pledgor}}</span>
        </div>
        <div class="lh50">
          质权人:
          <span class="sub-content-light">{{item.pledgee}}</span>
        </div>
        <div class="lh50">
          状态:
          <span class="sub-content-light">{{item.state}}</span>
        </div>
      </div>
      <div v-else-if="type == 10">
        <div class="lh50">
          登记日期:
          <span>{{item.regDate}}</span>
        </div>
        <div class="lh50">
          登记号:
          <span class="sub-content-light">{{item.regNum}}</span>
        </div>
        <div class="lh50">
          被担保债权类型:
          <span class="sub-content-light">{{item.type}}</span>
        </div>
        <div class="lh50">
          登记机关:
          <span class="sub-content-light">{{item.regDepartment}}</span>
        </div>
        <div class="lh50">
          状态:
          <span class="sub-content-light">{{item.state}}</span>
        </div>
      </div>
      <div v-else-if="type == 11">
        <div class="lh50">
          证件号码:
          <span>{{item.personIdNumber}}</span>
        </div>
        <div class="lh50">
          纳税人识别号:
          <span class="sub-content-light">{{item.taxIdNumber}}</span>
        </div>
        <div class="lh50">
          欠税税种:
          <span class="sub-content-light">{{item.taxCategory}}</span>
        </div>
        <div class="lh50">
          当前发生的欠税额:
          <span class="sub-content-light">{{item.newOwnTaxBalance}}</span>
        </div>
        <div class="lh50">
          欠税金额:
          <span class="sub-content-light">{{item.ownTaxBalance}}</span>
        </div>
        <div class="lh50">
          税务机关:
          <span class="sub-content-light">{{item.department}}</span>
        </div>
      </div>
      <div v-else-if="type == 13">
        <div class="lh50">
          开庭日期:
          <span>{{item.startdate}}</span>
        </div>
        <div class="lh50">
          案由:
          <span class="sub-content-light">{{item.casereason}}</span>
        </div>
        <div class="lh50">
          原告/上诉人:
          <span
            class="sub-content-light"
            :key="i"
            v-for="(im,i) in item.plaintiff"
          >{{im.name}}&nbsp;</span>
        </div>
        <div class="lh50">
          被告/被上诉人:
          <span
            class="sub-content-light"
            :key="i"
            v-for="(im,i) in item.defendant"
          >{{im.name}}&nbsp;</span>
        </div>
      </div>
      <div v-else-if="type == 14">
        <div class="lh50">
          公告时间:
          <span>{{item.publishdate}}</span>
        </div>
        <div class="lh50">
          上诉方:
          <span class="sub-content-light">{{item.party1}}</span>
        </div>
        <div class="lh50">
          被诉方:
          <span class="sub-content-light">{{item.party2}}</span>
        </div>
        <div class="lh50">
          公告类型:
          <span class="sub-content-light">{{item.bltntypename}}</span>
        </div>
        <div class="lh50">
          法院:
          <span class="sub-content-light">{{item.courtcode}}</span>
        </div>
        <div class="lh50">
          公告内容:
          <span class="sub-content-light">{{item.content}}</span>
        </div>
      </div>
      <div v-else-if="type == 21">
        <div class="lh50">
          被执行人:
          <span>{{item.executedPerson}}</span>
        </div>
        <div class="lh50">
          股权数额:
          <span class="sub-content-light">{{item.equityAmount}}</span>
        </div>
        <div class="lh50">
          执行法院:
          <span class="sub-content-light">{{item.executiveCourt}}</span>
        </div>
        <div class="lh50">
          执行通知书文号:
          <span class="sub-content-light">{{item.executeNoticeNum}}</span>
        </div>
        <div class="lh50">
          类型|状态:
          <span class="sub-content-light">{{item.typeState}}</span>
        </div>
      </div>
      <div v-else-if="type == 22">
        <div class="lh50">
          清算组负责人:
          <span>{{item.manager}}</span>
        </div>
        <div class="lh50">
          清算组成员:
          <span class="sub-content-light">--</span>
        </div>
      </div>
      <div v-else-if="type == 23"></div>
      <div v-else>
        <div class="lh50">
          变更时间:
          <span>{{item.createTime}}</span>
        </div>
        <div class="lh50">
          变更前:
          <span class="sub-content-light">{{item.contentBefore}}</span>
        </div>
        <div class="lh50">
          变更后:
          <span class="sub-content-light">{{item.contentAfter}}</span>
        </div>
      </div>
    </div>
    <!--  -->
    <i-load-more v-if="more"/>
    <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
  </div>
</template>
<script>
import { mapState } from "vuex";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
export default {
  components: { SubTitle },
  data() {
    return {
      title: "企信风险",
      subTitle: "",
      type: null,
      page: 1,
      id: null,
      more: true,
      total: 0,
      data: []
    };
  },
  computed: {
    ...mapState(["companyId"])
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      var param = {
        riskDetailId: this.id,
        companyId: this.companyId,
        pageSize: config.pageSize,
        pageNum: this.page
      };
      this.$http.get(config.riskItemDetail, param).then(res => {
        if (res.data.reason == "ok") {
          const result = res.data.result.dataList;
          if (result.length < 10) {
            this.more = false;
          }
          if (init) {
            this.data = result;
            wx.stopPullDownRefresh();
          } else {
            this.data = this.data.concat(result);
          }
        }
      });
    }
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page++;
    this.init();
  },
  mounted() {
    this.type = this.$root.$mp.query.type;
    this.id = this.$root.$mp.query.id;
    this.subTitle = this.$root.$mp.query.title;
    this.init(true);
  }
};
</script>

<style lang="scss" scoped>
</style>

