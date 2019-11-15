import 'at-ui-style/css/at.css'

import * as components from './components'
export * from './components'

export default {
  ...components,
  install: (vue3: any) => {
    Object.values(components).forEach(component => {
      vue3.component(component.name, component)
    })
  }
}
