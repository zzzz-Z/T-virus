import { ButtonProps } from './type';
import Icon from '../icon';
import { createComponent, computed } from '@/createComponent';
export const buttonProps = {
  shape: String,
  loading: Boolean,
  disabled: Boolean,
  type: { type: String, default: 'default' },
  size: { type: String, default: 'default' },
  htmlType: { type: String, default: 'button' },
  icon: { type: String, default: '' },
  customIcon: { type: String, default: '' },
  long: { type: Boolean, default: false },
  ghost: { type: Boolean, default: false }
}

const Button = createComponent<ButtonProps>({
  name: 't-button',
  props: buttonProps,
  setup(props) {

    const getter = computed({
      showSlot: () => !!this.$slots.default
    })
    const classs = [
      `t-btn`,
      `t-btn-${props.type}`,
      {
        [`t-btn-long`]: props.long,
        [`t-btn-${props.shape}`]: !!props.shape,
        [`t-btn-${props.size}`]: props.size !== 'default',
        [`t-btn-loading`]: props.loading != null && props.loading,
        [`t-btn-icon-only`]: !getter.showSlot && (!!props.icon || !!props.customIcon || props.loading),
        [`t-btn-ghost`]: props.ghost
      }
    ]
    return () => (
      <button
        disabled={props.disabled}
        type={props.type}
        on-click={(e: any) => this.$emit('click', e)}
        class={classs}>
        <Icon
          class='t-load-loop'
          type='loading'
          v-is={props.loading} />
        <Icon
          type={props.icon}
          custom={props.customIcon}
          v-is={(props.icon || props.customIcon) && !props.loading} />
        {getter.showSlot && <span> {this.$slots.default} </span>}
      </button >
    )
  }
}
)

export default Button
