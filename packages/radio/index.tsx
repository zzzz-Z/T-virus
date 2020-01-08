import vcRadio from './radio'
import { App } from 'vue'
import vcRadioGroup from '../radio/radio-group'

const Radio = vcRadio
;(Radio as any).install = (app: App) => {
  app.component('V' + Radio.name, Radio as any)
}

const RadioGroup = vcRadioGroup
;(RadioGroup as any).install = (app: App) => {
  app.component('V' + RadioGroup.name, RadioGroup as any)
}

export { RadioGroup }
export default Radio
