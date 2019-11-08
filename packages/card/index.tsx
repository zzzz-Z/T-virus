// import { CardProps } from './type';
// import { createComponent } from '../createComponent'

// const cardProps = {
//   border: { type: Boolean, default: true },
//   disHover: { type: Boolean, default: false },
//   shadow: { type: Boolean, default: false },
//   padding: { type: Number, default: 16 },
//   title: [String, Object],
//   extra: [String, Object]
// }
// const Card = createComponent<CardProps>({
//   name: 'Card',
//   props: cardProps,
//   setup(props) {

//     return () => {
//       const { title, border, shadow, disHover, extra, bodyStyle } = props
//       const TitleSlot = this.$slots.title || title
//       const ExtraSlot = this.$slots.extra || extra
//       const DefaultSlot = this.$slots.default
//       const bodyStyles = { padding: '16px', ...bodyStyle }

//       return (
//         <div class={[
//           `t-card`, {
//             [`t-card-bordered`]: border && !shadow,
//             [`t-card-dis-hover`]: disHover || shadow,
//             [`t-card-shadow`]: shadow
//           }]} >
//           {TitleSlot && <div class={`t-card-head`}>{TitleSlot}</div>}
//           {ExtraSlot && <div class={`t-card-extra`}> {ExtraSlot}</div>}
//           <div
//             class='t-card-body'
//             style={bodyStyles} >
//             {DefaultSlot}
//           </div>
//         </div>
//       )
//     }
//   }
// })

// export default Card
