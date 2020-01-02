import {
  h,
  defineComponent,
  reactive,
  watch,
  computed,
  ref,
  nextTick,
  onMounted,
  provide,
  withDirectives
} from 'next-vue'
import { findComponentsDownward, isFunction } from '../utils/util'
import useEvents from '../utils/useEvents'
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
  valueWithLabel: { type: Boolean, default: false },
  notFoundText: { type: String },
  placement: { type: String, default: 'bottom' }
}

export const select = Symbol('select')

const Select = defineComponent({
  name: 'Select',
  props: selectProps,
  setup(props, { emit, slots }) {
    const { vm, $broadcast, $on } = useEvents()
    const state = reactive({
      visible: false,
      options: [] as any[],
      optionInstances: [] as any[],
      selectedSingle: '',
      selectedMultiple: [] as any[],
      focusIndex: 0,
      query: '',
      notFound: false,
      model: props.value
    })
    provide(select, {
      onOptionDestroy,
      onOptionSelect,
      state
    })
    const inputEl = ref<HTMLInputElement | null>(null)
    const popoverEl = ref<HTMLLIElement | null>(null)

    const showCloseIcon = computed(
      () => !props.multiple && props.clearable && !showPlaceholder.value
    )

    const showPlaceholder = computed(() => {
      const hasArrVal = Array.isArray(state.model) && !state.model.length
      return state.model === '' || hasArrVal
    })

    onMounted(() => {
      modelToQuery()
      // updateOptions()
    })

    watch(
      () => props.value,
      val => {
        state.model = val
        val === '' && (state.query = '')
      }
    )

    watch(
      () => state.model,
      val => {
        emit('input', val)
        modelToQuery()
        props.multiple ? updateMultipleSelected() : updateSingleSelected()
      }
    )

    watch(
      () => state.visible,
      val => {
        if (val) {
          if (props.multiple && props.filterable) {
            inputEl.value!.focus()
          } else if (props.filterable) {
            inputEl.value!.select()
          }
        } else {
          if (props.filterable) {
            inputEl.value!.blur()
            setTimeout(() => broadcastQuery(''), 300)
          }
          $broadcast('Dropdown', 'destroyPopper')
        }
      }
    )

    watch(
      () => state.query,
      val => {
        // $broadcast('Option', 'queryChange', val)
        // let isHidden = true
        // nextTick(() => {
        //   console.log(state)
        //   state.options.forEach(option => {
        //     if (!option.state.hidden) {
        //       isHidden = false
        //     }
        //   })
        //   state.notFound = isHidden
        // })
        // $broadcast('Dropdown', 'updatePopper')
      }
    )

    function findOption(val: string) {
      return state.options.find(option => option.props.value == val)
    }

    function onOptionSelect(val: string | number) {
      if (state.model === val) {
        hideMenu()
      } else if (props.multiple) {
        let model = state.model as any[]
        const index = model.indexOf(val)
        if (index > -1) {
          removeTag(index)
        } else {
          model.push(val)
          $broadcast('Dropdown', 'updatePopper')
        }

        if (props.filterable) {
          state.query = ''
          inputEl.value!.focus()
        }
      } else {
        state.model = val

        if (props.filterable) {
          state.options.forEach(option => {
            const optVal = option.props.value
            if (optVal === val) {
              state.query =
                typeof option.props.label === 'undefined'
                  ? option.state.searchLabel
                  : option.props.label
            }
          })
        }
      }
    }

    function toggleMenu() {
      if (props.disabled) return
      state.visible = !state.visible
    }

    function hideMenu() {
      state.visible = false
      state.focusIndex = 0
      $broadcast('Option', 'selectClose')
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
      let firstOption: any

      const options = findComponentsDownward(vm, 'Option')
      options.forEach((option: any) => {
        if (!firstOption && !option.hidden) {
          firstOption = option
          option.handleSelect()
        }
      })
    }

    function updateOptions() {
      let options: any[] = []
      const optionsEle = findComponentsDownward(vm, 'Option')
      console.log(optionsEle)
      optionsEle.forEach((option: any) => {
        options.push({
          value: option.props.value,
          label:
            typeof option.props.label === 'undefined'
              ? option.$el.innerHTML
              : option.props.label
        })

        state.optionInstances.push(option)
      })
      state.options = options

      updateSingleSelected(true)
      updateMultipleSelected(true)
    }

    function onOptionDestroy(index: number) {
      state.options.splice(index, 1)
      state.optionInstances.splice(index, 1)
    }

    function updateSingleSelected(init = false) {
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
      toggleSingleSelected(model, init)
    }

    function updateMultipleSelected(init = false) {
      if (props.multiple && Array.isArray(state.model)) {
        const selected = []

        for (let i = 0; i < state.model.length; i++) {
          const model = state.model[i]

          for (let j = 0; j < state.options.length; j++) {
            const option = state.options[j]

            if (model === option.props.value) {
              selected.push({
                value: option.props.value,
                label: option.props.label
              })
            }
          }
        }

        state.selectedMultiple = selected
      }

      toggleMultipleSelected(state.model, init)
    }

    function clearSingleSelect() {
      if (showCloseIcon.value) {
        const options = findComponentsDownward(vm, 'Option')
        options.forEach((option: any) => {
          option.state.selected = false
        })

        state.model = ''

        if (props.filterable) {
          state.query = ''
        }
      }
    }

    function removeTag(index: number) {
      if (props.disabled) {
        return false
      }
      ;(state.model as any[]).splice(index, 1)

      if (props.filterable && state.visible) {
        inputEl.value!.focus()
      }

      $broadcast('Dropdown', 'updatePopper')
    }

    function toggleSingleSelected(val: unknown, init = false) {
      if (props.multiple) return

      let label = ''

      state.options.forEach(option => {
        const { label: optLabel, value: optVaL, _instance } = option
        const state = _instance.state
        debugger
        if (optVaL === val) {
          state.selected = true
          label =
            typeof optLabel === 'undefined'
              ? option.vnode.el.innerHTML
              : optLabel
        } else {
          state.selected = false
        }
      })

      hideMenu()

      if (!init) {
        if (props.valueWithLabel) {
          emit('change', { val, label })
        } else {
          emit('change', val)
        }
      }
    }
    function toggleMultipleSelected(values: any, init = false) {
      if (!props.multiple) return

      const valueLabelArr: any[] = []

      for (let i = 0; i < values.length; i++) {
        valueLabelArr.push({
          value: values[i]
        })
      }

      state.options.forEach(option => {
        const index = values.indexOf(option.props.value)
        const { label } = option.props
        const state = option.state
        if (index > -1) {
          state.selected = true
          valueLabelArr[index].label = isFunction(label)
            ? option.vnode.el.innerHTML
            : label
        } else {
          state.selected = false
        }
      })

      if (!init) {
        if (props.valueWithLabel) {
          emit('change', valueLabelArr)
        } else {
          emit('change', values)
        }
      }
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
        state.optionInstances[index].$el.getBoundingClientRect().bottom -
        popoverEl.value!.getBoundingClientRect().bottom

      if (bottomOverflowDistance) {
        popoverEl.value!.scrollTop += bottomOverflowDistance
      }
    }

    function handleFocus() {
      inputEl.value!.select()
    }

    function handleBlur() {
      setTimeout(() => {
        if (!props.multiple && state.model !== '') {
          state.options.forEach(option => {
            if (option.props.value === state.model) {
              state.query =
                typeof option.props.label === 'undefined'
                  ? option.searchLabel
                  : option.props.label
            }
          })
        } else {
          state.query = ''
        }
      }, 300)
    }

    function handleInputDelete() {
      const model = state.model as any[]
      if (props.multiple && model.length && state.query === '') {
        removeTag(model.length - 1)
      }
    }

    function modelToQuery() {
      if (
        !props.multiple &&
        props.filterable &&
        typeof state.model !== 'undefined'
      ) {
        state.options.forEach(option => {
          if (state.model === option.props.value) {
            state.query =
              option.props.label || option.searchLabel || option.props.value
          }
        })
      }
    }
    function broadcastQuery(val: any) {
      $broadcast('Option', 'queryChange', val)
    }

    function Selection() {
      const attrs = {
        class: 'at-select__selection',
        onClick: toggleMenu
      }

      const tags = state.selectedMultiple.map((item, index) => {
        const tagAttrs = {
          class: 'icon icon-x at-tag__close',
          onClick: (e: Event) => {
            e.stopPropagation()
            removeTag(index)
          }
        }

        return h('span', { class: 'at-tag' }, [
          h('span', { class: 'at-tag__text' }, item.label),
          h('i', tagAttrs, item.label)
        ])
      })

      const placeholder =
        showPlaceholder && !props.filterable && h('span', props.placeholder)
      const inputAttrs = {
        value: state.query,
        type: 'text',
        class: 'at-select__input',
        placeholder: showPlaceholder ? props.placeholder : '',
        onBlur: handleBlur,
        // onKeydown:handleInputDelete,
        ref: inputEl
      }
      const clearAttrs = {
        class: 'icon icon-x at-select__clear',
        onClick: (e: Event) => {
          e.stopPropagation()
          clearSingleSelect()
        }
      }
      const input = props.filterable ? h('input', inputAttrs) : null
      const arrow = h('i', { class: 'icon icon-chevron-down at-select__arrow' })
      const clear = showCloseIcon.value ? h('i', clearAttrs) : null

      return h('div', attrs, [tags, placeholder, input, arrow, clear])
    }

    function Dropdown() {
      const { placement, notFoundText } = props
      const { notFound, visible } = state

      const attrs = {
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
      const child = notFound ? h('li', notFoundText) : slots.default()

      return h('div', attrs, h('ul', { class: cls }, child))
    }

    return () => {
      const cls = [
        'at-select',
        {
          'at-select--visible': state.visible,
          'at-select--disabled': props.disabled,
          'at-select--multiple': props.multiple,
          'at-select--single': !props.multiple,
          'at-select--show-clear': showCloseIcon.value,
          [`at-select--${props.size}`]: !!props.size
        }
      ]
      return withDirectives(
        h('div', { class: cls }, [Selection(), Dropdown()]),
        [[clickoutside, hideMenu]]
      )
    }
  }
})

export default Select
