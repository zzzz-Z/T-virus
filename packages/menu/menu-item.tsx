// import { createComponent, reactive, computed1, onMounted } from '../createComponent'
// import { dispatch, findComponentUpward, findComponentsUpward } from '../utils/util';
// import { MenuItemProps } from './type';

// const menuItemProps = {
//   name: { type: [String, Number], required: true },
//   disabled: { type: Boolean, default: false }
// }
// const MenuItem = createComponent<MenuItemProps>({
//   name: 'MenuItem',
//   inject: ['menu'],
//   props: menuItemProps,
//   setup(props, vm) {
//     const state = reactive({
//       active: false
//     })
//     // tslint:disable: variable-name
//     function handleClickItem(event: Event) {
//       event.stopPropagation()
//       if (props.disabled) { return }
//       findComponentUpward(vm, 'Submenu')
//         ? dispatch.apply(vm, ['Submenu', 'menu-item-select', props.name])
//         : vm.menu.$emit('menu-item-select', props.name)
//     }

//     const styles = computed1(() => {
//       return !!findComponentUpward(vm, 'Submenu')
//         && vm.menu.mode !== 'horizontal'
//         ? { paddingLeft: 43 + (findComponentsUpward(this, 'Submenu').length - 1) * 24 + 'px' } :
//         {}
//     })

//     onMounted(() => {
//       vm.$on('update-active-name', (name: string) => {
//         if (props.name === name) {
//           state.active = true;
//           dispatch.apply(vm, ['Submenu', 'on-update-active-name', name]);
//         } else {
//           state.active = false;
//         }
//       })
//     })

//     return () => (
//       <li
//         on-click={handleClickItem}
//         // style={styles}
//         class={[
//           `t-menu-item`, {
//             [`t-menu-item-active`]: state.active,
//             [`t-menu-item-selected`]: state.active,
//             [`t-menu-item-disabled`]: props.disabled
//           }
//         ]} >
//         {vm.$slots.default}
//       </li>
//     )
//   }
// })

// export default MenuItem
