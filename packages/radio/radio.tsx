import {
  defineComponent,
  reactive,
  watch,
  h,
  inject,
  onMounted,
  getCurrentInstance,
} from 'next-vue'

const prefix = 'v-radio'

export const radioProps = {
  value: [String, Number],
  name: String,
  label: { type: [String, Number], required: true },
  disabled: Boolean
}

export default defineComponent({
  name: 'Radio',
  inheritAttrs: false,
  props: radioProps,
  setup(props, { emit, slots, attrs }) {
    const group = inject<any>('group')
    const state = reactive({
      value: props.value,
      focus: false,
      isGroup: false,
    })
    const vm = getCurrentInstance()
    onMounted(() => {
      group.radios.push((val) => state.value = val)
    })

    watch(
      () => props.value,
      val => state.value = val
    )
    
    watch(
      () => state.value,
      val => {
        emit('input', val)
        group.input(val)
      }
    )

  
    function focus(focus: boolean) {
      state.focus = focus
    }

    return () => h(
      'label',
      {
        style: attrs.style,
        class: [prefix, attrs.class],
      },
      [
        h('span', { class: prefix + '__input' },
          [
            h('span', {
              class: [
                prefix + '__inner',
                {
                  [prefix + '--focus']: props.disabled,
                  [prefix + '--checked']: state.value == props.label,
                  [prefix + '--focus']: props.disabled,
                }
              ]
            }),
            h('input', {
              type: "radio",
              'aria-hidden': true,
              class: prefix + "__original",
              name: props.name,
              value: props.label,
              disabled: props.disabled,
              onFocus: () => focus(true),
              onBlur: () => focus(false),
              onChange: (e: InputEvent) => state.value = (e.target as any).value
            })
          ]
        ),
        h('span', { class: prefix + "__label" }, slots.default?.())
      ]

    )
  }
})
