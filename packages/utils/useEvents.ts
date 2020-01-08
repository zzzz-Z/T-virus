import {
  ComponentInternalInstance,
  getCurrentInstance,
  VNode,
  capitalize
} from 'vue'
import { isObject } from './util'

export default function useEvents() {
  const vm = getCurrentInstance()!

  vm.vnode.props = vm.vnode.props || {}

  const $on = (event: string, fn: (arg: any) => void) => {
    vm.vnode.props![`on${capitalize(event)}`] = fn
  }

  function $broadcast(
    vcName: string,
    eventName: string,
    params?: any,
    vc: ComponentInternalInstance = vm
  ) {
    const { type, subTree } = vc
    const name = isObject(type) ? type.name : null
    if (name) {
      if (name === vcName) {
        vc.emit(eventName, params)
      } else {
        ;(subTree.children as any).forEach(({ component }: VNode) => {
          component && $broadcast(vcName, eventName, params, component)
        })
      }
    }
  }

  function dispatch(vcName: string, eventName: string, params?: any) {
    let parent = vm.parent
    let name = vm.type.name
    while (parent && (!name || name !== vcName)) {
      parent = parent.parent

      if (parent) {
        name = parent.type.name
      }
    }

    if (parent) {
      parent.emit(eventName, params)
    }
  }
  return {
    $on,
    vm,
    dispatch,
    $broadcast
  }
}
