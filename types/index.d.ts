import Virus from '../packages'
/** Component size definition for button, input, etc */
export type SizeType = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type AlignType = 'left' | 'center' | 'right'
export type TriggerType = 'hover' | 'click'

export interface BaseEvent {
  onClick?(e: any): void
}

export * from '../packages'
export default Virus
