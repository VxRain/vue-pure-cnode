<template>
  <div class="sidebar">
    <div class="pane">
      <div class="pane-header">作者</div>
      <div class="pane-content user-info">
        <a href="#">
          <img :src="authorData.avatar_url" alt class="avatar" />
        </a>
        <span class="username">
          <router-link
            :to="{name: 'user', params: {userName: authorData.loginname}}"
          >{{authorData.loginname}}</router-link>
        </span>
        <div class="score">积分：{{authorData.score}}</div>
      </div>
    </div>
    <div class="pane">
      <div class="pane-header">作者其它话题</div>
      <ul class="pane-content nav">
        <li v-for="post of authorData.recent_topics" :key="post.id">
          <router-link
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
export default {
  name: "Sidebar",
  data() {
    return {
      authorData: ""
    };
  },
  methods: {
    getAuthorData() {
      this.$axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.userName}`)
        .then(response => {
          this.authorData = response.data.data;
          this.loading = false;
        });
    }
  },
  computed: {
    // 过滤出未回复的帖子
    noReplyPostList() {
      let limitedCount = 5;
      return this.$parent.postList
        .filter(post => {
          return post.reply_count === 0;
        })
        .slice(0, limitedCount);
    }
  },
  beforeMount() {
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