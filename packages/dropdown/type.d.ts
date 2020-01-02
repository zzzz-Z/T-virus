// import { VNode } from 'next-vue';
// import { ButtonProps } from 'packages/button/type';
// import { SizeType, TriggerType } from 'types';
// export type DropdownMenuAlignment = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'

// export interface DropDownEvent {
//   /**
//    * 点击菜单项时触发
//    */
//   'on-click'?(value: string): void
//   /**
//    * 菜单显示状态改变时调用
//    */
//   'on-visible-change'?(value: boolean): void
//   /**
//    * 点击外部关闭下拉菜单时触发
//    */
//   'on-clickoutside'?(event: object): this
// }

// export interface DropDownProps {
//   /** Menu button type. only works when split-button is true */
//   type?: ButtonProps['type']

//   /** Whether a button group is displayed */
//   splitButton?: boolean

//   /** menu size, also works on the split button */
//   size?: SizeType

//   /** Placement of the menu */
//   placement?: DropdownMenuAlignment

//   /** How to trigger */
//   trigger?: TriggerType

//   /** visibleArrow */
//   visibleArrow?: boolean

//   /** Whether to hide menu after clicking menu-item */
//   hideOnClick?: boolean

//   /**
//    * @default 250
//    */
//   showTimeout?: number

//   /**
//    * @default 150
//    */
//   hideTimeout?: number

//   /**
//    * Dropdown tabindex
//    * @default 0
//    */
//   tabindex?: number
// }

// // tslint:disable-next-line:no-empty-interface
// export interface DropdownMenu {
//   /**
//    * @default true
//    */
//   visibleArrow?: boolean

//   /**
//    * @default 0
//    */
//   arrowOffset?: number
// }

// export interface DropdownItem {
//   /**
//    * 用来标识这一项
//    */
//   name?: string;
//   /**
//    * 禁用该项
//    * @default false
//    */
//   disabled?: boolean;
//   /**
//    * 显示分割线
//    * @default false
//    */
//   divided?: boolean;
//   /**
//    * 标记该项为选中状态
//    * @default false
//    */
//   selected?: boolean;
// }
