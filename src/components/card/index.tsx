import { createComponent } from '@/createComponent';
import { CardProps } from './type';

const cardProps = {
  border: { type: Boolean, default: true },
  disHover: { type: Boolean, default: false },
  shadow: { type: Boolean, default: false },
  padding: { type: Number, default: 16 },
  title: [String, Object],
  extra: [String, Object]
}
const Card = createComponent<CardProps>({
  name: 't-card',
  props: cardProps,
  setup(props) {

    const prefixCls = 't-card'
    return () => {
      const { title, border, shadow, disHover, extra, bodyStyle } = props
      const TitleSlot = this.$slots.title || title
      const ExtraSlot = this.$slots.extra || extra
      const DefaultSlot = this.$slots.default
      const bodyStyles = { padding: '16px', ...bodyStyle }
      const classs = [
        `${prefixCls}`,
        {
          [`${prefixCls}-bordered`]: border && !shadow,
          [`${prefixCls}-dis-hover`]: disHover || shadow,
          [`${prefixCls}-shadow`]: shadow
        }
      ]

      return (
        <div class={classs} >
          {TitleSlot && <div class={`${prefixCls}-head`}>{TitleSlot} </div>}
          {ExtraSlot && <div class={`${prefixCls}-extra`}> {ExtraSlot}</div>}
          <div
            class={`${prefixCls}-body`}
            style={bodyStyles} >
            {DefaultSlot}
          </div>
        </div>
      )
    }
  }
})

export default Card
