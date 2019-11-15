import { Button, Input, Card } from 'ui'
import { createComponent, ref, h, getCurrentInstance, onMounted, VNode } from 'vue3'

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
    console.log(getCurrentInstance())
  })
  return () => {
    const node1 = h(Button, { loading: loading.value }, () => 'button')
    const node2 = h(
      Button,
      {
        type: 'primary',
        onClick: (e: number) => {
          model.value++
        }
      },
      () => 'button'
    )
    const node3 = h(Input, {
      icon: 'x-circle',
      value: model.value,
      onChange: val => {
        model.value = val
      }
    })

    return h('div', { style: { padding: '50px' } }, [
      node1,
      node2,
      node3,
      h(Card, {
        title: 'zzz',
        extra: '222'
      })
    ])
  }
})

const Test = {
  template: `
  <v-card style='margin:20px' >
    <div slot='title'>1111</div>
    <div slot='extra'>1111</div>
    <v-input/>
  </v-card>
  `
}
