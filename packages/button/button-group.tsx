import { defineComponent, h } from 'vue'
import { runSlot } from 'packages/utils/runSlot'

export default defineComponent({
  name: 'VButtonGroup',
  props: {
    size: String,
    gap: { type: Number, default: -1 }
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: ['v-btn-group', props.size ? `v-btn-group--${props.size}` : '']
        },
        runSlot(slots.default)
      )
  }
})
