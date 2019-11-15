import { createComponent, PropType, VNode, h } from 'vue3'

export default createComponent({
  name: 'Card',
  props: {
    border: { type: Boolean, default: true }, //是否显示边框
    disHover: Boolean, //禁用鼠标悬停显示阴影
    padding: { type: Number, default: 16 },
    title: [String, Object] as PropType<string | VNode>,
    extra: [String, Object] as PropType<string | VNode>,
    bodyStyle: Object
  },
  setup(props, { slots }) {
    return () => {
      const { border, title, disHover, extra, bodyStyle: style } = props

      const DefSolot = slots.default && slots.default()
      const TitleSlot = title || (slots.title && slots.title())
      const ExtraSlot = extra || (slots.extra && slots.extra())

      const Body = h('div', { style, class: 'at-card__body' }, DefSolot)

      const Header =
        (TitleSlot || ExtraSlot) &&
        h('div', { class: 'at-card__head' }, [
          TitleSlot && h('div', { class: 'at-card__title' }, TitleSlot),
          ExtraSlot && h('div', { class: 'at-card__extra' }, ExtraSlot)
        ])

      const klass = [
        `at-card`,
        {
          'at-card--bordered': border,
          'at-card--no-hover': disHover
        }
      ]

      return h('div', { class: klass }, [Header, Body])
    }
  }
})
