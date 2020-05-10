<template>
  <!-- #内容 -->
  <div class="main-container">
    <div class="pane">
      <!-- 话题分类标签 -->
      <div class="pane-header tabs">
        <span v-for="(item, index) of tabsData" :key="index">
          <router-link
            :class="[index === activedTab ? 'actived' : '']"
            :to="{name: 'topics'}"
            @click.native="tabChange(item.category, index)"
          >{{item.name}}</router-link>
        </span>
      </div>
      <!-- 话题列表 -->
      <div class="pane-content posts">
        <div class="post" v-for="post of this.$parent.postList" :key="post.id">
          <div>
            <!-- 跳转到用户页面路由 -->
            <router-link :to="{name:'user',params:{userName: post.author.loginname}}">
              <img class="avatar" :src="post.author.avatar_url" />
            </router-link>
          </div>
          <span class="visit-count">{{post.visit_count}}/{{post.reply_count}}</span>
          <div class="title">
            <!-- 跳转到主题页面路由 -->
            <router-link
              :to="{name:'topic', params:{topicId: post.id, userName: post.author.loginname}}"
            >{{post.title}}</router-link>
          </div>
          <div class="time">
            <span>{{post.create_at | formatDate}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topics",
  data() {
    return {
      // category: 对应类别话题的的API地址
      tabsData: [
        { category: "", name: "全部" },
        { category: "good", name: "精华" },
        { category: "share", name: "分享" },
        { category: "ask", name: "问答" },
        { category: "job", name: "工作" }
      ],
      activedTab: 0
    };
  },
  methods: {
    tabChange(tab, index) {
      this.$parent.getData(tab);
      this.activedTab = index;
    }
  }
};
</script>

<style scoped>
.tabs {
  padding: 15px 0 15px 30px;
}
.tabs > span + span {
  padding-left: 20px;
}
.tabs a {
  color: #80bd01;
  text-decoration: none;
}
.tabs a:hover {
  color: #005580;
}
.tabs a.actived {
  background-color: #80bd01;
  color: #fff;
  padding: 3px 4px;
  border-radius: 3px;
}
.tabs a.actived:hover {
  color: #fff;
}

.posts {
  padding: 0;
}
.post {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}
.post:hover {
  background: #f5f5f5;
}
.post .avatar {
  width: 30px;
  height: 30px;
}
.post .visit-count {
  flex-basis: 80px;
  flex-shrink: 0;
  padding-left: 5px;
  /*  */
  font-size: 12px;
  color: #aaa;
}
.post .title {
  flex: 1;
}
.post .title a {
  text-decoration: none;
  color: #333;
}
.post .title a:visited {
  color: #888;
}
.post .title a:hover {
  text-decoration: underline;
}
.post .time {
  color: #778087;
  font-size: 11px;
}
</style>