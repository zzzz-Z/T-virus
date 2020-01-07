import SelectDemo from './select'
import { h } from 'next-vue'
export default () => {
  return h('div', { style: { margin: '30px' } }, h(SelectDemo))
}
