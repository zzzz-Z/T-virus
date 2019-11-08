import { IconProps } from './type'
const { createComponent, h } = window.Vue

const iconProps = {
  type: { type: String, default: '' },
  size: [Number, String],
  color: String,
  custom: { type: String, default: '' }
}

const Icon = createComponent({
  name: 'Icon',
  props: iconProps,
  setup: (props: IconProps) => () => {
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
