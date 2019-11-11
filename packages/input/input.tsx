import { InputProps } from './index'
import { createComponent, reactive, watch, computed, h, PropType } from 'vue3'

export const inputProps: any = {
  type: { type: String, default: 'text' }, // 绑定的值，可使用 v-model 双向绑定
  value: { type: [String, Number], default: '' },
  size: { type: String, default: 'default' },
  placeholder: { type: String, default: '' }, // 原生属性
  maxlength: Number,
  disabled: { type: Boolean, default: false }, // 设置输入框为禁用状态
  icon: String,
  autosize: { type: [Boolean, Object], default: false },
  rows: { type: Number, default: 2 },
  readonly: { type: Boolean, default: false },
  name: String,
  autofocus: { type: Boolean, default: false },
  spellcheck: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  clearable: { type: Boolean, default: false }, // 是否显示清空按钮
  elementId: { type: String },
  wrap: ({ type: String, default: 'soft' } as any) as PropType<'hard' | 'soft'>,
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  search: { type: Boolean, default: false },
  enterButton: { type: [Boolean, String], default: false },
  afterEl: { type: Object },
  preEl: { type: Object }
}

const preCls = 't-input'

export default createComponent<InputProps, {}, {}>({
  name: 'Input',
  props: inputProps,
  setup(props, { emit }) {
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
      emit('change', val)
    }

    const handleInput = (e: Event) => {
      if (state.isOnComposition) {
        return
      }
      const val = (e.target as HTMLInputElement).value
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
        handleInput(event)
      }
    }

    const cls = computed(() => [
      `${preCls}`,
      {
        [`${preCls}-${props.size}`]: !!props.size,
        [`${preCls}-disabled`]: props.disabled,
        [`${preCls}-with-prefix`]: state.showPrefix,
        [`${preCls}-with-suffix`]:
          state.showSuffix || (props.search && props.enterButton === false)
      }
    ])

    return () =>
      h(
        'div',
        {},
        h('input', {
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
          onInput: handleInput,
          class: cls.value
        })
      )
  }
})
