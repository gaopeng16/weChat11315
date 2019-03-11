import Vue from "vue";
import App from "./App";
import store from "./store/index"
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();

// 请求拦截
fly.interceptors.request.use((request) => {
  /* wx.showLoading({
    title: "加载中",
    mask: true
  }); */
  request.headers["Content-Type"] = "application/x-www-form-urlencoded";
  let userId = wx.getStorageSync("loginInfo").userId;
  if (userId) {
    if (request.body) {
      request.body["userId"] = userId
    }

  }
})

//添加响应拦截器
// fly.interceptors.response.use(
//   (response) => {
//     wx.hideLoading();
//     return response.data;
//   },
//   (err) => {
//     wx.hideLoading();
//     if (err) {
//       return "请求失败";
//     };
//   }
// );

fly.config.baseURL = "https://www.pic11315.com";
Vue.prototype.$http = fly;
Vue.prototype.$store = store;

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue(App);
app.$mount();

Vue.prototype.globalData = getApp().globalData


