//@ts-ignore
import { h, ref, reactive, getCurrentInstance, watch, onMounted, defineComponent } from 'vue'
import { renderForm } from './form'
import { menuDeom } from './menu'
import { tableDemo } from './table'

export default defineComponent({
  setup() {
    return () => h(
      'div',
      { class: ' v-container' }, [
      menuDeom(),
      renderForm(),
      tableDemo()
    ])
  }
})