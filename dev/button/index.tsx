import { Select, Option, Button, Input } from 'ui'
import './index.scss'
import { defineComponent, h, reactive, Transition, onMounted } from 'next-vue'
import { withVif } from '../../packages/utils/directives'

export default defineComponent({
  setup() {
    const model = reactive([])
    const state = reactive({
      show: false
    })

    return () => [
      h(
        Button,
        { size: 'small', onClick: () => (state.show = !state.show) },
        () => 'click'
      ),
      h(Transition, { name: 'slide-up' }, () =>
        withVif(h('div', 111), state.show)
      ),
      h(
        Select,
        {
          style: { width: '300px' },
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
