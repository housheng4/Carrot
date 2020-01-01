import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui"; //引入Element
import "element-ui/lib/theme-chalk/index.css"; //引入Element的样式文件
import "./assets/css/gloabal.css"; //全局css
import filters from "./filters/index"; //引入过滤器
import api from "./request/api"; // 接口

//封装过滤器 可以当做管道使用
for (let key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.config.productionTip = false;
Vue.use(ElementUI); //全局使用Element
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
