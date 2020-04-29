import {
  defineComponent,
  reactive,
  onMounted,
  h,
  inject,
  getCurrentInstance,
  ComponentInternalInstance,
  onUnmounted,
} from 'vue'
import { MenuItemProps } from './type'
import { MenuInstance, MenuCtxKey } from './menu'

export interface MenuItemInstance extends ComponentInternalInstance {
  updateActiveName(name: string | number): void
}

const menuItemProps = {
  name: { type: [String, Number] },
  to: {
    type: [Object, String],
    default() {
      return {}
    },
  },
  replace: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
} as any

const MenuItem = defineComponent({
  name: 'VMenuItem',
  props: menuItemProps,
  setup(props: MenuItemProps, { slots }) {
    const state = reactive({ active: false })
    const menuInstance = inject<MenuInstance>(MenuCtxKey)
    const instance = getCurrentInstance() as MenuItemInstance
    instance.updateActiveName = (name) => {
      state.active = props.name === name
    }

    onMounted(() => {
      menuInstance?.menuItems.push(instance)
    })

    onUnmounted(() => {
      const index = menuInstance?.menuItems.findIndex(({ uid }) => uid == instance.uid)!
      menuInstance?.menuItems.splice(index, 1)
    })

    function handleClickItem(event: Event) {
      event.stopPropagation()
      if (props.disabled) {
        return
      }
      menuInstance?.onMenuItemSelect(props.name)
    }

    return () =>
      h(
        'li',
        {
          onClick: handleClickItem,
          class: [
            'v-menu__item',
            {
              'v-menu__item--active': state.active,
              'v-menu__item--disabled': props.disabled,
            },
          ],
        },
        h('div', { class: 'v-menu__item-link' }, slots.default?.())
      )
  },
})

export default MenuItem
