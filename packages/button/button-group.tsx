import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'VButtonGroup',
  props: {
    size: String,
    gap: { type: Number, default: -1 },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: ['v-btn-group', props.size ? `v-btn-group--${props.size}` : ''],
        },
        slots.default?.()
      )
  },
})
