<template>
  <div class="sidebar" :class="{'sidebar-offscreen':isOffscreen}">
    <!-- 
        这里的authorData是异步获取的，先使用v-if确定获取到数据了，再渲染路由，不然Vue会报警告
    -->
    <!-- 如果不在首页，并且有作者数据，就渲染出来 -->
    <!-- 在用户界面，就不渲染作者数据了，内容都差不多… -->
    <div class="pane" v-if="(!isIndexPage && authorData) && !isUserPage">
      <div class="pane-header">作者</div>
      <div class="pane-content user-info">
        <router-link :to="{name: 'user', params: {userName: authorData.loginname}}">
          <img :src="authorData.avatar_url" alt class="avatar" />
        </router-link>
        <span class="username">
          <router-link
            :to="{name: 'user', params: {userName: authorData.loginname}}"
          >{{authorData.loginname}}</router-link>
        </span>
        <div class="score">积分：{{authorData.score}}</div>
      </div>
    </div>
    <div class="pane" v-if="(!isIndexPage && authorData) && !isUserPage">
      <div class="pane-header">作者其它话题</div>
      <ul class="pane-content nav">
        <li v-for="post of authorData.recent_topics" :key="post.id">
          <router-link
            v-if="authorData"
            :to="{name:'topic', params:{topicId: post.id, userName: post.author.loginname}}"
          >{{post.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="pane">
      <div class="pane-header">无人回复的话题</div>
      <ul class="pane-content nav">
        <li v-for="post of noReplyPostList" :key="post.id">
          <router-link
            :to="{name:'topic', params:{topicId: post.id, userName: post.author.loginname}}"
          >{{post.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAuthor } from "api/api.js";
export default {
  name: "Sidebar",
  data() {
    return {
      authorData: ""
    };
  },
  methods: {
    getAuthorData() {
      getAuthor(this.$route.params.userName).then(res => {
        this.authorData = res;
      });
    }
  },
  computed: {
    // 判断是否在首页
    isIndexPage() {
      return this.$route.path === "/" ? true : false;
    },
    isUserPage() {
      return this.$route.name === "user" ? true : false;
    },
    // 是否显示手机侧边栏
    isOffscreen() {
      return this.$parent.showSidebar ? true : false;
    },
    // 过滤出未回复的帖子
    noReplyPostList() {
      // 不在首页就显示5个,否则显示15个
      let limitedCount = !this.isIndexPage ? 5 : 15;
      return this.$parent.postList
        .filter(post => {
          return post.reply_count === 0;
        })
        .slice(0, limitedCount);
    }
  },
  created() {
    this.getAuthorData();
  },
  watch: {
    $route() {
      this.getAuthorData();
    }
  }
};
</script>

<style scoped>
</style>