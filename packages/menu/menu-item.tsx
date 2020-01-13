import { defineComponent, reactive, onMounted, h, inject } from 'vue'
import { MenuItemProps } from './type'
import useEvents from '../utils/useEvents'

const menuItemProps: any = {
  name: { type: [String, Number], required: true },
  disabled: { type: Boolean, default: false }
}
const MenuItem = defineComponent<MenuItemProps, {}, {}>({
  name: 'VMenuItem',
  props: menuItemProps,
  setup(props, { slots }) {
    const state = reactive({ active: false })
    const { $on, vm, dispatch } = useEvents()
    const menu: any = inject('menu')

    function handleClickItem(event: Event) {
      event.stopPropagation()
      if (props.disabled) {
        return
      }
      menu.setActiveName(props.name)
      //   findComponentUpward(vm, 'Submenu')
      //     ? dispatch('Submenu', 'menuItemSelect', props.name)
      //     : dispatch('MenuItem', 'menuItemSelect', props.name)
    }

    onMounted(() => {
      $on('updateActiveName', (name: string) => {
        if (props.name === name) {
          state.active = true
          dispatch('Submenu', 'updateActiveName', name)
        } else {
          state.active = false
        }
      })
    })

    return () =>
      h(
        'li',
        {
          onClick: handleClickItem,
          class: [
            'v-menu__item',
            {
              'v-menu__item--active': state.active,
              'v-menu__item--disabled': props.disabled
            }
          ]
        },
        h(
          'div',
          { class: 'v-menu__item-link' },
          slots.default && slots.default()
        )
      )
  }
})

export default MenuItem
