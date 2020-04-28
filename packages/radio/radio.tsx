import {
  defineComponent,
  reactive,
  watch,
  h,
  inject,
  ref,
  computed
} from 'vue'


const prefix = 'v-radio'

export const radioProps = {
  value: [String, Number],
  name: String,
  disabled: Boolean
}

export default defineComponent({
  name: 'VRadio',
  inheritAttrs: false,
  props: radioProps,
  setup(props, { emit, slots, attrs }) {
    const state = reactive({
      value: props.value,
      focus: false,
      isGroup: false,
      checked: false
    })
    const radio = ref<HTMLInputElement | null>(null)
    const radioGroup = inject<any>('radioGroup')
    const isChecked = computed(
      () => (radioGroup ? state.value == radioGroup.state.model : state.checked)
    )
    const focus = () => {
      state.focus = true
      radio.value?.focus()
    }
    const blur = () => {
      state.focus = false
      radio.value?.blur()
    }
    const change = (val: any) => {
      radioGroup ? radioGroup.change(val) : emit('change', val)
    }
    const click = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      if (radioGroup) {
        radioGroup.state.model = state.value
      } else {
        state.checked = true
      }
    }

    watch(() => state.value, change)

    return () =>
      h(
        'label',
        {
          style: attrs.style,
          class: [prefix, attrs.class],
          onClick: click
        },
        [
          h('span', { class: prefix + '__input' }, [
            h('span', {
              class: [
                prefix + '__inner',
                {
                  [prefix + '--focus']: props.disabled,
                  [prefix + '--checked']: isChecked.value,
                  [prefix + '--focus']: props.disabled
                }
              ]
            }),
            h('input', {
              type: 'radio',
              ref: radio,
              'aria-hidden': true,
              class: prefix + '__original',
              checked: isChecked.value,
              name: props.name,
              value: props.value,
              disabled: props.disabled,
              onFocus: focus,
              onBlur: blur
              // onChange: change
            })
          ]),
          h('span', { class: prefix + '__label' }, slots.default?.())
        ]
      )
  }
})
