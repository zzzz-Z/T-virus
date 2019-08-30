import { IconProps, iconProps } from './type';
import { createComponent } from '@/createComponent';

interface Event {
  onClick?(e: any): void
}

export default createComponent<IconProps, Event>({
  props: iconProps,
  setup(props) {

    const classs = [
      `t-icon`, {
        [`t-icon-${props.type}`]: props.type !== '',
        [`${props.custom}`]: props.custom !== '',
      }
    ]
    const style: any = {}
    props.size && (style['font-size'] = `${props.size}px`)
    props.color && (style.color = props.color)

    return () => (
      <i
        class={classs}
        style={style}
        on-click={(e: any) => this.$emit('click', e)}
      />
    )
  }
})

