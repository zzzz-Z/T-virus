import '../packages/styles/index.less'
import '@/assets/md.css'
import Vue from 'vue'
import App from './App'
import CodeBox from '@/components/codeBox.vue'


Vue.config.productionTip = false

Vue.component('code-box', CodeBox)

new Vue({
  render: (h) => h(App as any)
}).$mount('#app')

