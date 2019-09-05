import { IconProps } from './type';
import { createComponent } from '@/createComponent';

export const iconProps = {
  type: { type: String, default: '' },
  size: [Number, String],
  color: String,
  custom: { type: String, default: '' }
}

const Icon = createComponent<IconProps>({
  name: 't-icon',
  props: iconProps,
  setup(props) {
    return () => {
      const classs = [
        `t-icon`, {
          [`t-icon-${props.type}`]: props.type !== '',
          [`${props.custom}`]: props.custom !== '',
        }
      ]
      const style: any = {}
      props.size && (style['font-size'] = `${props.size}px`)
      props.color && (style.color = props.color)
      return (
        <i
          class={classs}
          style={style}
          on-click={(e: any) => this.$emit('click', e)}
        />
      )
    }
  }
})

export default Icon

