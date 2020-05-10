<template>
  <div class="main-container">
    <!-- loading组件 -->
    <loading :condition="loading"></loading>
    <!-- 主题窗格 -->
    <div class="pane">
      <div class="pane-content topic">
        <h1>{{topic.title}}</h1>
        <div class="topic-info" v-if="topic">
          <span>发布于{{topic.create_at | formatDate}}</span>
          <span>
            作者:
            <router-link
              :to="{name:'user', params:{userName: topic.author.loginname}}"
              class="author"
            >{{topic.author.loginname}}</router-link>
          </span>
          <span>{{topic.visit_count}}次浏览</span>
          <span>最后一次回复是{{topic.last_reply_at | formatDate}}</span>
        </div>
        <div v-html="topic.content" id="markdown-wrapper"></div>
      </div>
    </div>
    <!-- 回复窗格 -->
    <div class="pane" v-if="topic.reply_count">
      <div class="pane-header">
        <span>{{topic.reply_count}} 回复</span>
      </div>
      <div class="pane-content replies">
        <div class="reply" v-for="(reply, index) of topic.replies" :key="reply.id" :id="reply.id">
          <div class="reply-info">
            <router-link :to="{name:'user',params:{userName: reply.author.loginname}}">
              <a href>
                <img :src="reply.author.avatar_url" alt class="reply-avatar" />
              </a>
            </router-link>
            <span>
              <router-link :to="{name:'user',params:{userName: reply.author.loginname}}">
                <a :href="'/topic/'+reply.id" class="reply-user">{{reply.author.loginname}}</a>
              </router-link>
            </span>
            <span>
              <span class="reply-time">{{index+1}}楼 {{reply.create_at | formatDate}}</span>
            </span>
          </div>
          <div v-html="reply.content" class="reply-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      loading: true,
      topic: ""
    };
  },
  methods: {
    getTopicData() {
      this.loading = true;
      this.$axios
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicId}`)
        .then(response => {
          this.topic = response.data.data;
          this.loading = false;
        });
    }
  },
  watch: {
    $route() {
      this.getTopicData();
    }
  },
  beforeMount() {
    this.getTopicData();
  }
};
</script>

<style>
/* Markdown内容格式化 */
@import url("../assets/markdown-github.css");

.topic-info {
  font-size: 13px;
  color: #838383;
  padding: 0 0 15px 0;
  border-bottom: 1px solid #f0f0f0;
}
.topic-info span::before {
  content: "• ";
}
.topic-info span + span {
  padding-left: 15px;
}
.topic-info .author {
  color: #838383;
}
#markdown-wrapper {
  padding-top: 10px;
  display: flex;
}
#markdown-wrapper > .markdown-text {
  /* width设置为0,然后使用flex属性自适应撑开，这样是为了防止长文本或图片撑破父元素 */
  width: 0;
  flex: 1 auto;
  line-height: 1.7em;
}
/* 防止解析的内容撑破容器 */
.markdown-text * {
  max-width: 100%;
  overflow: auto;
}
.replies {
  max-width: 1080px;
  padding: 0;
}
.replies img {
  max-width: 100%;
}
.reply {
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}
.reply-content {
  display: flex;
}
.reply-content .markdown-text {
  width: 0;
  flex: 1 auto;
  overflow: auto;
}
.reply-avatar {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  padding-right: 10px;
}
.reply-user,
.reply-user:link,
.reply-user:visited {
  color: #666;
  text-decoration: none;
}
.reply-user:hover {
  color: #385f8a;
}
.reply-time {
  display: inline-block;
  padding-left: 10px;
  font-size: 11px;
  color: #08c;
  text-decoration: none;
}
.reply-time:hover {
  text-decoration: underline;
}
</style>