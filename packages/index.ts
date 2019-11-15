import 'at-ui-style/css/at.css'
import * as components from './components'

export * from './components'

export default {
  ...components,
  install: (App: any) => {
    Object.values(components).forEach(component => {
      App.component('V' + component.name, component)
    })
  }
}
