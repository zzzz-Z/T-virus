import { InputProps } from './index'
import {
  defineComponent,
  reactive,
  watch,
  computed,
  h,
  ref,
  onMounted,
  watchEffect,
  inject,
  getCurrentInstance
} from 'vue'

import useForm from '../utils/useForm';

export const inputProps = {
  elementId: String,
  icon: String,
  name: String,
  status: String,
  size: String,
  maxlength: Number,
  placeholder: String,
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  search: { type: Boolean, default: false },
  append: [Object, String],
  prepend: [Object, String],
  type: { type: String, default: 'text' },
  value: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  autosize: { type: [Boolean, Object], default: false },
  rows: { type: Number, default: 2 },
  readonly: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  spellcheck: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  clearable: { type: Boolean, default: false }
} as any

export default defineComponent({
  name: 'VInput',
  props: inputProps,
  emits: ['change', 'input', 'enter'],
  setup(props: InputProps, { emit, slots, attrs }) {
    const instace = getCurrentInstance()!
    const { _emit } = useForm()
    instace.sink = {
      clean: () => {
        state.value = ''
        emit('input', '')
      }

    }
    const state = reactive({
      value: props.value,
      offset: { prefix: 0, suffix: 0 },
      style: {} as any,
      class: computed(() => {
        const { status, size, prepend, append, disabled } = props
        const _prepend = prepend || slots.prepend
        const _append = append || slots.append
        const group = _prepend || _append
        return [
          attrs.class,
          'v-input',
          {
            [`v-input--${status}`]: status,
            [`v-input--${size}`]: size,
            'v-input-group': group,
            'v-input--disabled': disabled,
            'v-input--prepend': _prepend,
            'v-input--append': _append
          }
        ]
      })
    })
    const inputRef = ref<HTMLInputElement | null>(null)
    const appendRef = ref<HTMLLIElement | null>(null)
    const prependRef = ref<HTMLLIElement | null>(null)
    const prefixRef = ref<HTMLLIElement | null>(null)
    const suffixRef = ref<HTMLLIElement | null>(null)

    watch(
      () => props.value,
      val => {
        if (props.value === state.value) return
        state.value = val
      }
    )

    watch(
      () => state.value,
      val => {
        emit('input', val)
        _emit('change', val)
      }
    )

    const onInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value
      emit('input', val)
      emit('change', val)
    }

    const onKeyup = (event: KeyboardEvent) => {
      event.keyCode === 13 && emit('enter', event)
    }
    const onBlur = (event: Event) => _emit('blur', event)

    watchEffect(() => {
      if (prefixRef.value) {
        state.style['padding-left'] = prefixRef.value.offsetWidth
      }
      if (suffixRef.value) {
        state.style['padding-right'] = suffixRef.value.offsetWidth
      }
      if (prependRef.value) {
        state.offset.prefix = prependRef.value.offsetWidth
      }
      if (appendRef.value) {
        state.offset.suffix = appendRef.value.offsetWidth
      }
    })

    const render = (type: 'append' | 'prepend') => {
      const node = props[type] || slots[type]?.()
      return node && h(
        'div',
        {
          ref: type === 'append' ? appendRef : prependRef,
          class: ['v-input-group__' + type, { 'v-input-group--button': node }]
        },
        node
      )
    }

    const renderFix = (type: 'prefix' | 'suffix') => {
      const isPrefix = type === 'prefix'
      const el = props[type] || slots[type]?.()
      return el && h(
        'span',
        {
          ref: isPrefix ? prefixRef : suffixRef,
          style: { [isPrefix ? 'left' : 'right']: state.offset[type] + 'px' },
          class: 'v-input--' + type
        },
        el
      )
    }

    const input = () => {
      return h('input', {
        ref: inputRef,
        value: state.value,
        type: props.type,
        autofocus: props.autocomplete,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        onKeyup,
        onInput,
        onBlur,
        class: 'v-input__original',
        style: state.style
      })
    }

    return () =>
      h('div', { class: state.class, style: attrs.style }, [
        render('prepend'),
        renderFix('prefix'),
        input(),
        renderFix('suffix'),
        render('append')
      ])
  }
})
