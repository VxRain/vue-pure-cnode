<template>
  <div id="app">
    <!-- 头部 -->
    <Header @sidebarToggle="sidebarToggle"></Header>
    <div id="main-wrapper">
      <!-- 主内容路由，命名视图main -->
      <router-view name="main"></router-view>
      <!-- 侧边栏路由，命名视图sidebar -->
      <router-view name="sidebar"></router-view>
    </div>
    <Footer></Footer>
    <loading :condition="loading"></loading>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { getTopics } from "api/api.js";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      postList: [],
      loading: true,
      showSidebar: false
    };
  },
  methods: {
    getTopicsData(tab, page) {
      getTopics({
        tab
      }).then(topics => {
        this.postList = topics;
        this.loading = false;
      });
    },
    sidebarToggle() {
      this.showSidebar = !this.showSidebar;
    }
  },
  created() {
    this.getTopicsData();
  },
  beforeCreate() {
    // 设置HTML背景色
    document.querySelector("html").setAttribute("style", "background:#e1e1e1");
  }
};
</script>

<style>
/* 导入通用的骨架样式 */
@import "./assets/base.css";

/* 首页通用样式 */
@import "./assets/index.css";
</style>
