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

import { select as root } from './select'

const Option = defineComponent({
  name: 'Option',
  props: {
    value: { type: [String, Number], required: true },
    label: [String, Object] as PropType<string | VNode>,
    disabled: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance()!
    const select: any = inject(root)
    const state = reactive({
      selected: false,
      index: 0,
      isFocus: false,
      hidden: false,
      disabled: props.disabled
    })
    const option = ref<HTMLLIElement | null>(null)
    const prefix = 'at-select__option'
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

    function queryChange(val: string) {
      // const parsedQuery = val.replace(
      //   /(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g,
      //   '\\$1'
      // )
      state.hidden = val == props.label
    }

    onMounted(() => {
      if (select) {
        select.state.optionInstances.push(vm)
        select.state.options.push({
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
        if (option._instance === vm) {
          select.onOptionDestroy(index)
        }
      })
    })

    return () => h(
      'li',
      {
        style: { position: 'relative' },
        class: classs.value,
        onClick: handleSelect,
        onMouseout: blur,
        ref: option
      },
      [
        slots.default?.() || props.label,
        state.selected ? h('i', {
          class: 'icon icon-check',
          style: {
            position: 'absolute',
            right: '8px',
            color: '#1890ff',
            top: '10px',
          }
        }) : null
      ]
    )
  }
})

export default Option
