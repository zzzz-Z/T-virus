import vcTag from './tag'
import { App } from 'vue'

const Tag = vcTag
;(Tag as any).install = (app: App) => {
  app.component(Tag.name, Tag as any)
}

export default Tag
