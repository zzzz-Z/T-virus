import vcRow from './row'
import { App } from 'vue'

const Row = vcRow
;(Row as any).install = (app: App) => {
  app.component(Row.name, Row as any)
}

export default Row
