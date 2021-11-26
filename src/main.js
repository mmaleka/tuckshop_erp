import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';
Vue.use(VueToast);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
