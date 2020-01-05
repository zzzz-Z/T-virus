import { defineComponent, PropType, VNode, h } from 'next-vue'

export default defineComponent({
  name: 'Card',
  props: {
    border: { type: Boolean, default: true },
    disHover: Boolean,
    padding: { type: Number, default: 16 },
    title: [String, Object] as PropType<string | VNode>,
    extra: [String, Object] as PropType<string | VNode>,
    bodyStyle: Object
  },
  setup(props, { slots }) {
    return () => {
      const { border, title, disHover, extra, bodyStyle: style } = props
      const DefSolot = slots.default && slots.default()
      const TitleSlot = title || slots.title?.()
      const ExtraSlot = extra || slots.extra?.()
      const Body = h('div', { style, class: 'v-card__body' }, DefSolot)
      const Header =
        (TitleSlot || ExtraSlot) &&
        h('div', { class: 'v-card__head' }, [
          TitleSlot && h('div', { class: 'v-card__title' }, TitleSlot),
          ExtraSlot && h('div', { class: 'v-card__extra' }, ExtraSlot)
        ])

      const classs = [
        `v-card`,
        {
          'v-card--bordered': border,
          'v-card--no-hover': disHover
        }
      ]

      return h('div', { class: classs }, [Header, Body])
    }
  }
})
