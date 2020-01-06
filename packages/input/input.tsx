import { InputProps } from './index'
import {
  defineComponent,
  reactive,
  watch,
  computed,
  h,
  ref,
  onMounted,
} from 'next-vue'
import { withVif } from '../utils/directives'

export const inputProps: any = {
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
}

export default defineComponent<InputProps, {}, {}>({
  name: 'Input',
  inheritAttrs: false,
  props: inputProps,
  setup(props, { emit, slots, attrs }) {
    const state = reactive({
      value: props.value,
      prefix: { width: 0, offset: 0 },
      suffix: { width: 0, offset: 0 },
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
        emit('change', val)
      }
    )

    const onInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value
      emit('input', val, e)
      emit('change', val, e)
    }

    const onKeyup = (event: KeyboardEvent) => {
      event.keyCode === 13 && emit('enter', event)
    }

    const clean = () => {
      state.value = ''
      emit('input', '')
    }

    const cls = computed(() => {
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
  
    watch(() => {
      state.prefix.offset = prependRef.value!.offsetWidth
      state.prefix.width = prefixRef.value!.offsetWidth
      state.suffix.offset = appendRef.value!.offsetWidth
      state.suffix.width = suffixRef.value!.offsetWidth
    })

    const render = (type: 'append' | 'prepend') => {
      const node = props[type] || slots[type]?.()
      return withVif(
        h('div', {
          ref: type === 'append' ? appendRef : prependRef,
          class: ['v-input-group__' + type, { 'v-input-group--button': node }]
        }, node),
        node
      )
    }

    const renderFix = (type: 'prefix' | 'suffix') => {
      const isPrefix = type === 'prefix'
      return h('span', {
        ref: isPrefix ? prefixRef : suffixRef,
        style: { [isPrefix ? 'left' : 'right']: state[type].offset + 'px' },
        class: 'v-input--' + type
      }, props[type] || slots[type]?.())
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
        class: 'v-input__original',
        style: {
          'padding-left': state.prefix.width + 'px',
          'padding-right': state.suffix.width + 'px',
        }
      })
    }

    return () => h(
      'div',
      { class: cls.value, style: attrs.style },
      [
        render('prepend'),
        renderFix('prefix'),
        input(),
        renderFix('suffix'),
        render('append')]
    )
  }
})
