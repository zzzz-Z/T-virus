import { h, defineComponent, provide, inject } from 'vue'
import { runSlot } from '../utils/runSlot'

export default defineComponent({
  name: 'BreadcrumbItem',
  props: {
    href: String,
    to: {
      type: [Object, String],
      default() {
        return {}
      }
    },
    replace: { type: Boolean, default: false }
  } as any,
  setup(props, { slots }) {
    const parent: any = inject('breadcrumb')
    const handleClick = () => {
      const { href, to } = props
      if (href) {
        window.location.href = href
      } else {
        // wati router to do
      }
    }
    return () =>
      h('span', { class: 'v-breadcrumb__item' }, [
        props.href || Object.keys(props.to).length
          ? h(
              'a',
              { class: 'v-breadcrumb__link', onClick: handleClick },
              runSlot(slots.default)
            )
          : h('span', { class: 'v-breadcrumb__text' }, runSlot(slots.default)),
        h('span', { class: 'v-breadcrumb__separator' }, parent.separator())
      ])
  }
})
