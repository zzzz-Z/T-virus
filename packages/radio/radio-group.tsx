import { defineComponent, watch, h, provide, reactive } from 'vue'


export const radioProps = {
  value: [String, Number],
  size: String,
  fill: String,
  textColor: String
}

export default defineComponent({
  name: 'VRadioGroup',
  inheritAttrs: false,
  props: radioProps,
  setup(props, { emit, slots }) {
    const state = reactive({
      model: props.value
    })
    const change = (val: any) => {
      emit('change', val)
      emit('input', val)
    }
    provide('radioGroup', { state, props, change })
    watch(() => state.model, change, { immediate: false })
    watch(() => props.value, val => state.model = val, { immediate: false })

    return () => h('div', { class: 'v-radio-group' }, slots.default?.())
  }
})
