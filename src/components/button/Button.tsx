import { ButtonProps, buttonProps } from './type';
import Icon from '../icon/Icon';
import { createComponent, computed } from '@/createComponent';

interface Event {
  onClick(...arg: any): void
}

export default createComponent<ButtonProps, Event>({
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
        {getter.showSlot && this.$slots.default}
      </button >
    )
  }
}
)
