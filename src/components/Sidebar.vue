<template>
  <div class="sidebar">
    <div class="pane" v-if="notIndex">
      <div class="pane-header">作者</div>
      <div class="pane-content user-info">
        <!-- 
        这里的authorData是异步获取的，先使用v-if确定获取到数据了，再渲染路由，不然Vue会报警告
        -->
        <router-link
          v-if="authorData"
          :to="{name: 'user', params: {userName: authorData.loginname}}"
        >
          <img :src="authorData.avatar_url" alt class="avatar" />
        </router-link>
        <span class="username">
          <router-link
            v-if="authorData"
            :to="{name: 'user', params: {userName: authorData.loginname}}"
          >{{authorData.loginname}}</router-link>
        </span>
        <div class="score">积分：{{authorData.score}}</div>
      </div>
    </div>
    <div class="pane" v-if="notIndex">
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
    notIndex() {
      return this.$route.path !== "/" ? true : false;
    },
    // 过滤出未回复的帖子
    noReplyPostList() {
      // 不在首页就显示5个,否则显示15个
      let limitedCount = this.notIndex ? 5 : 15;
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