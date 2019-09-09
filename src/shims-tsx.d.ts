import Vue, { VNode } from 'vue'
import T from '../package/components'
import { createComponent } from './createComponent'


declare global {
  interface Window  {
    T: typeof T
    createComponent:typeof createComponent
  }
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
