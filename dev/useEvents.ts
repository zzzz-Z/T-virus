import { getCurrentInstance } from 'vue3'

export default function useEvents() {
  const vm = getCurrentInstance()!
  vm.sink._events = {}
  const events = vm.sink._events
  const on = (event: string, fn: (arg: any) => void) => (events[event] = fn)
  const emit = (event: string, ...arg: any[]) => events[event](...arg)

  return { on, emit, vm }
}
