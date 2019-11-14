// import { createComponent, reactive, onMounted, watch, provide } from '../createComponent'
// import { DropDownProps } from './type'
// import { generateId, broadcast } from '../utils/util'
// import clickoutside from '../utils/clickoutside.js';

// const dropDownProps = {
//   trigger: { type: String, default: 'hover' },
//   type: String,
//   size: { type: String, default: '' },
//   splitButton: Boolean,
//   hideOnClick: { type: Boolean, default: true },
//   placement: { type: String, default: 'bottom-end' },
//   visibleArrow: { default: true },
//   showTimeout: { type: Number, default: 250 },
//   hideTimeout: { type: Number, default: 150 },
//   tabindex: { type: Number, default: 0 }
// }

// const DropDown = createComponent<DropDownProps>({
//   name: 't-dropDown',
//   directives: { clickoutside },
//   props: dropDownProps,
//   setup(props, vm) {

//     let triggerElm: any = null
//     const dropdownElm: any = null
//     let menuItems: any[] | null = null
//     let menuItemsArray: any[] | null = null
//     const state = reactive({
//       timeout: 0,
//       visible: false,
//       focusing: false,
//       listId: `dropdown-menu-${generateId()}`
//     })

//     provide(() => ({ dropdown: vm }))

//     watch(() => state.visible, (val) => {
//       broadcast.apply(vm, ['t-dropdownMenu', 'visible', val])
//       this.$emit('visible-change', val)
//     })

//     watch(() => state.focusing, (val) => {
//       const selfDefine = this.$el.querySelector('.el-dropdown-selfdefine')
//       if (selfDefine) { // 自定义
//         if (val) {
//           selfDefine.className += ' focusing'
//         } else {
//           selfDefine.className = selfDefine.className.replace('focusing', '')
//         }
//       }
//     })

//     onMounted(() => {
//       this.$on('menu-item-click', handleMenuItemClick)
//     })

//     function removeTabindex() {
//       triggerElm!.setAttribute('tabindex', '-1')
//       menuItemsArray!.forEach((item: Element) => {
//         item.setAttribute('tabindex', '-1')
//       })
//     }

//     function resetTabindex(ele: Element) { // 下次tab时组件聚焦元素
//       removeTabindex()
//       ele.setAttribute('tabindex', '0') // 下次期望的聚焦元素
//     }

//     function show() {
//       if ((triggerElm as any).disabled) { return }
//       clearTimeout(state.timeout)
//       state.timeout = setTimeout(() => {
//         state.visible = true
//       }, props.trigger === 'click' ? 0 : props.showTimeout)
//     }

//     function hide() {
//       if (triggerElm!.disabled) { return }
//       removeTabindex()
//       if (props.tabindex! >= 0) {
//         resetTabindex(triggerElm)
//       }
//       clearTimeout(state.timeout)
//       state.timeout = setTimeout(() => {
//         state.visible = false
//       }, props.trigger === 'click' ? 0 : props.hideTimeout)
//     }

//     function handleClick() {
//       if (triggerElm.disabled) { return }
//       state.visible ? hide() : show
//     }

//     function handleTriggerKeyDown(ev: any) {
//       const keyCode = ev.keyCode;
//       if ([38, 40].indexOf(keyCode) > -1) { // up/down
//         removeTabindex();
//         resetTabindex(menuItems![0]);
//         menuItems![0].focus();
//         ev.preventDefault();
//         ev.stopPropagation();
//       } else if (keyCode === 13) { // space enter选中
//         handleClick();
//       } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
//         hide();
//       }
//     }

