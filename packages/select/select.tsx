import {
  computed,
  defineComponent,
  h,
  onMounted,
  reactive,
  ref,
  Transition,
  VNode,
  watch,
  inject,
  getCurrentInstance,
  ComponentInternalInstance,
  provide
} from 'vue'
import { withVshow, withClickoutside, withVif } from '../utils/directives'
import { FormItemInstance } from 'packages/form/formItem'
import { OptionInstance } from './option'
import { isString, isNumber, isArray } from 'packages/utils/util'

export interface SelectIntance extends ComponentInternalInstance {
  onOptionSelect(val: string | number, label: unknown): void
  options: OptionInstance[]
}

export const SelectInjectKey = Symbol('Select')
const selectProps = {
  value: { type: [String, Number, Array], default: '' },
  trigger: { type: String, default: 'click' },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  placeholder: { type: String },
  filterable: { type: Boolean, default: false },
  size: { type: String, default: 'normal' },
  notFoundText: { type: String, default: 'notfound' },
  placement: { type: String, default: 'bottom' }
}


const Select = defineComponent({
  name: 'VSelect',
  props: selectProps,
  emits: ['input', 'change'],
  setup(props, { emit, slots, attrs }) {
    const state = reactive({
      visible: false,
      selectedSingle: '',
      selectedMultiple: [] as OptionInstance[],
      focusIndex: 0,
      query: '',
      model: props.value
    })
    const inputEl = ref<HTMLInputElement | null>(null)
    const popoverEl = ref<HTMLLIElement | null>(null)
    const showPlaceholder = computed(() => {
      const hasArrVal = Array.isArray(state.model) && !state.model.length
      return state.model === '' || hasArrVal
    })
    const showCloseIcon = computed(
      () => !props.multiple && props.clearable && !showPlaceholder.value
    )
    const formItem = inject<FormItemInstance>('formItem')
    const instance = getCurrentInstance() as SelectIntance
    const options: OptionInstance[] = []
    instance.onOptionSelect = onOptionSelect
    instance.options = options
    provide(SelectInjectKey, instance)
    onMounted(() => setSelected())
    watch(() => props.value, valueChange)
    watch(() => state.model, modelChange, { deep: true })
    watch(() => state.visible, visibleChange)
    watch(() => state.query, selectFirstOption)

    function valueChange(val: any) {
      state.model = val
      val === '' && (state.query = '')
    }

    function modelChange(val: unknown) {
      emit('input', val)
      setSelected()
      props.multiple ? updateMultipleSelected() : updateSingleSelected()
    }

    function visibleChange(val: boolean) {
      if (val) {
        if (props.multiple && props.filterable) {
          inputEl.value!.focus()
        } else if (props.filterable) {
          inputEl.value!.select()
          selectFirstOption()
        }
      } else {
        if (props.filterable) {
          inputEl.value!.blur()
        }
      }
    }

    function notFound() {
      let show = true
      options.find(option => {
        if (!option.state.hidden) {
          show = false
        }
      })
      return show
    }

    /** option 被选中时触发 */
    function onOptionSelect(val: string | number, label: string) {
      if (props.multiple) {
        let model = state.model as any[]
        const index = model.indexOf(val)
        if (index > -1) {
          removeTag(index)
        } else {
          model.push(val)
        }
        if (props.filterable) {
          state.query = ''
          inputEl.value!.focus()
        }
      } else {
        state.model = val
        state.query = label
        hideMenu()
      }
    }

    function toggleMenu() {
      if (props.disabled) return
      state.visible = !state.visible
    }

    function hideMenu() {
      state.visible = false
      state.focusIndex = 0
    }

    function handleKeydown(evt: KeyboardEvent) {
      if (state.visible) {
        const keyCode = evt.keyCode

        if (keyCode === 27) {
          // escape
          evt.preventDefault()
          hideMenu()
        } else if (keyCode === 40) {
          // down arrow
          evt.preventDefault()
          navigateOptions('next')
        } else if (keyCode === 38) {
          // up arrow
          evt.preventDefault()
          navigateOptions('prev')
        } else if (keyCode === 13) {
          // enter
          evt.preventDefault()

          let hasFocus = false

          options.forEach(option => {
            if (option.state.isFocus) {
              hasFocus = true
              option.handleSelect()
            }
          })

          if (!hasFocus) {
            selectFirstOption()
          }
        }
      }
    }

    function selectFirstOption() {
      if (props.filterable) {
        let hasFirst = false
        options.forEach((option, n) => {
          option.queryChange(state.query)
          if (!hasFirst && !option.state.hidden) {
            hasFirst = true
            option.state.isFocus = true
            state.focusIndex = n + 1
          } else {
            option.state.isFocus = false
          }
        })
      }
    }

    function clearSingleSelect(e: Event) {
      e.stopPropagation()
      if (showCloseIcon.value) {
        options.forEach((option) => {
          option.state.selected = false
          option.state.isFocus = false
        })
        state.model = ''
        state.query = ''
      }
    }

    function removeTag(index: number) {
      if (props.disabled) {
        return false
      }
      ; (state.model as any[]).splice(index, 1)

      if (props.filterable && state.visible) {
        inputEl.value!.focus()
      }
    }

    function updateSingleSelected() {
      let { model } = state
      if (isString(model) || isNumber(model)) {
        options.find(({ propsProxy }) => {
          if (model === propsProxy.value) {
            state.selectedSingle = propsProxy.label
          }
        })

      }
      toggleSingleSelected(model)
    }

    function updateMultipleSelected() {
      if (props.multiple && isArray(state.model)) {
        const selected: OptionInstance[] = []
        state.model.forEach(val => {
          options.forEach(option => {
            if (val === option.propsProxy.value) {
              selected.push(option)
            }
          })
        })

        state.selectedMultiple = selected
      }
      toggleMultipleSelected()
    }

    function toggleSingleSelected(val: unknown) {
      if (props.multiple) return

      options.forEach(option => {
        option.state.selected = option.propsProxy.value === val
      })
      hideMenu()

      emit('change', val)
      formItem?.onFieldChange()
    }

    function toggleMultipleSelected() {
      if (!props.multiple) return
      const { model } = state
      options.forEach(({ propsProxy, state: optState }) => {
        optState.selected = (model as any[]).includes(propsProxy.value)
      })

      emit('change', model)
      formItem?.onFieldChange()
    }

    function navigateOptions(direction: string) {
      if (direction === 'next') {
        const next = state.focusIndex + 1
        state.focusIndex = state.focusIndex === options.length ? 1 : next
      } else if (direction === 'prev') {
        const prev = state.focusIndex - 1
        state.focusIndex = state.focusIndex <= 1 ? options.length : prev
      }
      let isValid = false
      let hasValidOption = false // avoid infinite loops

      options.forEach((option, idx) => {
        if (idx + 1 === state.focusIndex) {
          isValid = !option.state.disabled && !option.state.hidden

          if (isValid) {
            option.state.isFocus = true
          }
        } else {
          option.state.isFocus = false
        }

        if (!option.state.hidden && !option.state.disabled) {
          hasValidOption = true
        }
      })

      if (!isValid && hasValidOption) {
        navigateOptions(direction)
      }

      resetScrollTop()
    }

    function resetScrollTop() {
      const index = state.focusIndex - 1
      const bottomOverflowDistance =
        options[index].vnode.el?.getBoundingClientRect().bottom -
        popoverEl.value!.getBoundingClientRect().bottom

      if (bottomOverflowDistance) {
        popoverEl.value!.scrollTop += bottomOverflowDistance
      }
    }

    // function focus() {
    //   inputEl.value!.select()
    // }

    function blur() {
      inputEl.value!.blur()
    }

    function handleInputDelete(e: KeyboardEvent) {
      if (e.keyCode === 8) {
        const model = state.model as any[]
        if (props.multiple && model.length && state.query === '') {
          removeTag(model.length - 1)
        }
      }
    }

    function setSelected() {
      if (!props.multiple) {
        options.forEach(option => {
          if (state.model === option.propsProxy.value) {
            option.state.selected = true
            state.query = option.propsProxy.label as string
          }
        })
      } else {
        if (isArray(props.value)) {
          props.value.forEach(v => {
            options.forEach(option => {
              if (v === option.propsProxy.value) {
                option.state.selected = true
                state.selectedMultiple.push(option)
              }
            })
          })

        }
      }
    }

    function renderMultipleTags() {
      return state.selectedMultiple.map((item, index) => {
        return h('span', { class: 'v-tag' }, [
          h('span', { class: 'v-tag__text' }, item.propsProxy.label),
          h('i', {
            class: 'icon icon-x v-tag__close',
            onClick: (e: Event) => {
              e.stopPropagation()
              removeTag(index)
            }
          })
        ])
      })
    }

    function renderInput() {
      return !props.filterable
        ? h('span', { class: 'v-select__selected' }, state.query)
        : h('input', {
          value: state.query,
          type: 'text',
          class: 'v-select__input',
          placeholder: showPlaceholder.value ? props.placeholder : '',
          onBlur: blur,
          onInput: (e: InputEvent) => (state.query = (e.target as any).value),
          onKeydown: handleInputDelete,
          ref: inputEl
        })
    }

    function renderSelection() {
      const selectionProps = {
        class: 'v-select__selection',
        onClick: toggleMenu
      }

      const placeholder = withVif(
        h('span', { class: 'v-select__placeholder' }, props.placeholder),
        showPlaceholder.value && !props.filterable
      )

      const clear = withVif(
        h('i', {
          class: 'icon icon-x v-select__clear',
          onClick: clearSingleSelect
        }),
        showCloseIcon.value
      )

      const arrow = h('i', { class: 'icon icon-chevron-down v-select__arrow' })

      return h('div',
        selectionProps,
        [
          renderMultipleTags(),
          placeholder,
          renderInput(),
          arrow,
          clear
        ])
    }

    function renderDropdown() {
      const { placement, notFoundText } = props
      const preClass = 'v-select__dropdown'
      const wapper = (child: VNode, show: boolean) => {
        return withVshow(h('ul', {
          class: notFound()
            ? 'v-select__not-found'
            : 'v-select__list'
        }, child), show)
      }

      const noOption = wapper(h('li', notFoundText), notFound())
      const hasOption = wapper(h('li', slots.default?.()), !notFound())
      const dropDwonProps = {
        ref: popoverEl,
        class: [
          preClass,
          placement ? `${preClass}--${placement}` : `${preClass}--bottom`
        ]
      }
      return h(Transition, { name: 'slide-up' }, () =>
        withVshow(h('div', dropDwonProps, [noOption, hasOption]), state.visible)
      )
    }

    return () => withClickoutside(
      h(
        'div', {
        class: ['v-select', {
          'v-select--visible': state.visible,
          'v-select--disabled': props.disabled,
          'v-select--multiple': props.multiple,
          'v-select--single': !props.multiple,
          'v-select--show-clear': showCloseIcon.value,
          [`v-select--${props.size}`]: !!props.size
        }
        ],
        onKeydown: handleKeydown
      },
        [renderSelection(), renderDropdown()]
      ),
      hideMenu
    )
  }
})

export default Select
