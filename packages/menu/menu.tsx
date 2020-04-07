import {
  reactive,
  defineComponent,
  provide,
  onMounted,
  watch,
  h,
  nextTick,
  computed,
  getCurrentInstance,
  ComponentInternalInstance
} from 'vue'
import { MenuItemInstance } from './menu-item'
import { MenuProps } from './type'
import { SubMenuInstance } from './submenu'
export interface MenuInstance extends ComponentInternalInstance {
  onMenuItemSelect(name: string): void
  menuItems: MenuItemInstance[]
  subMenus: SubMenuInstance[]

}

export const MenuCtxKey = Symbol('MenuInstance')
export const menuProps = {
  mode: { type: String, default: 'inline' },
  theme: { type: String, default: 'light' },
  activeName: [String, Number],
  inlineCollapsed: { type: Boolean, default: false },
  width: { type: String, default: '240px' },
  router: { type: Boolean, default: false },
  openNames: Array
} as any

const Menu = defineComponent({
  name: 'VMenu',
  props: menuProps,
  emits: ['select'],
  setup(props: MenuProps, { slots, emit }) {
    const prefix = (cls: string = '') => 'v-menu' + cls
    const state = reactive({
      activeName: props.activeName,
      attrs: computed(() => {
        const style: any = {}
        const { theme, mode, width } = props
        const classs = [prefix(), prefix('--' + theme), prefix('--' + mode)]
        if (mode === 'inline' || mode === 'vertical') {
          style.width = width
        }
        return { class: classs, style }
      })
    })
    const instance = getCurrentInstance()! as MenuInstance
    instance.subMenus = []
    instance.menuItems = []
    instance.onMenuItemSelect = (name) => {
      state.activeName = name
      emit('select', name)
    }

    provide(MenuCtxKey, instance)

    onMounted(() => nextTick(updateActiveName))
    watch(() => props.activeName, val => (state.activeName = val))
    watch(() => state.activeName, updateActiveName)

    function updateActiveName() {
      if (state.activeName === undefined) {
        state.activeName = -1
      }
      const { subMenus, menuItems } = instance
      subMenus.forEach(subMenu => subMenu.updateActiveName(false))
      menuItems.forEach((menuItem) => {
        menuItem.updateActiveName(state.activeName!)
      })
    }

    return () => h('ul', state.attrs, slots.default?.())
  }
})

export default Menu
