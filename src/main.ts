import Vue from 'vue'
import App from './App'
import '../package/styles/index.less'
import 'highlight.js/styles/github.css'
import T from '../package/components'
import CodeBox from '@/components/codeBox.vue'
import { createComponent } from './createComponent'

Vue.config.productionTip = false

window.T = T
window.createComponent = createComponent

Vue.component('code-box', CodeBox)

new Vue({
  render: (h) => h(App)
}).$mount('#app')

