import {
  defineComponent,
  reactive,
  watch,
  onMounted,
  getCurrentInstance,
  inject,
  ref,
  h,
  ComponentInternalInstance,
  Transition,
  onUnmounted
} from 'vue'
import { getStyle } from '../utils/util'
import { SubMenuProps, MenuProps } from './type'
import { MenuInstance, MenuCtxKey } from './menu'
import { withVshow } from 'packages/utils/directives'
import collapseTransitio from 'packages/utils/collapse-transition'

export interface SubMenuInstance extends ComponentInternalInstance {
  updateActiveName(status: boolean): void
  close(): void
}

export const subMenuProps = {
  name: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  title: { type: [String, Object] }
} as any

export default defineComponent({
  name: 'VSubMenu',
  props: subMenuProps,
  setup(props: SubMenuProps, { slots }) {
    const prefix = (cls: string = '') => 'v-menu__submenu' + cls
    const instance = getCurrentInstance()! as SubMenuInstance
    const state = reactive({
      active: false,
      isOpen: props.opened!,
      dropWidth: getStyle(instance?.vnode?.el as HTMLElement, 'width')
    })
    const popoverRef = ref<HTMLDivElement>(null!)
    const triggerRef = ref<HTMLDivElement>(null!)
    const menuInstance = inject<MenuInstance>(MenuCtxKey)
    const menuProps = menuInstance?.propsProxy as MenuProps
    const parent = instance?.parent?.type
    let timeout!: undefined | number

    instance.updateActiveName = (status: boolean) => state.active = status
    instance.close = () => state.isOpen = false
    inject('subMenu', instance)

    watch(() => state.isOpen, val => {
      if (menuProps.mode === 'inline') return
      if (val) {
        state.dropWidth = getStyle(instance?.vnode?.el as HTMLElement, 'width')
        resetDropdownPosition()
      }
    })

    onMounted(() => {
      menuInstance?.subMenus.push(instance)
    })
    onUnmounted(() => {
      const index = menuInstance?.subMenus.findIndex(({ uid }) => uid == instance.uid)!
      menuInstance?.subMenus.splice(index, 1)
    })
    function resetDropdownPosition() {
      const popover = popoverRef.value
      const trigger = triggerRef.value
      if (menuProps.mode === 'vertical') {
        popover.style.left = 'initial'
        popover.style.right = `-${trigger.offsetWidth + 4}px`
        popover.style.top = '0'
      } else if (parent?.name !== 'VSubMenu') {
        popover.style.left = '0'
        popover.style.right = 'initial'
        popover.style.top = `${trigger.offsetHeight + 2}px`
      } else {
        popover.style.left = 'initial'
        popover.style.right = `-${trigger.offsetWidth + 4}px`
        popover.style.top = '0'
      }
    }

    function handleClick(e: Event) {
      e.stopPropagation()
      if (props.disabled || menuProps.mode !== 'inline') return
      const opend = state.isOpen
      if (menuProps.inlineCollapsed) {
        menuInstance?.subMenus.forEach(subMenu => subMenu.close())
      }
      state.isOpen = !opend
    }

    function handleMouseEnter() {
      if (props.disabled || menuProps.mode === 'inline') return
      clearTimeout(timeout)
      timeout = window.setTimeout(() => state.isOpen = true, 200)
    }

    function handleMouseLeave() {
      if (props.disabled || menuProps.mode === 'inline') return
      clearTimeout(timeout)
      timeout = window.setTimeout(() => state.isOpen = false, 200)
    }

    return () => {
      const title = h('div',
        { onClick: handleClick, class: prefix('-title') },
        [
          props.title || slots.title?.(),
          h('i', { class: ['icon icon-chevron-down ', prefix('-icon')] })
        ]
      )
      const popover = h(
        Transition, { name: 'slide-up' },
        () => withVshow(
          h('div', {
            ref: popoverRef,
            class: 'v-dropdown__popover',
            style: { 'min-width': state.dropWidth }
          }, h('ul', { class: 'v-dropdown-menu' }, slots.default?.())),
          state.isOpen
        ))

      const inlineDrop = h(
        collapseTransitio,
        () => withVshow(h('ul', { class: 'v-menu' }, slots.default?.()), state.isOpen)
      )
      return h('li', {
        ref: triggerRef,
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave,
        class: [prefix(), {
          [prefix('--active')]: state.active,
          [prefix('--opened')]: state.isOpen,
          [prefix('--disabled')]: props.disabled,
        }]
      }, [
        title,
        menuProps.mode === 'inline'
          ? inlineDrop
          : popover
      ])
    }
  }
})


