import vcSwitch from './switch'
import { App } from 'next-vue'

const Switch = vcSwitch
;(Switch as any).install = (app: App) => {
  app.component('V' + Switch.name, Switch as any)
}

export default Switch
