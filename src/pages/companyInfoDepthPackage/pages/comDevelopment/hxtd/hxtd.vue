<template>
  <div class="default-bg min-height100">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div
        class="block-shadow-content overflow-hidden"
        :key="index"
        v-for="(item,index) in data"
        @click="hxtdDetail(item)"
      >
        <div class="core-term-face left">
          <img v-if="item.icon" :src="item.icon">
          <img v-else-if="imgUrl" :src="imgUrl+'logo_n.png'">
        </div>
        <div class="core-term-right left">
          <div class="title lh70 font-click blod">{{item.name}}</div>
          <div class="position left" :key="k" v-for="(v,k) in item.title">
            <div v-if="k==0" class="red">{{v}}</div>
            <div v-if="k==1" class="green">{{v}}</div>
            <div v-if="k==2" class="blue">{{v}}</div>
          </div>
          <div class="sub-content clearboth">{{item.desc}}</div>
        </div>
      </div>
      <!--  -->
      <i-load-more v-if="more"/>
      <i-load-more v-if="!more && page>1" :loading="more" tip="未公开更多"/>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { mapState } from "vuex";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, BlockTitle, NoData },
  data() {
    return {
      imgUrl: config.imgUrl,
      title: "企业发展",
      subTitle: "核心团队",
      total: "",
      data: [],
      noData: false,
      page: 1,
      more: true
    };
  },
  computed: {
    ...mapState(["companyName"])
  },
  methods: {
    init(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      this.$http
        .get(config.companyName, {
          uri: config.findTeamMemberDe + this.companyName,
          pageSize: config.pageSize,
          pageNum: this.page
        })
        .then(res => {
          if (res.data.reason === "ok") {
            if (res.data.result.total > 0) {
              this.total = res.data.result.total;
              const result = res.data.result.items.map(item => {
                item.title = item.title.split("&");
                this.$http
                  .post(config.typImg, { imgUrl: item.icon, imgId: new Date() })
                  .then(res => {
                    if (res.data.code == 0) {
                      item.icon = res.data.data.newImgUrl;
                    }
                  });
                return item;
              });
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
              }
              this.noData = false;
            } else {
              this.noData = true;
            }
          } else {
            this.noData = true;
          }
        });
    },
    hxtdDetail(item) {
      store.commit("setDevelopmentHxtdDetailData", item);
      wx.navigateTo({
        url: "/pages/companyInfoDepthPackage/pages/comDevelopment/hxtdDetail/main"
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
  mounted() {
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

