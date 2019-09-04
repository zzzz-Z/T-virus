import { ButtonProps } from './type';
import Icon from '../icon';
import { createComponent, computed, watch } from '@/createComponent';
export const buttonProps = {
  shape: String,
  loading: Boolean,
  disabled: Boolean,
  type: { type: String, default: 'default' },
  size: { type: String, default: 'default' },
  htmlType: { type: String, default: 'button' },
  icon: { type: String, default: '' },
  long: { type: Boolean, default: false },
  ghost: { type: Boolean, default: false }
}

const Button = createComponent<ButtonProps>({
  name: 't-button',
  props: buttonProps,
  setup(props) {
    const getter = computed({
      classs: () => [
        `t-btn`,
        `t-btn-${props.type}`,
        {
          [`t-btn-long`]: props.long,
          [`t-btn-${props.shape}`]: !!props.shape,
          [`t-btn-${props.size}`]: props.size !== 'default',
          [`t-btn-loading`]: props.loading,
          [`t-btn-icon-only`]: props.icon || props.loading,
          [`t-btn-ghost`]: props.ghost
        }
      ]
    })

    return () => {
      const icon = props.icon && !props.loading && <Icon type={'user'} />
      const loading = props.loading && <Icon class='t-load-loop' type='loading' />
      const defaultSlot = this.$slots.default
      return (
        <button
          disabled={props.disabled}
          type={props.type}
          onClick={(e: any) => this.$emit('click', e)}
          class={getter.classs}>
          {loading}
          {icon}
          {defaultSlot && <span> {defaultSlot} </span>}
        </button >
      )
    }
  }
})

export default Button
