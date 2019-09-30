import { VNode } from 'vue';

export interface MenuEvent {
  /**
   * 选择菜单（MenuItem）时触发
   */
  'on-select'?(name?: string | number): void
  /**
   * 当 展开/收起 子菜单时触发
   * @default 当前展开的 Submenu 的 name 值数组
   */
  'on-open-change'?(name: string[] | number[]): void
}
export interface MenuProps {
  /**
   * 菜单类型，可选值为 horizontal（水平） 和 vertical（垂直）
   * @default vertical
   */
  mode?: 'horizontal' | 'vertical';
  /**
   * 主题，可选值为 light、dark、primary，其中 primary 只适用于 mode="horizontal"
   * @default light
   */
  theme?: 'light' | 'dark' | 'primary';
  /**
   * 激活菜单的 name 值
   */
  activeName?: string | number;
  /**
   * 展开的 Submenu 的 name 集合
   */
  openNames?: string[] | number[];
  /**
   * 是否开启手风琴模式，开启后每次至多展开一个子菜单
   * @default false
   */
  accordion?: boolean;
  /**
   * 导航菜单的宽度，只在 mode="vertical" 时有效，如果使用 Col 等布局，建议设置为 auto
   * @default 240px
   */
  width?: string;
}

export interface MenuItem {
  /**
   * 菜单项的唯一标识，必填
   */
  name?: string | number;
  /**
   * 跳转的链接，支持 vue-router 对象
   */
  to?: string | object;
  /**
   * 路由跳转时，开启 replace 将不会向 history 添加新记录
   * @default false
   */
  replace?: boolean;
  /**
   * 相当于 a 链接的 target 属性
   * @default _self
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * 同 vue-router append
   * @default false
   */
  append?: boolean;

}

export interface MenuSub {
  /**
   * 子菜单的唯一标识，必填
   */
  name?: string | number;
  /**
   * 子菜单标题 vnode|slot
   */
  title: VNode[];

}

export interface MenuGroup {
  /**
   * 分组标题
   * @default 空
   */
  title?: string;
}
