import { defineComponent, reactive, watch, h, inject, onMounted } from 'vue'
import { runSlot } from '../utils/runSlot'

const prefix = 'v-radio'

export const radioProps = {
  value: [String, Number],
  name: String,
  disabled: Boolean
}

export default defineComponent({
  name: 'Radio',
  inheritAttrs: false,
  props: radioProps,
  setup(props, { emit, slots, attrs }) {
    const state = reactive({
      value: props.value,
      focus: false,
      isGroup: false,
      checked: false
    })
    const group = inject<any>('group')
    const setModel = (val: any) => (state.value = val)
    const focus = (val: boolean) => (state.focus = val)
    const change = (e: InputEvent) =>
      (state.value = (e.target as HTMLInputElement).value)
    const click = (e: Event) => {
      e.stopPropagation()
      state.checked = !state.checked
    }
    onMounted(() => group.radios.push(setModel))
    watch(
      () => group.props.value,
      val => {
        state.checked = val === state.value
        console.log(state.checked)
      }
    )
    watch(
      () => state.value,
      val => {
        emit('change', val)
        group.setModel(val)
      },
      { lazy: true }
    )

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
                  [prefix + '--checked']: state.checked,
                  [prefix + '--focus']: props.disabled
                }
              ]
            }),
            h('input', {
              type: 'radio',
              'aria-hidden': true,
              class: prefix + '__original',
              checked: state.checked,
              name: props.name,
              value: props.value,
              disabled: props.disabled,
              onFocus: () => focus(true),
              onBlur: () => focus(false)
            })
          ]),
          h('span', { class: prefix + '__label' }, runSlot(slots.default))
        ]
      )
  }
})
