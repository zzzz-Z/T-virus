import { h, defineComponent, reactive, watch } from 'vue'

export default defineComponent({
  name: 'VSwitch',
  props: {
    value: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: String,
    checkedText: [String, Object],
    unCheckedText: [String, Object]
  },
  setup(props, { emit, slots }) {
    const state = reactive({ checkStatus: props.value })

    watch(
      () => props.value,
      val => {
        state.checkStatus = val
      }
    )

    const toggle = () => {
      if (props.disabled) return
      state.checkStatus = !state.checkStatus
      emit('change', state.checkStatus)
      emit('input', state.checkStatus)
    }
    const checkedText =
      props.checkedText || (slots.checkedText && slots.checkedText())
    const unCheckedText =
      props.checkedText || (slots.checkedText && slots.checkedText())

    return () =>
      h(
        'span',
        {
          onClick: toggle,
          class: [
            'v-switch',
            {
              [`v-switch--${props.size}`]: props.size,
              'v-switch--disabled': props.disabled,
              'v-switch--checked': state.checkStatus
            }
          ]
        },
        h(
          'span',
          { class: 'v-switch__text' },
          state.checkStatus ? checkedText : unCheckedText
        )
      )
  }
})
