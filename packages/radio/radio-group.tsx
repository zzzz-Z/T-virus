import { defineComponent, watch, h, provide, reactive, onMounted } from 'vue'
import { runSlot } from '../utils/runSlot'

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
    const radios = reactive<any[]>([])
    provide('group', {
      radios,
      props,
      setModel: (val: string | number) => {
        emit('change', val)
        emit('input', val)
      }
    })

    return () => h('div', { class: 'v-radio-group' }, runSlot(slots.default))
  }
})
