import vcButton from './button'
import vcButtonGroup from './button-group'
import { App } from 'vue'

/**
 *  @see [`docs`](https://baidu.com)
 *
 * `props`
 * ```
 
 * ```
 */
const Button = vcButton
;(Button as any).install = (app: App) => {
  app.component(Button.name, Button as any)
}
/**
 *  @see [`docs`](https://baidu.com)
 *
 * `props`
 * ```
 
 * ```
 */
const ButtonGroup = vcButtonGroup
;(ButtonGroup as any).install = (app: App) => {
  app.component(ButtonGroup.name, ButtonGroup as any)
}
export { ButtonGroup }
export default Button
