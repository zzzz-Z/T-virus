import vCBreadcrumb from './breadcrumb'
import vCBreadcrumbItem from './breadcrumb-item'

import { App } from 'next-vue'

/** Breadcrumb */
const Breadcrumb = vCBreadcrumb
;(Breadcrumb as any).install = (app: App) => {
  app.component('V' + Breadcrumb.name, Breadcrumb as any)
}

const BreadcrumbItem = vCBreadcrumbItem
;(BreadcrumbItem as any).install = (app: App) => {
  app.component('V' + BreadcrumbItem.name, BreadcrumbItem as any)
}

export { BreadcrumbItem }
export default Breadcrumb
