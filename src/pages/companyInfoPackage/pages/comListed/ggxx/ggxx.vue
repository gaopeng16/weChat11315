<template>
  <div class="default-bg ggxx-body" :class="[showTc ? 'no-scroll':'']">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comListed/ggxx/main'"
      v-if="data.length <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comListed/ggxx/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content relative"
        :key="index"
        v-for="(item,index) in data"
        @click="_showTc(item)"
      >
        <div class="lh70 blod title">{{item.name}}</div>
        <div class="lh50">
          <span class="sub-content-light">职务：</span>
          {{item.post}}
        </div>
        <div class="lh50">
          <span class="sub-content-light">持股数：</span>
          {{item.numberOfShares}}
        </div>
        <div class="right-arrow right fs26">
          <i-icon type="enter"/>
        </div>
      </div>
      <div class="tc-mengban fixed" v-if="showTc">
        <div class="tc">
          <div class="tc-title lh70 text-center title bold">
            <span class="font-click">{{name}}</span>
            <span class="tx-close right" @click="_hideTc">
              <i-icon type="close"/>
            </span>
          </div>
          <div class="tc-content">
            <div class="block-content">
              <i-row>
                <i-col span="11">
                  <div class="sub-content-light lh60">职务</div>
                  <div class="title">{{post}}</div>
                </i-col>
                <i-col span="11" offset="1">
                  <div class="sub-content-light lh60">持股数</div>
                  <div class="title">{{numberOfShares}}</div>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="11">
                  <div class="sub-content-light lh60">性别</div>
                  <div class="title">{{sex}}</div>
                </i-col>
                <i-col span="11" offset="1">
                  <div class="sub-content-light lh60">年龄</div>
                  <div class="title">{{age}}</div>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="11">
                  <div class="sub-content-light lh60">学历</div>
                  <div class="title">{{education}}</div>
                </i-col>
                <i-col span="11" offset="1">
                  <div class="sub-content-light lh60">薪酬</div>
                  <div class="title">{{salary}}</div>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="11">
                  <div class="sub-content-light lh60">公告日期</div>
                  <div class="title">{{reportDate}}</div>
                </i-col>
                <i-col span="11" offset="1">
                  <div class="sub-content-light lh60">本届任期</div>
                  <div class="title">{{term}}</div>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="11">
                  <div class="sub-content-light lh60">所属分组</div>
                  <div class="title">{{managerGroup}}</div>
                </i-col>
              </i-row>
            </div>
            <!--  -->
            <div class="block-content">
              <i-row>
                <i-col span="24">
                  <div class="sub-content-light lh60">人物简介</div>
                  <div class="title">{{resume}}</div>
                </i-col>
              </i-row>
            </div>
          </div>
        </div>
      </div>
      <i-load-more v-if="more"/>
      <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
      <div class="bottom90"></div>
      <Share></Share>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import ToDepthSearch from "@/components/ToDepthSearch";
import DepthSearch from "@/components/DepthSearch";
import Share from "@/components/Share";
export default {
  components: { SubTitle, BlockTitle, ToDepthSearch, DepthSearch, Share },
  data() {
    return {
      title: "上市信息",
      subTitle: "高管信息",
      total: "",
      data: [],
      companyId: "",
      page: 1,
      more: true,
      name: "",
      showTc: false, //是否显示弹窗
      post: "", //职务
      numberOfShares: "", //持股数
      sex: "", //性别
      age: "", //年龄
      education: "", //学历
      salary: "", //薪酬
      reportDate: "", //公告日期
      term: "", //本届任期
      managerGroup: "", //所属分组
      resume: "" //人物简介
    };
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get("app/buss/companyInfo/comStock", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "seniorExecutive"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.seniorExecutive;
            console.log(result.length, config.pageSize);
            if (
              (init && this.total <= config.pageSize) ||
              (result.length < config.pageSize && this.page > 1)
            ) {
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
    },
    _showTc(item) {
      this.showTc = true;
      this.name = item.name;
      this.post = item.post;
      this.numberOfShares = item.numberOfShares;
      this.sex = item.sex;
      this.age = item.age;
      this.education = item.education;
      this.salary = item.salary;
      this.reportDate = item.reportDate.substr(0, 10);
      this.term = item.term;
      this.managerGroup = item.managerGroup;
      this.resume = item.resume;
    },
    _hideTc() {
      this.showTc = false;
    }
  },
  onPullDownRefresh() {
    this.init(true);
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page++;
    this.init();
  },
  onShareAppMessage: function() {
    return {
      title: this.$store.state.companyName
    };
  },
  mounted() {
    this.companyId = this.$root.$mp.query.companyId;
    this.total = this.$root.$mp.query.total;
    this.init(true);
  }
};
</script>

<style lang="scss" scoped>
.ggxx-body {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
.right-arrow {
  position: absolute;
  right: 20rpx;
  top: 50%;
  margin-top: -13rpx;
}
.tc-mengban {
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  .tc-content {
    max-height: calc(100vh - 131rpx);
    overflow-y: auto;
  }
  .tc {
    width: 94%;
    margin: 30rpx 3% 30rpx 3%;
    height: calc(100vh - 60rpx);
    overflow-y: auto;
    background: #ffffff;
    border-radius: 8rpx;
    .tc-title {
      border-bottom: solid 1px #dddee1;
    }
    .tx-close {
      margin-right: 15rpx;
    }
  }
}
</style>
