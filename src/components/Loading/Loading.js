import Loading from "./Loading.vue";

const loading = {
  install: function(Vue) {
    Vue.component("loading", Loading);
  },
};

export default loading;
