import { Button, Input } from '@/ui'

const { createComponent, h, ref } = window.Vue

export default createComponent(() => {
  const loading = ref(false)
  function cl() {
    loading.value = !loading.value
  }
  return () =>
    h('div', { style: { padding: '50px' } }, [
      h(Input, {
        class: 'zz',
        onInput(e) {
          console.log(e)
        },
        onEnter: e => {
          console.log(e)
        }
      }),
      h(Button, { type: 'primary', icon: 'user', onClick: cl }, () => 'button'),
      h(Button, { type: 'primary', loading: loading.value }, () => 'button')
    ])
})
