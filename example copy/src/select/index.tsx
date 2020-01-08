import {
  Select,
  Option,
  Button,
  Input,
  Radio,
  RadioGroup,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  Switch,
  Alert,
  Badge,
  Col,
  Row
} from '../../../packages'
import { defineComponent, h, reactive, Transition } from 'vue'
import { withVif } from '../../../packages/utils/directives'

export default defineComponent({
  setup() {
    const model = reactive([])
    const state = reactive({
      show: true,
      radio: 1
    })
    const rows = (nodes: any[]) => () =>
      h(Row, { gutter: 5 }, () =>
        nodes.map(node =>
          h(Col, { span: 24, style: { 'margin-bottom': '20px' } }, () => node)
        )
      )
    return rows([
      h(Input, {
        prefix: 'pre',
        prepend: h('a', 'pre'),
        suffix: 'suf',
        append: 'append'
      }),
      h(Badge, { value: 1, dot: false }, () => h(Button, () => 'ZCC')),
      h(Alert, {
        message: 'zcc',
        closable: true,
        type: 'error',
        showIcon: true,
        description: h('span', 'ceshi')
      }),
      h(Switch, {
        checkedText: '开',
        unCheckedText: 'close'
      }),
      h(
        Breadcrumb,
        {},
        {
          default: () => [
            h(BreadcrumbItem, () => 'zcc'),
            h(BreadcrumbItem, { to: '/' }, () => 'xxx'),
            h(BreadcrumbItem, () => 'ddd')
          ],
          separator: () => h('i', { class: 'icon icon-x' })
        }
      ),
      h(Tag, { name: 'zcc', closable: true }, () => 111),
      h(
        RadioGroup,
        {
          value: state.radio,
          onInput: (val: any) => {
            state.radio = val
            console.log(val)
          }
        },
        () => [
          h(Radio, { value: 1 }, () => '选项一'),
          h(Radio, { value: 2 }, () => '选项2')
        ]
      ),
      h(
        Button,
        { size: 'small', loading: true, onClick: () => (state.show = !state.show) },
        () => 'click'
      ),
      h(Transition, { name: 'slide-up' }, () =>
        withVif(
          h(Input, {
            prefix: 'pre',
            prepend: h('a', 'pre'),
            suffix: 'suf',
            append: 'append'
          }),
          state.show
        )
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
    ])
  }
})