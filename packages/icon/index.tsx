import { defineComponent, h } from 'vue'

const Icon = defineComponent({
  name: 'Icon',
  props: {
    type: { type: String, default: '' },
    size: [Number, String],
    color: String,
    custom: { type: String, default: '' }
  },
  setup: props => () => {
    const { color, size, type, custom } = props
    const cls = [
      `t-icon`,
      { [`t-icon-${type}`]: type !== '', [`${custom}`]: custom !== '' }
    ]
    const attrs = {
      ...props,
      class: cls,
      style: { fontSize: size && `${size}px`, color: color && `${color}px` }
    }
    return h('i', attrs)
  }
})

export default Icon
