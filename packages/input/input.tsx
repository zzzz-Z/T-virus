import { InputProps } from './index'
import {
  createComponent,
  reactive,
  watch,
  computed,
  h,
  PropType,
  onMounted,
  getCurrentInstance
} from 'vue3'

export const inputProps: any = {
  elementId: String,
  icon: String,
  name: String,
  status: String,
  size: String,
  maxlength: Number,
  placeholder: String, // 原生属性
  wrap: ({ type: String, default: 'soft' } as any) as PropType<'hard' | 'soft'>,
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  search: { type: Boolean, default: false },
  enterButton: { type: [Boolean, String], default: false },
  afterEl: { type: Object },
  preEl: { type: Object },
  type: { type: String, default: 'text' }, // 绑定的值，可使用 v-model 双向绑定
  value: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false }, // 设置输入框为禁用状态
  autosize: { type: [Boolean, Object], default: false },
  rows: { type: Number, default: 2 },
  readonly: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  spellcheck: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  clearable: { type: Boolean, default: false } // 是否显示清空按钮
}

export default createComponent<InputProps, {}, {}>({
  name: 'Input',
  inheritAttrs: false,
  props: inputProps,
  setup(props, { emit, slots }) {
    const state = reactive({
      value: props.value
    })

    watch(
      () => props.value,
      val => {
        setValue(val)
      }
    )

    watch(
      () => state.value,
      val => {
        emit('input', val)
        emit('change', val)
      }
    )
    onMounted(() => {
      console.log(getCurrentInstance())
    })
    const setValue = (val: any) => {
      if (props.value === state.value) return
      state.value = val
    }

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

    const cls = computed(() => [
      'at-input',
      {
        [`at-input--${props.status}`]: props.status,
        [`at-input--${props.size}`]: props.size,
        'at-input-group': slots.prepend || slots.append,
        'at-input--disabled': props.disabled,
        'at-input--prepend': slots.prepend,
        'at-input--append': slots.append,
        'at-input--icon': props.icon
      }
    ])

    const iconCls = computed(() => {
      const name = props.icon || props.status
      return [{ [`icon-${name}`]: name }, 'at-input__icon icon']
    })

    const prependCls = computed(() => ({
      class: ['at-input-group__prepend', { 'at-input-group--button': false }]
    }))

    return () => {
      const icon =
        props.icon && h('i', { class: iconCls.value, onClick: clean })
      const prepend = slots.append && h('div', prependCls, slots.append())
      const input = h('input', {
        value: state.value,
        type: props.type,
        autofocus: props.autocomplete,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        onKeyup,
        onInput,
        class: 'at-input__original'
      })
      return h('div', { class: cls.value }, [prepend, input, icon])
    }
  }
})
