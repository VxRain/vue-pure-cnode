<template>
  <div class="main-container user-zone">
    <div class="pane">
      <div class="pane-header">
        <router-link :to="{name: 'topics'}">主页</router-link>
        <span class="divider">/</span>
      </div>
      <div class="pane-content user-info">
        <a href="#">
          <img :src="userInfo.avatar_url" alt class="avatar" />
        </a>
        <span class="username">{{userInfo.loginname}}</span>
        <div class="score">积分：{{userInfo.score}}</div>
      </div>
    </div>
    <div class="pane">
      <div class="pane-header">作者其它话题</div>
      <ul class="pane-content nav">
        <li v-for="post of userInfo.recent_topics" :key="post.id">
          <router-link
            :to="{name:'topic', params:{topicId: post.id, userName: post.author.loginname}}"
          >{{post.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="pane">
      <div class="pane-header">作者回复话题</div>
      <ul class="pane-content nav">
        <li v-for="post of userInfo.recent_replies" :key="post.id">
          <router-link
            :to="{name:'topic', params:{topicId: post.id, userName: post.author.loginname}}"
          >{{post.title}}</router-link>
        </li>
      </ul>
    </div>
    <!-- loading组件 -->
    <loading :condition="loading"></loading>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      userInfo: "",
      loading: true
    };
  },
  methods: {
    getUserInfo() {
      this.$axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.userName}`)
        .then(response => {
          this.userInfo = response.data.data;
          this.loading = false;
        });
    }
  },
  beforeMount() {
    this.getUserInfo();
  }
};
</script>

<style scoped>
.main-container.user-zone {
  margin: 0 0 0 5%;
}
.divider {
  padding: 0 5px;
  color: #ccc;
}
@media all and (max-width: 768px) {
  .main-container.user-zone {
    margin: 0 5%;
  }
}
</style>