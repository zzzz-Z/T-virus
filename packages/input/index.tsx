import vcInput from './input'
import { VNode, App } from 'vue3'

export interface InputProps {
  type?:
  | 'text'
  | 'password'
  | 'textarea'
  | 'url'
  | 'email'
  | 'date'
  | 'number'
  | 'tel'
  //输入框状态
  status?: 'success' | 'error' | 'warning' | 'info'
  // 绑定的值，可使用 v-model 双向绑定
  value?: string | number
  /** 输入框尺寸，可选值为large、small、default或者不设置 */
  size?: '' | 'large' | 'small' | 'default'
  /** 占位文本 */
  name?: string
  placeholder?: string
  /** 是否显示清空按钮 */
  clearable?: boolean
  /** 设置输入框为禁用状态 */
  disabled?: boolean
  /** 设置输入框为只读 */
  readonly?: boolean
  /** 最大输入长度 */
  maxlength?: number
  /** 输入框尾部图标，仅在 text 类型下有效 */
  icon?: string
  /** 输入框头部图标 */
  prefix?: string
  /** 输入框尾部图标 */
  suffix?: string
  /** 是否显示为搜索型输入框 */
  search?: boolean
  /** 开启 search 时可用，是否有确认按钮，可设为按钮文字 */
  enterButton?: boolean | string
  /** 文本域默认行数，仅在 textarea 类型下有效 */
  rows?: number
  /** 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 } */
  autosize?: boolean | { minRows?: number; maxRows?: number }
  /** 自动获取焦点 */
  autofocus?: boolean
  /** 原生的自动完成功能，可选值为 off 和 on,off */
  autocomplete?: string
  /** 原生的 spellcheck 属性 */
  spellcheck?: boolean
  /** 原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效 */
  wrap?: 'hard' | 'soft'
  /** 前置内容，仅在 text 类型下有效 */
  preEl?: VNode[]
  /** 后置内容，仅在 text 类型下有效 */
  afterEl?: VNode[]
  /** 按下回车键时触发 */
  onEnter?(event: KeyboardEvent): void
  /** 设置 icon 属性后，点击图标时触发 */
  onClick?(): void
  /** 数据改变时触发 */
  onChange?(event: any): void
  /** 输入框聚焦时触发 */
  onFocus?(): void
  /** 输入框失去焦点时触发 */
  onBlur?(): void
  /** 原生的 keyup 事件 */
  onKeyup?(event: KeyboardEvent): void
  /** 原生的 keydown 事件 */
  onKeydown?(event: KeyboardEvent): void
  /** 原生的 keypress 事件 */
  onKeypress?(event: KeyboardEvent): void
  /** 开启 search 时可用，点击搜索或按下回车键时触发 */
  onSearch?(value: string): void
  /** 开启 clearable 时可用，点击清空按钮时触发 */
  onClear?(): void
}

/**
 * @see [`docs`](https://baidu.com)
 *
 * `props`
 * ```
 * type: { type: String, default: 'text' }, // 绑定的值，可使用 v-model 双向绑定
 * value: { type: [String, Number], default: '' },
 * size: { type: String, default: 'default' },
 * placeholder: { type: String, default: '' }, // 原生属性
 * maxlength: Number,
 * disabled: { type: Boolean, default: false }, // 设置输入框为禁用状态
 * icon: String,
 * autosize: { type: [Boolean, Object], default: false },
 * rows: { type: Number, default: 2 },
 * readonly: { type: Boolean, default: false },
 * name: String,
 * autofocus: { type: Boolean, default: false },
 * spellcheck: { type: Boolean, default: false },
 * autocomplete: { type: String, default: 'off' },
 * clearable: { type: Boolean, default: false }, // 是否显示清空按钮
 * elementId: { type: String },
 * wrap: ({ type: String, default: 'soft' } as any) as PropType<'hard' | 'soft'>,
 * prefix: { type: String, default: '' },
 * suffix: { type: String, default: '' },
 * search: { type: Boolean, default: false },
 * enterButton: { type: [Boolean, String], default: false },
 * afterEl: { type: Object },
 * preEl: { type: Object }
 * ```
 * `event`
 * ```
 * onEnter?(event: KeyboardEvent): void//按下回车键时触发
 * onClick?(): void//设置 icon 属性后，点击图标时触发
 * onChange?(event: any): void //数据改变时触发
 * onFocus?(): void//输入框聚焦时触发
 * onBlur?(): void //输入框失去焦点时触发
 * onKeyup?(event: KeyboardEvent): void //原生的 keyup 事件
 * onKeydown?(event: KeyboardEvent): void//原生的 keydown 事件
 * onKeypress?(event: KeyboardEvent): void //原生的 keypress 事件
 * onSearch?(value: string): void //开启 search 时可用，点击搜索或按下回车键时触发
 * onClear?(): void//开启 clearable 时可用，点击清空按钮时触发
 * ```
 */
const Input = vcInput
  // tslint:disable-next-line: whitespace align
  ; (Input as any).install = (app: App) => {
    app.component(Input.name, Input as any)
  }

export default Input
