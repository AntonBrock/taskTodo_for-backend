import Vue from 'vue'
import store from './store/index'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
