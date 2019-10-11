import {
  createComponent,
  reactive,
  watch,
  onMounted
} from '../createComponent'
import {
  getStyle,
  findComponentUpward,
  dispatch,
  findComponentsDownward
} from '../utils/util'
import { SubMenuProps } from './type'
import Icon from '../icon';
import CollapseTransition from '../transition'

export const subMenuProps = {
  name: { type: [String, Number], required: true },
  disabled: { type: Boolean, default: false },
  title: { type: [String, Object] }
}

const SubMenu = createComponent<SubMenuProps>({
  name: 'SubMenu',
  inject: ['menu', 'updateOpenKeys', 'openNames'],
  props: subMenuProps,
  setup(props, vm) {
    let timeout: any = null
    const state = reactive({
      active: false,
      opened: false,
      dropWidth: parseFloat(getStyle(vm.$el as HTMLElement, 'width')!)
    })

    const hasParentSubmenu = findComponentUpward(vm, 'SubMenu')

    watch(() => state.opened, (val) => {
      if (vm.menu.mode === 'vertical') { return }
      const drop: any = this.$refs.drop
      if (val) {
        // set drop a width to fixed when menu has fixed position
        state.dropWidth = parseFloat(getStyle(vm.$el as HTMLElement, 'width')!)
        drop.update()
      } else {
        drop.destroy()
      }
    })

    onMounted(() => {
      if ((vm.openNames as any[]).includes(props.name)) {
        state.opened = true
      }
      vm.$on('menu-item-select', (name: string) => {
        if (vm.menu.mode === 'horizontal') { state.opened = false }
        dispatch.apply(vm, ['Menu', 'menu-item-select', name])
        return true
      })
      vm.$on('update-active-name', (status: boolean) => {
        if (findComponentUpward(vm, 'SubMenu')) {
          dispatch.apply(vm, ['SubMenu', 'update-active-name', status])
        }
        if (findComponentsDownward(vm, 'SubMenu')) {
          findComponentsDownward(vm, 'SubMenu').forEach((item) => {
            state.active = false
          })
        }
        state.active = status
      })
    })

    function handleMouseenter() {
      if (props.disabled || vm.menu.mode === 'vertical') {
        return
      }
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        vm.updateOpenKeys(props.name)
        state.opened = true
      }, 250)
    }

    function handleMouseleave() {
      if (props.disabled || vm.menu.mode === 'vertical') {
        return
      }
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        vm.updateOpenKeys(props.name)
        state.opened = false
      }, 150)
    }

    function handleClick() {
      if (props.disabled || vm.menu.mode === 'horizontal') {
        return
      }
      if (vm.menu.accordion) {
        vm.$parent.$children.forEach((item) => {
          if (item.$options.name === 'SubMenu') { (item as any).opened = false }
        })
      }
      state.opened = !state.opened
      vm.updateOpenKeys(props.name)
    }

    return () => {
      const classs = [
        `t-menu-submenu`, {
          [`t-menu-item-active`]: state.active && !hasParentSubmenu,
          [`t-menu-opened`]: state.opened,
          [`t-menu-submenu-disabled`]: props.disabled,
          [`t-menu-submenu-has-parent-submenu`]: hasParentSubmenu,
          [`t-menu-child-item-active`]: state.active
        }
      ]
      const dropStyle: any = {}
      if (state.dropWidth) { dropStyle.minWidth = `${state.dropWidth}px` }

      return (
        <li class={classs}
          on-mouseenter={handleMouseenter}
          on-mouseleave={handleMouseleave}>
          <div
            class='t-menu-submenu-title'
            ref='reference'
            on-click={handleClick}
            style='titleStyle'>
            {props.title || vm.$slots.title}
            <Icon type='arrow-down' class='t-menu-submenu-title-icon' />
          </div>
          {vm.menu.mode === 'vertical'
            ? (
              <CollapseTransition>
                <ul class='t-menu' v-show={state.opened}>
                  {this.$slots.default}
                </ul>
              </CollapseTransition>
            )
            : (
              <transition name='slide-up' >
                <drop
                  v-show={state.opened}
                  placement='bottom'
                  ref='drop'
                  style={dropStyle}>
                  <ul class='t-menu-drop-list'>
                    {this.$slots.default}
                  </ul>
                </drop>
              </transition>
            )
          }
        </li>
      )
    }
  }
})


export default SubMenu
