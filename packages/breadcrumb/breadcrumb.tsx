import { h, defineComponent, provide, reactive } from 'vue'
import { runSlot } from '../utils/runSlot'

export default defineComponent({
  name: 'VBreadcrumb',
  props: {
    separator: { type: [String, Object], default: '/' }
  },
  setup(props, { slots }) {
    provide(
      'breadcrumb',
      reactive({
        separator: slots.separator || (() => props.separator)
      })
    )
    return () => h('div', { class: 'v-breadcrumb' }, runSlot(slots.default))
  }
})
