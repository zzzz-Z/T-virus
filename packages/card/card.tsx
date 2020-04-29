import { defineComponent, PropType, VNode, h } from 'vue'
import { withVif } from '../utils/directives'

export default defineComponent({
  name: 'VCard',
  props: {
    border: { type: Boolean, default: true },
    disHover: Boolean,
    padding: { type: Number, default: 16 },
    title: [String, Object] as PropType<string | VNode>,
    extra: [String, Object] as PropType<string | VNode>,
    bodyStyle: Object,
  },
  setup(props, { slots }) {
    return () => {
      const { border, title, disHover, extra, bodyStyle: style } = props
      const TitleSlot = title || slots.title?.()
      const ExtraSlot = extra || slots.extra?.()
      const Body = h('div', { style, class: 'v-card__body' }, slots.default?.())
      const Header = withVif(
        h('div', { class: 'v-card__head' }, [
          withVif(h('div', { class: 'v-card__title' }, TitleSlot), TitleSlot),
          withVif(h('div', { class: 'v-card__title' }, ExtraSlot), ExtraSlot),
        ]),
        TitleSlot || ExtraSlot
      )

      return h(
        'div',
        {
          class: [`v-card`, { 'v-card--bordered': border, 'v-card--no-hover': disHover }],
        },
        [Header, Body]
      )
    }
  },
})
