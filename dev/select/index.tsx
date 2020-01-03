import { Select, Option } from 'ui'
import { defineComponent, h, onMounted, getCurrentInstance, compile, reactive, watch } from 'next-vue'
export default defineComponent({
  setup() {
    const model = reactive([])
    return () => h(Select, {
      placeholder: '测试placeholder',
      clearable: true,
      // multiple: true,
      value: model,
    }, () => [
      h(Option, { value: 1, label: '测试1' }),
      h(Option, { value: 2, label: '测试2' }),
      h(Option, { value: 3, label: '测试3' }),
    ])
  }
})
