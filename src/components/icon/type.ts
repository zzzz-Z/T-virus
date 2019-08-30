export const iconProps = {
  type: {
    type: String,
    default: ''
  },
  size: [Number, String],
  color: String,
  custom: {
    type: String,
    default: ''
  }
}

export interface IconProps {
  type?: string
  size?: string | number
  color?: string
  /**
   * @default ''
   */
  custom?: string
}
