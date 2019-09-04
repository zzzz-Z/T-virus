import { TsComponent } from '@/createComponent';


export interface IconProps {
  type?: string
  size?: string | number
  color?: string
  /**
   * @default ''
   */
  custom?: string
}

export type Icon = TsComponent<IconProps>
