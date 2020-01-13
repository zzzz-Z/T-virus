import vcCard from './card'
import { App } from 'vue'

/**
 *  @see [`docs`](https://baidu.com)
 *
 * `props`
 * ```
 *  border: { type: Boolean, default: true }, //是否显示边框
 *  disHover: { type: Boolean, default: false }, //禁用鼠标悬停显示阴影
 *  padding: { type: Number, default: 16 },
 *  title: [String, Object] as PropType<string | VNode>,
 *  extra: [String, Object] as PropType<string | VNode>,
 *  bodyStyle: Object
 * ```
 */
const Card = vcCard
;(Card as any).install = (app: App) => {
  app.component(Card.name, Card as any)
}

export default Card
