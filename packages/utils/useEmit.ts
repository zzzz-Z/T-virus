import { ComponentInternalInstance, Component, VNode } from 'vue3'
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
  const { type, subTree } = vc
  const name = isObject(type) && (type as Component).name
  if (name == vcName) {
    // console.log(vc);
    vc.emit(eventName)
  } else {
    const children = (subTree.children || []) as any[]
    children.forEach((child: VNode) => {
      child.component && broadcast(child.component, vcName, eventName)
    })
  }
}
