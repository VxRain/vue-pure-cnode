<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
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
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      postList: [],
      loading: true
    };
  },
  methods: {
    getData(tab) {
      this.$axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            tab: tab
          }
        })
        .then(res => {
          this.postList = res.data.data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getData();
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
