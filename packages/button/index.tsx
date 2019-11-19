import { ButtonProps } from './type'
import { createComponent, h } from 'vue3'

const buttonProps: any = {
  shape: String,
  loading: Boolean,
  disabled: Boolean,
  size: String,
  type: { type: String, default: 'default' },
  htmlType: { type: String, default: 'button' },
  icon: { type: String, default: '' },
  ghost: { type: Boolean, default: false }
}

const Button = createComponent<ButtonProps, {}, {}>({
  name: 'Button',
  props: buttonProps,
  setup: (props, { slots, attrs }) => () => {
    const { type, size, loading, icon, ghost } = props
    const cls = [
      `at-btn`,
      {
        [`at-btn--${type}`]: type,
        [`at-btn---${size}`]: size,
        [`at-btn---loading`]: loading,
        [`at-btn---icon-only`]: icon || loading,
        [`at-btn---${type}--hollow`]: ghost
      }
    ]
    const defSlot =
      slots.default && h('span', { class: 'at-btn__text' }, slots.default())
    const iconSlot =
      icon && !loading && h('i', { class: ['at-btn__icon icon', icon] })
    const loadingSlot =
      loading && h('i', { class: 'at-btn__loading icon icon-loader' })
    const data = {
      disabled: props.disabled,
      type: props.htmlType,
      style: attrs.style,
      class: cls
    }

    return h('button', data, [iconSlot, loadingSlot, defSlot])
  }
})

export default Button
