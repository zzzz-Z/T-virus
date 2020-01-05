import { InputProps } from './index'
import {
  defineComponent,
  reactive,
  watch,
  computed,
  h,
  PropType,
  ref,
  onMounted,
} from 'next-vue'

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
  after: [Object, String],
  pre: [Object, String],
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

export default defineComponent<InputProps, {}, {}>({
  name: 'Input',
  inheritAttrs: false,
  props: inputProps,
  setup(props, { emit, slots }) {
    const state = reactive({value: props.value})
    const inputRef = ref<HTMLInputElement | null>(null)
    const afterRef = ref<HTMLLIElement | null>(null)
    onMounted(() => {
      console.log(afterRef.value?.getBoundingClientRect());
    })
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
      const { status, size, pre, after, icon, disabled } = props
      const prepend = pre || slots.pre  
      const append = after || slots.after  
      const group = prepend || append
      return [
      'v-input',
      {
        [`v-input--${status}`]: status,
        [`v-input--${size}`]: size,
        'v-input-group': group,
        'v-input--disabled': disabled,
        'v-input--prepend': prepend,
        'v-input--append': append,
        'v-input--icon': icon
      }
    ]
    })

    const icon = () => {
      const { icon, status } = props
      const name = icon || status
      const render = h('i', { class: 'v-input__icon' }, icon || slots.icon?.())
      switch (typeof icon) {
        case 'string': return h('i', {
          class: [{ [`icon-${name}`]: name }, 'v-input__icon icon'],
          onClick: clean
        })
        case 'object': return render
        default: return slots.icon ? render : null
      }
    }

    const after = () => {
      const node = props.after || slots.after?.()
      return node ?
        h('div', {
          ref:afterRef,
          class: ['v-input-group__append', { 'v-input-group--button': true }]
        }, node)
        : null
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
        class: 'v-input__original'
      })
    }

    return () => h(
      'div',
      { class: cls.value },
      [input(), icon(), after()]
    )
  }
})
