import vcRadio from './radio'
import { App } from 'next-vue'

const Radio = vcRadio
;(Radio as any).install = (app: App) => {
  app.component('V' + Radio.name, Radio as any)
}

export default Radio
