// @ts-ignore
import * as Vue from '../../vue-next/packages/vue/dist/vue.esm-browser'
import VueApi from '../../vue-next/packages/vue'

if (window && !window.Vue) {
  window.Vue = Vue
}

export default Vue as typeof VueApi
