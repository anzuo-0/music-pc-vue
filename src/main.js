import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from './axios/index'

import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
  defaultCover: './assets/logo.png',
  defaultLrc: '找不到歌词',
  productionTip: true,
});

import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'
Vue.use(element)

Vue.config.productionTip = false

Vue.prototype.axios = axios

Vue.prototype.bus = new Vue();

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')