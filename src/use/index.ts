import { ref, ReturnTuple } from '@/createComponent';

export  function useBoolean() {
  const vl = ref(true)
  const set = (nVl: boolean) => { vl.value = nVl}
  return ReturnTuple(vl, set)
}

export function useToggle() {
  const vl = ref(true)
  const set = () => vl.value = !vl.value
  return ReturnTuple(vl, set)
}
