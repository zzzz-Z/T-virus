import {
  h,
  defineComponent,
  reactive,
  computed,
  inject,
  getCurrentInstance,
  ref,
  PropType,
  VNode
} from 'vue'
import { getParent } from '../utils/getParent'
import { runSlot } from '../utils/runSlot'
interface Parent {
  onOptionSelect: (...args: any[]) => void
}
const Option = defineComponent({
  name: 'VOption',
  props: {
    value: { type: [String, Number], required: true },
    label: [String, Object] as PropType<string | VNode>,
    disabled: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance()!
    const select = inject<Record<string, any>>('select')!
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
      [prefix + '--focus']: state.isFocus
    }))

    const parent = getParent<Parent>('select', {
      state,
      handleSelect,
      queryChange,
      blur,
      value: props.value,
      label: props.label
    })

    function handleSelect() {
      if (props.disabled) return false
      parent && parent.onOptionSelect(props.value, props.label)
    }

    function blur() {
      state.isFocus = false
    }

    function queryChange(val: string, index: number) {
      state.hidden =
        val == '' ? false : (props.label as string).indexOf(val) == -1
    }

    return () =>
      h(
        'li',
        {
          style: { display: state.hidden ? 'none' : 'block' },
          class: classs.value,
          onClick: handleSelect,
          onMouseout: blur,
          ref: option
        },
        [
          runSlot(slots.default) || props.label,
          state.selected ? h('i', { class: 'icon icon-check' }) : null
        ]
      )
  }
})

export default Option
