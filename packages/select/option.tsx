import {
  h,
  defineComponent,
  reactive,
  computed,
  onMounted,
  inject,
  onUnmounted,
  getCurrentInstance,
  ref,
  PropType,
  VNode
} from 'next-vue'

const Option = defineComponent({
  name: 'Option',
  props: {
    value: { type: [String, Number], required: true },
    label: [String, Object] as PropType<string | VNode>,
    disabled: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance()!
    const select = inject<Record<string, any>>('Select')!
    const state = reactive({
      id: 0,
      selected: false,
      index: 0,
      isFocus: false,
      hidden: false,
      disabled: props.disabled
    })
    const option = ref<HTMLLIElement | null>(null)
    const prefix = 'v-select__option'
    const classs = computed(() => ({
      [prefix]: true,
      [prefix + '--disabled']: props.disabled,
      [prefix + '--selected']: state.selected,
      [prefix + '--focus']: state.isFocus,
    })
    )

    function handleSelect() {
      if (props.disabled) return false
      select.onOptionSelect(props.value, props.label)
    }

    function blur() {
      state.isFocus = false
    }

    function queryChange(val: string, index: number) {
      state.hidden = val == '' ? false : (props.label as string).indexOf(val) == -1
    }

    onMounted(() => {
      if (select) {
        select.state.options.push({
          el: vm.vnode.el,
          state,
          handleSelect,
          queryChange,
          blur,
          value: props.value,
          label: props.label
        })
      }
    })

    onUnmounted(() => {
      ; (select.state.options as any[]).forEach((option, index) => {
        if (option.el === vm.vnode.el) {
          select.state.options.splice(index, 1)
        }
      })
    })

    return () => h(
      'li',
      {
        style: { display: state.hidden ? 'none' : 'block' },
        class: classs.value,
        onClick: handleSelect,
        onMouseout: blur,
        ref: option
      },
      [
        slots.default?.() || props.label,
        state.selected ? h('i', { class: 'icon icon-check'}) : null
      ]
    )
  }
})

export default Option
