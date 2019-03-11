<template>
  <!-- <div class="default-bg ggxx-body" :class="[showTc ? 'no-scroll':'']"> -->
  <div class="default-bg">
    <NoData v-if="noData"></NoData>
    <div v-else>
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
          {{item.position}}
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
                  <div class="title">{{position}}</div>
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
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      title: "上市信息",
      subTitle: "高管信息",
      total: "",
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
      resume: "", //人物简介
      data: [],
      companyName: "",
      noData: false,
      page: 1,
      more: true
    };
  },
  methods: {
    _showTc(item) {
      this.showTc = true;
      this.name = item.name;
      this.position = item.position;
      this.numberOfShares = item.numberOfShares;
      this.sex = item.sex;
      this.age = item.age;
      this.education = item.education;
      this.salary = item.salary;
      this.reportDate = item.reportDate;
      this.term = item.term;
      this.managerGroup = item.managerGroup;
      this.resume = item.resume;
    },
    _hideTc() {
      this.showTc = false;
    },
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.seniorExecutiveDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items;
              if (
                (init && result.length < config.pageSize) ||
                (result.length < config.pageSize && this.page > 1)
              ) {
                this.more = false;
              }
              if (init) {
                this.data = result;
                wx.stopPullDownRefresh();
              } else {
                this.data = this.data.concat(result);
                console.log("下一页", this.data);
              }
              this.noData = false;
            } else {
              this.noData = true;
            }
          }
        });
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
    console.log(this.page);
    this.init();
  },
  mounted() {
    this.companyName = this.$root.$mp.query.companyName;
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
