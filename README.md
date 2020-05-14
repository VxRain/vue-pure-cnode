# vue-pure-cnode

使用 ES6 + Axios + Vue + Vue-Router + Flex 布局开发的 CNode 社区

技术栈：

* ES6 语法：箭头函数，Promise，解构赋值
* Axios：请求后端数据，最开始直接把 Axios 绑定到 Vue 实例上，但是发现这样用在组件内用的多了很不方便，所以简单柯里化封装了一下
* Vue：Vue 框架
* Vue-Router：路由，项目里主要使用[命名视图](https://router.vuejs.org/zh/guide/essentials/named-views.html)

* Flex：Flex 弹性布局，适配手机端。

## 使用指南

1. clone 或下载到本地

   `git clone https://github.com/VxRain/vue-pure-cnode.git`

2. 使用 `npm` 或 `yarn` 安装依赖

   `npm install` 或者 `yarn install`

3. 启动服务

   `yarn run serve`

4. 打包

   `yarn run build`

## Todo

- [x] 封装请求API
- [ ] 手机端侧边栏
- [ ] 分页
- [ ] Toekn