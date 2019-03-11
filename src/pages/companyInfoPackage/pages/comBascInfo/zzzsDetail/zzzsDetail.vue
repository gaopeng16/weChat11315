<template>
  <div>
    <!--  -->
    <div class="block-content">
      <i-row>
        <i-col span="24" :key="k" v-for="(v,k) in detailsObj">
          <div class="sub-content-light lh60">{{v.title}}</div>
          <div class="title">{{v.content ? v.content : '企业选择不公开'}}</div>
        </i-col>
      </i-row>
    </div>
    <!--  -->
  </div>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      detailsArr: [],
      detailsObj: []
    };
  },
  computed: {
    zzzsDetailData() {
      return store.state.zzzsDetailData;
    }
  },
  methods: {
    setDetailsObj() {
      for (var i = 0; i < this.detailsArr.length - 1; i++) {
        var item = this.detailsArr[i];
        var obj = { title: "", content: "" };
        obj.title = item.substr(0, item.indexOf(":"));
        obj.content = item.substr(item.indexOf(":") + 1);
        this.detailsObj[i] = obj;
      }
      console.log(this.detailsObj);
    }
  },
  mounted() {
    this.detailsArr = this.zzzsDetailData.details
      ? this.zzzsDetailData.details.split(";")
      : [];
    this.setDetailsObj();
  }
};
</script>
<style lang="scss" scoped>
</style>
