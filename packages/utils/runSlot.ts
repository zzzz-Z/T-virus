import { Slot } from 'vue'

export function runSlot(fn: Slot) {
  return typeof fn === 'function' ? fn() : undefined
}