//     function handleItemKeyDown(ev: any) {
//       const keyCode = ev.keyCode;
//       const target = ev.target;
//       const currentIndex = menuItemsArray!.indexOf(target);
//       const max = menuItemsArray!.length - 1;
//       let nextIndex;
//       if ([38, 40].indexOf(keyCode) > -1) { // up/down
//         if (keyCode === 38) { // up
//           nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
//         } else { // down
//           nextIndex = currentIndex < max ? currentIndex + 1 : max;
//         }
//         removeTabindex();
//         resetTabindex(menuItems![nextIndex]);
//         menuItems![nextIndex].focus();
//         ev.preventDefault();
//         ev.stopPropagation();
//       } else if (keyCode === 13) { // enter选中
//         triggerElmFocus();
//         target.click();
//         if (props.hideOnClick) { // click关闭
//           state.visible = false;
//         }
//       } else if ([9, 27].indexOf(keyCode) > -1) { // tab // esc
//         hide();
//         triggerElmFocus();
//       }
//     }

//     function initAria() {
//       dropdownElm!.setAttribute('id', state.listId);
//       triggerElm.setAttribute('aria-haspopup', 'list');
//       triggerElm.setAttribute('aria-controls', state.listId);

//       if (!props.splitButton) { // 自定义
//         triggerElm.setAttribute('role', 'button');
//         triggerElm.setAttribute('tabindex', props.tabindex);
//         triggerElm.setAttribute('class', (triggerElm.getAttribute('class') || '') + ' el-dropdown-selfdefine'); // 控制
//       }
//     }

//     function initEvent() {
//       triggerElm = props.splitButton
//         ? (vm.$refs.trigger as any).$el
//         : vm.$slots.default![0].elm;

//       triggerElm.addEventListener('keydown', handleTriggerKeyDown); // triggerElm keydown
//       dropdownElm!.addEventListener('keydown', handleItemKeyDown, true); // item keydown
//       // 控制自定义元素的样式
//       if (!props.splitButton) {
//         triggerElm.addEventListener('focus', () => {
//           state.focusing = true;
//         });
//         triggerElm.addEventListener('blur', () => {
//           state.focusing = false;
//         });
//         triggerElm.addEventListener('click', () => {
//           state.focusing = false;
//         });
//       }
//       if (props.trigger === 'hover') {
//         triggerElm.addEventListener('mouseenter', show);
//         triggerElm.addEventListener('mouseleave', hide);
//         dropdownElm!.addEventListener('mouseenter', show);
//         dropdownElm!.addEventListener('mouseleave', hide);
//       } else if (props.trigger === 'click') {
//         triggerElm.addEventListener('click', handleClick);
//       }
//     }

//     function handleMenuItemClick(command: any, instance: any) {
//       if (props.hideOnClick) {
//         state.visible = false
//       }
//       vm.$emit('command', command, instance)
//     }

//     function triggerElmFocus() {
//       triggerElm.focus && triggerElm.focus()
//     }
//     function handleMainButtonClick(event: Event) {
//       vm.$emit('click', event)
//       hide()
//     }

//     function initDomOperation() {
//       // dropdownElm = popperElm;
//       menuItems = dropdownElm!.querySelectorAll('[tabindex=\'-1\']');
//       menuItemsArray = [].slice.call(menuItems);

//       initEvent();
//       initAria();
//     }

//     return () => {
//       // tslint:disable-next-line: prefer-const
//       const { type, size, splitButton } = props
//       // tslint:disable-next-line:no-shadowed-variable
//       const triggerElm = !splitButton
//         ? this.$slots.default
//         : ''
//       // : (<el-button-group>
//       //   <el-button type={type} size={size} nativeOn-click={handleMainButtonClick}>
//       //     {this.$slots.default}
//       //   </el-button>
//       //   <el-button ref='trigger' type={type} size={size} class='el-dropdown__caret-button'>
//       //     <i class='el-dropdown__icon el-icon-arrow-down'></i>
//       //   </el-button>
//       // </el-button-group>)

//       return (
//         <div class='t-dropdown' v-clickoutside={hide}>
//           {triggerElm}
//           {this.$slots.dropdown}
//         </div>
//       );
//     }
//   }
// })

// export default DropDown
