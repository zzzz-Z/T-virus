import { getCurrentInstance, inject, onMounted, onUnmounted } from 'next-vue'

type Child<T> = { el: HTMLElement } & T
type ParentVcProvde<T, C > = { childs: Child<C>[] } & T

export default function useParent<T, C = {}>(name: string, methods: C) {
  const parent = inject<ParentVcProvde<T, C>>(name)
  const vm = getCurrentInstance()
  onMounted(() => {
    parent?.childs.push({
      el: vm?.vnode.el,
      ...methods
    })
  })
  onUnmounted(() => {
    const index = parent?.childs.findIndex(child => child.el === vm?.vnode.el)
    parent?.childs.splice(index!, 1)
  })

  return parent
}
