import {
  h,
  defineComponent,
  reactive,
  watch,
  computed,
  ref,
  onMounted,
  provide,
  withDirectives,
} from 'next-vue'
import clickoutside from '../utils/clickoutside'

const selectProps = {
  value: { type: [String, Number, Array], default: '' },
  trigger: { type: String, default: 'click' },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  placeholder: { type: String },
  filterable: { type: Boolean, default: false },
  size: { type: String, default: 'normal' },
  notFoundText: { type: String },
  placement: { type: String, default: 'bottom' }
}

type O = Record<string, any>

const Select = defineComponent({
  name: 'Select',
  props: selectProps,
  inheritAttrs: false,
  setup(props, { emit, slots }) {
    const state = reactive({
      visible: false,
      options: [] as O[],
      selectedSingle: '',
      selectedMultiple: [] as O[],
      focusIndex: 0,
      query: '',
      notFound: false,
      model: props.value
    })
    onMounted(modelToQuery)
    provide('Select', { onOptionSelect, state })
    const inputEl = ref<HTMLInputElement | null>(null)
    const popoverEl = ref<HTMLLIElement | null>(null)
    const showCloseIcon = computed(
      () => !props.multiple && props.clearable && !showPlaceholder.value
    )
    const showPlaceholder = computed(() => {
      const hasArrVal = Array.isArray(state.model) && !state.model.length
      return state.model === '' || hasArrVal
    })
    const classs = computed(() => [
      'at-select',
      {
        'at-select--visible': state.visible,
        'at-select--disabled': props.disabled,
        'at-select--multiple': props.multiple,
        'at-select--single': !props.multiple,
        'at-select--show-clear': showCloseIcon.value,
        [`at-select--${props.size}`]: !!props.size
      }
    ])

    watch(
      () => props.value,
      val => {
        state.model = val
        val === '' && (state.query = '')
      },
      { lazy: true }
    )

    watch(
      () => state.model,
      val => {
        emit('input', val)
        modelToQuery()
        props.multiple ? updateMultipleSelected() : updateSingleSelected()
      },
      { deep: true, lazy: true }
    )

    watch(
      () => state.visible,
      val => {
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
      },
      { lazy: true }
    )

    watch(() => state.query, selectFirstOption)
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

          state.options.forEach(option => {
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
        state.options.forEach((option, n) => {
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

    function clearSingleSelect() {
      if (showCloseIcon.value) {
        state.options.forEach((option: any) => {
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
      let { model, options } = state
      const type = typeof model
      if (type === 'string' || type === 'number') {
        for (let i = 0; i < options.length; i++) {
          if (model === options[i].value) {
            state.selectedSingle = options[i].label
            break
          }
        }
      }
      toggleSingleSelected(model)
    }


    function updateMultipleSelected() {
      if (props.multiple && Array.isArray(state.model)) {
        const selected = []
        for (let i = 0; i < state.model.length; i++) {
          const model = state.model[i]

          for (let j = 0; j < state.options.length; j++) {
            const { value, label } = state.options[j]

            if (model === value) {
              selected.push({ value, label })
            }
          }
        }
        state.selectedMultiple = selected
      }
      toggleMultipleSelected()
    }

    function toggleSingleSelected(val: unknown, ) {
      if (props.multiple) return

      state.options.forEach(option => {
        const isChecked = option.value === val
        option.state.selected = isChecked
      })
      hideMenu()

      emit('change', val)
    }

    function toggleMultipleSelected() {
      if (!props.multiple) return
      const { model, options } = state
      options.forEach(({ value, state: optState }) => {
        const isChecked = (model as any[]).includes(value)
        optState.selected = isChecked
      })

      emit('change', model)
    }

    function navigateOptions(direction: string) {
      if (direction === 'next') {
        const next = state.focusIndex + 1
        state.focusIndex = state.focusIndex === state.options.length ? 1 : next
      } else if (direction === 'prev') {
        const prev = state.focusIndex - 1
        state.focusIndex = state.focusIndex <= 1 ? state.options.length : prev
      }
      let isValid = false
      let hasValidOption = false // avoid infinite loops

      state.options.forEach((option, idx) => {
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
        state.options[index].el.getBoundingClientRect().bottom -
        popoverEl.value!.getBoundingClientRect().bottom

      if (bottomOverflowDistance) {
        popoverEl.value!.scrollTop += bottomOverflowDistance
      }
    }

    function focus() {
      inputEl.value!.select()
    }

    function blur() {
      modelToQuery()
    }

    function handleInputDelete(e: KeyboardEvent) {
      if (e.keyCode === 8) {
        const model = state.model as any[]
        if (props.multiple && model.length && state.query === '') {
          removeTag(model.length - 1)
        }
      }
    }

    function modelToQuery() {
      if (
        !props.multiple &&
        props.filterable &&
        typeof state.model !== 'undefined'
      ) {
        state.options.forEach(option => {
          if (state.model === option.value) {
            state.query = option.label
          }
        })
      }
    }

    function renderMultipleTags() {
      return state.selectedMultiple.map((item, index) => {
        const tagAttrs = {
          class: 'icon icon-x at-tag__close',
          onClick: (e: Event) => {
            e.stopPropagation()
            removeTag(index)
          }
        }
        return h('span', { class: 'at-tag' }, [
          h('span', { class: 'at-tag__text' }, item.label),
          h('i', tagAttrs)
        ])
      })
    }

    function renderInput() {
      return !props.filterable
        ? h('span', { class: 'at-select__selected' }, state.query)
        : h('input', {
          value: state.query,
          type: 'text',
          class: 'at-select__input',
          placeholder: showPlaceholder.value ? props.placeholder : '',
          onBlur: blur,
          onInput: (e: InputEvent) => state.query = (e.target as any).value,
          onKeydown: handleInputDelete,
          ref: inputEl
        })
    }

    function renderSelection() {
      const selectionProps = {
        class: 'at-select__selection',
        onClick: toggleMenu
      }

      const placeholder = showPlaceholder.value && !props.filterable
        ? h('span', { class: 'at-select__placeholder' }, props.placeholder)
        : null

      const clearAttrs = {
        class: 'icon icon-x at-select__clear',
        onClick: (e: Event) => {
          e.stopPropagation()
          clearSingleSelect()
        }
      }

      const arrow = h('i', { class: 'icon icon-chevron-down at-select__arrow' })
      const clear = showCloseIcon.value ? h('i', clearAttrs) : null

      return h('div', selectionProps, [
        renderMultipleTags(),
        placeholder,
        renderInput(),
        arrow,
        clear
      ])
    }

    function renderDropdown() {
      const { placement, notFoundText } = props
      const { notFound, visible } = state

      const dropDwonProps = {
        ref: popoverEl,
        style: { display: visible ? 'block' : 'none' },
        class: [
          'at-select__dropdown',
          placement
            ? `at-select__dropdown--${placement}`
            : 'at-select__dropdown--bottom'
        ]
      }
      const cls = notFound ? 'at-select__not-found' : 'at-select__list'
      const child = notFound ? h('li', notFoundText) : slots.default?.()

      return h(
        'div',
        dropDwonProps,
        h('ul', { class: cls }, child)
      )
    }

    return () => withDirectives(
      h('div', {
        class: classs.value,
        onKeydown: handleKeydown,
      }, [renderSelection(), renderDropdown()]),
      [[clickoutside, hideMenu]]
    )
  }
})

export default Select
