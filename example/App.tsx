import SelectDemo from './select'
import { h } from 'vue'

export default {
  render() {
    var a={}
    return h('div', { style: { margin: '30px' } }, h(SelectDemo))
  }
}
