<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24">
          <div class="title">{{developmentRecruitDetail.positionName}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">招聘人数</div>
          <div class="title">{{developmentRecruitDetail.nums}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">学历</div>
          <div class="title">{{developmentRecruitDetail.education}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">工作经验</div>
          <div class="title">{{developmentRecruitDetail.experienceStr}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">办公地点</div>
          <div class="title">{{developmentRecruitDetail.place}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">薪水</div>
          <div class="title">{{developmentRecruitDetail.salary}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">来源</div>
          <div class="title">{{developmentRecruitDetail.sourceName}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">公司</div>
          <div
            class="title"
          >{{developmentRecruitDetail.companyName?developmentRecruitDetail.companyName:"--"}}</div>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <div class="sub-content-light lh60">联系人</div>
          <div
            class="title"
          >{{developmentRecruitDetail.contacts?developmentRecruitDetail.contacts:"--"}}</div>
        </i-col>
        <i-col span="11" offset="1">
          <div class="sub-content-light lh60">联系电话</div>
          <div
            class="title"
          >{{developmentRecruitDetail.contactNumber?developmentRecruitDetail.contactNumber:"--"}}</div>
        </i-col>
      </i-row>

      <i-row>
        <i-col span="24">
          <div class="sub-content-light lh60">职位描述</div>
          <div class="title">{{developmentRecruitDetail.positionDescribe}}</div>
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
      title: "经营状况",
      subTitle: "招聘详情",
      total: ""
    };
  },
  computed: {
    developmentRecruitDetail() {
      return store.state.developmentRecruitDetailData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

