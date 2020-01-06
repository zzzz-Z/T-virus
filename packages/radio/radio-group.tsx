import {
  defineComponent,
  watch,
  h,
  provide,
  reactive,
  onMounted,
} from 'next-vue'


export const radioProps = {
  value: [String, Number],
  size: String,
  fill: String,
  textColor: String
}

export default defineComponent({
  name: 'RadioGroup',
  inheritAttrs: false,
  props: radioProps,
  setup(props, { emit, slots }) {
    const radios = reactive<any[]>([])
    provide('group', {
      radios,
      input: val => {
        emit('input', val)
      }
    })
    watch(
      () => props.value,
      val => {
        emit('input', val)
        radios.forEach(setVal => setVal(val))
      }
    )

    return () => h(
      'div',
      { class: 'v-radio-group' },
      slots.default?.()
    )
  }
})
