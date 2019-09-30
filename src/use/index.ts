import { ref } from '@/ui'
import Vue from 'vue'

/** 通过参数获取返回值的元祖类型 */
export const returnTuple = <T extends any[]>(...arg: T): T => arg

export function useBoolean() {
  const vl = ref(true)
  const set = (nVl: boolean) => { vl.value = nVl }
  return returnTuple(vl, set)
}

export function useToggle() {
  const vl = ref(true)
  const set = () => vl.value = !vl.value
  return returnTuple(vl, set)
}

// Find components upward
export function findComponentUpward(context: Vue, componentName: string | string[], componentNames?: string[]) {

  componentNames = typeof componentName === 'string'
    ? [componentName]
    : componentName

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) { name = parent.$options.name }
  }
  return parent
}
