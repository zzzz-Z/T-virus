import { Button, Input, Card } from 'ui'
import { createComponent, ref, h, getCurrentInstance, onMounted, VNode } from 'vue3'
import { broadcast } from '../packages/utils/useEmit'

export default createComponent(() => {
  const vm = getCurrentInstance()

  onMounted(() => {
    console.log(vm)
    broadcast(vm!, 'Input', 'change', {})
  })

  return () => {
    const node1 = h(Button, () => 'button')
    const node2 = h(Input)
    const node3 = h(Input)
    const node4 = h(Input)

    return h('div', { style: { padding: '50px' } }, [
      node1,
      node2,
      node3,
      node4,
      h(Card, {
        title: 'zzz',
        extra: '222'
      })
    ])
  }
})
