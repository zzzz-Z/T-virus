import { h, defineComponent, reactive, watch } from 'next-vue';

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

    watch(() => props.value, val => {
      state.checkStatus = val
    })
    
    const toggle = () => {
      if (props.disabled) return
      state.checkStatus = !state.checkStatus
      emit('change', state.checkStatus)
      emit('input', state.checkStatus)
    }

    return () => h(
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
        state.checkStatus
          ? props.checkedText || slots.checkedText?.()
          : props.unCheckedText || slots.unCheckedText?.()
      )
    )
  }
})