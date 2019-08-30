import Vue, { VNode, CreateElement, VueConstructor } from 'vue'

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

type TsComponent<P = {}, E = {}> = (props: P & Partial<E>) => VNode

type componentOptions<P> = {
  name?: string
  props?: string[] | object
  inheritAttrs?: boolean
  setup: (this: This<P>, props: Readonly<P>, vm: This<P>) => (h: CreateElement) => VNode
} | ((props: Readonly<P>, vm: This<P>) => (h: CreateElement) => VNode)

export function computed<O extends any>(options: O) {
  vm.$options.computed = options
  return vm as { [key in keyof O]: Readonly<ReturnType<O[key]>> }
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

  const component: any = {
    ...options,
    beforeCreate() {
      vm = this
      if (typeof options === 'function' || !options.props) {
        this.$options.inheritAttrs = false
      }
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

function proxy<P>(currentVm: any, props?: any): P {
  return new Proxy({} as any, {
    get: (target, key) => {
      return (currentVm.$attrs || {})[key]
        || (currentVm.$options.propsData || {})[key]
        || ((props || {})[key] || {}).default
        || (currentVm.$options._props || {})[key]
    },
    set: (target, key) => {
      throw new Error([key] + ' as a prop is readonly')
    }
  })
}


