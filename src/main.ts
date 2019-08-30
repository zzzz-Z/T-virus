import Vue from 'vue'
import App from './App'

import '@/styles/index.less'
Vue.config.productionTip = false
import './directives'

new Vue({
  render: (h) => h(App),
}).$mount('#app');
