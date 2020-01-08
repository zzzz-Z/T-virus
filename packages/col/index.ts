import vcCol from './col'
import { App } from 'vue'

const Col = vcCol
;(Col as any).install = (app: App) => {
  app.component(Col.name, Col as any)
}

export default Col
