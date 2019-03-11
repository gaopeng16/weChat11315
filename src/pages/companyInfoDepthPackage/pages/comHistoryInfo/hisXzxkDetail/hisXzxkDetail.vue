<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">许可文件编号</div>
          <div class="title">{{historyHxLicenceDetail.licencenumber}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">许可文件名称</div>
          <div class="title">{{historyHxLicenceDetail.licencename}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">有效期自</div>
          <div class="title">{{historyHxLicenceDetail.fromdate}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">有效期至</div>
          <div class="title">{{historyHxLicenceDetail.todate}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">许可机关</div>
          <div class="title">{{historyHxLicenceDetail.department}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">许可内容</div>
          <div class="title">{{historyHxLicenceDetail.scope}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import { formatTime } from "@/utils";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      imgFile: config.imgFile,
      title: "历史信息",
      subTitle: "行政许可详情",
      total: ""
    };
  },
  computed: {
    historyHxLicenceDetail() {
      return store.state.historyHxLicenceDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
.comlogo {
  width: 120rpx;
  height: 120rpx;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.comname {
  line-height: 120rpx;
}
</style>

