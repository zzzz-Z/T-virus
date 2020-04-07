import vcRadio from './radio'
import { App } from 'vue'
import vcRadioGroup from '../radio/radio-group'

/**
 *  @see [`docs`](https://baidu.com)
 *
 * `props`
 * ```
 
 * ```
 */
const Radio = vcRadio
;(Radio as any).install = (app: App) => {
  app.component(Radio.name, Radio as any)
}
/**
 *  @see [`docs`](https://baidu.com)
 *
 * `props`
 * ```
 
 * ```
 */
const RadioGroup = vcRadioGroup
;(RadioGroup as any).install = (app: App) => {
  app.component(RadioGroup.name, RadioGroup as any)
}

export { RadioGroup }
export default Radio
