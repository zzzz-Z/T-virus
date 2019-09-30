import Vue from 'vue'
import App from './App'
import '../package/styles/index.less'
import '@/assets/md.css'
import T from '../package/components'
import CodeBox from '@/components/codeBox.vue'
Vue.config.productionTip = false


window.T = T

Vue.component('code-box', CodeBox)

new Vue({
  render: (h) => h(App as any)
}).$mount('#app')

