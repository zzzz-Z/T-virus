import vcTag from './tag'
import { App } from 'next-vue'

const Tag = vcTag
;(Tag as any).install = (app: App) => {
  app.component('V' + Tag.name, Tag as any)
}

export default Tag
