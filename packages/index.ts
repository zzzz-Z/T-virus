import './styles/index.less'
import * as  components from './components'
export * from './components'

export default {
  ...components,
  install: (Vue: any) => {
    Object.values(components).forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}

