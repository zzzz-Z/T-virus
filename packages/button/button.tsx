import { ButtonProps } from './type'
import { defineComponent, h } from 'vue'
import { withVif } from '../utils/directives'


const buttonProps = {
  shape: String,
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  size: String,
  type: { type: String, default: 'default' },
  htmlType: { type: String, default: 'button' },
  icon: { type: String, default: '' },
  ghost: { type: Boolean, default: false }
} as any

export default defineComponent({
  name: 'VButton',
  props: buttonProps,
  setup: (props: ButtonProps, { slots, attrs }) => () => {
    const { type, size, loading, icon, ghost } = props
    const defSlot = withVif(
      h('span', { class: 'v-btn__text' }, slots.default?.()),
      slots.default
    )
    const iconSlot = withVif(
      h('i', { class: ['v-btn__icon icon', icon] }),
      icon && !loading
    )
    const loadingSlot = withVif(
      h('i', { class: 'v-btn__loading icon icon-loader' }),
      loading
    )

    return h(
      'button',
      {
        disabled: props.disabled,
        type: props.htmlType,
        style: attrs.style,
        class: [
          `v-btn`,
          {
            [`v-btn--${type}`]: type,
            [`v-btn--${size}`]: size,
            [`v-btn--loading`]: loading,
            [`v-btn--icon-only`]: icon || loading,
            [`v-btn--${type}--hollow`]: ghost
          }
        ]
      },
      [iconSlot, loadingSlot, defSlot]
    )
  }
})


