// import 'highlight.js/styles/monokai-sublime.css'
import './md.css'
import { Button, Input, Card } from 'ui'
import { createComponent, ref, h, getCurrentInstance, onMounted, computed } from 'vue3'
import README from './README.md'
import useEvents from './useEvents'

export default createComponent(() => {
  const { on, emit, vm } = useEvents()
  on('test', () => {
    console.log(111)
  })
  onMounted(() => {
    emit('test')
  })
  return () => {
    return h('div', { style: { padding: '50px' } }, [h(README), h(Test)])
  }
})

const Test = {
  props: {},
  setup() {
    const vm = getCurrentInstance()!
    const count = ref(1)
    const el = ref(null)
    function add() {
      count.value++
    }

    vm.sink = {
      add
    }
    return () => h('div', { ref: el }, count.value)
  }
}
