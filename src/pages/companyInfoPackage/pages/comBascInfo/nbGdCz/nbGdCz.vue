<template>
  <div class="default-bg min-height100">
    <SubTitle :title="title" :subTitle="subTitle" :total="total"></SubTitle>
    <!--  -->
    <div class="block-shadow-content" :key="index" v-for="(item,index) in shareholderInfo">
      <BlockTitle :bt="bt" :title="noTitle" :hasBt="true"></BlockTitle>
      <div class="lh50">
        股东：
        <span class="font-click">{{item.inv}}</span>
      </div>
      <div class="lh50">
        认缴出资额(万元)：
        <span class="font-click">{{item.lisubconam}}</span>
      </div>
      <div class="lh50">
        认缴出资时间：
        <span class="font-click">{{item.subcondate}}</span>
      </div>
      <div class="lh50">
        认缴出资方式：
        <span class="font-click">{{item.acconcurrency}}</span>
      </div>
      <div class="lh50">
        实缴出资额(万元)：
        <span class="font-click">{{item.liacconam}}</span>
      </div>
      <div class="lh50">
        实缴出资时间：
        <span class="font-click">{{item.accondate}}</span>
      </div>
      <div class="lh50">
        实缴出资方式：
        <span class="font-click">{{item.subconcurrency}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import config from "@/config.js";
import SubTitle from "@/components/SubTitle";
import BlockTitle from "@/components/BlockTitle";
export default {
  components: { SubTitle, BlockTitle },
  data() {
    return {
      title: "企业年报",
      subTitle: "股东及出资信息",
      total: "",
      noTitle: "",
      bt: "股东及出资信息",
      rjcz:["","货币","实物","知识产权","债权","","土地使用权","股权","","其他"],
    };
  },
  computed: {
    shareholderInfo() {
      const shi = JSON.parse(store.state.annualreportData.shareholderInfo).map(item=>{
        item.acconcurrency = this.rjcz[Number(item.acconform)];
        item.subconcurrency = this.rjcz[Number(item.subconform)];
        return item
      })
      return shi;
    }
  },
  mounted(){
    this.total = this.shareholderInfo.length;
  }
};
</script>
<style lang="scss" scoped>
</style>

