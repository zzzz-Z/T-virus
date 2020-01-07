import vcRow from './row'
import { App } from 'next-vue'

const Row = vcRow
;(Row as any).install = (app: App) => {
  app.component(Row.name, Row as any)
}

export default Row
