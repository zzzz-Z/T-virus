import { App } from 'vue'
import * as components from './components'

const Virus = {
  install: (App: App) => {
    Object.values(components).forEach(component => {
      App.component(component.name, component)
    })
  }
}

export * from './components'

export default Virus
