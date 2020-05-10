<template>
  <div class="sidebar">
    <!-- #侧边栏 -->
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
  computed: {
    // 过滤出未回复的帖子
    noReplyPostList() {
      let limitedCount = 10;
      return this.$parent.postList
        .filter(post => {
          return post.reply_count === 0;
        })
        .slice(0, limitedCount);
    }
  }
};
</script>

<style scoped>
</style>