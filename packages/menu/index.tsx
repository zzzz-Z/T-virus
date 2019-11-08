// import Vue from 'vue';
// import { MenuProps, MenuEvent } from './type'
// import { createComponent, provide, reactive, computed1, onMounted, watch } from '../createComponent'
// import { broadcast, findComponentsDownward, findComponentsUpward } from '../utils/util';

// export const menuProps = {
//   mode: { type: String, default: 'vertical' },
//   theme: { type: String, default: 'light' },
//   activeName: { type: [String, Number] },
//   openNames: { type: Array, default: () => ([]) },
//   accordion: { type: Boolean, default: false },
//   width: { type: String, default: '240px' }
// }

// const Menu = createComponent<MenuProps, MenuEvent>({
//   name: 'Menu',
//   props: menuProps,
//   setup(props, vm) {
//     const state = reactive({
//       currentActiveName: props.activeName,
//       openedNames: props.openNames!
//     })
//     provide({
//       openNames: props.openNames,
//       updateOpenKeys,
//       menu: vm
//     })
//     const classs = computed1(() => {
//       // tslint:disable-next-line:prefer-const
//       let { theme, mode } = props
//       mode === 'vertical' && theme === 'primary' && (theme = 'light')
//       return ['t-menu', `t-menu-${theme}`, { [`t-menu-${mode}`]: mode }]
//     })

//     onMounted(() => {
//       updateOpened();
//       vm.$nextTick(() => updateActiveName());
//       vm.$on('menu-item-select', (name: string) => {
//         state.currentActiveName = name
//         vm.$emit('select', name)
//       })
//     })

//     watch(() => props.openNames, (val) => { state.openedNames = val! })
//     watch(() => props.activeName, (val) => { state.currentActiveName = val })
//     watch(() => state.currentActiveName, () => updateActiveName())

//     function updateActiveName() {
//       if (state.currentActiveName === undefined) {
//         state.currentActiveName = -1;
//       }
//       broadcast.apply(vm, ['SubMenu', 'update-active-name', false])
//       broadcast.apply(vm, ['MenuItem', 'update-active-name', state.currentActiveName]);
//     }

//     function updateOpened() {
//       const items = findComponentsDownward(vm, 'SubMenu');
//       if (items.length) {
//         items.forEach((item: any) => {
//           item.opened = (state.openedNames as string[]).indexOf(item.name) > -1
//         });
//       }
//     }

//     function updateOpenKeys(name: string) {
//       const index = state.openedNames.indexOf(name);
//       if (props.accordion) {
//         findComponentsDownward(vm, 'SubMenu').forEach((item: any) => {
//           item.opened = false;
//         })
//       }
//       if (index >= 0) {
//         let currentSubmenu: Vue | null = null;
//         findComponentsDownward(vm, 'SubMenu').forEach((item: any) => {
//           if (item.name === name) {
//             currentSubmenu = item;
//             item.opened = false;
//           }
//         });
//         findComponentsUpward(currentSubmenu!, 'SubMenu').forEach((item: any) => {
//           item.opened = true;
//         });
//         findComponentsDownward(currentSubmenu!, 'SubMenu').forEach((item: any) => {
//           item.opened = false;
//         });
//       } else {
//         if (props.accordion) {
//           let currentSubmenu: Vue | null = null;
//           findComponentsDownward(vm, 'SubMenu').forEach((item: any) => {
//             if (item.name === name) {
//               currentSubmenu = item;
//               item.opened = true;
//             }
//           });
//           findComponentsUpward(currentSubmenu!, 'SubMenu').forEach((item: any) => {
//             item.opened = true;
//           });
//         } else {
//           findComponentsDownward(vm, 'SubMenu').forEach((item: any) => {
//             if (item.name === name) { item.opened = true }
//           });
//         }
//       }
//       const names = findComponentsDownward(vm, 'SubMenu')
//         .filter((item: any) => item.opened)
//         .map((item: any) => item.name)
//       state.openedNames = [...names]
//       vm.$emit('open-change', names)
//     }

//     return () => (
//       <ul class={classs.value} style={{ width: props.width }} >
//         {this.$slots.default}
//       </ul>
//     )
//   }
// })

// export default Menu
