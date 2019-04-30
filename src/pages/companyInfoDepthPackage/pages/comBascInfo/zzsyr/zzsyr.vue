<template>
  <div class="default-bg">
    <NoData v-if="noData"></NoData>
    <div v-else>
      <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
      <!--  -->
      <div class="block-content" :key="index" v-for="(item,index) in data">
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">最终收益人名称</div>
            <div class="title">
              {{item.name}}
              <div class="origin right" @click="goManInfo(item.name)">他有{{item.total}}家公司</div>
            </div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">持股比例</div>
            <div class="title">{{item.percent}}</div>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <div class="sub-content-light lh60">股权链</div>
            <div class="path-box" :key="k" v-for="(v,k) in item.chainList">
              <div :key="b" v-for="(a,b) in v">
                <div class="title mb15" v-if="b==0">路径{{k+1}}(占比约{{a.value}})</div>
                <div class="path-percent" v-else>
                  <div v-if=" b%2 == 1" class="pp-name inline-block font-click">{{a.value}}</div>
                  <div v-else class="pp-percent inline-block">
                    <p>{{a.value}}</p>
                    <span class="arrow">
                      <img v-if="imgUrl" mode="aspectFit" :src="imgUrl+'changjiantou.png'">
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </i-row>
      </div>
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
import NoData from "@/components/NoData";
export default {
  components: { SubTitle, SubTitle },
  data() {
    return {
      imgUrl: config.imgUrl,
      title: "基本信息",
      subTitle: "最终受益人",
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
          uri: config.humanholdingDe + this.companyName,
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
    // 跳转到人物详情页
    goManInfo(name) {
      wx.navigateTo({
        url:
          "/pages/manInfo/main?humanName=" +
          name +
          "&companyName=" +
          this.companyName
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
.path-box {
  width: calc(96% -20rpx);
  padding: 15rpx 10rpx;
  overflow: hidden;
  background: #e5e4e4;
  border-radius: 3px;
}
.path-percent {
  float: left;
  height: 40rpx;
  line-height: 40rpx;
  .pp-percent {
    position: relative;
    font-size: 10px;
    text-align: center;
    p {
      top: -5rpx;
      left: 0;
      width: 100rpx;
      height: 20rpx;
      line-height: 20rpx;
      position: absolute;
    }
    .arrow {
      display: block;
      width: 100rpx;
      height: 40rpx;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>

