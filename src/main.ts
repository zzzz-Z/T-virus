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

// import Bpp from './a';
// // tslint:disable-next-line: no-var-requires
// const { createApp, h } = require('../../vue-next/packages/runtime-dom/dist/runtime-dom.esm-browser.prod');

// (window as any).h = h

// const App = createApp()
// App.mount({ render: () => h(Bpp) }, '#app')
