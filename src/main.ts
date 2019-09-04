import Vue from 'vue'
import App from './App'
// import VueCompositionApi from '@vue/composition-api'
import '../package/styles/index.less'

Vue.config.productionTip = false

// Vue.use(VueCompositionApi)

new Vue({
  render: (h) => h(App)
}).$mount('#app')

