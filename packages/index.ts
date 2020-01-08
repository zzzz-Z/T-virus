// import './theme/index.scss'
import * as components from './components'

export * from './components'

export default {
  ...components,
  install: (App: any) => {
    Object.values(components).forEach(component => {
      App.component(component.name, component)
    })
  }
}
