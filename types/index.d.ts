import Virus from '../packages'
/** Component size definition for button, input, etc */
type SizeType = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
type AlignType = 'left' | 'center' | 'right'
type TriggerType = 'hover' | 'click'

export interface BaseEvent {
  onClick?(e: any): void
}

export * from '../packages'
export default Virus
