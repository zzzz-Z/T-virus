import {
  h,
  defineComponent,
  reactive,
  computed,
  inject,
  getCurrentInstance,
  ref,
  PropType,
  VNode,
  onMounted,
  ComponentInternalInstance,
  onUnmounted
} from 'vue'
import { SelectIntance, SelectInjectKey } from './select'
import { isString } from 'packages/utils/util'
import { Data } from 'packages/interface'

export interface OptionInstance extends ComponentInternalInstance {
  handleSelect(): void
  queryChange(val: string): void
  getQueryLabel(): string
  blur(): void
  state: Data
  propsProxy: {
    value: any
    label?: any
    disable?: boolean
  }
}
const Option = defineComponent({
  name: 'VOption',
  props: {
    value: { type: [String, Number], required: true },
    label: [String, Object] as PropType<string | VNode>,
    disabled: Boolean
  },
  setup(props, { slots }) {

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

    const selectInstance = inject<SelectIntance>(SelectInjectKey)
    const instance = getCurrentInstance() as OptionInstance
    instance.handleSelect = handleSelect
    instance.queryChange = queryChange
    instance.getQueryLabel = getQueryLabel
    instance.blur = blur
    instance.state = state
    onMounted(() => {
      selectInstance?.options.push(instance)
    })

    onUnmounted(() => {
      selectInstance?.options.splice(
        selectInstance.options.findIndex(({ uid }) => uid === instance.uid),
        1
      )
    })

    function handleSelect() {
      if (props.disabled) return false
      state.selected = !state.selected
      selectInstance?.onOptionSelect(props.value, getQueryLabel())
    }

    function blur() {
      state.isFocus = false
    }

    function getQueryLabel() {
      return isString(props.label)
        ? props.label
        : (instance.vnode.el as HTMLElement).innerText
    }

    function queryChange(val: string) {
      const label = getQueryLabel()
      state.hidden = val == '' ? false : label.indexOf(val) == -1
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
          slots.default?.() || props.label,
          state.selected ? h('i', { class: 'icon icon-check' }) : null
        ]
      )
  }
})

export default Option
