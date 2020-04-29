//@ts-ignore
import { h, defineComponent } from 'vue'
import { renderForm } from './form'
import { menuDeom } from './menu'
import { tableDemo } from './table'

export default defineComponent({
  setup() {
    return () =>
      h('div', { class: ' v-container' }, [
        // menuDeom(),
        // renderForm(),
        tableDemo(),
      ])
  },
})
