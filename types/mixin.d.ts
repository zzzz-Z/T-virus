/** Component size definition for button, input, etc */
export type SizeType = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type AlignType = 'left' | 'center' | 'right'

export interface BaseEvent {
  onClick?(e: any): void
}
