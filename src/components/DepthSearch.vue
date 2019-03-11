<template>
  <div>
    <div class="deep-search" @click="toDepth">深度
      <br>查询
    </div>
    <Vip v-if="showByVip"></Vip>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { SET_IS_DEPTH } from "@/store/mutation-types";
import Vip from "@/components/Vip";
import config from "@/config";
export default {
  props: ["url"],
  components: { Vip },
  data() {
    return {
      imgUrl: config.imgUrl,
      showByVip: false
    };
  },
  computed: {
    ...mapState(["companyName", "vipLevel"])
  },
  methods: {
    ...mapMutations({
      isDepth: SET_IS_DEPTH
    }),
    // 获取登录信息
    getLoginInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.vipLevel = loginInfo.vipLevel;
    },
    toDepth() {
      if (!this.vipLevel) {
        this.showByVip = true;
      } else {
        this.isDepth(true);
        wx.navigateTo({
          url: this.url + "?companyName=" + this.companyName
        });
      }
    }
  },
  mounted() {
    this.getLoginInfo();
  },
  onShow() {
    this.showByVip = false;
  }
};
</script>
<style lang="scss" scoped>
.deep-search {
    position: fixed;
    top: 15rpx;
    right: 15rpx;
    width: 80rpx;
    height: 70rpx;
    padding-top: 10rpx;
    line-height: 30rpx;
    text-align: center;
    border-radius: 50%;
    background: #209bf9;
    color: #E8CA21;
    font-size: 12px;
    z-index: 9998;
  }
</style>
