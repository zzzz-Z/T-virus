import { ref, ReturnTuple } from '@/createComponent';
import Vue from 'vue';

export function useBoolean() {
  const vl = ref(true)
  const set = (nVl: boolean) => { vl.value = nVl }
  return ReturnTuple(vl, set)
}

export function useToggle() {
  const vl = ref(true)
  const set = () => vl.value = !vl.value
  return ReturnTuple(vl, set)
}

// Find components upward
export function findComponentUpward(context: Vue, componentName: string | string[], componentNames?: string[]) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) { name = parent.$options.name; }
  }
  return parent;
}
