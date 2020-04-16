import { VNode } from 'vue'

export interface renderParams {
  val: any
  index: number
  row: Record<string, any>
}
export interface Columns {
  key: string
  title: string | VNode
  width?: number
  align?: 'left' | 'right' | 'center'
  cellProps?: Record<any, any>
  render?(params: renderParams): VNode | string | number
}
