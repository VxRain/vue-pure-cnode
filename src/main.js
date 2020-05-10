import Vue from "vue";
import App from "./App.vue";

import "normalize.css";
import Axios from "axios";
import router from "./router";

// 全局注册载入组件
import loading from "./components/Loading/Loading.js";

// 全局注册过滤器用来格式化时间戳
Vue.filter("formatDate", (dateString) => {
  if (!dateString) {
    return;
  }
  let date = new Date(dateString);
  let time = Date.now() - date.getTime(); //发帖时间和现在时间相差多少毫秒
  if (time < 0) {
    return "";
  } else if (time / 1000 < 30) {
    return "刚刚";
  } else if (time / 1000 < 60) {
    return parseInt(time / 1000) + "秒前";
  } else if (time / 60000 < 60) {
    return parseInt(time / 60000) + "分钟前";
  } else if (time / 3600000 < 24) {
    return parseInt(time / 3600000) + "小时前";
  } else if (time / 86400000 < 31) {
    return parseInt(time / 86400000) + "天前";
  } else if (time / 2592000000 < 12) {
    return parseInt(time / 2592000000) + "月前";
  } else {
    return parseInt(time / 31536000000) + "年前";
  }
});

// 挂载全局组件
Vue.use(loading);
// 把Axios挂载到Vue实例上
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
