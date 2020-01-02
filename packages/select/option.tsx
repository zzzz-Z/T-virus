import {
  h,
  defineComponent,
  reactive,
  computed,
  onMounted,
  inject,
  onUnmounted,
  getCurrentInstance
} from 'next-vue'

import { select as root } from './select'

const Option = defineComponent({
  name: 'Option',
  props: {
    value: { type: [String, Number], required: true },
    label: [String, Number],
    disabled: Boolean
  },
  template: `
    <li class="at-select__option"
        :class="[
            disabled ? 'at-select__option--disabled' : '',
            selected ? 'at-select__option--selected' : '',
            isFocus ? 'at-select__option--focus' : ''
        ]"
        @click.stop="handleSelect"
        @mouseout.stop="blur"
        ref="option">
        <slot>{{ showLabel }}</slot>
    </li>
  `,
  setup(props) {
    const vm = getCurrentInstance()!
    const select: any = inject(root)
    const state = reactive({
      selected: false,
      index: 0,
      isFocus: false,
      hidden: false,
      searchLabel: '',
      disabled: props.disabled,
      showLabel: computed(() => props.label || props.value)
    })
    Object.assign(vm, {
      state,
      handleSelect,
      queryChange,
      closeSelect
    })

    function handleSelect() {
      if (props.disabled) return false
      select.onOptionSelect(props.value)
    }

    function blur() {
      state.isFocus = false
    }

    function queryChange(val: string) {
      const parsedQuery = val.replace(
        /(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g,
        '\\$1'
      )
      state.hidden = !new RegExp(parsedQuery, 'i').test(state.searchLabel)
    }

    function closeSelect() {
      state.isFocus = false
    }

    onMounted(() => {
      select.state.optionInstances.push(vm)
      select.state.options.push({
        _instance: vm,
        value: props.value,
        label: props.label || vm.vnode.el.innerText
      })
      state.searchLabel = vm.vnode.el.innerHTML
    })

    onUnmounted(() => {
      ;(select.state.options as any[]).forEach((option, index) => {
        if (option._instance === vm) {
          select.onOptionDestroy(index)
        }
      })
    })
    return {
      ...state,
      handleSelect,
      blur
    }
  }
})

export default Option
