export interface ButtonProps {
  type?:
    | 'default'
    | 'primary'
    | 'dashed'
    | 'text'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  /**
   * 幽灵属性，使按钮背景透明
   * @default false
   */
  ghost?: boolean
  /**
   * 'large' | 'small' | 'smaller'
   */
  size?: 'large' | 'small' | 'smaller'
  /**
   * 按钮形状，可选值为circle或者不设置
   */
  shape?: '' | 'circle'
  /**
   * 开启后，按钮的长度为 100%
   * @default false
   */
  long?: boolean
  /**
   * 设置button原生的type，可选值为button、submit、reset
   * @default button
   */
  htmlType?: 'button' | 'submit' | 'reset'
  /**
   * 设置按钮为禁用状态
   * @default false
   */
  disabled?: boolean
  /**
   * 设置按钮为加载中状态
   * @default false
   */
  loading?: boolean
  /**
   * 设置按钮的图标类型
   */
  icon?: string
  /**
   * 跳转的链接，支持 vue3-router 对象
   */
  to?: string | object
  /**
   * 路由跳转时，开启 replace 将不会向 history 添加新记录
   * @default false
   */
  replace?: boolean
  /**
   * 相当于 a 链接的 target 属性
   * @default _self
   */
  target?: '_blank' | '_self' | '_parent' | '_top'
  /**
   * 同 vue3-router append
   * @default false
   */
  append?: boolean
}

export interface ButtonGroupProps {
  /**
   * 按钮组合大小，可选值为large、small、default或者不设置
   * @default default
   */
  size?: 'large' | 'small' | 'default'
  /**
   * 按钮组合形状，可选值为circle或者不设置
   */
  shape?: '' | 'circle'
  /**
   * 是否纵向排列按钮组
   * @default false
   */
  vertical?: boolean
}
