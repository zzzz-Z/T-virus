import { DirectiveBinding } from 'next-vue'

interface OutEl extends HTMLElement {
  _handler(e: Event): void
}
/**
 * Directive - clickoutside
 * a callback invoked when a target element was not clicked, it was clicked outside the target DOM element
 */
export default {
  mounted(el: OutEl, binding: DirectiveBinding) {
    el._handler = evt => {
      if (!el.contains(evt.target as HTMLElement)) {
        binding.value(evt)
      }
    }

    document.addEventListener('click', el._handler)
  },
  unmounted(el: OutEl) {
    document.removeEventListener('click', el._handler)
  }
}
