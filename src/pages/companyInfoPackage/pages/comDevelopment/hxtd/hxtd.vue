<template>
  <div class="default-bg min-height100">
    <ToDepthSearch
      :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/hxtd/main'"
      v-if="total <= 0"
    ></ToDepthSearch>
    <div v-else>
      <DepthSearch :url="'/pages/companyInfoDepthPackage/pages/comDevelopment/hxtd/main'"></DepthSearch>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content overflow-hidden"
        :key="index"
        v-for="(item,index) in data"
        @click="hxtdDetail(item)"
      >
        <div class="core-term-face left">
          <img v-if="imgFile && item.personFace" :src="imgFile+item.personFace">
          <img v-else-if="imgUrl" :src="imgUrl+'logo_n.png'">
        </div>
        <div class="core-term-right left">
          <div class="title lh70 font-click blod">{{item.personName}}</div>
          <div v-if="item.postionBoo">
            <div class="position left" :key="k" v-for="(v,k) in item.postion">
              <div v-if="k==0" class="red">{{v}}</div>
              <div v-if="k==1" class="green">{{v}}</div>
              <div v-if="k==2" class="blue">{{v}}</div>
            </div>
          </div>
          <div v-else>
            <div class="position left">
              <div class="red">{{item.postion}}</div>
            </div>
          </div>
          <div class="sub-content clearboth">{{item.resume}}</div>
        </div>
      </div>
      <!--  -->
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
  components: {
    SubTitle,
    BlockTitle,
    ToDepthSearch,
    DepthSearch,
    Share
  },
  data() {
    return {
      imgUrl: config.imgUrl,
      imgFile: config.imgFile,
      title: "企业发展",
      subTitle: "核心团队",
      total: "",
      data: [],
      companyId: "",
      page: 1,
      more: true
    };
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get("app/buss/companyInfo/comDevelopment", {
          companyId: this.companyId,
          pageNum: this.page,
          pageSize: config.pageSize,
          type: "findTeamMember"
        })
        .then(res => {
          if (res.data.code == 0) {
            const result = res.data.data.findTeamMember.map(item => {
              item.postion = item.postion.includes("&")
                ? item.postion.split("&")
                : item.postion;
              item.postionBoo = Array.isArray(item.postion);
              return item;
            });
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
    hxtdDetail(item) {
      store.commit("setDevelopmentHxtdDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoPackage/pages/comDevelopment/hxtdDetail/main"
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
.core-term-face {
  width: 80rpx;
  height: auto;
  img {
    display: inline-block;
    width: 80rpx;
    height: 80rpx;
    margin-top: 20rpx;
    border-radius: 50%;
  }
}
.core-term-right {
  width: calc(100% - 100rpx);
  margin-left: 10rpx;
  .position {
    overflow: hidden;
    margin-bottom: 20rpx;
    div {
      padding: 5rpx 10rpx;
      margin: 0 15rpx 0 0;
      color: #ffffff;
    }
  }
  .sub-content {
    line-height: 36rpx;
    max-height: 178rpx;
    overflow: hidden;
  }
}
.red {
  background: #ff0000;
}
.green {
  background: #4fbfb0;
}
.blue {
  background: #209bf9;
}
</style>

