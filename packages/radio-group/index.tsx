import vcRadioGroup from '../radio/radio-group'
import { App } from 'next-vue'

const RadioGroup = vcRadioGroup
  ; (RadioGroup as any).install = (app: App) => {
    app.component('V' + RadioGroup.name, RadioGroup as any)
  }

export default RadioGroup
