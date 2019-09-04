import Vue, { VNode, CreateElement, VueConstructor } from 'vue'
import { BaseEvent } from './components/mixin';

let vm: any = null
interface BaseProps<P> {
  key?: string
  id?: string
  style?: string
  class?: string
  ref?: string
  on?: object
  props?: Partial<P>
  hook?: {
    init?(): void
    insert?(): void
    destroy?(): void
    prepatch?(): void
    update?(): void,
  }
}
type This<T> = Vue & Readonly<T> & { $props: Readonly<T>, $attrs: Readonly<T> }

export type TsComponent<P = {}, E = {}> = (props: P & E & BaseEvent) => VNode

type componentOptions<P> = {
  name?: string
  props?: string[] | object
  inheritAttrs?: boolean
  setup: (this: This<P>, props: Readonly<P>, vm: This<P>) => (h: CreateElement) => VNode
} | ((props: Readonly<P>, vm: This<P>) => (h: CreateElement) => VNode)

export function computed<O extends any>(options: O) {
  vm.$options.computed = options
  return vm as Readonly<{ [key in keyof O]: ReturnType<O[key]> }> & Record<string, any>;
}

export function watch<T>(fn: () => T, cb: (v: T, o: T) => void) {
  vm._watchers = vm._watchers || []
  return vm.$watch(fn, cb)
}

export const ref = <T>(v: T) => reactive({ value: v })

export const reactive = <T>(o: T) => Vue.observable(o)

export const onCreated = (fn: () => void) => registerHooks('created', fn)

export const onUnMounted = (fn: () => void) => registerHooks('destroy', fn)

export const onMounted = (fn: (refs: Vue['$refs']) => void) => registerHooks('mounted', fn.bind(null, vm.$refs || {}))

export const ReturnTuple = <T extends any[]>(...arg: T): T => arg

export const useDefaultProps = (o: Record<string, any>) => { vm.$options._props = o }

export const useVm = () => vm as Vue

export function createComponent<Props = {}, Event = {}>(options: componentOptions<Props>)
  : TsComponent<Props & BaseProps<Props>, Event> {
  const asAttrs = typeof options === 'function' || !options.props
  const component: any = {
    ...options,
    inheritAttrs: !asAttrs,
    beforeCreate() {
      vm = this
      this.$options.render = typeof options === 'function'
        ? options(proxy<Props>(this), this)
        : options.setup.call(this, proxy<Props>(this, options.props), this)

      vm = null
    }
  }

  component.install = (V: VueConstructor) => V.component(component.name, component)

  return component
}

function registerHooks(name: string, fn: () => void) {
  vm.$options[name] = vm.$options[name] || []
  vm.$options[name].push(fn)
}

const isNotUndefind = (val: any) => typeof val !== 'undefined'

function proxy<P>(currentVm: any, props?: any): P {
  return new Proxy({} as any, {
    get: (target, key) => {
      const { _props, propsData } = currentVm.$options
      if (props) {
        // 防止propsVal 为 布尔值
        if (isNotUndefind((currentVm.$props || {})[key])) {
          return (currentVm.$props || {})[key]
        }
        if (isNotUndefind((propsData || {})[key])) {
          return (propsData || {})[key]
        }
        return (props[key] || {}).default
      } else {
        if (isNotUndefind((currentVm.$attrs || {})[key])) {
          return (currentVm.$attrs || {})[key]
        }
        return (_props || {})[key]
      }
    },
    set: (target, key) => {
      throw new Error([key] + ' as a prop is readonly')
    }
  })
}


