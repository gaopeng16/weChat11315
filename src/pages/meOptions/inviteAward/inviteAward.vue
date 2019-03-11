<template>
  <div>
    <web-view :src="src"></web-view>
  </div>
</template>
<script>
import config from "@/config";
export default {
  data() {
    return {
      host: config.host,
      userId: "",
      src: ""
    };
  },
  methods: {
    getUserInfo() {
      const loginInfo = wx.getStorageSync("loginInfo");
      this.userId = loginInfo.userId;
    }
  },
  onShareAppMessage: function() {
    return {
      title: "邀请赢奖",
      path: "/pages/meOptions/inviteAward/main?userId=" + this.userId
    };
  },
  mounted() {
    if (this.$root.$mp.query.userId) {
      this.userId = this.$root.$mp.query.userId;
    } else {
      this.getUserInfo();
    }
    this.src = this.host + "/phone-invitation.html?userId=" + this.userId;
  }
};
</script>
<style lang="scss" scoped>
</style>
