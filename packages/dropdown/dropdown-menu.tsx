// import { createComponent, inject, onMounted } from '../createComponent';
// import { DropdownMenu } from './type';

// const dropdownMenuProps = {
//   visibleArrow: {
//     type: Boolean,
//     default: true
//   },
//   arrowOffset: {
//     type: Number,
//     default: 0
//   }
// }

// const DropdownMenu = createComponent<DropdownMenu>({
//   name: 't-dropdownMenu',
//   props: dropdownMenuProps,
//   setup(props, vm) {
//     const j = inject('dropdown')
//     onMounted(() => {
//       console.log(j.value);
//     })
//     return (
//       <div>111</div>
//     )
//   }
// })

// export default DropdownMenu
