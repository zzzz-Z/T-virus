import { ButtonProps } from './type'
import Icon from '../icon'

const { createComponent, h } = window.Vue

const buttonProps: any = {
  shape: String,
  loading: Boolean,
  disabled: Boolean,
  type: { type: String, default: 'default' },
  size: { type: String, default: 'default' },
  htmlType: { type: String, default: 'button' },
  icon: { type: String, default: '' },
  long: { type: Boolean, default: false },
  ghost: { type: Boolean, default: false }
}

const Button = createComponent({
  name: 'Button',
  props: buttonProps,
  setup: (props: ButtonProps, { slots }) => () => {
    const { type, long, shape, size, loading, icon, ghost } = props
    const cls = [
      `t-btn`,
      `t-btn-${type}`,
      {
        [`t-btn-long`]: long,
        [`t-btn-${shape}`]: !!shape,
        [`t-btn-${size}`]: size !== 'default',
        [`t-btn-loading`]: loading,
        [`t-btn-icon-only`]: icon || loading,
        [`t-btn-ghost`]: ghost
      }
    ]
    const loadingProps = { type: 'loading', class: 't-load-loop' }

    const defSlot = slots.default && h('span', slots.default())
    const iconSlot = icon && !loading && h(Icon, { type: icon })
    const loadingSlot = loading ? h(Icon, loadingProps) : null

    const data = { ...props, class: cls }

    return h('button', data, [iconSlot, loadingSlot, defSlot])
  }
})

export default Button
