import { ComponentInternalInstance, Component } from 'vue3'
export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function broadcast(
  vc: ComponentInternalInstance,
  vcName: string,
  eventName: string,
  params?: any
) {
  const { type, component, children, patchFlag } = vc.subTree
  const name = isObject(type) && (type as Component).name
  if (name) {
    if (name == vcName) {
      console.log('name')
    } else if (component) {
      broadcast(component, vcName, eventName, params)
    }
    // vc.emit(eventName, params)
  } else if (children) {
    ;(children as any[]).forEach(
      (childVc: ComponentInternalInstance) => console.log(childVc)
      //   broadcast(childVc, vcName, eventName, params)
    )
  }
}
