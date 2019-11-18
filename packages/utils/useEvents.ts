import { getCurrentInstance } from 'vue3'

export default function useEvents() {
  const vm = getCurrentInstance()!
  const _events = vm.sink._events || {}
  const on = (event: string, fn: (arg: any) => void) => (_events[event] = fn)
  const emit = (event: string, ...arg: any[]) => _events[event](...arg)
  return { on, emit }
}
