import { VNode } from 'vue'

export interface MenuProps {
  /** 菜单类型，可选值为 horizontal（水平） 和 vertical（垂直）  @default vertical */
  mode?: 'horizontal' | 'vertical' | 'inline'
  /**  @default light */
  theme?: 'light' | 'dark'
  /** 选中的菜单项名称*/
  activeName?: string | number
  /** 是否开启手风琴模式，开启后每次至多展开一个子菜单 @default false*/
  accordion?: boolean
  /** 是否使用 vue-router @default false */
  router?: boolean
  /** 是否允许每次只展开一个菜单 @default false  */
  inlineCollapsed?: boolean
  /** 导航菜单的宽度，仅在 vertical 和 inline 模式下有效   @default 240px */
  width?: string
  /** 选择菜单（MenuItem）时触发 */
  onSelect?(name: string | number): void
}

export interface MenuItemProps {
  /** 菜单项的唯一标识*/
  name: string
  /**  跳转的链接，支持 vue-router 对象 */
  to?: string | object
  /**  路由跳转时，开启 replace 将不会向 history 添加新记录  @default false  */
  replace?: boolean
  /** 是否可用 */
  disabled?: boolean
}

export interface SubMenuProps {
  /** 是否可用  */
  disabled?: boolean
  /** 是否展开菜单项 @default false */
  opened?: boolean
  title?: VNode | string
}

export interface MenuGroup {
  /**  分组标题  */
  title?: string
}
