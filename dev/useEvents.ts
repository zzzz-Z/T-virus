import {
  ComponentInternalInstance,
  getCurrentInstance,
  Component,
  VNode
} from 'vue3'

export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export default function useEvents() {
  const vm = getCurrentInstance()!
  const _events = vm.sink._events || {}
  const $on = (event: string, fn: (arg: any) => void) => (_events[event] = fn)
  const $emit = (event: string, arg: any) => _events[event](arg)

  function $broadcast(
    vcName: string,
    eventName: string,
    params?: any,
    vc: ComponentInternalInstance = vm
  ) {
    const { type, subTree } = vc!
    const name = isObject(type) ? type.name : null
    if (name === vcName) {
      $emit(eventName, params)
    } else {
      ;(subTree.children as any).forEach(({ component }: VNode) => {
        component && $broadcast(vcName, eventName, params, component)
      })
    }
  }

  function dispatch(vcName: string, eventName: string, params?: any) {
    let parent = vm.parent || vm.root
    let name = vm.type.name
    while (parent && (!name || name !== vcName)) {
      parent = parent.parent!

      if (parent) {
        name = parent.type.name
      }
    }

    if (parent) {
      $emit(eventName, params)
    }
  }
  return {
    $on,
    $emit,
    vm,
    dispatch,
    $broadcast
  }
}

export function findComponentsDownward(
  context: ComponentInternalInstance,
  componentName: string
): ComponentInternalInstance[] | [] {
  const childs = (context.subTree.children || []) as VNode[]

  return childs.reduce((components: any[], child) => {
    const { type, component } = child
    const name = isObject(type) ? (type as Component).name : null
    if (name && name === componentName) {
      components.push(child)
    }
    const foundChilds = component
      ? findComponentsDownward(component, componentName)
      : []
    return components.concat(foundChilds)
  }, [])
}
