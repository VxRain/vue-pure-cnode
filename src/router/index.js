import Vue from "vue";
import Router from "vue-router";
import Topics from "@/components/Topics.vue";
import Topic from "@/components/Topic.vue";
import Sidebar from "@/components/Sidebar.vue";
import User from "@/components/User.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "topics",
      components: {
        main: Topics,
        sidebar: Sidebar,
      },
    },
    {
      path: "/topic/:topicId&author=:userName",
      name: "topic",
      components: {
        main: Topic,
        sidebar: Sidebar,
      },
    },
    {
      path: "/user/:userName",
      name: "user",
      components: {
        main: User,
        sidebar: Sidebar,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 路由变更后是否保留滚动栏高度
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
