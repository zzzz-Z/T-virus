import { Select, Option, Button, Input } from 'ui'
import {
  defineComponent,
  h,
  onMounted,
  getCurrentInstance,
  compile,
  reactive,
  watch
} from 'next-vue'

export default defineComponent({
  setup() {
    const model = reactive([])
    return () => [
      h(Input, { after: 'zcc', icon: h('i', 'xxx') }),
      h(Button, { size: 'small' }, 'text'),
      h(
        Select,
        {
          style: { width: '300px' },
          class: ['xx', 'zz'],
          placeholder: '测试placeholder',
          clearable: true,
          filterable: true,
          multiple: true,
          value: model,
          onChange: (val: number) => console.log(val)
        },
        () => [
          h(Option, { value: 1, label: '测试1' }),
          h(Option, { value: 1.1, label: '测试1.1' }),
          h(Option, { value: 1.2, label: '测试1.2' }),
          h(Option, { value: 2, label: '测试2' }),
          h(Option, { value: 3, label: '测试3.1' }),
          h(Option, { value: 3, label: '测试3.11' }),
          h(Option, { value: 3, label: '测试3.111' })
        ]
      )
    ]
  }
})
