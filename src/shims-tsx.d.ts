import Vue, { VNode } from 'vue'
import T from '../packages'

declare global {
  interface Window  {
    T: typeof T
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
