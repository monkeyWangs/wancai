// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axiosInstance from './http';

Vue.prototype.$http = axiosInstance;
Vue.prototype.$managerURL = 'http://120.77.253.107:9092/manager';
/* eslint-disable no-new */
new Vue({
  router,
  store,
  axiosInstance,
  el: '#app',
  render: h => h(App),
});
