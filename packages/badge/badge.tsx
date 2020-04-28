import { h, defineComponent, PropType } from 'vue'
import { withVshow } from '../utils/directives'


export default defineComponent({
  name: 'VBadge',
  props: {
    value: { type: [String, Number], default: '' },
    maxNum: { type: Number, default: 99 },
    dot: { type: Boolean, default: false } as any as PropType<boolean>,
    show: { type: Boolean, default: true } as any as PropType<boolean>,
    status: { type: String, default: 'error' }
  },
  setup(props, { slots }) {
    const prefix = 'v-badge'

    return () => {
      const { value, maxNum, status, dot, show } = props

      const content =
        typeof value === 'number' && typeof maxNum === 'number'
          ? value > maxNum
            ? `${maxNum}+`
            : value
          : value

      const contentProps: any = {
        class: [
          prefix + '__content',
          {
            [prefix + '--corner']: slots.default,
            [prefix + '--dot']: dot
          }
        ]
      }

      const badgeProps = {
        class: [
          prefix,
          {
            [`${prefix}--${status}`]: status,
            [prefix + '--alone']: !slots.default
          }
        ]
      }

      return h('span', badgeProps, [
        slots.default?.(),
        withVshow(h('sup', contentProps, dot ? '' : content), !!show)
      ])
    }
  }
})
