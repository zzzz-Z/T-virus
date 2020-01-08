import { getCurrentInstance, capitalize, onBeforeMount } from 'vue'

export default function on(name: string, fn: () => void) {
  const vm = getCurrentInstance()!
  onBeforeMount(() => {
    vm.vnode.props = vm.vnode.props || {}
    vm.vnode.props![`on${capitalize(name)}`] = fn
  })
}
