// import './theme/index.scss'
import * as components from './components'
import { App } from 'vue'

export * from './components'

export default {
  ...components,
  install: (App: App) => {
    Object.values(components).forEach(component => {
      App.component(component.name, component)
    })
  }
}
