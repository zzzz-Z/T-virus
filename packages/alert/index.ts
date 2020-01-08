import vcTAlert from './alert'
import { App } from 'vue'

const Alert = vcTAlert
;(Alert as any).install = (app: App) => {
  app.component(Alert.name, Alert as any)
}

export default Alert
