import { Button, Input } from 'magi-ui'
import { createComponent, ref, h, getCurrentInstance, onMounted, VNode, withDirectives, vModelDynamic } from 'vue3'

const withVModel = (node: VNode, model: any) => {
  node.props = {
    ...node.props,
    value: model.value,
    onChange: (val: any) => {
      model.value = val
    }
  }
  return node
}
export default createComponent(() => {
  const loading = ref(false)
  const model = ref(1)
  function cl() {
    loading.value = !loading.value
  }

  function add() {
    model.value++
  }
  onMounted(() => {
    console.log(getCurrentInstance());
  })
  return () => {
    const node1 = h(
      Button,
      { loading: loading.value },
      () => 'button'
    )
    const node2 = h(Button, {
      type: 'primary',
      onClick: e => {
        model.value++
      }
    }, () => 'button')
    const node3 = h(Input, {
      icon: 'x-circle',
      value: model.value,
      onChange: (val) => {
        console.log(val);
        model.value = val
      }
    })

    return h('div', { style: { padding: '50px' } }, [node1, node2, node3])
  }
})
