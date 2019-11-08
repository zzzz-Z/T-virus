import { InputProps } from './type'
import omit from 'lodash.omit'
const {
  createComponent,
  reactive,
  watch,
  computed,
  h,
  getCurrentInstance
} = window.Vue

export const inputProps: any = {
  type: { type: String, default: 'text' },
  value: { type: [String, Number], default: '' },
  size: { type: String, default: 'default' },
  placeholder: { type: String, default: '' },
  maxlength: { type: Number },
  disabled: { type: Boolean, default: false },
  icon: String,
  autosize: { type: [Boolean, Object], default: false },
  rows: { type: Number, default: 2 },
  readonly: { type: Boolean, default: false },
  name: String,
  number: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  spellcheck: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  clearable: { type: Boolean, default: false },
  elementId: { type: String },
  wrap: { type: String, default: 'soft' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  search: { type: Boolean, default: false },
  enterButton: { type: [Boolean, String], default: false }
}

const Input = createComponent({
  name: 'Input',
  props: inputProps,
  setup(props: InputProps, { emit, attrs }) {
    const prefixCls = 't-input'
    const state = reactive({
      currentValue: props.value,
      prepend: true,
      append: true,
      slotReady: false,
      textareaStyles: {},
      showPrefix: false,
      showSuffix: false,
      isOnComposition: false
    })
    watch(() => props.value, val => setCurrentval(val))

    const setCurrentval = (val: any) => {
      if (props.value !== state.currentValue) {
        state.currentValue = val
      }
    }

    const onInput = (e: any) => {
      if (state.isOnComposition) {
        return
      }
      let val = e.target.value
      if (props.number && val !== '') {
        val = Number.isNaN(Number(val)) ? val : Number(val)
      }
      setCurrentval(val)
      emit('input', val)
    }

    const onKeyup = (event: KeyboardEvent) => {
      event.keyCode === 13 && emit('enter', event)
      emit('keyup', event)
    }
    const onChange = (event: any) => {
      emit('change', event.target.value)
    }
    const handleComposition = (event: any) => {
      if (event.type === 'compositionstart') {
        state.isOnComposition = true
      }
      if (event.type === 'compositionend') {
        state.isOnComposition = false
        onInput(event)
      }
    }
    const cls = computed(() => [
      `${prefixCls}`,
      {
        [`${prefixCls}-${props.size}`]: !!props.size,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-with-prefix`]: state.showPrefix,
        [`${prefixCls}-with-suffix`]:
          state.showSuffix || (props.search && props.enterButton === false)
      }
    ])

    return () =>
      h('input', {
        ...attrs,
        value: props.value,
        type: props.type,
        autofocus: props.autocomplete,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        onCompositionstart: handleComposition,
        onCompositionupdate: handleComposition,
        onCompositionend: handleComposition,
        onKeyup,
        onChange,
        onInput,
        class: cls.value
      })
  }
})

export default Input
