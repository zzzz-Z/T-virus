import { VNode } from 'vue';
import { TsComponent } from '@/createComponent';

export interface CardProps {
  /**
   * 是否显示边框，建议在灰色背景下使用
   * @default true
   */
  border?: boolean;
  /**
   * 禁用鼠标悬停显示阴影
   * @default false
   */
  disHover?: boolean;
  /**
   * 卡片阴影，建议在灰色背景下使用
   * @default false
   */
  shadow?: boolean;
  /**
   * 标题
   */
  title?: string | VNode;
  /**
   * title right slot
   */
  extra?: string | VNode;
  /**
   * bodystyle
   */
  bodyStyle?: object
}

export type Card = TsComponent<CardProps>
