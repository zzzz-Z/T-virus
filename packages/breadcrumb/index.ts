import vCBreadcrumb from './breadcrumb'
import vCBreadcrumbItem from './breadcrumb-item'

import { App } from 'vue'

/** Breadcrumb */
const Breadcrumb = vCBreadcrumb
;(Breadcrumb as any).install = (app: App) => {
  app.component(Breadcrumb.name, Breadcrumb as any)
}

const BreadcrumbItem = vCBreadcrumbItem
;(BreadcrumbItem as any).install = (app: App) => {
  app.component(BreadcrumbItem.name, BreadcrumbItem as any)
}

export { BreadcrumbItem }
export default Breadcrumb
